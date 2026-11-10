import { jsPDF } from 'jspdf';

/**
 * Builds the official jsPDF instance for an application.
 */
export const buildAdmissionPDFDoc = (appData) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Outer Border
  doc.setDrawColor(16, 27, 45); // Midnight Navy
  doc.setLineWidth(0.8);
  doc.rect(8, 8, pageWidth - 16, 281);

  // Inner Border Accent
  doc.setDrawColor(197, 161, 91); // Royal Gold
  doc.setLineWidth(0.3);
  doc.rect(10, 10, pageWidth - 20, 277);

  // Header Banner
  doc.setFillColor(16, 27, 45);
  doc.rect(10, 10, pageWidth - 20, 32, 'F');

  // Institution Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('KHWOPA SECONDARY SCHOOL (+2)', pageWidth / 2, 20, { align: 'center' });

  doc.setTextColor(197, 161, 91);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('AN UNDERTAKING OF BHAKTAPUR MUNICIPALITY', pageWidth / 2, 26, { align: 'center' });

  doc.setTextColor(220, 226, 235);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Dekocha-5, Bhaktapur, Nepal | Phone: 01-6614336 | Affiliated to NEB (Center 104)', pageWidth / 2, 32, { align: 'center' });

  // Form Title Strip
  doc.setFillColor(245, 242, 234);
  doc.setDrawColor(227, 220, 203);
  doc.rect(10, 42, pageWidth - 20, 12, 'FD');

  doc.setTextColor(16, 27, 45);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('OFFICIAL APPLICATION FOR ADMISSION - GRADE 11 (+2) | SESSION 2083', pageWidth / 2, 50, { align: 'center' });

  // Photo Box (Top Right)
  const photoX = pageWidth - 46;
  const photoY = 58;
  doc.setDrawColor(160, 160, 160);
  doc.setLineWidth(0.3);
  doc.rect(photoX, photoY, 32, 38);

  if (appData.photoUrl && appData.photoUrl.startsWith('data:image')) {
    try {
      const format = appData.photoUrl.includes('png') ? 'PNG' : 'JPEG';
      doc.addImage(appData.photoUrl, format, photoX + 1, photoY + 1, 30, 36);
    } catch {
      doc.setFontSize(7.5);
      doc.setTextColor(140, 140, 140);
      doc.text('PASSPORT PHOTO', photoX + 16, photoY + 18, { align: 'center' });
      doc.text('ATTACHED', photoX + 16, photoY + 23, { align: 'center' });
    }
  } else {
    doc.setFontSize(7.5);
    doc.setTextColor(140, 140, 140);
    doc.text('AFFIX PASSPORT', photoX + 16, photoY + 18, { align: 'center' });
    doc.text('SIZE PHOTO', photoX + 16, photoY + 23, { align: 'center' });
  }

  // Metadata Left Grid
  doc.setTextColor(16, 27, 45);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Application ID:', 16, 62);
  doc.setFont('courier', 'bold');
  doc.setTextColor(166, 130, 56);
  doc.text(appData.applicationId || 'KHW-2083-PENDING', 46, 62);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 27, 45);
  doc.text('Selected Stream:', 16, 70);
  doc.setFont('helvetica', 'normal');
  doc.text(appData.streamName || appData.stream || '+2 Science', 46, 70);

  doc.setFont('helvetica', 'bold');
  doc.text('Application Date:', 16, 78);
  doc.setFont('helvetica', 'normal');
  doc.text(new Date(appData.createdAt || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), 46, 78);

  doc.setFont('helvetica', 'bold');
  doc.text('Current Status:', 16, 86);
  doc.setTextColor(46, 125, 50);
  doc.text(appData.status || 'Submitted', 46, 86);

  // Section 1: Personal Profile
  let y = 102;
  const renderSectionHeader = (title) => {
    doc.setFillColor(16, 27, 45);
    doc.rect(14, y, pageWidth - 28, 6.5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text(title, 18, y + 4.5);
    y += 11;
  };

  const renderField = (label, val, x, customY = y) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(90, 100, 115);
    doc.text(label, x, customY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(16, 27, 45);
    doc.text(String(val || '—'), x, customY + 4.5);
  };

  renderSectionHeader('1. APPLICANT PERSONAL INFORMATION');
  renderField("Applicant's Full Name", appData.fullName, 16);
  renderField('Gender', appData.gender || 'Male', 95);
  renderField('Blood Group', appData.bloodGroup || '—', 145);
  y += 10;

  renderField('Email Address (Gmail)', appData.email, 16);
  renderField('Mobile Number', appData.mobile, 95);
  renderField('Date of Birth (B.S.)', appData.dobBS || '2065-04-12', 145);
  y += 13;

  // Section 2: Previous School & SEE Academic Performance
  renderSectionHeader('2. SECONDARY EDUCATION EXAMINATION (SEE) ACADEMIC CREDENTIALS');
  renderField('School Previously Attended', appData.seeSchool, 16);
  renderField('School Type', appData.seeSchoolType || 'Private/Institutional', 115);
  y += 10;

  renderField('SEE Symbol Number', appData.seeSymbolNo, 16);
  renderField('SEE GPA Obtained', `${appData.seeGpa} GPA`, 75);
  renderField('Passed Year', appData.seePassedYear || '2081/2082', 125);
  y += 13;

  // Section 3: Family & Guardian Details
  renderSectionHeader('3. PARENT & GUARDIAN INFORMATION');
  renderField("Father's Name", appData.fatherName, 16);
  renderField('Father Mobile', appData.fatherMobile || appData.mobile, 85);
  renderField('Occupation', appData.fatherOccupation || 'Service/Business', 140);
  y += 10;

  renderField("Mother's Name", appData.motherName || '—', 16);
  renderField('Mother Mobile', appData.motherMobile || '—', 85);
  y += 13;

  // Section 4: Address
  renderSectionHeader('4. PERMANENT & CONTACT ADDRESS');
  renderField('Province', appData.province || 'Bagmati Province', 16);
  renderField('District', appData.district || 'Bhaktapur', 85);
  renderField('Municipality', appData.municipality || 'Bhaktapur Municipality', 140);
  y += 10;

  renderField('Ward Number', `Ward No. ${appData.wardNo || '1'}`, 16);
  renderField('Tole / Street', appData.tole || 'Dekocha', 85);
  y += 14;

  // Section 5: Official Declaration & Signatures
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.3);
  doc.line(14, y, pageWidth - 14, y);
  y += 5;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 105, 115);
  doc.text('Declaration: I hereby declare that the particulars furnished above are true and correct to the best of my knowledge.', 16, y);
  y += 4;
  doc.text('I agree to abide by the rules, regulations, and fee structure of Khwopa Secondary School undertaken by Bhaktapur Municipality.', 16, y);
  y += 14;

  // Signature Blocks
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(16, 27, 45);

  doc.line(20, y, 65, y);
  doc.text("Applicant's Signature", 26, y + 4.5);

  doc.line(85, y, 130, y);
  doc.text("Parent / Guardian's Signature", 88, y + 4.5);

  doc.line(150, y, 195, y);
  doc.text('Admissions Desk Officer', 156, y + 4.5);

  // Bottom Notice Footnote
  doc.setFontSize(7);
  doc.setTextColor(130, 135, 145);
  doc.text(`Official Document issued by Khwopa College MERN ERP | Application ID: ${appData.applicationId} | Print this slip for entrance verification.`, pageWidth / 2, 283, { align: 'center' });

  return doc;
};

/**
 * Downloads the PDF directly to user disk.
 */
export const generateAdmissionPDF = (appData) => {
  const doc = buildAdmissionPDFDoc(appData);
  doc.save(`Khwopa_Admission_Form_${appData.applicationId || '2083'}.pdf`);
};

/**
 * Generates an in-memory Blob URL for reliable rendering in browser iframes / embed elements.
 * Browsers like Brave and Chrome block large datauristring inside iframes for security,
 * whereas Blob URLs render flawlessly with the native PDF viewer controls.
 */
export const getAdmissionPDFBlobUrl = (appData) => {
  const doc = buildAdmissionPDFDoc(appData);
  const blob = doc.output('blob');
  return URL.createObjectURL(blob);
};

/**
 * Generates an in-memory Data URI string for backward compatibility.
 */
export const getAdmissionPDFDataUri = (appData) => {
  const doc = buildAdmissionPDFDoc(appData);
  return doc.output('datauristring');
};
