import { useState } from "react";
import { Link } from "react-router-dom";

const COLLEGE_WEBSITE = "https://khwopacollege.edu.np";
const ADMISSION_PORTAL =
  "https://edigitalnepal.com/ca/agree/khwopacollege";
const SCHOLARSHIP_NOTICE =
  "https://khwopacollege.edu.np/p/notice-for-admission-scholarship-2082-batch--23659";

const CAMPUS_IMAGE =
  "https://wms.edigitalnepal.com/wms/files/ws-post-images/1678958957817_007be5e2-a1dc-4580-9809-4964d79fa1a0.jpg";

const ADMISSION_STEPS = [
  {
    number: "01",
    title: "Explore your programme",
    description:
      "Choose the academic programme that matches your interests and educational background.",
    detail:
      "Review the programme directory before proceeding with an application.",
  },
  {
    number: "02",
    title: "Check eligibility",
    description:
      "Review the latest admission notice and university requirements for your selected programme.",
    detail:
      "Eligibility requirements can differ between programmes and admission batches.",
  },
  {
    number: "03",
    title: "Complete the application",
    description:
      "Fill in the required student, parent, contact and declaration information.",
    detail:
      "The published 2083 online application instructions identify four information sections.",
  },
  {
    number: "04",
    title: "Complete payment",
    description:
      "Follow the payment instructions shown on the official application portal.",
    detail:
      "Payment amounts and payment methods should always be confirmed for the current admission cycle.",
  },
  {
    number: "05",
    title: "Follow admission updates",
    description:
      "Check the official college announcements for entrance examinations, results and admission instructions.",
    detail:
      "Follow the latest deadlines and instructions rather than relying on previous-year schedules.",
  },
];

const PREPARATION_ITEMS = [
  {
    title: "Personal information",
    description: "Your full name, date of birth and other personal details.",
  },
  {
    title: "Previous academic records",
    description:
      "Information from your previous school or university qualifications.",
  },
  {
    title: "Parent or guardian information",
    description: "Names and contact details requested by the application form.",
  },
  {
    title: "Contact information",
    description:
      "A valid phone number, email address and residential address.",
  },
  {
    title: "Supporting documents",
    description:
      "Academic certificates, photographs and other files specified by the current admission notice.",
  },
];

const APPLICATION_SECTIONS = [
  {
    number: "01",
    title: "Student's Information",
    description: "The applicant's personal and academic information.",
  },
  {
    number: "02",
    title: "Parent's Information",
    description: "Details about parents or guardians.",
  },
  {
    number: "03",
    title: "Contact Address",
    description: "The applicant's contact and address information.",
  },
  {
    number: "04",
    title: "Declaration and Signature",
    description: "Review and complete the application declaration.",
  },
];

const FAQS = [
  {
    question: "How do I apply to Khwopa College?",
    answer:
      "Khwopa Secondary School has published an online Class 11 (+2) admission application process. Open the official admission portal, read the instructions and complete the required sections. Check the latest admission notice before submitting, as the available application cycle may change.",
  },
  {
    question: "Can I apply online?",
    answer:
      "Yes. The published college admission instructions provide an online application facility. The portal includes student information, parent information, contact address and declaration sections.",
  },
  {
    question: "What is the admission application fee?",
    answer:
      "The published 2083 application instructions listed a fee of Rs. 500, including the entrance examination and result publication. This is a previous-cycle amount and must not be assumed to apply to a future admission batch.",
  },
  {
    question: "What are the eligibility requirements?",
    answer:
      "Eligibility depends on the selected programme and the applicable university requirements. Refer to the latest admission notice or contact the college administration for the current criteria.",
  },
  {
    question: "Does Khwopa College offer scholarships?",
    answer:
      "The college has published admission scholarship notices for specific batches, including a notice for the 2082 batch. Scholarship availability, eligibility, categories and application procedures must be checked in the notice for the relevant batch.",
  },
  {
    question: "How can I find the entrance examination date?",
    answer:
      "Entrance examination dates and result announcements should be checked through the latest official college notices. Do not rely on dates published for an earlier admission cycle.",
  },
  {
    question: "Where can I get help with my application?",
    answer:
      "You can contact the college using the published admission contact numbers or visit the college administration for assistance.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}) {
  return (
    <div className={`mb-9 ${centered ? "mx-auto text-center" : ""}`}>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#a98545]">
        {eyebrow}
      </p>

      <h2 className="font-serif text-3xl font-semibold leading-tight text-[#10243b] md:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="editorial-copy mt-4 max-w-2xl text-[15px] leading-7 text-slate-600 md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

function AdmissionStep({ step }) {
  return (
    <div className="relative rounded-lg border border-[#e8e2d6] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(16,36,59,0.06)] md:p-7">
      <div className="flex items-center justify-between">
        <span className="font-serif text-3xl font-semibold text-[#b99754]">
          {step.number}
        </span>

        <span className="h-2 w-2 rounded-full bg-[#c5a15d]" />
      </div>

      <h3 className="mt-6 font-serif text-xl font-semibold text-[#10243b]">
        {step.title}
      </h3>

      <p className="editorial-copy mt-3 text-[15px] leading-7 text-slate-600">
        {step.description}
      </p>

      <p className="mt-5 border-t border-[#eee9df] pt-4 text-xs leading-6 text-slate-500">
        {step.detail}
      </p>
    </div>
  );
}

function PreparationItem({ item }) {
  return (
    <div className="flex gap-4 rounded-md border border-[#e8e2d6] bg-white p-5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#f5f0e5] text-[#a98545]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5"
          stroke="currentColor"
          strokeWidth="1.7"
        >
          <path
            d="m5 12 4 4L19 6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <div>
        <h3 className="text-sm font-bold text-[#10243b]">
          {item.title}
        </h3>
        <p className="mt-1 text-xs leading-6 text-slate-500">
          {item.description}
        </p>
      </div>
    </div>
  );
}

function FaqItem({ item, isOpen, onClick }) {
  return (
    <div className="border-b border-[#e8e2d6] last:border-0">
      <button
        type="button"
        onClick={onClick}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-5 py-5 text-left"
      >
        <span className="text-sm font-semibold leading-6 text-[#10243b] md:text-base">
          {item.question}
        </span>

        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition ${
            isOpen
              ? "rotate-45 bg-[#10243b] text-[#dfbd77]"
              : "bg-[#f1ede5] text-[#8c6d37]"
          }`}
        >
          +
        </span>
      </button>

      {isOpen && (
        <div className="pb-5 pr-10">
          <p className="editorial-copy text-[15px] leading-7 text-slate-600">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
}

function AdmissionsPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#17283c]">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#091b30] text-white">
        <div className="absolute inset-0 -z-10">
          <img
            src={CAMPUS_IMAGE}
            alt="Khwopa College campus in Bhaktapur"
            className="h-full w-full object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07182b] via-[#0b2038]/95 to-[#0b2038]/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07182b]/65 to-transparent" />
        </div>

        <div className="pointer-events-none absolute -right-20 -top-36 -z-10 h-[430px] w-[430px] rounded-full border border-[#dfbd77]/10" />
        <div className="pointer-events-none absolute -right-5 -top-20 -z-10 h-[290px] w-[290px] rounded-full border border-[#dfbd77]/10" />

        <div className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <nav className="flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
            <Link to="/" className="transition hover:text-[#dfbd77]">
              Home
            </Link>
            <span>/</span>
            <Link
              to="/academics"
              className="transition hover:text-[#dfbd77]"
            >
              Academics
            </Link>
            <span>/</span>
            <span className="text-[#dfbd77]">Admissions</span>
          </nav>

          <div className="mt-12 max-w-4xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-[#b99754]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a17c3d]">
              Begin your journey | Khwopa College
              </p>
            </div>

            <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[78px]">
              Your next chapter
              <span className="block italic text-[#dfbd77]">
                starts with a choice.
              </span>
            </h1>

            <p className="editorial-copy mt-7 max-w-2xl text-[15px] leading-7 text-white/70 sm:text-base">
              Find admission information, explore the application process
              and prepare for your academic journey at Khwopa College.
            </p>
          </div>

          <div className="mt-14 grid max-w-3xl grid-cols-2 gap-8 border-t border-white/15 pt-7 sm:grid-cols-3">
            <div>
              <p className="font-serif text-2xl text-[#dfbd77]">
                Online
              </p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-white/50">
                Application
              </p>
            </div>

            <div>
              <p className="font-serif text-2xl text-white">
                Grades 11 & 12
              </p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-white/50">
                Study level
              </p>
            </div>

            <div>
              <p className="font-serif text-2xl text-white">
                Dekocha, Bhaktapur
              </p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-white/50">
                College location
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 h-px w-full bg-[#dfbd77]/50" />
      </section>

      {/* ADMISSION STATUS */}
      <section className="mx-auto max-w-7xl px-5 pt-12 sm:px-8 md:pt-16">
        <div className="grid gap-6 rounded-lg border border-[#e5d9bd] bg-[#fbf8f1] p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-md bg-[#eee6d4] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#8c6d37]">
                Admission information
              </span>

              <span className="text-xs font-medium text-slate-500">
                Latest accessible portal instructions: 2083
              </span>
            </div>

            <h2 className="mt-4 font-serif text-2xl font-semibold text-[#10243b] md:text-3xl">
              Check the latest admission announcement.
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              The published 2083 admission schedule contains dates that have
              already passed. A new application deadline or currently open
              admission cycle has not been confirmed here. Check the
              college's latest notices before applying.
            </p>
          </div>

          <a
            href={COLLEGE_WEBSITE}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#10243b] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1c3857]"
          >
            College notices <ExternalArrow />
          </a>
        </div>
      </section>

      {/* APPLICATION PROCESS */}
      <section
        id="application-process"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 py-16 sm:px-8 md:py-24"
      >
        <SectionHeading
          eyebrow="Admission process"
          title="Five steps to get started."
          description="Use this as a general guide. The official admission announcement for your chosen programme and batch takes priority."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ADMISSION_STEPS.map((step) => (
            <AdmissionStep key={step.number} step={step} />
          ))}
        </div>
      </section>

      {/* ONLINE APPLICATION */}
      <section className="bg-[#10243b] py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#dfbd77]">
              Online application
            </p>

            <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-white md:text-4xl">
              Apply through the official admission portal.
            </h2>

            <p className="mt-5 text-sm leading-8 text-white/65">
              Khwopa Secondary School has published an online Class 11 (+2)
              application process through its admission portal. Read the
              instructions carefully before entering your details and
              submitting the form.
            </p>

            <a
              href={ADMISSION_PORTAL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-md bg-[#dfbd77] px-6 py-3.5 text-sm font-bold text-[#10243b] transition hover:bg-[#edcf91]"
            >
              Open admission portal <ExternalArrow />
            </a>

            <p className="mt-4 text-xs leading-6 text-white/45">
              The accessible portal instructions refer to admission year
              2083. Confirm that the portal is accepting applications for
              your intended batch before paying any fee.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-6 md:p-8">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-[#dfbd77]">
              Published application form sections
            </p>

            <div className="space-y-4">
              {APPLICATION_SECTIONS.map((section) => (
                <div
                  key={section.number}
                  className="flex items-start gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0"
                >
                  <span className="flex h-9 w-10 shrink-0 items-center justify-center rounded-md bg-[#dfbd77]/10 font-serif text-sm font-bold text-[#dfbd77]">
                    {section.number}
                  </span>

                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {section.title}
                    </h3>

                    <p className="mt-1 text-xs leading-6 text-white/50">
                      {section.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENT PREPARATION */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Before you apply"
              title="Prepare your information."
              description="Having your information ready can make the application process easier."
            />

            <p className="text-sm leading-8 text-slate-600">
              The following is a preparation checklist, not a guaranteed
              list of mandatory uploads. Follow the current application
              form for the exact required fields and documents.
            </p>

            <div className="mt-7 rounded-lg bg-[#10243b] p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#dfbd77]">
                Application reminder
              </p>

              <p className="mt-4 text-sm leading-7 text-white/70">
                Complete all mandatory fields carefully. The published
                instructions state that fields marked with an asterisk
                must be filled in.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {PREPARATION_ITEMS.map((item) => (
              <PreparationItem key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* PREVIOUSLY PUBLISHED ADMISSION DETAILS */}
      <section className="bg-[#f0ede5] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Previous admission cycle"
            title="Published 2083 admission information."
            description="The following information is taken from the accessible 2083 online application instructions. It is shown for reference only, not as the current admission schedule."
          />

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-lg border border-[#e3dccf] bg-white p-7">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#a98545]">
                Application fee
              </p>

              <p className="mt-5 font-serif text-4xl font-semibold text-[#10243b]">
                Rs. 500
              </p>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                The published 2083 instructions stated that this included
                the entrance examination and result publication.
              </p>
            </div>

            <div className="rounded-lg border border-[#e3dccf] bg-white p-7">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#a98545]">
                Entrance examination
              </p>

              <p className="mt-5 font-serif text-3xl font-semibold text-[#10243b]">
                2083-04-11
              </p>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Monday, 8:00 AM to 9:30 AM, according to the published
                portal instructions.
              </p>
            </div>

            <div className="rounded-lg border border-[#e3dccf] bg-white p-7">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#a98545]">
                Result publication
              </p>

              <p className="mt-5 font-serif text-3xl font-semibold text-[#10243b]">
                2083-04-11
              </p>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                The portal listed results from 2:00 PM onwards on the
                same date.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-md border border-[#dfd4bd] bg-[#fbf8f1] p-5">
            <p className="text-sm leading-7 text-slate-600">
              <strong className="text-[#10243b]">
                Important:
              </strong>{" "}
              These are historical 2083 instructions. Do not use the
              previous fee or examination date for a new application
              without confirmation from Khwopa College.
            </p>
          </div>
        </div>
      </section>

      {/* ELIGIBILITY */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Stream requirements"
              title="Find the right eligibility criteria."
              description="Admission requirements depend on your chosen +2 stream and the current college notice."
            />

            <p className="editorial-copy text-[15px] leading-8 text-slate-600">
              Requirements for Science and Management may differ. Review
              the latest stream-specific
              admission notice before submitting an application.
            </p>

            <Link
              to="/academics#programme-directory"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#8c6d37] transition hover:text-[#10243b]"
            >
              Explore programme details <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="rounded-lg border border-[#e8e2d6] bg-white p-7 md:p-9">
            <h3 className="font-serif text-2xl font-semibold text-[#10243b]">
              Check these details before applying.
            </h3>

            <div className="mt-7 space-y-5">
              {[
                "Minimum academic qualification",
                "Required subjects and grades",
                "Entrance examination requirements",
                "Stream-specific selection process",
                "Required certificates and documents",
              ].map((item, index) => (
                <div key={item} className="flex items-center gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#f5f0e5] text-xs font-bold text-[#a98545]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="text-sm font-medium text-[#425268]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SCHOLARSHIPS */}
      <section className="bg-[#10243b] py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#dfbd77]">
              Scholarships and support
            </p>

            <h2 className="mt-5 font-serif text-3xl font-semibold text-white md:text-4xl">
              Explore scholarship opportunities.
            </h2>

            <p className="mt-5 text-sm leading-8 text-white/65">
              Khwopa College has published batch-specific admission
              scholarship notices. Scholarship categories, eligibility,
              selection criteria and application deadlines should be
              checked in the notice for the relevant admission year.
            </p>

            <p className="mt-4 text-xs leading-6 text-white/45">
              A published scholarship notice for the 2082 batch does not
              confirm that the same scheme or conditions apply to a later
              batch.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href={COLLEGE_WEBSITE}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#dfbd77] px-6 py-3.5 text-sm font-bold text-[#10243b] transition hover:bg-[#edcf91]"
            >
              Latest college notices <ExternalArrow />
            </a>

            <a
              href={SCHOLARSHIP_NOTICE}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-[#dfbd77] hover:text-[#dfbd77]"
            >
              View 2082 scholarship notice <ExternalArrow />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <SectionHeading
              eyebrow="Need help?"
              title="Frequently asked questions."
              description="Some common questions about applying to Khwopa College."
            />

            <div className="rounded-lg bg-[#f0ede5] p-6">
              <p className="font-serif text-xl font-semibold text-[#10243b]">
                Still have questions?
              </p>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Contact the college administration for the latest
                admission guidance.
              </p>

              <a
                href="tel:9741811178"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8c6d37] transition hover:text-[#10243b]"
              >
                Call admission support <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-[#e8e2d6] bg-white px-6 md:px-8">
            {FAQS.map((item, index) => (
              <FaqItem
                key={item.question}
                item={item}
                isOpen={openFaq === index}
                onClick={() =>
                  setOpenFaq(openFaq === index ? -1 : index)
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 md:pb-24">
        <div className="relative isolate overflow-hidden rounded-lg bg-[#10243b] p-8 md:p-12">
          <div className="absolute -right-16 -top-24 -z-10 h-72 w-72 rounded-full border border-[#dfbd77]/15" />

          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#dfbd77]">
                Contact Khwopa College
              </p>

              <h2 className="mt-5 max-w-xl font-serif text-3xl font-semibold leading-tight text-white md:text-4xl">
                Get admission information directly from the college.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/65">
                For current admission deadlines, programme availability,
                eligibility, fees and scholarship information, contact
                the administration.
              </p>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.06] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#dfbd77]">
                Published admission contacts
              </p>

              <div className="mt-5 space-y-4">
                <a
                  href="tel:9741811178"
                  className="flex items-center justify-between gap-3 border-b border-white/10 pb-4 text-sm font-semibold text-white transition hover:text-[#dfbd77]"
                >
                  9741811178 <span>↗</span>
                </a>

                <a
                  href="tel:9741811179"
                  className="flex items-center justify-between gap-3 text-sm font-semibold text-white transition hover:text-[#dfbd77]"
                >
                  9741811179 <span>↗</span>
                </a>
              </div>

              <a
                href={COLLEGE_WEBSITE}
                target="_blank"
                rel="noreferrer"
                className="mt-7 flex items-center justify-center gap-2 rounded-md bg-[#dfbd77] px-5 py-3.5 text-sm font-bold text-[#10243b] transition hover:bg-[#edcf91]"
              >
                Visit official website <ExternalArrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-[#e8e2d6] bg-[#fbfaf7]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a98545]">
              Continue exploring
            </p>

            <h2 className="mt-3 font-serif text-2xl font-semibold text-[#10243b] md:text-3xl">
              Find the programme that fits your goals.
            </h2>
          </div>

          <Link
            to="/academics"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#10243b] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#1c3857]"
          >
            Explore all programmes <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default AdmissionsPage;
