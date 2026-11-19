import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import CTASection from "../../components/common/CTASection";
import { useSiteSettings } from "../../context/useSiteSettings";
import { api } from "../../services/api";

const INQUIRY_CATEGORIES = [
  { value: "General", label: "General Institutional Inquiry" },
  { value: "Admissions", label: "+2 Admissions & Entrance Exam" },
  { value: "Academic Stream", label: "Curriculum & Academic Streams (Science / Mgmt / Hum / Law)" },
  { value: "Examinations", label: "NEB Board & Terminal Examinations" },
  { value: "Fee & Scholarships", label: "Bhaktapur Municipal Scholarships & Fees" },
  { value: "Administration", label: "Transcripts, Character Certificates & Administration" },
  { value: "Campus Tour", label: "Campus & Laboratory Visit Request" },
  { value: "Feedback", label: "Feedback & Community Suggestions" }
];

export default function ContactPage() {
  const settings = useSiteSettings();

  const phone = settings?.phone || "+977-1-6614336";
  const address = settings?.address || "Dekocha, Bhaktapur, Nepal";
  const email = settings?.email || "info@khwopa.edu.np";
  const collegeName = settings?.collegeName || "Khwopa Secondary School";

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "Admissions",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required.";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = "Please provide a valid email address.";
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      errs.phone = "Please provide a valid telephone/mobile number.";
    }
    if (!formData.subject.trim()) {
      errs.subject = "Subject of inquiry is required.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = "Please write a detailed message (at least 10 characters).";
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(null);

    try {
      const response = await api.submitContact(formData);
      setSubmitSuccess({
        message: response?.message || "Inquiry received successfully! Our communications desk will reach back to you.",
        id: response?.data?._id || "REF-" + Date.now().toString().slice(-6),
        name: formData.fullName,
        email: formData.email
      });

      // Clear form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        category: "Admissions",
        subject: "",
        message: ""
      });
      setErrors({});
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError(
        err.response?.data?.message || 
        "Unable to send your message right now. Please call our reception at +977-1-6614336."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Connect with Us"
        title={`Contact ${collegeName}.`}
        italicTitle="Dekocha Campus, Bhaktapur."
        description={`We are located at ${address}. Reach out for admissions, municipal scholarships, examinations, transcripts, or campus visits.`}
        breadcrumbs={[{ label: "Contact" }]}
        stats={[
          { label: "Campus Location", value: address },
          { label: "Telephone Desk", value: phone },
          { label: "Official Registry", value: email }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          {/* Main 2-Column Responsive Layout: Official Form + Campus Directory */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            
            {/* LEFT COLUMN: Professional Dynamic Contact Form (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-[#ded7ca] bg-white p-7 sm:p-10 shadow-sm">
                <div className="border-b border-[#eee9df] pb-6">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                      Online Inquiries & Helpdesk
                    </span>
                  </div>
                  <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-[#12243a]">
                    Send an Official Inquiry
                  </h3>
                  <p className="editorial-copy mt-2 text-xs sm:text-sm text-[#475365] leading-relaxed">
                    Have questions about +2 intakes, entrance preparation, or municipal fee waivers? Fill out this verified form and our administration office will get back to you promptly.
                  </p>
                </div>

                {/* Success Notification Alert */}
                {submitSuccess && (
                  <div className="mt-6 rounded-2xl border border-emerald-300 bg-emerald-50/80 p-6 sm:p-8 animate-fade-in">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-serif text-lg font-bold text-emerald-950">
                          Inquiry Dispatched Successfully!
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm text-emerald-900 leading-relaxed">
                          {submitSuccess.message}
                        </p>
                        <div className="mt-3.5 inline-flex items-center gap-2 rounded-lg bg-emerald-100/70 px-3 py-1 text-xs font-mono font-semibold text-emerald-900">
                          <span>Ref ID:</span>
                          <span className="font-bold">{submitSuccess.id}</span>
                        </div>
                        <p className="mt-2 text-[11px] text-emerald-800">
                          A confirmation receipt has also been dispatched to <strong>{submitSuccess.email}</strong>.
                        </p>
                        <button
                          type="button"
                          onClick={() => setSubmitSuccess(null)}
                          className="mt-4 rounded-xl bg-[#0b2038] px-4 py-2 text-xs font-bold text-[#dfbd77] hover:bg-[#1a3858] transition"
                        >
                          Send Another Message
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Banner */}
                {submitError && (
                  <div className="mt-6 rounded-2xl border border-rose-300 bg-rose-50 p-4 text-xs text-rose-800">
                    <strong>Submission Notice:</strong> {submitError}
                  </div>
                )}

                {/* Form Elements */}
                {!submitSuccess && (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#12243a]">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Aayush Prajapati"
                          className={`mt-1.5 w-full rounded-xl border bg-[#fbfaf7] px-4 py-2.5 text-xs text-[#12243a] placeholder:text-slate-400 outline-none transition focus:bg-white ${
                            errors.fullName ? "border-rose-500 ring-2 ring-rose-500/10" : "border-[#ded7ca] focus:border-[#b99754] focus:ring-2 focus:ring-[#b99754]/15"
                          }`}
                        />
                        {errors.fullName && <p className="mt-1 text-[11px] font-medium text-rose-600">{errors.fullName}</p>}
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#12243a]">
                          Mobile / Telephone <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. 9841XXXXXX or 01-66XXXXX"
                          className={`mt-1.5 w-full rounded-xl border bg-[#fbfaf7] px-4 py-2.5 text-xs text-[#12243a] placeholder:text-slate-400 outline-none transition focus:bg-white ${
                            errors.phone ? "border-rose-500 ring-2 ring-rose-500/10" : "border-[#ded7ca] focus:border-[#b99754] focus:ring-2 focus:ring-[#b99754]/15"
                          }`}
                        />
                        {errors.phone && <p className="mt-1 text-[11px] font-medium text-rose-600">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {/* Email Address */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#12243a]">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. student@gmail.com"
                          className={`mt-1.5 w-full rounded-xl border bg-[#fbfaf7] px-4 py-2.5 text-xs text-[#12243a] placeholder:text-slate-400 outline-none transition focus:bg-white ${
                            errors.email ? "border-rose-500 ring-2 ring-rose-500/10" : "border-[#ded7ca] focus:border-[#b99754] focus:ring-2 focus:ring-[#b99754]/15"
                          }`}
                        />
                        {errors.email && <p className="mt-1 text-[11px] font-medium text-rose-600">{errors.email}</p>}
                      </div>

                      {/* Inquiry Category */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#12243a]">
                          Inquiry Department <span className="text-rose-500">*</span>
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="mt-1.5 w-full rounded-xl border border-[#ded7ca] bg-[#fbfaf7] px-4 py-2.5 text-xs text-[#12243a] outline-none transition focus:border-[#b99754] focus:bg-white focus:ring-2 focus:ring-[#b99754]/15"
                        >
                          {INQUIRY_CATEGORIES.map(cat => (
                            <option key={cat.value} value={cat.value}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#12243a]">
                        Inquiry Subject / Headline <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Admission Criteria for +2 Science with Computer group"
                        className={`mt-1.5 w-full rounded-xl border bg-[#fbfaf7] px-4 py-2.5 text-xs text-[#12243a] placeholder:text-slate-400 outline-none transition focus:bg-white ${
                          errors.subject ? "border-rose-500 ring-2 ring-rose-500/10" : "border-[#ded7ca] focus:border-[#b99754] focus:ring-2 focus:ring-[#b99754]/15"
                        }`}
                      />
                      {errors.subject && <p className="mt-1 text-[11px] font-medium text-rose-600">{errors.subject}</p>}
                    </div>

                    {/* Detailed Message */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#12243a]">
                        Your Inquiry Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please describe your query in detail, including your SEE school, stream of interest, or specific questions..."
                        className={`mt-1.5 w-full rounded-xl border bg-[#fbfaf7] p-4 text-xs text-[#12243a] placeholder:text-slate-400 outline-none transition focus:bg-white ${
                          errors.message ? "border-rose-500 ring-2 ring-rose-500/10" : "border-[#ded7ca] focus:border-[#b99754] focus:ring-2 focus:ring-[#b99754]/15"
                        }`}
                      />
                      {errors.message && <p className="mt-1 text-[11px] font-medium text-rose-600">{errors.message}</p>}
                    </div>

                    {/* Submit Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <p className="text-[11px] text-slate-500">
                        Protected by Khwopa College privacy policies.
                      </p>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#0b2038] px-7 py-3 text-xs font-bold text-[#dfbd77] shadow-sm transition hover:bg-[#1a3858] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                            </svg>
                            <span>Submitting to Registry...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Inquiry Message</span>
                            <span className="text-[#dfbd77]">→</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {/* Direct Communications & Alternative Means (Right Under the Form) */}
                <div className="mt-8 border-t border-[#eee9df] pt-7">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                      Prefer Direct Communication?
                    </span>
                  </div>
                  <h4 className="mt-1 font-serif text-lg font-bold text-[#12243a]">
                    Instant Ways to Reach Us
                  </h4>
                  <p className="editorial-copy mt-1 text-xs text-[#475365]">
                    You can contact our administration, admission counsellors, and emergency reception directly through any of these verified channels:
                  </p>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Phone / Telephone */}
                    <a
                      href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                      className="group flex items-start gap-3 rounded-2xl border border-[#ded7ca] bg-[#fbfaf7] p-4 transition hover:border-[#b99754] hover:bg-white hover:shadow-sm"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0b2038] text-[#dfbd77] transition group-hover:scale-105">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Direct Call
                        </span>
                        <strong className="block text-xs font-bold text-[#12243a] group-hover:text-[#92703b] truncate">
                          {phone}
                        </strong>
                        <span className="block text-[11px] text-slate-500">
                          Alt: +977-1-6610932 / 6610933
                        </span>
                      </div>
                    </a>

                    {/* Official Gmail / Email */}
                    <a
                      href={`mailto:${email}`}
                      className="group flex items-start gap-3 rounded-2xl border border-[#ded7ca] bg-[#fbfaf7] p-4 transition hover:border-[#b99754] hover:bg-white hover:shadow-sm"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0b2038] text-[#dfbd77] transition group-hover:scale-105">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Official Email / Gmail
                        </span>
                        <strong className="block text-xs font-bold text-[#12243a] group-hover:text-[#92703b] truncate">
                          {email}
                        </strong>
                        <span className="block text-[11px] text-slate-500">
                          admissions@khwopacollege.edu.np
                        </span>
                      </div>
                    </a>

                    {/* WhatsApp & Instant Messenger */}
                    <a
                      href="https://wa.me/9779851000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 rounded-2xl border border-[#ded7ca] bg-[#fbfaf7] p-4 transition hover:border-emerald-600 hover:bg-white hover:shadow-sm"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white transition group-hover:scale-105">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.53 1.83.816 2.791.816 3.181 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.768-5.767-5.768zm3.364 8.163c-.143.402-.835.769-1.157.818-.321.049-.698.077-1.116-.062-.26-.086-.599-.215-1.031-.403-1.833-.797-3.029-2.658-3.12-2.781-.092-.123-.746-.991-.746-1.89 0-.898.471-1.34.638-1.524.167-.184.366-.23.488-.23.123 0 .245.001.354.006.115.005.27-.044.422.323.159.384.542 1.32.59 1.417.048.098.08.213.016.34-.064.127-.096.206-.191.318-.095.112-.2.25-.286.336-.096.096-.196.2-.084.392.112.193.498.822 1.069 1.33.734.654 1.352.857 1.545.953.193.097.306.085.42-.047.113-.131.488-.567.618-.762.13-.195.26-.163.439-.098.179.065 1.133.534 1.328.632.195.097.325.146.374.228.048.081.048.471-.095.873z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Chat on WhatsApp
                        </span>
                        <strong className="block text-xs font-bold text-[#12243a] group-hover:text-emerald-700 truncate">
                          +977 9851000000
                        </strong>
                        <span className="block text-[11px] text-slate-500">
                          Fast message replies & brochure links
                        </span>
                      </div>
                    </a>

                    {/* Official Facebook & Social Media */}
                    <a
                      href="https://facebook.com/khwopahss"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 rounded-2xl border border-[#ded7ca] bg-[#fbfaf7] p-4 transition hover:border-blue-600 hover:bg-white hover:shadow-sm"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1877f2] text-white transition group-hover:scale-105">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Official Facebook Page
                        </span>
                        <strong className="block text-xs font-bold text-[#12243a] group-hover:text-blue-600 truncate">
                          facebook.com/khwopahss
                        </strong>
                        <span className="block text-[11px] text-slate-500">
                          Live intake notices & student activities
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Official Directory & Live Campus Coordinates (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Card 1: Office Operating Hours */}
              <div className="rounded-3xl border border-[#ded7ca] bg-white p-7 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                  Institutional Working Hours
                </span>
                <h4 className="mt-2 font-serif text-xl font-bold text-[#12243a]">
                  Administrative Sections
                </h4>
                <div className="mt-4 space-y-2.5 text-xs text-[#475365]">
                  <div className="flex items-center justify-between border-b border-[#f0ede5] pb-2">
                    <span className="font-semibold text-[#12243a]">Sunday – Thursday:</span>
                    <span>6:30 AM – 4:30 PM</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#f0ede5] pb-2">
                    <span className="font-semibold text-[#12243a]">Friday:</span>
                    <span>6:30 AM – 2:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-rose-700">Saturday:</span>
                    <span className="rounded bg-rose-50 px-2 py-0.5 text-[11px] font-bold text-rose-700">Closed (Weekly Holiday)</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Key Direct Desks */}
              <div className="rounded-3xl border border-[#ded7ca] bg-white p-7 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                  Direct Telephones
                </span>
                <h4 className="mt-2 font-serif text-xl font-bold text-[#12243a]">
                  Campus Reception & Desks
                </h4>
                <div className="mt-4 space-y-3 text-xs text-[#475365]">
                  <div>
                    <p className="font-semibold text-[#12243a]">Reception & Operator Desk:</p>
                    <p className="mt-0.5"><a href="tel:+97716614336" className="text-[#92703b] hover:underline font-bold">+977-1-6614336</a> / 6610932</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#12243a]">+2 Admissions Office:</p>
                    <p className="mt-0.5">admissions@khwopacollege.edu.np · Extension 102</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#12243a]">Examination & Records Section:</p>
                    <p className="mt-0.5">exam@khwopacollege.edu.np · Extension 105</p>
                  </div>
                </div>
              </div>

              {/* Card 3: Interactive Location Map */}
              <div className="rounded-3xl border border-[#ded7ca] bg-white p-7 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                  Dekocha Campus Map
                </span>
                <h4 className="mt-2 font-serif text-xl font-bold text-[#12243a]">
                  Find Us in Bhaktapur
                </h4>
                <p className="editorial-copy mt-1.5 text-xs text-[#475365]">
                  Ward No. 9, Dekocha, 15 minutes northeast of historic Bhaktapur Durbar Square.
                </p>

                <div className="mt-4 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#ded7ca] bg-slate-100 shadow-inner">
                  <iframe
                    title="Khwopa Secondary School Campus Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.447547514101!2d85.42777707546607!3d27.67256607620241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb05342a781b01%3A0xb6c7d91e847c2d82!2sKhwopa%20College!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                </div>

                <div className="mt-4">
                  <Link
                    to="/contact/location"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-[#0b2038] px-4 py-2.5 text-xs font-bold text-[#dfbd77] transition hover:bg-[#1a3858]"
                  >
                    View Directions & Transit Route →
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Ready to Apply for Class 11 (+2)?"
        description="Online registration and entrance examination form submissions are open for all 4 academic streams."
        primaryAction={{ label: "Start Online Application", to: "/admissions/apply" }}
        secondaryAction={{ label: "View Fee & Scholarships", to: "/admissions/scholarships" }}
      />
    </main>
  );
}
