import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { college } from "../data/college";
import { useSiteSettings } from "../context/useSiteSettings";

const aboutLinks = [
  { label: "About Khwopa", description: "Identity, philosophy and municipal mission", to: "/about" },
  { label: "Our History", description: "Institutional timeline since 1999", to: "/history" },
  { label: "Vision & Mission", description: "Intellectual principles and community goals", to: "/about/vision-mission" },
  { label: "Leadership & Governance", description: "Governing committee and municipal leadership", to: "/about/governance" },
  { label: "Faculty & Staff", description: "Distinguished scholars and departmental educators", to: "/about/faculty" },
  { label: "Campus & Facilities", description: "Labs, digital halls, library and sports grounds", to: "/about/facilities" },
];

const academicLinks = [
  { label: "All +2 Streams", description: "Science, Management, Humanities & Law directory", to: "/academics/programmes" },
  { label: "+2 Science Stream", description: "Biology Group & Computer Science Group", to: "/academics/science" },
  { label: "+2 Management Stream", description: "Computer, Math, Hotel Management & Accounting", to: "/academics/management" },
  { label: "+2 Humanities & Law", description: "Sociology, Mass Communication, Law & Literature", to: "/academics/humanities-social-sciences" },
  { label: "Faculties & Labs", description: "Academic departments and laboratory infrastructure", to: "/academics/departments" },
];

const admissionsLinks = [
  { label: "+2 Admissions Overview", description: "Class 11 intake notices and enrolment procedure", to: "/admissions" },
  { label: "SEE Eligibility & Criteria", description: "GPA requirements and document checklist", to: "/admissions/requirements" },
  { label: "How to Apply for +2", description: "Step-by-step entrance guide and timeline", to: "/admissions/how-to-apply" },
  { label: "+2 Fees & Scholarships", description: "Municipal subsidized fees and SEE merit quotas", to: "/admissions/fees-scholarships" },
  { label: "Admission FAQs", description: "Common questions regarding Class 11 intake", to: "/admissions/faqs" },
];

const campusLifeLinks = [
  { label: "Campus Life Overview", description: "Vibrant student experience at Khwopa", to: "/campus-life" },
  { label: "Clubs & Societies", description: "IT, Management, Red Cross, Literature & Eco", to: "/campus-life/clubs" },
  { label: "Sports & Athletics", description: "Sports week, indoor arena and basketball", to: "/campus-life/sports" },
  { label: "Student Activities", description: "Fieldwork, science fairs and heritage walks", to: "/campus-life/activities" },
  { label: "Events & Calendar", description: "Conferences, hackathons and festivals", to: "/campus-life/events" },
  { label: "Photo Gallery", description: "Campus architecture and student albums", to: "/campus-life/gallery" },
];

const researchLinks = [
  { label: "Research Overview", description: "Evidence-based inquiry and scholarships", to: "/research" },
  { label: "Research Management Cell", description: "RMC mandate, grants and committee", to: "/research/management-cell" },
  { label: "Research Activities", description: "Funded faculty and community field projects", to: "/research/activities" },
  { label: "Publications Catalogue", description: "Peer-reviewed papers and monographs", to: "/research/publications" },
  { label: "Khwopa Journal", description: "Bi-annual journal indexed on NepJOL", to: "/research/journal" },
  { label: "Conferences & Seminars", description: "National colloquiums and proceedings", to: "/research/conferences" },
];

const examLinks = [
  { label: "+2 Examinations Hub", description: "NEB notices, seat plans and results center", to: "/examinations" },
  { label: "NEB Board Routines", description: "Grade 11 & 12 board and terminal timetables", to: "/examinations/routines" },
  { label: "Registration & Forms", description: "NEB registration cards and exam forms", to: "/examinations/forms" },
  { label: "Centres & Seat Plans", description: "Khwopa Centre (Code 104) and room allocations", to: "/examinations/centres-seat-plans" },
  { label: "Guidelines & Hall Conduct", description: "NEB admit cards, rules and discipline", to: "/examinations/guidelines" },
  { label: "Board Results Portal", description: "NEB Class 11 & 12 result announcements", to: "/results" },
];

const resourceLinks = [
  { label: "Resources Directory", description: "Quick access to academic support", to: "/resources" },
  { label: "Downloads & Forms", description: "Syllabi, leave forms and manuals", to: "/resources/downloads" },
  { label: "Academic Calendar", description: "Session timeline and holiday dates", to: "/resources/academic-calendar" },
  { label: "Library & OPAC", description: "Book search, reading halls and book bank", to: "/resources/library" },
  { label: "Online Student Portals", description: "NEB, Sanothimi, and exam gateways", to: "/resources/online-services" },
];

function ChevronIcon({ open = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function DropdownMenu({ items, onNavigate }) {
  return (
    <div className="absolute left-0 top-full z-50 mt-2 w-80 rounded-2xl border border-white/15 bg-[#0e243d] p-2 shadow-2xl backdrop-blur-md">
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={() => {
            scrollToTop();
            onNavigate();
          }}
          className="group block rounded-xl p-3 transition hover:bg-white/10"
        >
          <span className="flex items-center justify-between text-sm font-semibold text-white group-hover:text-[#dfbd77] transition">
            {item.label}
            <svg className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
          <span className="mt-1 block text-xs leading-relaxed text-white/65">
            {item.description}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);

  const location = useLocation();

  useEffect(() => {
    function closeOnEscape(e) {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  // Track previous location path to close menus when route changes
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    setMobileSubmenu(null);
  }

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const toggleMobileSubmenu = (name) => {
    setMobileSubmenu(mobileSubmenu === name ? null : name);
  };

  const closeMobile = () => {
    scrollToTop();
    setMobileMenuOpen(false);
    setMobileSubmenu(null);
  };

  const dynamicSettings = useSiteSettings();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b2038]/95 text-white shadow-[0_2px_18px_rgba(3,14,27,0.22)] backdrop-blur-md">
      {/* Dynamic Emergency / Broadcast Announcement Banner */}
      {dynamicSettings?.announcementBanner?.enabled && dynamicSettings?.announcementBanner?.text && (
        <div className="bg-gradient-to-r from-[#b99754] via-[#dfbd77] to-[#c5a15d] text-[#071322] px-4 py-2 text-center text-xs font-bold tracking-wide shadow-md flex items-center justify-center gap-2">
          <span>📢</span>
          <span>{dynamicSettings.announcementBanner.text}</span>
          {dynamicSettings.announcementBanner.link && (
            <Link
              to={dynamicSettings.announcementBanner.link}
              className="ml-2 underline hover:text-black font-extrabold"
            >
              Learn More →
            </Link>
          )}
        </div>
      )}

      {/* Top Notification Bar */}
      <div className="border-b border-white/10 bg-[#07182c]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-xs text-white/75 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <a href={`tel:${dynamicSettings?.phone || college.phone}`} className="transition hover:text-[#dfbd77]">
              {dynamicSettings?.phone || college.phone}
            </a>
            <a href={`mailto:${dynamicSettings?.email || college.email}`} className="hidden transition hover:text-[#dfbd77] sm:inline">
              {dynamicSettings?.email || college.email}
            </a>
            <span className="hidden text-white/40 md:inline">{dynamicSettings?.address || college.location}</span>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <Link to="/resources/downloads" onClick={scrollToTop} className="hover:text-[#dfbd77] transition">
              Downloads
            </Link>
            <Link to="/results" onClick={scrollToTop} className="hover:text-[#dfbd77] transition">
              NEB Results
            </Link>
            <Link to="/contact" onClick={scrollToTop} className="hover:text-[#dfbd77] transition">
              Contact Desk
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link to="/" onClick={scrollToTop} className="flex shrink-0 items-center gap-3" aria-label="Khwopa College Home">
          <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-md bg-white p-1">
            <img
              src="https://wms.edigitalnepal.com/wms/files/ws-profile/1678949042195_fc474132-1571-4dec-92f9-25c027f34feb.png"
              alt="Khwopa College Emblem"
              className="h-full w-full object-contain"
            />
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-lg font-bold tracking-wider text-white">
              KHWOPA
            </span>
            <span className="block text-[10px] font-semibold tracking-[0.2em] text-[#dfbd77]">
              COLLEGE
            </span>
          </span>
        </Link>

        {/* Desktop Navigation Links with Mega Dropdowns */}
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary Navigation">
          {/* About */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown("about")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-semibold transition ${
                openDropdown === "about" || location.pathname.startsWith("/about") || location.pathname.startsWith("/history")
                  ? "text-[#dfbd77]"
                  : "text-white/85 hover:text-white"
              }`}
            >
              <span>About</span>
              <ChevronIcon open={openDropdown === "about"} />
            </button>
            {openDropdown === "about" && (
              <DropdownMenu items={aboutLinks} onNavigate={() => setOpenDropdown(null)} />
            )}
          </div>

          {/* Academics */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown("academics")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-semibold transition ${
                openDropdown === "academics" || location.pathname.startsWith("/academics")
                  ? "text-[#dfbd77]"
                  : "text-white/85 hover:text-white"
              }`}
            >
              <span>Academics</span>
              <ChevronIcon open={openDropdown === "academics"} />
            </button>
            {openDropdown === "academics" && (
              <DropdownMenu items={academicLinks} onNavigate={() => setOpenDropdown(null)} />
            )}
          </div>

          {/* Admissions */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown("admissions")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-semibold transition ${
                openDropdown === "admissions" || location.pathname.startsWith("/admissions")
                  ? "text-[#dfbd77]"
                  : "text-white/85 hover:text-white"
              }`}
            >
              <span>Admissions</span>
              <ChevronIcon open={openDropdown === "admissions"} />
            </button>
            {openDropdown === "admissions" && (
              <DropdownMenu items={admissionsLinks} onNavigate={() => setOpenDropdown(null)} />
            )}
          </div>

          {/* Examinations */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown("examinations")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-semibold transition ${
                openDropdown === "examinations" || location.pathname.startsWith("/examinations") || location.pathname.startsWith("/results")
                  ? "text-[#dfbd77]"
                  : "text-white/85 hover:text-white"
              }`}
            >
              <span>Examinations</span>
              <ChevronIcon open={openDropdown === "examinations"} />
            </button>
            {openDropdown === "examinations" && (
              <DropdownMenu items={examLinks} onNavigate={() => setOpenDropdown(null)} />
            )}
          </div>

          {/* Campus Life */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown("campusLife")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-semibold transition ${
                openDropdown === "campusLife" || location.pathname.startsWith("/campus-life")
                  ? "text-[#dfbd77]"
                  : "text-white/85 hover:text-white"
              }`}
            >
              <span>Campus Life</span>
              <ChevronIcon open={openDropdown === "campusLife"} />
            </button>
            {openDropdown === "campusLife" && (
              <DropdownMenu items={campusLifeLinks} onNavigate={() => setOpenDropdown(null)} />
            )}
          </div>

          {/* Research */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown("research")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-semibold transition ${
                openDropdown === "research" || location.pathname.startsWith("/research")
                  ? "text-[#dfbd77]"
                  : "text-white/85 hover:text-white"
              }`}
            >
              <span>Research</span>
              <ChevronIcon open={openDropdown === "research"} />
            </button>
            {openDropdown === "research" && (
              <DropdownMenu items={researchLinks} onNavigate={() => setOpenDropdown(null)} />
            )}
          </div>

          {/* News & Notices */}
          <Link
            to="/news"
            onClick={scrollToTop}
            className={`rounded-lg px-3 py-2 text-[13px] font-semibold transition ${
              location.pathname.startsWith("/news") ? "text-[#dfbd77]" : "text-white/85 hover:text-white"
            }`}
          >
            News
          </Link>
          <Link
            to="/notices"
            onClick={scrollToTop}
            className={`rounded-lg px-3 py-2 text-[13px] font-semibold transition ${
              location.pathname.startsWith("/notices") ? "text-[#dfbd77]" : "text-white/85 hover:text-white"
            }`}
          >
            Notices
          </Link>

          {/* Resources */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown("resources")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-semibold transition ${
                openDropdown === "resources" || location.pathname.startsWith("/resources")
                  ? "text-[#dfbd77]"
                  : "text-white/85 hover:text-white"
              }`}
            >
              <span>Resources</span>
              <ChevronIcon open={openDropdown === "resources"} />
            </button>
            {openDropdown === "resources" && (
              <DropdownMenu items={resourceLinks} onNavigate={() => setOpenDropdown(null)} />
            )}
          </div>
        </nav>

        {/* Action CTAs */}
        <div className="hidden items-center gap-3 xl:flex">
          <Link
            to="/admissions/requirements"
            onClick={scrollToTop}
            className="rounded-xl border border-[#dfbd77]/40 px-3.5 py-2 text-xs font-semibold text-[#dfbd77] transition hover:bg-[#dfbd77]/10"
          >
            Eligibility
          </Link>
          <Link
            to="/admissions/apply"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#dfbd77] px-4 py-2 text-xs font-bold text-[#14283F] shadow-sm transition hover:bg-[#c9a65d]"
          >
            <span>Apply Now</span>
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 text-white xl:hidden hover:border-[#dfbd77]"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav className="border-t border-white/10 bg-[#07182c] px-4 py-4 xl:hidden max-h-[80vh] overflow-y-auto">
          <div className="space-y-1">
            {/* About Accordion */}
            <div>
              <button
                type="button"
                onClick={() => toggleMobileSubmenu("about")}
                className="flex w-full items-center justify-between py-2 text-sm font-semibold text-white/90"
              >
                <span>About</span>
                <ChevronIcon open={mobileSubmenu === "about"} />
              </button>
              {mobileSubmenu === "about" && (
                <div className="pl-4 py-1 space-y-1 border-l border-white/10 ml-2">
                  {aboutLinks.map((l) => (
                    <Link key={l.to} to={l.to} onClick={closeMobile} className="block py-1 text-xs text-white/70 hover:text-[#dfbd77]">
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Academics Accordion */}
            <div>
              <button
                type="button"
                onClick={() => toggleMobileSubmenu("academics")}
                className="flex w-full items-center justify-between py-2 text-sm font-semibold text-white/90"
              >
                <span>Academics</span>
                <ChevronIcon open={mobileSubmenu === "academics"} />
              </button>
              {mobileSubmenu === "academics" && (
                <div className="pl-4 py-1 space-y-1 border-l border-white/10 ml-2">
                  {academicLinks.map((l) => (
                    <Link key={l.to} to={l.to} onClick={closeMobile} className="block py-1 text-xs text-white/70 hover:text-[#dfbd77]">
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Admissions Accordion */}
            <div>
              <button
                type="button"
                onClick={() => toggleMobileSubmenu("admissions")}
                className="flex w-full items-center justify-between py-2 text-sm font-semibold text-white/90"
              >
                <span>Admissions</span>
                <ChevronIcon open={mobileSubmenu === "admissions"} />
              </button>
              {mobileSubmenu === "admissions" && (
                <div className="pl-4 py-1 space-y-1 border-l border-white/10 ml-2">
                  {admissionsLinks.map((l) => (
                    <Link key={l.to} to={l.to} onClick={closeMobile} className="block py-1 text-xs text-white/70 hover:text-[#dfbd77]">
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Examinations Accordion */}
            <div>
              <button
                type="button"
                onClick={() => toggleMobileSubmenu("examinations")}
                className="flex w-full items-center justify-between py-2 text-sm font-semibold text-white/90"
              >
                <span>Examinations</span>
                <ChevronIcon open={mobileSubmenu === "examinations"} />
              </button>
              {mobileSubmenu === "examinations" && (
                <div className="pl-4 py-1 space-y-1 border-l border-white/10 ml-2">
                  {examLinks.map((l) => (
                    <Link key={l.to} to={l.to} onClick={closeMobile} className="block py-1 text-xs text-white/70 hover:text-[#dfbd77]">
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Campus Life Accordion */}
            <div>
              <button
                type="button"
                onClick={() => toggleMobileSubmenu("campusLife")}
                className="flex w-full items-center justify-between py-2 text-sm font-semibold text-white/90"
              >
                <span>Campus Life</span>
                <ChevronIcon open={mobileSubmenu === "campusLife"} />
              </button>
              {mobileSubmenu === "campusLife" && (
                <div className="pl-4 py-1 space-y-1 border-l border-white/10 ml-2">
                  {campusLifeLinks.map((l) => (
                    <Link key={l.to} to={l.to} onClick={closeMobile} className="block py-1 text-xs text-white/70 hover:text-[#dfbd77]">
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Research Accordion */}
            <div>
              <button
                type="button"
                onClick={() => toggleMobileSubmenu("research")}
                className="flex w-full items-center justify-between py-2 text-sm font-semibold text-white/90"
              >
                <span>Research</span>
                <ChevronIcon open={mobileSubmenu === "research"} />
              </button>
              {mobileSubmenu === "research" && (
                <div className="pl-4 py-1 space-y-1 border-l border-white/10 ml-2">
                  {researchLinks.map((l) => (
                    <Link key={l.to} to={l.to} onClick={closeMobile} className="block py-1 text-xs text-white/70 hover:text-[#dfbd77]">
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/news" onClick={closeMobile} className="block py-2 text-sm font-semibold text-white/90 hover:text-[#dfbd77]">
              News
            </Link>
            <Link to="/notices" onClick={closeMobile} className="block py-2 text-sm font-semibold text-white/90 hover:text-[#dfbd77]">
              Notices
            </Link>

            {/* Resources Accordion */}
            <div>
              <button
                type="button"
                onClick={() => toggleMobileSubmenu("resources")}
                className="flex w-full items-center justify-between py-2 text-sm font-semibold text-white/90"
              >
                <span>Resources</span>
                <ChevronIcon open={mobileSubmenu === "resources"} />
              </button>
              {mobileSubmenu === "resources" && (
                <div className="pl-4 py-1 space-y-1 border-l border-white/10 ml-2">
                  {resourceLinks.map((l) => (
                    <Link key={l.to} to={l.to} onClick={closeMobile} className="block py-1 text-xs text-white/70 hover:text-[#dfbd77]">
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/contact" onClick={closeMobile} className="block py-2 text-sm font-semibold text-white/90 hover:text-[#dfbd77]">
              Contact & Location
            </Link>

            <div className="pt-4 space-y-2">
              <Link
                to="/admissions/apply"
                onClick={closeMobile}
                className="block text-center rounded-xl bg-[#dfbd77] py-2.5 text-xs font-bold text-[#14283F]"
              >
                Apply for Admission
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
