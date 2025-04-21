const express = require("express")
const nodemailer = require("nodemailer")
const bodyParser = require("body-parser")
const path = require("path")

const app = express() // Declare the app variable
const PORT = process.env.PORT || 5000

// Middleware to parse the form data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Add these lines after the existing middleware setup
// This allows your frontend to communicate with your server during development
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }
  next()
})

// Serve static files (HTML, CSS, JS, Images)
app.use(express.static(path.join(__dirname)))

// Route to serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"))
})

// Route to handle the contact form submission
app.post("/send", (req, res) => {
  const { name, email, phone, message } = req.body

  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
  })

  // Setup email data
  const mailOptions = {
    from: email, // sender address
    to: process.env.EMAIL_USER, // your email address
    subject: "New Contact Form Submission",
    text: `You have a new message from ${name} (${email}),${phone ? phone : "No phone provided"}:\n\n${message}`,
  }

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error)
      return res.status(500).json({ success: false, message: "Something went wrong." })
    }
    res.status(200).json({ success: true, message: "Message sent successfully!" })
  })
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
