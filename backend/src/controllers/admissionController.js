import { AdmissionApplication } from '../models/AdmissionApplication.js';
import { sendAdmissionEmail } from '../utils/emailService.js';

// Generate formatted sequential application ID (e.g. KHW-2083-0042)
const generateAppId = async () => {
  const count = await AdmissionApplication.countDocuments();
  const year = '2083';
  const seq = String(count + 1).padStart(4, '0');
  return `KHW-${year}-${seq}`;
};

// POST /api/v1/admissions/apply (Public Student Submission)
export const submitApplication = async (req, res) => {
  try {
    const applicationId = await generateAppId();
    const application = await AdmissionApplication.create({
      ...req.body,
      applicationId,
      status: 'Submitted'
    });

    // Send instant confirmation email to student's provided Gmail
    const emailSubject = `Application Confirmation: ${application.fullName} (${applicationId}) - Khwopa College`;
    const emailHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2dccb; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #101B2D; padding: 24px; text-align: center; border-bottom: 3px solid #C5A15B;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 1px;">KHWOPA SECONDARY SCHOOL (+2)</h1>
          <p style="color: #C5A15B; margin: 5px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">An Undertaking of Bhaktapur Municipality</p>
        </div>
        <div style="padding: 28px; color: #17283c;">
          <p style="font-size: 15px; margin-top: 0;">Dear <strong>${application.fullName}</strong>,</p>
          <p style="font-size: 14px; line-height: 1.6; color: #475365;">
            Thank you for applying to Khwopa Secondary School for the Academic Session 2083. Your application has been successfully recorded in the college admissions registry.
          </p>
          
          <div style="background-color: #F8F6F0; border: 1px solid #e5dfd3; border-radius: 8px; padding: 18px; margin: 20px 0;">
            <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: bold; color: #101B2D; text-transform: uppercase;">Application Summary</p>
            <p style="margin: 4px 0; font-size: 13px;"><strong>Application ID:</strong> <span style="font-family: monospace; color: #C5A15B; font-weight: bold;">${applicationId}</span></p>
            <p style="margin: 4px 0; font-size: 13px;"><strong>Stream Applied:</strong> ${application.streamName || application.stream}</p>
            <p style="margin: 4px 0; font-size: 13px;"><strong>SEE Symbol No:</strong> ${application.seeSymbolNo}</p>
            <p style="margin: 4px 0; font-size: 13px;"><strong>SEE GPA:</strong> ${application.seeGpa}</p>
            <p style="margin: 4px 0; font-size: 13px;"><strong>Application Status:</strong> <span style="color: #2E7D32; font-weight: 600;">Submitted & Under Verification</span></p>
          </div>

          <p style="font-size: 14px; line-height: 1.6; color: #475365;">
            You can download and inspect your official completed admission form PDF at any time. Please keep this Application ID safe for your upcoming Entrance Examination and Merit List counselling.
          </p>

          <div style="margin-top: 30px; padding-top: 18px; border-top: 1px solid #eee; font-size: 12px; color: #8892a0; line-height: 1.5;">
            <p style="margin: 0;">Khwopa Secondary School Admissions Desk</p>
            <p style="margin: 2px 0;">Dekocha, Bhaktapur, Nepal · Tel: +977-1-6614336 · Email: info@khwopa.edu.np</p>
          </div>
        </div>
      </div>
    `;

    // Attempt sending confirmation message
    if (application.email) {
      await sendAdmissionEmail({
        to: application.email,
        subject: emailSubject,
        htmlContent: emailHtml,
        textContent: `Khwopa College: Application ${applicationId} submitted successfully for ${application.fullName}.`
      });
    }

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully! Your confirmation email and downloadable PDF are ready.',
      data: application
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET /api/v1/admissions/applications (Admin View All)
export const getApplications = async (req, res) => {
  try {
    const { stream, status, search } = req.query;
    const filter = {};

    if (stream && stream !== 'All') filter.stream = stream;
    if (status && status !== 'All') filter.status = status;
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { applicationId: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } },
        { seeSymbolNo: { $regex: search, $options: 'i' } }
      ];
    }

    const applications = await AdmissionApplication.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/admissions/applications/:id (Admin Single View / Form Detail)
export const getApplicationById = async (req, res) => {
  try {
    const app = await AdmissionApplication.findById(req.params.id);
    if (!app) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.status(200).json({ success: true, data: app });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/v1/admissions/applications/:id/status (Admin Update Status & Remarks)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status, adminRemarks } = req.body;
    const app = await AdmissionApplication.findByIdAndUpdate(
      req.params.id,
      { status, adminRemarks },
      { new: true, runValidators: true }
    );

    if (!app) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.status(200).json({
      success: true,
      message: `Application marked as ${status}`,
      data: app
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// POST /api/v1/admissions/applications/:id/send-email (Admin Send Custom Email via Gmail)
export const sendApplicantEmail = async (req, res) => {
  try {
    const { subject, message } = req.body;
    const app = await AdmissionApplication.findById(req.params.id);

    if (!app) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    if (!subject || !message) {
      return res.status(400).json({ success: false, message: 'Subject and message are required' });
    }

    const emailHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2dccb; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #101B2D; padding: 24px; text-align: center; border-bottom: 3px solid #C5A15B;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 1px;">KHWOPA SECONDARY SCHOOL (+2)</h1>
          <p style="color: #C5A15B; margin: 5px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Admissions & Academic Affairs</p>
        </div>
        <div style="padding: 28px; color: #17283c;">
          <p style="font-size: 14px; margin-top: 0;">Dear <strong>${app.fullName}</strong> (Application ID: <strong>${app.applicationId}</strong>),</p>
          
          <div style="font-size: 14px; line-height: 1.7; color: #2D3748; white-space: pre-wrap; margin: 20px 0; padding: 16px; background-color: #FAF8F5; border-left: 4px solid #C5A15B; border-radius: 4px;">
${message}
          </div>

          <p style="font-size: 13px; color: #718096; line-height: 1.6;">
            If you need any clarification or assistance with documents, please contact the admissions desk at Dekocha, Bhaktapur.
          </p>

          <div style="margin-top: 30px; padding-top: 18px; border-top: 1px solid #eee; font-size: 12px; color: #8892a0; line-height: 1.5;">
            <p style="margin: 0; font-weight: 600; color: #101B2D;">Khwopa Secondary School Admissions Office</p>
            <p style="margin: 2px 0;">Dekocha, Bhaktapur, Nepal · Tel: +977-1-6614336 · info@khwopa.edu.np</p>
          </div>
        </div>
      </div>
    `;

    const result = await sendAdmissionEmail({
      to: app.email,
      subject,
      htmlContent: emailHtml,
      textContent: message
    });

    // Save to application email log
    app.emailLogs.push({
      subject,
      message,
      sentBy: req.user?.name || 'Admissions Administrator',
      sentAt: new Date(),
      status: result.success ? 'Delivered' : 'Failed'
    });
    await app.save();

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.error || result.message || `Failed to deliver email to ${app.email}. Check SMTP_USER & SMTP_PASS in backend/.env`,
        result
      });
    }

    res.status(200).json({
      success: true,
      message: `Email message dispatched to ${app.email}`,
      result
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

