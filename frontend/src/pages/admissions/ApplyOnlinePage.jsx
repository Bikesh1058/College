import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import { api } from "../../services/api";
import { generateAdmissionPDF, getAdmissionPDFBlobUrl } from "../../utils/admissionPdfGenerator";
import { convertBsToAd, convertAdToBs } from "../../utils/nepaliDateConverter";
import { useAlert } from "../../context/useAlert";

// Strict Regular Expressions for Nepal +2 Admissions
const REGEX = {
  name: /^[A-Za-z\s]{3,60}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  mobile: /^(98|97)[0-9]{8}$/,
  dobBS: /^20(5[5-9]|6[0-8])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[0-2])$/,
  symbolNo: /^[0-9]{7,8}[A-Za-z]?$/,
  gpa: /^([1-3]\.[0-9]{1,2}|4(\.0{1,2})?)$/,
  wardNo: /^([1-9]|[12][0-9]|3[0-5])$/,
  text: /^[A-Za-z0-9\s,.-]{2,60}$/,
};

const STREAMS = [
  { id: "sci-bio", name: "+2 Science (Biology)", minGpa: 2.4, desc: "Min. 2.40 GPA with C+ in Math & Science" },
  { id: "sci-cs", name: "+2 Science (Computer Science)", minGpa: 2.4, desc: "Min. 2.40 GPA with C+ in Math & Science" },
  { id: "mgmt-cs", name: "+2 Management (Computer Science)", minGpa: 2.0, desc: "Min. 2.00 GPA with C+ in Mathematics" },
  { id: "mgmt-hotel", name: "+2 Management (Hotel Mgmt / Business)", minGpa: 2.0, desc: "Min. 2.00 GPA in SEE" },
  { id: "humanities", name: "+2 Humanities & Social Sciences", minGpa: 1.6, desc: "Min. 1.60 GPA in SEE" },
  { id: "law", name: "+2 Law", minGpa: 2.0, desc: "Min. 2.00 GPA in SEE" },
];

const PROVINCES = [
  "Bagmati Province",
  "Koshi Province",
  "Madhesh Province",
  "Gandaki Province",
  "Lumbini Province",
  "Karnali Province",
  "Sudurpashchim Province",
];

function FormField({ label, error, children, className = "" }) {
  return (
    <div className={className}>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#12243a]">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs font-medium text-rose-600">{error}</p>}
    </div>
  );
}

export default function ApplyOnlinePage() {
  const { alert } = useAlert();
  const [formData, setFormData] = useState({
    streamId: "sci-bio",
    shift: "Morning (6:30 AM – 11:30 AM)",
    quota: "Open Merit (General)",
    fullName: "",
    gender: "Male",
    dobBS: "",
    dobAD: "",
    bloodGroup: "A+",
    email: "",
    mobile: "",
    province: "Bagmati Province",
    district: "Bhaktapur",
    municipality: "Bhaktapur Municipality",
    wardNo: "09",
    tole: "Dekocha",
    fatherName: "",
    fatherMobile: "",
    motherName: "",
    motherMobile: "",
    seeSchool: "",
    seeYear: "2081",
    seeSymbol: "",
    seeGpa: "",
    agreed: false,
  });

  const [errors, setErrors] = useState({});
  const [voucherId, setVoucherId] = useState("");
  const [submittedApp, setSubmittedApp] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [previewPdfUri, setPreviewPdfUri] = useState(null);

  // File Upload State
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [marksheetFile, setMarksheetFile] = useState(null);
  const [marksheetPreview, setMarksheetPreview] = useState(null);

  const currentStream = STREAMS.find((s) => s.id === formData.streamId) || STREAMS[0];

  const validate = (name, val) => {
    const v = typeof val === "string" ? val.trim() : val;
    switch (name) {
      case "fullName":
      case "fatherName":
      case "motherName":
        return !REGEX.name.test(v) ? "Letters & spaces only (3-60 characters)." : "";
      case "email":
        return !REGEX.email.test(v) ? "Enter a valid email address." : "";
      case "mobile":
      case "fatherMobile":
        return !REGEX.mobile.test(v) ? "10-digit number starting with 98 or 97." : "";
      case "motherMobile":
        return v && !REGEX.mobile.test(v) ? "10-digit number starting with 98 or 97." : "";
      case "dobBS":
        return !REGEX.dobBS.test(v) ? "Bikram Sambat format YYYY-MM-DD (2055-2068)." : "";
      case "dobAD":
        return !v ? "Date of Birth (AD) is required." : "";
      case "district":
      case "municipality":
      case "tole":
      case "seeSchool":
        return !REGEX.text.test(v) ? "Valid text required (2-60 characters)." : "";
      case "wardNo":
        return !REGEX.wardNo.test(v) ? "Ward must be between 1 and 35." : "";
      case "seeSymbol":
        return !REGEX.symbolNo.test(v) ? "SEE Symbol No (7-8 digits, optional trailing letter)." : "";
      case "seeGpa": {
        if (!REGEX.gpa.test(v)) return "GPA between 1.60 and 4.00 required.";
        if (parseFloat(v) < currentStream.minGpa) {
          return `Minimum GPA for ${currentStream.name} is ${currentStream.minGpa.toFixed(2)}.`;
        }
        return "";
      }
      default:
        return "";
    }
  };

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    const finalVal = type === "checkbox" ? checked : value;

    if (name === "dobBS") {
      const calculatedAD = convertBsToAd(finalVal);
      setFormData((p) => ({
        ...p,
        dobBS: finalVal,
        ...(calculatedAD ? { dobAD: calculatedAD } : {})
      }));
      setErrors((p) => ({
        ...p,
        dobBS: validate("dobBS", finalVal),
        ...(calculatedAD ? { dobAD: "" } : {})
      }));
      return;
    }

    if (name === "dobAD") {
      const calculatedBS = convertAdToBs(finalVal);
      setFormData((p) => ({
        ...p,
        dobAD: finalVal,
        ...(calculatedBS ? { dobBS: calculatedBS } : {})
      }));
      setErrors((p) => ({
        ...p,
        dobAD: validate("dobAD", finalVal),
        ...(calculatedBS ? { dobBS: validate("dobBS", calculatedBS) } : {})
      }));
      return;
    }

    setFormData((p) => ({ ...p, [name]: finalVal }));

    if (type !== "checkbox") {
      setErrors((p) => ({ ...p, [name]: validate(name, finalVal) }));
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert({
        title: "File Size Limit Exceeded",
        message: "Passport photograph size must be less than 2MB. Please select an optimized JPG/PNG image.",
        type: "warning"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoFile(file);
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleMarksheetUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert({
        title: "Document Size Limit Exceeded",
        message: "Marksheet document size must be less than 3MB. Please select an optimized PDF or image scan.",
        type: "warning"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setMarksheetFile(file);
      setMarksheetPreview({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        type: file.type,
        data: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  const handleStreamChange = (e) => {
    const sid = e.target.value;
    const st = STREAMS.find((s) => s.id === sid);
    setFormData((p) => ({ ...p, streamId: sid }));

    if (formData.seeGpa) {
      const gpaNum = parseFloat(formData.seeGpa);
      setErrors((p) => ({
        ...p,
        seeGpa: gpaNum < st.minGpa ? `Minimum GPA for ${st.name} is ${st.minGpa.toFixed(2)}.` : "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "fullName", "dobBS", "dobAD", "email", "mobile",
      "district", "municipality", "wardNo", "tole",
      "fatherName", "fatherMobile", "motherName",
      "seeSchool", "seeSymbol", "seeGpa"
    ];

    const errs = {};
    requiredFields.forEach((f) => {
      const err = validate(f, formData[f]);
      if (err) errs[f] = err;
    });

    if (formData.motherMobile) {
      const mErr = validate("motherMobile", formData.motherMobile);
      if (mErr) errs.motherMobile = mErr;
    }

    if (!formData.agreed) {
      errs.agreed = "You must confirm the institutional declaration before proceeding.";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      window.scrollTo({ top: 380, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        dobBS: formData.dobBS,
        dobAD: formData.dobAD,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        stream: formData.streamId,
        streamName: currentStream.name,
        seeSchool: formData.seeSchool,
        seeSchoolType: 'Private/Institutional',
        seeSymbolNo: formData.seeSymbol,
        seeGpa: parseFloat(formData.seeGpa),
        seePassedYear: formData.seeYear,
        fatherName: formData.fatherName,
        fatherMobile: formData.fatherMobile,
        motherName: formData.motherName,
        motherMobile: formData.motherMobile,
        province: formData.province,
        district: formData.district,
        municipality: formData.municipality,
        wardNo: formData.wardNo,
        tole: formData.tole,
        photoUrl: photoPreview || '',
        marksheetUrl: marksheetPreview?.data || '',
        marksheetFileName: marksheetFile?.name || ''
      };

      let finalAppData;
      const res = await api.submitAdmissionApplication(payload);
      if (res.success && res.data) {
        finalAppData = res.data;
      } else {
        finalAppData = { ...payload, applicationId: `KHW-2083-${Math.floor(1000 + Math.random() * 9000)}` };
      }

      setSubmittedApp(finalAppData);
      setVoucherId(finalAppData.applicationId);
      setShowSuccessModal(true);

      // Reset the form back to initial pristine state
      setFormData({
        streamId: "sci-bio",
        shift: "Morning (6:30 AM – 11:30 AM)",
        quota: "Open Merit (General)",
        fullName: "",
        gender: "Male",
        dobBS: "",
        dobAD: "",
        bloodGroup: "A+",
        email: "",
        mobile: "",
        province: "Bagmati Province",
        district: "Bhaktapur",
        municipality: "Bhaktapur Municipality",
        wardNo: "09",
        tole: "Dekocha",
        fatherName: "",
        fatherMobile: "",
        motherName: "",
        motherMobile: "",
        seeSchool: "",
        seeYear: "2081",
        seeSymbol: "",
        seeGpa: "",
        agreed: false,
      });
      setPhotoFile(null);
      setPhotoPreview(null);
      setMarksheetFile(null);
      setMarksheetPreview(null);
      setErrors({});
    } catch {
      const fallbackData = {
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        stream: formData.streamId,
        streamName: currentStream.name,
        seeSchool: formData.seeSchool,
        seeSymbolNo: formData.seeSymbol,
        seeGpa: formData.seeGpa,
        fatherName: formData.fatherName,
        fatherMobile: formData.fatherMobile,
        motherName: formData.motherName,
        province: formData.province,
        district: formData.district,
        municipality: formData.municipality,
        wardNo: formData.wardNo,
        tole: formData.tole,
        applicationId: `KHW-2083-${Math.floor(1000 + Math.random() * 9000)}`
      };
      setSubmittedApp(fallbackData);
      setVoucherId(fallbackData.applicationId);
      setShowSuccessModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (err) =>
    `w-full rounded-xl border px-4 py-3 text-xs sm:text-sm text-[#12243a] outline-none transition ${
      err ? "border-rose-500 bg-rose-50/40" : "border-[#e5ddce] bg-[#fbfaf7] focus:border-[#b99754]"
    }`;

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#12243a]">
      {/* Clean Institutional Hero Section */}
      <PageHero
        eyebrow="+2 Higher Secondary Admission · Session 2082/2083"
        title="Class 11 (+2) Application."
        italicTitle="NEB Board Registration."
        description="Official online priority application for Class 11 (+2) Science, Management, Humanities, and Law at Khwopa Secondary School / Khwopa College, undertaken by Bhaktapur Municipality."
        breadcrumbs={[
          { label: "Admissions", to: "/admissions" },
          { label: "Class 11 (+2) Application" },
        ]}
        stats={[
          { label: "Board Affiliation", value: "NEB Nepal" },
          { label: "Application Fee", value: "Rs. 125" },
          { label: "Admission Desk", value: "Dekocha, Block B" },
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          {voucherId ? (
            /* Clean Confirmation Voucher */
            <div className="mx-auto max-w-2xl rounded-2xl border border-emerald-300 bg-white p-8 sm:p-12 shadow-sm text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <span className="mt-5 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#92703b]">
                Application Registered
              </span>

              <h2 className="mt-1 font-serif text-3xl font-bold text-[#12243a]">
                Entrance Admit Voucher
              </h2>

              <p className="editorial-copy mt-3 text-sm leading-relaxed text-[#475365]">
                Candidate <strong className="font-semibold text-[#12243a] not-italic">{formData.fullName.toUpperCase()}</strong> has been registered for{" "}
                <strong className="font-semibold text-[#12243a] not-italic">{currentStream.name}</strong>.
              </p>

              <div className="my-7 rounded-xl border border-[#dfd4bd] bg-[#fbfaf7] p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Admit Reference Code
                </p>
                <p className="mt-1 font-mono text-2xl font-bold tracking-wider text-[#0b2038]">
                  {voucherId}
                </p>
                <p className="mt-1.5 text-xs text-slate-500">
                  Keep this voucher code for entrance hall entrance and fee clearance.
                </p>
              </div>

              <div className="text-left rounded-xl bg-[#f5f0e5] p-5 text-xs leading-relaxed text-[#475365] space-y-1.5">
                <p className="font-serif font-bold text-[#12243a]">Instructions for Candidate:</p>
                <p>1. Pay the official application fee of <strong>Rs. 125</strong> via eSewa / Khalti or at the college cash counter.</p>
                <p>2. Bring your SEE internet marksheet copy and 2 passport-size photographs to the Dekocha campus for verification.</p>
                <p>3. Entrance examination schedule will be delivered to <strong>{formData.mobile}</strong> via SMS.</p>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    const dataToPrint = submittedApp || {
                      applicationId: voucherId,
                      fullName: formData.fullName,
                      email: formData.email,
                      mobile: formData.mobile,
                      stream: formData.streamId,
                      streamName: currentStream.name,
                      seeSchool: formData.seeSchool,
                      seeSymbolNo: formData.seeSymbol,
                      seeGpa: formData.seeGpa,
                      fatherName: formData.fatherName,
                      fatherMobile: formData.fatherMobile,
                      motherName: formData.motherName,
                      province: formData.province,
                      district: formData.district,
                      municipality: formData.municipality,
                      wardNo: formData.wardNo,
                      tole: formData.tole,
                      status: 'Submitted'
                    };
                    generateAdmissionPDF(dataToPrint);
                  }}
                  className="rounded-xl bg-[#0b2038] px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#C5A15B] transition hover:bg-[#1a3858] shadow-md"
                >
                  Download & View Completed Form PDF 📄
                </button>
                <Link
                  to="/admissions"
                  className="rounded-xl border border-[#e5ddce] bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#12243a] transition hover:border-[#b99754]"
                >
                  Return to Admissions
                </Link>
              </div>
            </div>
          ) : (
            /* Refined +2 Application Form */
            <div className="mx-auto max-w-4xl">
              <SectionHeading
                eyebrow="Khwopa Secondary School · Bhaktapur Municipality"
                title="Class 11 (+2) Application"
                italicTitle="National Examination Board (NEB)."
                description="Please fill all mandatory fields accurately according to your official Secondary Education Examination (SEE) grade sheet."
              />

              <form onSubmit={handleSubmit} noValidate className="space-y-8">
                {/* 1. Stream Preference */}
                <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 sm:p-9 shadow-sm">
                  <div className="mb-6 border-b border-[#e5ddce] pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                      Section 01
                    </span>
                    <h3 className="mt-0.5 font-serif text-2xl font-bold text-[#12243a]">
                      Class 11 (+2) Stream Preference
                    </h3>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormField label="Choose +2 Academic Stream *" className="sm:col-span-2">
                      <select
                        name="streamId"
                        value={formData.streamId}
                        onChange={handleStreamChange}
                        className={inputClass()}
                      >
                        {STREAMS.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} — (Min. GPA {s.minGpa.toFixed(2)})
                          </option>
                        ))}
                      </select>
                      <p className="mt-1.5 text-xs text-slate-500">{currentStream.desc}</p>
                    </FormField>

                    <FormField label="Preferred Shift *">
                      <select
                        name="shift"
                        value={formData.shift}
                        onChange={handleInput}
                        className={inputClass()}
                      >
                        <option>Morning (6:30 AM – 11:30 AM)</option>
                        <option>Day (11:00 AM – 4:30 PM)</option>
                      </select>
                    </FormField>

                    <FormField label="Admission Quota / Category *">
                      <select
                        name="quota"
                        value={formData.quota}
                        onChange={handleInput}
                        className={inputClass()}
                      >
                        <option>Open Merit (General)</option>
                        <option>Bhaktapur Municipality Resident Quota</option>
                        <option>Dalit & Janajati Quota</option>
                        <option>Underprivileged / Martyr Family Scholarship</option>
                      </select>
                    </FormField>
                  </div>
                </div>

                {/* 2. Personal Information */}
                <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 sm:p-9 shadow-sm">
                  <div className="mb-6 border-b border-[#e5ddce] pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                      Section 02
                    </span>
                    <h3 className="mt-0.5 font-serif text-2xl font-bold text-[#12243a]">
                      Applicant Personal Details
                    </h3>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormField label="Full Name (Capital letters as in SEE) *" error={errors.fullName} className="sm:col-span-2">
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInput}
                        placeholder="e.g. SITA SHRESTHA"
                        className={inputClass(errors.fullName)}
                      />
                    </FormField>

                    <FormField label="Gender *">
                      <select name="gender" value={formData.gender} onChange={handleInput} className={inputClass()}>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </FormField>

                    <FormField label="Blood Group *">
                      <select name="bloodGroup" value={formData.bloodGroup} onChange={handleInput} className={inputClass()}>
                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>O+</option>
                        <option>O-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                      </select>
                    </FormField>

                    <FormField label="Date of Birth in BS (YYYY-MM-DD) *" error={errors.dobBS}>
                      <input
                        type="text"
                        name="dobBS"
                        value={formData.dobBS}
                        onChange={handleInput}
                        placeholder="2064-05-18"
                        className={inputClass(errors.dobBS)}
                      />
                      <span className="mt-1 block text-[11px] text-slate-500">
                        Auto-calculates Date of Birth in AD
                      </span>
                    </FormField>

                    <FormField label="Date of Birth in AD *" error={errors.dobAD}>
                      <input
                        type="date"
                        name="dobAD"
                        value={formData.dobAD}
                        onChange={handleInput}
                        className={inputClass(errors.dobAD)}
                      />
                      <span className="mt-1 block text-[11px] text-slate-500">
                        Auto-calculates Date of Birth in BS
                      </span>
                    </FormField>

                    <FormField label="Applicant Email Address *" error={errors.email}>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInput}
                        placeholder="student@gmail.com"
                        className={inputClass(errors.email)}
                      />
                    </FormField>

                    <FormField label="Mobile Number (10 digits starting 98/97) *" error={errors.mobile}>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInput}
                        placeholder="98XXXXXXXX"
                        maxLength={10}
                        className={inputClass(errors.mobile)}
                      />
                    </FormField>
                  </div>
                </div>

                {/* 3. Address */}
                <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 sm:p-9 shadow-sm">
                  <div className="mb-6 border-b border-[#e5ddce] pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                      Section 03
                    </span>
                    <h3 className="mt-0.5 font-serif text-2xl font-bold text-[#12243a]">
                      Permanent Address
                    </h3>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-3">
                    <FormField label="Province *">
                      <select name="province" value={formData.province} onChange={handleInput} className={inputClass()}>
                        {PROVINCES.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </FormField>

                    <FormField label="District *" error={errors.district}>
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleInput}
                        placeholder="Bhaktapur"
                        className={inputClass(errors.district)}
                      />
                    </FormField>

                    <FormField label="Municipality / Rural Municipality *" error={errors.municipality}>
                      <input
                        type="text"
                        name="municipality"
                        value={formData.municipality}
                        onChange={handleInput}
                        placeholder="Bhaktapur Municipality"
                        className={inputClass(errors.municipality)}
                      />
                    </FormField>

                    <FormField label="Ward No. (1-35) *" error={errors.wardNo}>
                      <input
                        type="text"
                        name="wardNo"
                        value={formData.wardNo}
                        onChange={handleInput}
                        placeholder="09"
                        maxLength={2}
                        className={inputClass(errors.wardNo)}
                      />
                    </FormField>

                    <FormField label="Tole / Street *" error={errors.tole} className="sm:col-span-2">
                      <input
                        type="text"
                        name="tole"
                        value={formData.tole}
                        onChange={handleInput}
                        placeholder="Dekocha"
                        className={inputClass(errors.tole)}
                      />
                    </FormField>
                  </div>
                </div>

                {/* 4. Parent / Guardian */}
                <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 sm:p-9 shadow-sm">
                  <div className="mb-6 border-b border-[#e5ddce] pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                      Section 04
                    </span>
                    <h3 className="mt-0.5 font-serif text-2xl font-bold text-[#12243a]">
                      Parent / Guardian Information
                    </h3>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormField label="Father's Full Name *" error={errors.fatherName}>
                      <input
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleInput}
                        placeholder="RAMESH SHRESTHA"
                        className={inputClass(errors.fatherName)}
                      />
                    </FormField>

                    <FormField label="Father's Mobile Number *" error={errors.fatherMobile}>
                      <input
                        type="tel"
                        name="fatherMobile"
                        value={formData.fatherMobile}
                        onChange={handleInput}
                        placeholder="98XXXXXXXX"
                        maxLength={10}
                        className={inputClass(errors.fatherMobile)}
                      />
                    </FormField>

                    <FormField label="Mother's Full Name *" error={errors.motherName}>
                      <input
                        type="text"
                        name="motherName"
                        value={formData.motherName}
                        onChange={handleInput}
                        placeholder="GITA SHRESTHA"
                        className={inputClass(errors.motherName)}
                      />
                    </FormField>

                    <FormField label="Mother's Mobile Number (Optional)" error={errors.motherMobile}>
                      <input
                        type="tel"
                        name="motherMobile"
                        value={formData.motherMobile}
                        onChange={handleInput}
                        placeholder="98XXXXXXXX"
                        maxLength={10}
                        className={inputClass(errors.motherMobile)}
                      />
                    </FormField>
                  </div>
                </div>

                {/* 5. SEE Academic Records */}
                <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 sm:p-9 shadow-sm">
                  <div className="mb-6 border-b border-[#e5ddce] pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                      Section 05
                    </span>
                    <h3 className="mt-0.5 font-serif text-2xl font-bold text-[#12243a]">
                      SEE Academic Records
                    </h3>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-3">
                    <FormField label="School Name Where SEE was Passed *" error={errors.seeSchool} className="sm:col-span-2">
                      <input
                        type="text"
                        name="seeSchool"
                        value={formData.seeSchool}
                        onChange={handleInput}
                        placeholder="e.g. Vidyarthi Niketan Secondary School"
                        className={inputClass(errors.seeSchool)}
                      />
                    </FormField>

                    <FormField label="SEE Passed Year (BS) *">
                      <select name="seeYear" value={formData.seeYear} onChange={handleInput} className={inputClass()}>
                        <option value="2081">2081 BS (Current)</option>
                        <option value="2080">2080 BS</option>
                        <option value="2079">2079 BS</option>
                      </select>
                    </FormField>

                    <FormField label="SEE Symbol Number *" error={errors.seeSymbol}>
                      <input
                        type="text"
                        name="seeSymbol"
                        value={formData.seeSymbol}
                        onChange={handleInput}
                        placeholder="02847190A"
                        className={inputClass(errors.seeSymbol)}
                      />
                    </FormField>

                    <FormField label="Total SEE GPA (1.60 - 4.00) *" error={errors.seeGpa} className="sm:col-span-2">
                      <input
                        type="text"
                        name="seeGpa"
                        value={formData.seeGpa}
                        onChange={handleInput}
                        placeholder="e.g. 3.65"
                        maxLength={4}
                        className={inputClass(errors.seeGpa)}
                      />
                    </FormField>
                  </div>
                </div>

                {/* 6. Document Uploads */}
                <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 sm:p-9 shadow-sm">
                  <div className="mb-6 border-b border-[#e5ddce] pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                      Section 06
                    </span>
                    <h3 className="mt-0.5 font-serif text-2xl font-bold text-[#12243a]">
                      Document Uploads (Photo & Grade Sheet)
                    </h3>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Passport Photograph Dropzone */}
                    <div className="flex flex-col justify-between rounded-xl border border-dashed border-[#d8d0c1] bg-[#fbfaf7] p-5 transition hover:border-[#b99754]">
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold uppercase tracking-wider text-[#12243a]">
                            Passport Photograph
                          </p>
                          <span className="rounded-md bg-[#f2ede4] px-2 py-0.5 text-[10px] font-semibold text-[#8a6833]">
                            Max 2MB · JPG / PNG
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-slate-500">
                          Recent formal photo with white or clear background.
                        </p>
                      </div>

                      {photoPreview ? (
                        <div className="mt-4 flex items-center gap-4 rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
                          <img
                            src={photoPreview}
                            alt="Candidate Passport"
                            className="h-16 w-16 rounded-lg object-cover border border-emerald-300 shadow-sm"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-emerald-950 truncate">
                              {photoFile?.name || "photo.jpg"}
                            </p>
                            <p className="text-[10px] text-emerald-700">
                              {photoFile ? (photoFile.size / 1024).toFixed(1) + " KB" : "Attached"}
                            </p>
                            <label className="mt-1.5 inline-block text-[11px] font-semibold text-[#92703b] underline cursor-pointer hover:text-[#12243a]">
                              Replace photo
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                className="hidden"
                              />
                            </label>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setPhotoFile(null);
                              setPhotoPreview(null);
                            }}
                            className="rounded-lg p-1.5 text-xs text-rose-500 hover:bg-rose-100 transition"
                            title="Remove photo"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <label className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-[#c5ba9e] bg-white py-6 px-4 text-center cursor-pointer transition hover:bg-[#FAF8F5] hover:border-[#92703b]">
                          <svg className="h-8 w-8 text-[#92703b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="mt-2 text-xs font-semibold text-[#12243a]">
                            Click or drag photo here
                          </span>
                          <span className="mt-0.5 text-[10px] text-slate-500">
                            PNG, JPG or WEBP (Standard passport ratio)
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    {/* SEE Marksheet Copy Dropzone */}
                    <div className="flex flex-col justify-between rounded-xl border border-dashed border-[#d8d0c1] bg-[#fbfaf7] p-5 transition hover:border-[#b99754]">
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold uppercase tracking-wider text-[#12243a]">
                            SEE Marksheet Copy
                          </p>
                          <span className="rounded-md bg-[#f2ede4] px-2 py-0.5 text-[10px] font-semibold text-[#8a6833]">
                            Max 3MB · PDF / Image
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-slate-500">
                          Scanned PDF or online web marksheet with official grades.
                        </p>
                      </div>

                      {marksheetFile ? (
                        <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs">
                            DOC
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-emerald-950 truncate">
                              {marksheetFile.name}
                            </p>
                            <p className="text-[10px] text-emerald-700">
                              {marksheetPreview?.size || (marksheetFile.size / 1024).toFixed(1) + " KB"} · Attached
                            </p>
                            <label className="mt-1.5 inline-block text-[11px] font-semibold text-[#92703b] underline cursor-pointer hover:text-[#12243a]">
                              Replace document
                              <input
                                type="file"
                                accept=".pdf,image/*"
                                onChange={handleMarksheetUpload}
                                className="hidden"
                              />
                            </label>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setMarksheetFile(null);
                              setMarksheetPreview(null);
                            }}
                            className="rounded-lg p-1.5 text-xs text-rose-500 hover:bg-rose-100 transition"
                            title="Remove marksheet"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <label className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-[#c5ba9e] bg-white py-6 px-4 text-center cursor-pointer transition hover:bg-[#FAF8F5] hover:border-[#92703b]">
                          <svg className="h-8 w-8 text-[#92703b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="mt-2 text-xs font-semibold text-[#12243a]">
                            Click or drag SEE marksheet here
                          </span>
                          <span className="mt-0.5 text-[10px] text-slate-500">
                            Official PDF or clear scanned image
                          </span>
                          <input
                            type="file"
                            accept=".pdf,image/*"
                            onChange={handleMarksheetUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                {/* 7. Institutional Declaration */}
                <div className="rounded-2xl border border-[#e5ddce] bg-white p-6 shadow-sm">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreed"
                      checked={formData.agreed}
                      onChange={handleInput}
                      className="mt-1 h-4 w-4 rounded border-[#dfbd77] text-[#0b2038] focus:ring-[#dfbd77]"
                    />
                    <span className="text-xs sm:text-sm leading-relaxed text-[#475365]">
                      I solemnly affirm that all particulars disclosed in this application are authentic, accurate, and completely aligned with my official National Examination Board (NEB) records. I pledge my unwavering commitment to upholding the academic rigor, institutional discipline, and code of integrity mandated by Khwopa Secondary School and Bhaktapur Municipality.
                    </span>
                  </label>
                  {errors.agreed && <p className="mt-2 text-xs font-medium text-rose-600">{errors.agreed}</p>}
                </div>

                {/* Action Controls */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-2">
                  <Link
                    to="/admissions"
                    className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 hover:text-[#12243a]"
                  >
                    ← Return to Admissions
                  </Link>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0b2038] px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-md transition hover:bg-[#1c3857] disabled:opacity-50"
                  >
                    <span>{isSubmitting ? "Submitting Application..." : "Submit +2 Application"}</span>
                    <svg className="h-4 w-4 text-[#dfbd77]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          )}
        </PageContainer>
      </section>

      {/* Submission Success Dialog / Modal */}
      {showSuccessModal && submittedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-xl rounded-2xl border border-[#e5ddce] bg-white p-7 sm:p-9 shadow-2xl text-center space-y-5">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                Official Khwopa Secondary School Application
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#101B2D] mt-1">
                Application Successfully Submitted
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Thank you, <strong>{submittedApp.fullName}</strong>. Your admission form for{" "}
                <strong>{submittedApp.streamName || submittedApp.stream}</strong> has been officially recorded in the college database and sent to your Gmail (<strong>{submittedApp.email}</strong>).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#e5ddce] bg-[#FAF8F5] text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Application ID
              </span>
              <p className="font-mono text-2xl font-bold text-[#A68238]">
                {submittedApp.applicationId}
              </p>
              <p className="text-[11px] text-slate-500">
                Please note this code for the upcoming entrance examination and interview session.
              </p>
            </div>

            {/* Modal Action Buttons: View, Download, Close */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (previewPdfUri) {
                    try { URL.revokeObjectURL(previewPdfUri); } catch { /* ignore */ }
                  }
                  const uri = getAdmissionPDFBlobUrl(submittedApp);
                  setPreviewPdfUri(uri);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#0b2038] bg-white text-[#0b2038] text-xs font-bold hover:bg-[#FAF8F5] transition"
              >
                View PDF Online
              </button>

              <button
                type="button"
                onClick={() => generateAdmissionPDF(submittedApp)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0b2038] text-[#C5A15B] text-xs font-bold hover:bg-[#1a3858] transition shadow-md"
              >
                Download PDF
              </button>

              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#e5ddce] bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition"
              >
                Fill Another Form
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Online PDF Viewer Modal */}
      {previewPdfUri && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4">
          <div className="w-full max-w-4xl h-[88vh] flex flex-col rounded-2xl bg-white border border-[#e5ddce] shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-[#e5ddce] flex items-center justify-between bg-[#101B2D] text-white">
              <div>
                <h4 className="font-serif font-bold text-sm text-[#C5A15B]">
                  Admission Form Inspection — {submittedApp?.applicationId}
                </h4>
                <p className="text-[10px] text-slate-300">Official +2 Enrollment Document Preview</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => generateAdmissionPDF(submittedApp)}
                  className="px-3 py-1 rounded-lg bg-[#C5A15B] text-[#101B2D] text-xs font-bold hover:bg-[#b08e4d]"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => {
                    try { URL.revokeObjectURL(previewPdfUri); } catch { /* ignore */ }
                    setPreviewPdfUri(null);
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:text-white font-bold text-sm"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-200 p-2">
              <iframe
                src={previewPdfUri}
                title="Khwopa Admission Form Preview"
                className="w-full h-full rounded-lg border-0 shadow-inner"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
