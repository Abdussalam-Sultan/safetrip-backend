import nodemailer from "nodemailer";
import config from "../config/index.js";
import {fileURLTopath} from "node:url";
import path from "node:path";
import ejs from "ejs";


// // Create a test account or replace with real credentials.
// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: "maddison53@ethereal.email",
//     pass: "jn7jnAPss4f63QBp6D",
//   },
// });

const __filename = fileURLTopath(import.meta.url);
const __dirname = path.dirname(__filename);
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: config.SMTP_SECURE, 
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASSWORD,
  },
});

export async function rendertempalte(templatename, payload={}){
    const file = path.join(__dirname, "..", "template", "emails", `${templatename}.ejs`);
    return ejs.renderFile(file, payload);
};

export async function  sendMail(to, subject, html, text) {
    const message = {
        from: `"Mini social Medial App <noreply@minisocialmedialapp.com>" `,
        to,
        subject,
        text,
        html,
    }
    try{
        const sending = await transporter.sendMail(message);
    }catch(error) {
        console.error("Error sending email:", error)
        throw new Error("could not send email");
    }
}
export default {rendertempalte, sendMail};