import { useState } from "react";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";

export default function EnquiryPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    stream: "+2 Science",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const streams = [
    "+2 Science Stream (Physics / Biology / Computer)",
    "+2 Management Stream (Accountancy / HM / Computer)",
    "+2 Humanities & Social Sciences",
    "+2 Law Stream",
    "General +2 Admission Inquiry"
  ];

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required.";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = "A valid email address is required.";
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      errs.phone = "A valid phone number is required.";
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = "Please provide at least 10 characters in your message.";
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      stream: "+2 Science",
      subject: "",
      message: ""
    });
    setSubmitted(false);
  };

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Admissions & Counseling"
        title="Send an Enquiry."
        italicTitle="We are Here to Help."
        description="Have queries regarding courses, municipal scholarships, or admission intake dates? Our admissions desk will respond promptly."
        breadcrumbs={[
          { label: "Contact", to: "/contact" },
          { label: "Enquiry Form" }
        ]}
        stats={[
          { label: "Response Time", value: "Within 24 Hours" },
          { label: "Counseling", value: "Available" },
          { label: "Admissions Desk", value: "Dekocha Office" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer className="max-w-3xl">
          <SectionHeading
            eyebrow="Online Helpdesk"
            title="Submit Your Admission Enquiry"
            italicTitle="to Department Coordinators."
            description="Fill out the verified form below. We usually reply to inquiries within 1 business day."
          />

          {submitted ? (
            <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-8 sm:p-12 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-4 font-serif text-2xl font-bold text-emerald-900">
                Enquiry Successfully Submitted!
              </h3>
              <p className="editorial-copy mx-auto mt-2 max-w-md text-xs sm:text-sm text-emerald-800">
                Thank you, <span className="font-semibold">{formData.fullName}</span>. Your enquiry for <span className="font-semibold">{formData.stream}</span> has been received. Our counsellors will email or call you at <span className="font-semibold">{formData.phone}</span>.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-6 inline-flex rounded-xl bg-emerald-700 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-800"
              >
                Send Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl border border-[#e5ddce] bg-white p-8 sm:p-11 shadow-sm space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#12243a]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Sujan Prajapati"
                    className="mt-2 w-full rounded-xl border border-[#e5ddce] bg-[#fbfaf7] px-4 py-2.5 text-sm text-[#12243a] focus:border-[#b99754] focus:outline-none focus:ring-2 focus:ring-[#b99754]/20"
                  />
                  {errors.fullName && <p className="mt-1 text-xs text-rose-600">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#12243a]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. sujan@example.com"
                    className="mt-2 w-full rounded-xl border border-[#e5ddce] bg-[#fbfaf7] px-4 py-2.5 text-sm text-[#12243a] focus:border-[#b99754] focus:outline-none focus:ring-2 focus:ring-[#b99754]/20"
                  />
                  {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#12243a]">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 9841000000"
                    className="mt-2 w-full rounded-xl border border-[#e5ddce] bg-[#fbfaf7] px-4 py-2.5 text-sm text-[#12243a] focus:border-[#b99754] focus:outline-none focus:ring-2 focus:ring-[#b99754]/20"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#12243a]">
                    Programme of Interest *
                  </label>
                  <select
                    value={formData.stream}
                    onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-[#e5ddce] bg-[#fbfaf7] px-4 py-2.5 text-sm text-[#12243a] focus:border-[#b99754] focus:outline-none focus:ring-2 focus:ring-[#b99754]/20"
                  >
                    {streams.map((s, idx) => (
                      <option key={idx} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#12243a]">
                  Subject / Heading
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Scholarship inquiry for +2 Science stream"
                  className="mt-2 w-full rounded-xl border border-[#e5ddce] bg-[#fbfaf7] px-4 py-2.5 text-sm text-[#12243a] focus:border-[#b99754] focus:outline-none focus:ring-2 focus:ring-[#b99754]/20"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#12243a]">
                  Your Message or Question *
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your questions regarding qualifications, fees, or documents..."
                  className="mt-2 w-full rounded-xl border border-[#e5ddce] bg-[#fbfaf7] px-4 py-2.5 text-sm text-[#12243a] focus:border-[#b99754] focus:outline-none focus:ring-2 focus:ring-[#b99754]/20"
                />
                {errors.message && <p className="mt-1 text-xs text-rose-600">{errors.message}</p>}
              </div>

              <div className="border-t border-slate-100 pt-6">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#0b2038] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#17334c]"
                >
                  Submit Enquiry
                </button>
              </div>
            </form>
          )}
        </PageContainer>
      </section>

      <CTASection
        title="Prefer Visiting Us in Person?"
        description="Our campus reception is open Sun-Fri from 6:30 AM to 4:30 PM."
        primaryAction={{ label: "Location & Directions", to: "/contact/location" }}
        secondaryAction={{ label: "General Contact", to: "/contact" }}
      />
    </main>
  );
}
