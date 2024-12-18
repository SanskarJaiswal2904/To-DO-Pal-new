import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export async function sendOTP(email, otp) {
    const EMAIL_USER = process.env.VITE_EMAIL_USER;
    const EMAIL_PASS = process.env.VITE_EMAIL_PASS;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
        secure: true,
        port: 465,
    });

    const mailOptions = {
        from: `"TO-DO Pal Support - OTP" <${EMAIL_USER}>`,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is: ${otp}`,
        html: `
<html>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background: linear-gradient(to right, #ff7e5f, #feb47b, #ffcc33, #fddb92);">
<div style="max-width: 450px; margin: 50px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); overflow: hidden;">

<!-- Logo Section -->
<div style="background-color: #f9f9f9; text-align: center; padding: 20px;">
  <img src="https://raw.githubusercontent.com/SanskarJaiswal2904/To-DO-Pal-new/master/src/assets/todopalLogo.png" alt="Company Logo" style="width: 200px; height: auto;" />
</div>

<!-- Welcome & OTP Section -->
<h2 style="
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
  font-size: 30px;
  background: linear-gradient(to right, #0090f7, #ba62fc, #f2416b, #ffea00);
  -webkit-background-clip: text;
  color: #171313;
  padding: 10px;">
  To-Do Pal
</h2>

<h2 style="
  text-align: center;
  margin-top: 5px;
  font-size: 24px;
  background: linear-gradient(to right, #0090f7, #ba62fc, #f2416b);
  -webkit-background-clip: text;
  padding: 10px;
  color: #373636">
  Thank You for Signing Up!
</h2>

<p style="font-size: 16px; color: #555; text-align: center; margin: 10px 20px;">
  Welcome to <b>TO-DO Pal</b>! We are excited to have you on board. Please use the following OTP to verify your email address and complete your registration:
</p>

<div style="text-align: center; margin: 20px;">
  <span style="
    display: inline-block;
    font-size: 28px;
    font-weight: bold;
    color: #4CAF50;
    background-color: #e8f5e9;
    padding: 12px 24px;
    border-radius: 8px;
    letter-spacing: 3px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.2);">
    ${otp}
  </span>
</div>

<!-- Additional Message -->
<p style="font-size: 14px; color: #777; text-align: center; margin: 20px;">
  This OTP is valid for <b>10 minutes</b>. If you did not request this email, please ignore it.
</p>
<p style="font-size: 14px; color: #555; text-align: center; margin: 10px;">
  <i>This is an automated response. Please do not reply to this email.</i>
</p>

<!-- Footer -->
<div style="background-color: #f9f9f9; padding: 15px; text-align: center; border-top: 1px solid #ddd;">
  <p style="margin: 5px; font-size: 12px; color: #aaa;">© 2024 TO-DO Pal by SansKar Jaiswal</p>
  <p style="margin: 5px; font-size: 12px; color: #aaa;">All rights reserved.</p>
  <p style="margin: 5px; font-size: 12px; color: #555;">
    Made with ❤️ by 
    <a href="https://sanskarjaiswal2904.github.io/Sanskar-Website/index.html" target="_blank" style="color: #ff7e5f; text-decoration: none; font-weight: bold;">Sanskar</a>
  </p>
</div>
</div>
</body>
</html>

            `

    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("OTP sent successfully!");
        console.log("EMAIL_USER from env: " + process.env.VITE_EMAIL_USER + " EMAIL_USER: " + EMAIL_USER);
        console.log("EMAIL_PASS from env: " + process.env.VITE_EMAIL_PASS + " EMAIL_PASS: " + EMAIL_PASS);
        process.stdout.write("OTP sent successfully!\n");
    } catch (error) {
        console.log("Error:", error);
        process.stderr.write(`Error: ${error.message}\n`);
    }
}

// Ensure sendOTP is called with the email and otp passed as command-line arguments
sendOTP(process.argv[2], process.argv[3]);



