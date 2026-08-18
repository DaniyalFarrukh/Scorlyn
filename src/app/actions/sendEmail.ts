"use server";

import nodemailer from "nodemailer";

export async function sendEmailAction(formData: FormData) {
  try {
    const helpReason = formData.get("helpReason") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phoneCode = formData.get("phoneCode") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const location = formData.get("location") as string;
    const projectDetails = formData.get("projectDetails") as string;

    if (!name || !email || !location || !projectDetails || !helpReason) {
      return { success: false, message: "Please fill out all required fields." };
    }

    const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;

    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
      console.error("Missing Gmail credentials in environment variables.");
      return { success: false, message: "Server configuration error. Please try again later." };
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    const fullPhone = phoneNumber ? `${phoneCode} ${phoneNumber}` : "Not provided";

    // Email to Scorlyn HQ
    const adminMailOptions = {
      from: `"Scorlyn Website" <${GMAIL_USER}>`,
      replyTo: email,
      to: GMAIL_USER,
      subject: `New Contact Form Submission: ${helpReason}`,
      text: `New Message from Scorlyn Website\n\nReason: ${helpReason}\nName: ${name}\nEmail: ${email}\nPhone: ${fullPhone}\nLocation: ${location}\n\nProject Details:\n${projectDetails}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>New Message from Scorlyn Website</h2>
          <p><strong>Reason:</strong> ${helpReason}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${fullPhone}</p>
          <p><strong>Location:</strong> ${location}</p>
          <br/>
          <h3>Project Details:</h3>
          <p>${projectDetails.replace(/\n/g, '<br/>')}</p>
        </body>
        </html>
      `,
    };

    // Auto-reply to Client
    const clientMailOptions = {
      from: `"Scorlyn HQ" <${GMAIL_USER}>`,
      replyTo: GMAIL_USER,
      to: email,
      subject: `Thank you for contacting Scorlyn!`,
      text: `Hello ${name},\n\nThank you for reaching out to Scorlyn. We have received your message regarding your ${helpReason} inquiry.\n\nOur team is reviewing your project details and will get back to you shortly.\n\nBest regards,\nThe Scorlyn Team`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>Hello ${name},</h2>
          <p>Thank you for reaching out to Scorlyn. We have received your message regarding your ${helpReason} inquiry.</p>
          <p>Our team is reviewing your project details and will get back to you shortly.</p>
          <br/>
          <p>Best regards,</p>
          <p><strong>The Scorlyn Team</strong></p>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(clientMailOptions);

    return { success: true, message: "Your message has been sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send message. Please try again." };
  }
}
