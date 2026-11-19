import { ContactMessage } from '../models/ContactMessage.js';
import { sendAdmissionEmail } from '../utils/emailService.js';

// POST /api/v1/contact (Public contact submission)
export const submitContactMessage = async (req, res) => {
  try {
    const { fullName, email, phone, subject, category, message } = req.body;

    if (!fullName || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, email, phone number, and your message.'
      });
    }

    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

    const newContact = await ContactMessage.create({
      fullName,
      email,
      phone,
      subject: subject || 'General Inquiry',
      category: category || 'General',
      message,
      ipAddress
    });

    // Real-time socket broadcast if io is available
    const io = req.app.get('io');
    if (io) {
      io.emit('cms:new_contact_message', {
        id: newContact._id,
        fullName: newContact.fullName,
        email: newContact.email,
        subject: newContact.subject,
        createdAt: newContact.createdAt
      });
    }

    // Attempt sending confirmation receipt email to the user
    try {
      const emailHtml = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5dfd3; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #0b2038; padding: 24px; text-align: center; border-bottom: 3px solid #dfbd77;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 1px;">KHWOPA SECONDARY SCHOOL (+2)</h1>
            <p style="color: #dfbd77; margin: 6px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">An Undertaking of Bhaktapur Municipality</p>
          </div>
          <div style="padding: 28px; color: #17283c;">
            <p style="font-size: 15px; margin-top: 0;">Namaste <strong>${fullName}</strong>,</p>
            <p style="font-size: 14px; line-height: 1.6; color: #475365;">
              Thank you for contacting Khwopa Secondary School. Your inquiry regarding <strong>"${subject || 'General Inquiry'}"</strong> has been received by our administrative desk.
            </p>
            <div style="background: #fbfaf7; border: 1px solid #eee9df; border-radius: 8px; padding: 16px; margin: 20px 0;">
              <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: bold; color: #92703b; text-transform: uppercase;">Message Reference</p>
              <p style="margin: 3px 0; font-size: 13px;"><strong>Sender:</strong> ${fullName} (${phone})</p>
              <p style="margin: 3px 0; font-size: 13px;"><strong>Category:</strong> ${category || 'General'}</p>
              <p style="margin: 3px 0; font-size: 13px;"><strong>Message:</strong></p>
              <p style="margin: 6px 0 0 0; font-size: 13px; color: #475365; font-style: italic; background: #fff; padding: 10px; border-radius: 6px; border: 1px solid #eee;">"${message}"</p>
            </div>
            <p style="font-size: 13px; color: #68717d; line-height: 1.6;">
              Our communications team or concerned department will reach back out to you within 1 business day.
            </p>
          </div>
          <div style="background: #f7f5f0; padding: 16px; text-align: center; border-top: 1px solid #eee9df; font-size: 11px; color: #8892a0;">
            Dekocha, Bhaktapur, Nepal · Tel: +977-1-6614336 · info@khwopa.edu.np
          </div>
        </div>
      `;

      await sendAdmissionEmail({
        to: email,
        subject: `Inquiry Received: ${subject || 'Contact Khwopa College'}`,
        htmlContent: emailHtml,
        textContent: `Thank you for contacting Khwopa College. Your inquiry "${subject}" has been received.`
      });
    } catch (mailErr) {
      console.warn('[Contact Email Dispatch Info]', mailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted successfully. Our communications desk will get back to you shortly.',
      data: newContact
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while submitting your inquiry'
    });
  }
};

// GET /api/v1/contact (Protected - Admin list)
export const getContactMessages = async (req, res) => {
  try {
    const { status, category, search, limit = 50, page = 1 } = req.query;
    const filter = {};

    if (status && status !== 'All') {
      filter.status = status;
    }

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { fullName: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { phone: new RegExp(search, 'i') },
        { subject: new RegExp(search, 'i') },
        { message: new RegExp(search, 'i') }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await ContactMessage.countDocuments(filter);
    const messages = await ContactMessage.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: messages.length,
      total,
      data: messages
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/v1/contact/:id/status (Protected - Update status / notes)
export const updateContactStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const updateData = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.status(200).json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/v1/contact/:id/reply (Protected - Send admin reply via email)
export const replyContactMessage = async (req, res) => {
  try {
    const { replyText, subject } = req.body;
    if (!replyText) {
      return res.status(400).json({ success: false, message: 'Reply message text is required' });
    }

    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    const replySubject = subject || `Re: ${message.subject} - Khwopa Secondary School`;
    const emailHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5dfd3; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #0b2038; padding: 24px; text-align: center; border-bottom: 3px solid #dfbd77;">
          <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 1px;">KHWOPA SECONDARY SCHOOL (+2)</h1>
          <p style="color: #dfbd77; margin: 6px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Official Response from Administration Desk</p>
        </div>
        <div style="padding: 28px; color: #17283c;">
          <p style="font-size: 15px; margin-top: 0;">Dear <strong>${message.fullName}</strong>,</p>
          <div style="font-size: 14px; line-height: 1.7; color: #2d3748; background: #fdfcfa; padding: 18px; border-radius: 8px; border-left: 4px solid #b99754; margin: 18px 0;">
            ${replyText.replace(/\n/g, '<br/>')}
          </div>
          <div style="background: #f7f5ef; border: 1px solid #e5ddce; border-radius: 8px; padding: 14px; margin: 20px 0; font-size: 12px; color: #64748b;">
            <p style="margin: 0 0 4px 0; font-weight: bold; text-transform: uppercase; color: #92703b;">In Reference to Your Original Message:</p>
            <p style="margin: 0; font-style: italic;">"${message.message}"</p>
          </div>
          <p style="font-size: 13px; color: #68717d;">
            Should you have further queries, feel free to visit our admissions and counseling office at Dekocha or call us at +977-1-6614336.
          </p>
        </div>
        <div style="background: #f7f5f0; padding: 16px; text-align: center; border-top: 1px solid #eee9df; font-size: 11px; color: #8892a0;">
          Khwopa Secondary School · Dekocha, Bhaktapur, Nepal · info@khwopa.edu.np
        </div>
      </div>
    `;

    const emailRes = await sendAdmissionEmail({
      to: message.email,
      subject: replySubject,
      htmlContent: emailHtml,
      textContent: replyText
    });

    // Automatically mark status as 'Replied'
    message.status = 'Replied';
    message.notes = (message.notes ? message.notes + '\n' : '') + `[Replied on ${new Date().toLocaleDateString()}] ${replyText.slice(0, 80)}...`;
    await message.save();

    res.status(200).json({
      success: true,
      message: 'Reply dispatched successfully to student/guardian email.',
      emailStatus: emailRes,
      data: message
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/v1/contact/:id (Protected - Admin delete)
export const deleteContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.status(200).json({ success: true, message: 'Contact message deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

