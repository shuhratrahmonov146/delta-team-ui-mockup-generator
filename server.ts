import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory storage for prototypes (in production, use a database)
const prototypes = new Map<string, string>();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "AI Idea-to-MVP Engine is running" });
  });

  // Save prototype endpoint
  app.post("/api/prototype", async (req, res) => {
    console.log('💾 Save prototype API called');
    try {
      const { id, html } = req.body;

      if (!id || !html) {
        return res.status(400).json({ error: "Missing required fields: id, html" });
      }

      // Store prototype in memory
      prototypes.set(id, html);
      console.log(`✅ Prototype saved with ID: ${id}`);

      res.json({ success: true, id, url: `${req.protocol}://${req.get('host')}/prototype/${id}` });
    } catch (error: any) {
      console.error("❌ Save prototype error:", error.message);
      res.status(500).json({ error: "Failed to save prototype", details: error.message });
    }
  });

  // Get prototype endpoint
  app.get("/prototype/:id", (req, res) => {
    const { id } = req.params;
    console.log(`📄 Retrieving prototype: ${id}`);

    const html = prototypes.get(id);
    if (!html) {
      return res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Prototype Not Found</title>
          <style>
            body { font-family: Arial, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f5f5f5; }
            .container { text-align: center; padding: 40px; background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #00A3AD; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Prototype Not Found</h1>
            <p>This prototype may have expired or the link is invalid.</p>
            <p><a href="/" style="color: #00A3AD;">Go back to home</a></p>
          </div>
        </body>
        </html>
      `);
    }

    console.log(`✅ Prototype found, serving HTML`);
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  });

  // Email API endpoint
  app.post("/api/send-email", async (req, res) => {
    console.log('📧 Email API called');
    try {
      const { to, subject, htmlContent, prototypeUrl } = req.body;

      console.log('Email request details:', { to, subject, hasHtml: !!htmlContent });

      if (!to || !subject || !htmlContent) {
        console.error('❌ Missing required fields');
        return res.status(400).json({ error: "Missing required fields: to, subject, htmlContent" });
      }

      console.log('Creating SMTP transporter...');
      // Create SMTP transporter
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      console.log('Verifying SMTP connection...');
      await transporter.verify();
      console.log('✅ SMTP connection verified');

      // Email options
      const mailOptions = {
        from: `"${process.env.SMTP_FROM_NAME || 'SRP AI Studio'}" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html: htmlContent,
      };

      console.log('Sending email...');
      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log("✅ Email sent successfully! Message ID:", info.messageId);

      res.json({ success: true, messageId: info.messageId });
    } catch (error: any) {
      console.error("❌ Email error:", error.message);
      console.error("Full error:", error);
      res.status(500).json({ error: "Failed to send email", details: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
