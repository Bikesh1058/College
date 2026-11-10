import { BrowserRouter, Route, Routes } from "react-router-dom";

// Layout & Core
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollManager from "./components/ScrollManager";

// Homepage & Preview Sections
import HomePage from "./components/HomePage";
import QuickLinks from "./components/QuickLinks";
import AboutSection from "./components/About";
import AcademicPrograms from "./components/AcademicPrograms";
import WhyKhwopa from "./components/WhyKhwopa";
import StudentLifeGallery from "./components/StudentLifeGallery";
import NewsAndNotices from "./components/NewsAndNotices";
import StudentResources from "./components/StudentResources";
import StudentTestimonials from "./components/StudentTestimonials";
import Newsletter from "./components/Newsletter";

// About Pages
import AboutPage from "./pages/AboutPage";
import HistoryPage from "./pages/HistoryPage";
import VisionMission from "./pages/VisionMission";
import GovernancePage from "./pages/GovernancePage";
import FacultyStaffPage from "./pages/FacultyStaffPage";
import FacilitiesPage from "./pages/FacilitiesPage";

// Academic Pages
import AcademicProgramsPage from "./pages/AcademicProgramsPage";
import ProgrammesPage from "./pages/academics/ProgrammesPage";
import ManagementPage from "./pages/academics/ManagementPage";
import SciencePage from "./pages/academics/SciencePage";
import HumanitiesPage from "./pages/academics/HumanitiesPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import ProgrammeDetailPage from "./pages/academics/ProgrammeDetailPage";

// Admission Pages
import AdmissionsPage from "./pages/AdmissionsPage";
import ApplyOnlinePage from "./pages/admissions/ApplyOnlinePage";
import RequirementsPage from "./pages/admissions/RequirementsPage";
import HowToApplyPage from "./pages/admissions/HowToApplyPage";
import FeesScholarshipsPage from "./pages/admissions/FeesScholarshipsPage";
import AdmissionFAQsPage from "./pages/admissions/AdmissionFAQsPage";

// Examination Pages
import ExaminationPage from "./pages/ExaminationPage";
import RoutinesPage from "./pages/examinations/RoutinesPage";
import ExaminationFormsPage from "./pages/examinations/ExaminationFormsPage";
import SeatPlansPage from "./pages/examinations/SeatPlansPage";
import GuidelinesPage from "./pages/examinations/GuidelinesPage";
import ResultsPage from "./pages/ResultsPage";

// Campus Life Pages
import CampusLifePage from "./pages/campus-life/CampusLifePage";
import ClubsPage from "./pages/campus-life/ClubsPage";
import SportsPage from "./pages/campus-life/SportsPage";
import ActivitiesPage from "./pages/campus-life/ActivitiesPage";
import EventsPage from "./pages/campus-life/EventsPage";
import EventDetailPage from "./pages/campus-life/EventDetailPage";
import GalleryPage from "./pages/campus-life/GalleryPage";

// Research Pages
import ResearchPage from "./pages/research/ResearchPage";
import ResearchCellPage from "./pages/research/ResearchCellPage";
import ResearchActivitiesPage from "./pages/research/ResearchActivitiesPage";
import PublicationsPage from "./pages/research/PublicationsPage";
import JournalPage from "./pages/research/JournalPage";
import ConferencesPage from "./pages/research/ConferencesPage";

// News & Notices Pages
import NewsPage from "./pages/news/NewsPage";
import NewsDetailPage from "./pages/news/NewsDetailPage";
import NoticePage from "./pages/NoticePage";
import NoticeDetailPage from "./pages/news/NoticeDetailPage";

// Resources Pages
import ResourcesPage from "./pages/resources/ResourcesPage";
import DownloadsPage from "./pages/resources/DownloadsPage";
import AcademicCalendarPage from "./pages/resources/AcademicCalendarPage";
import LibraryPage from "./pages/resources/LibraryPage";
import OnlineServicesPage from "./pages/resources/OnlineServicesPage";

// Contact Pages
import ContactPage from "./pages/contact/ContactPage";
import LocationPage from "./pages/contact/LocationPage";
import EnquiryPage from "./pages/contact/EnquiryPage";

// Khwopa Admin CMS Dashboard (Isolated in src/admin)
import AdminLoginPage from "./admin/AdminLoginPage";
import AdminDashboardPage from "./admin/AdminDashboardPage";

// 404 Fallback
import NotFoundPage from "./pages/NotFoundPage";

// Alert and Confirmation Modal Provider
import { AlertProvider } from "./context/AlertContext";

// Shell that renders public Navbar/Footer only when NOT on admin routes
function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#12243a] antialiased selection:bg-[#dfbd77] selection:text-[#12243a]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

function Home() {
  return (
    <main id="main-content" className="overflow-x-hidden">
      <HomePage />
      <QuickLinks />
      <AboutSection />
      <AcademicPrograms />
      <WhyKhwopa />
      <StudentLifeGallery />
      <NewsAndNotices />
      <StudentResources />
      <StudentTestimonials />
      <Newsletter />
    </main>
  );
}

export default function App() {
  return (
    <AlertProvider>
      <BrowserRouter>
        <ScrollManager />
      <Routes>
        {/* Khwopa Admin CMS Panel (Dedicated Admin UI with NO public Navbar/Footer) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

        {/* Public Website Routes (Wrapped with Public Navbar and Footer) */}
        <Route
          path="/*"
          element={
            <PublicLayout>
              <Routes>
                {/* Home */}
                <Route path="/" element={<Home />} />

                {/* About / Institutional */}
                <Route path="/about" element={<AboutPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/about/history" element={<HistoryPage />} />
                <Route path="/about/vision-mission" element={<VisionMission />} />
                <Route path="/about/governance" element={<GovernancePage />} />
                <Route path="/about/faculty" element={<FacultyStaffPage />} />
                <Route path="/about/facilities" element={<FacilitiesPage />} />

                {/* Academics */}
                <Route path="/academics" element={<AcademicProgramsPage />} />
                <Route path="/academics/programmes" element={<ProgrammesPage />} />
                <Route path="/academics/programmes/:slug" element={<ProgrammeDetailPage />} />
                <Route path="/academics/management" element={<ManagementPage />} />
                <Route path="/academics/science" element={<SciencePage />} />
                <Route path="/academics/humanities-social-sciences" element={<HumanitiesPage />} />
                <Route path="/academics/departments" element={<DepartmentsPage />} />
                <Route path="/departments" element={<DepartmentsPage />} />
                <Route path="/department" element={<DepartmentsPage />} />

                {/* Admissions */}
                <Route path="/admissions" element={<AdmissionsPage />} />
                <Route path="/admission" element={<AdmissionsPage />} />
                <Route path="/admissions/apply" element={<ApplyOnlinePage />} />
                <Route path="/apply" element={<ApplyOnlinePage />} />
                <Route path="/admissions/requirements" element={<RequirementsPage />} />
                <Route path="/admissions/how-to-apply" element={<HowToApplyPage />} />
                <Route path="/admissions/fees-scholarships" element={<FeesScholarshipsPage />} />
                <Route path="/admissions/faqs" element={<AdmissionFAQsPage />} />

                {/* Examinations & Results */}
                <Route path="/examinations" element={<ExaminationPage />} />
                <Route path="/examinations/routines" element={<RoutinesPage />} />
                <Route path="/examinations/forms" element={<ExaminationFormsPage />} />
                <Route path="/examinations/centres-seat-plans" element={<SeatPlansPage />} />
                <Route path="/examinations/guidelines" element={<GuidelinesPage />} />
                <Route path="/results" element={<ResultsPage />} />

                {/* Campus Life */}
                <Route path="/campus-life" element={<CampusLifePage />} />
                <Route path="/campus-life/clubs" element={<ClubsPage />} />
                <Route path="/campus-life/sports" element={<SportsPage />} />
                <Route path="/campus-life/activities" element={<ActivitiesPage />} />
                <Route path="/campus-life/events" element={<EventsPage />} />
                <Route path="/campus-life/events/:slug" element={<EventDetailPage />} />
                <Route path="/campus-life/gallery" element={<GalleryPage />} />

                {/* Research & Publications */}
                <Route path="/research" element={<ResearchPage />} />
                <Route path="/research/management-cell" element={<ResearchCellPage />} />
                <Route path="/research/activities" element={<ResearchActivitiesPage />} />
                <Route path="/research/publications" element={<PublicationsPage />} />
                <Route path="/research/journal" element={<JournalPage />} />
                <Route path="/research/conferences" element={<ConferencesPage />} />

                {/* News & Notices */}
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news/:slug" element={<NewsDetailPage />} />
                <Route path="/notices" element={<NoticePage />} />
                <Route path="/notice" element={<NoticePage />} />
                <Route path="/notices/:category" element={<NoticePage />} />
                <Route path="/notice/:slug" element={<NoticeDetailPage />} />

                {/* Student Resources */}
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/resources/downloads" element={<DownloadsPage />} />
                <Route path="/resources/academic-calendar" element={<AcademicCalendarPage />} />
                <Route path="/resources/library" element={<LibraryPage />} />
                <Route path="/resources/online-services" element={<OnlineServicesPage />} />

                {/* Contact */}
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/contact/location" element={<LocationPage />} />
                <Route path="/contact/enquiry" element={<EnquiryPage />} />

                {/* Catch-all 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </PublicLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  </AlertProvider>
  );
}
