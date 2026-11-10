import { college } from "../data/college";
import { Link } from "react-router-dom";
import { ArrowUpIcon, ExternalLinkIcon } from "./Icons";

const footerSections = [
  {
    title: "About Khwopa",
    links: [
      { label: "About Overview", to: "/about" },
      { label: "Our History", to: "/history" },
      { label: "Vision & Mission", to: "/about/vision-mission" },
      { label: "Governance", to: "/about/governance" },
      { label: "Faculty & Staff", to: "/about/faculty" },
      { label: "Campus & Facilities", to: "/about/facilities" },
    ],
  },
  {
    title: "Academics",
    links: [
      { label: "Academic Overview", to: "/academics" },
      { label: "All Programmes", to: "/academics/programmes" },
      { label: "Faculty of Management", to: "/academics/management" },
      { label: "Faculty of Science", to: "/academics/science" },
      { label: "Humanities & Social Sciences", to: "/academics/humanities-social-sciences" },
      { label: "Academic Departments", to: "/academics/departments" },
    ],
  },
  {
    title: "Admissions & Exams",
    links: [
      { label: "Admissions Overview", to: "/admissions" },
      { label: "Eligibility & Requirements", to: "/admissions/requirements" },
      { label: "How to Apply", to: "/admissions/how-to-apply" },
      { label: "Fees & Scholarships", to: "/admissions/fees-scholarships" },
      { label: "Exam Routines", to: "/examinations/routines" },
      { label: "NEB Results Portal", to: "/results" },
    ],
  },
  {
    title: "Campus Life & Research",
    links: [
      { label: "Clubs & Societies", to: "/campus-life/clubs" },
      { label: "Sports & Athletics", to: "/campus-life/sports" },
      { label: "Campus Events", to: "/campus-life/events" },
      { label: "Photo Gallery", to: "/campus-life/gallery" },
      { label: "Research Management Cell", to: "/research/management-cell" },
      { label: "Khwopa Journal (NepJOL)", to: "/research/journal" },
    ],
  },
];

export default function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer id="contact" className="scroll-mt-24 border-t border-white/10 bg-[#07182b] text-white">
      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-6">
          {/* Identity & Contact Col */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-wider text-white">
                KHWOPA COLLEGE
              </span>
              <span className="mt-0.5 block text-xs font-bold tracking-[0.18em] text-[#dfbd77]">
                COMMUNITY EDUCATION | BHAKTAPUR
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              An acclaimed community-funded, non-profit higher secondary institution operated under Bhaktapur Municipality, affiliated with the National Examinations Board (NEB).
            </p>

            <div className="mt-5 space-y-1.5 text-sm text-white/75">
              <p><span className="text-white/45">Location: </span>{college.location}</p>
              <p><span className="text-white/45">Telephone: </span>{college.phone}</p>
              <p><span className="text-white/45">Email: </span>{college.email}</p>
            </div>

            <div className="mt-5 flex items-center gap-4 text-xs font-semibold text-[#dfbd77]">
              <a
                href={college.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 transition hover:text-white"
              >
                <span>Official Portal</span>
                <ExternalLinkIcon />
              </a>
              <Link to="/contact/location" className="hover:text-white transition">
                Map Directions
              </Link>
            </div>
          </div>

          {/* Nav Columns */}
          {footerSections.map((sec) => (
            <div key={sec.title}>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#dfbd77]">
                {sec.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {sec.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/70 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Sub-footer */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Khwopa College, Bhaktapur Municipality. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link to="/resources/downloads" className="hover:text-white transition">
              Downloads
            </Link>
            <Link to="/contact/enquiry" className="hover:text-white transition">
              Help Desk
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-white/70 transition hover:text-[#dfbd77]"
            >
              <span>Back to top</span>
              <ArrowUpIcon />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
