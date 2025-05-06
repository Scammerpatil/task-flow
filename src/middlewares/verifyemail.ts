import nodemailer from "nodemailer";
import path, { basename } from "path";
import ejs from "ejs";
import fs from "fs";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.SMTP_EMAIL || "novacops.rcpit@gmail.com",
    pass: process.env.SMTP_PASSWORD || "cvrwlvkrohgbqmse",
  },
});

export default async function POST(
  email: string,
  token: string,
  name: string
): Promise<boolean> {
  if (!email || !token || !name) {
    console.error("Missing required parameters:", { email, token, name });
    return false;
  }
  const templatePath = path.join(process.cwd(), "src/helper/mailTemplate.ejs");
  const template = fs.readFileSync(templatePath, "utf-8");
  const mailOptions = {
    from: "Task Flow | No Reply <",
    to: email,
    subject: "Verify Email",
    html: ejs.render(template, { token, name }),
  };
  try {
    await new Promise<void>((resolve, reject) => {
      transporter.sendMail(mailOptions, (err: any, info: any) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log("Email sent:", info.response);
          resolve();
        }
      });
    });
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}
