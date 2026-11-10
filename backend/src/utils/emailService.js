import nodemailer from 'nodemailer';

export const sendAdmissionEmail = async ({ to, subject, htmlContent, textContent }) => {
  try {
    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = Number(process.env.SMTP_PORT) || 465;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (user && pass) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass }
      });

      const info = await transporter.sendMail({
        from: `"Khwopa Secondary School (+2)" <${user}>`,
        to,
        subject,
        text: textContent || 'Khwopa Secondary School Notification',
        html: htmlContent
      });

      console.log(`[Khwopa Mailer] Real Gmail message dispatched to ${to} (MessageID: ${info.messageId})`);
      return { success: true, messageId: info.messageId, mode: 'smtp' };
    }

    // High fidelity test simulated transporter (Dev Logger when credentials not yet set)
    console.warn(`[Khwopa Mailer Warning] SMTP_USER or SMTP_PASS not set in backend/.env. Simulated send to ${to}`);
    return {
      success: false,
      mode: 'unconfigured',
      message: `Email could not be delivered to ${to} because SMTP_USER or SMTP_PASS is not configured in backend/.env.`
    };
  } catch (error) {
    console.error('[Khwopa Mailer Error]', error);
    return { success: false, error: error.message };
  }
};

