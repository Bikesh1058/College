import { useState, useEffect } from 'react';
import { Sparkles, Eye, Save, Layers, BookOpen, GraduationCap, Compass, Building, ShieldCheck } from 'lucide-react';
import { useAdminData } from '../context/useAdminData';
import { useAlert } from '../../context/useAlert';
import { apiClient } from '../../services/api';
import ImageUploadInput from '../components/ImageUploadInput';

export default function PageBuilderView() {
  const { showToast } = useAdminData();
  const { alert } = useAlert();
  const [selectedPage, setSelectedPage] = useState('home');
  const [activeSection, setActiveSection] = useState('hero');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Home Page Form State
  const [homeHero, setHomeHero] = useState({
    eyebrow: 'Khwopa College, Bhaktapur',
    line1: 'Learn.',
    line2: 'Discover.',
    line3: 'Belong.',
    description: 'An academic community rooted in Bhaktapur, helping students build knowledge, character, and opportunity.',
    ctaText: 'Explore academics',
    ctaLink: '#academics',
    secondaryCtaText: 'Discover Khwopa',
    secondaryCtaLink: '#about',
    bannerImage: 'https://wms.edigitalnepal.com/wms/files/ws-post-images/1678958957817_007be5e2-a1dc-4580-9809-4964d79fa1a0.jpg'
  });

  const [whyKhwopa, setWhyKhwopa] = useState({
    eyebrow: 'The Khwopa difference',
    title: 'Education with',
    titleItalic: 'purpose and identity.',
    strength1Title: 'Community-rooted',
    strength1Text: 'An institution connected to Bhaktapur\'s community and its wider educational aspirations.',
    strength2Title: 'Accessible education',
    strength2Text: 'A community-college approach focused on making higher education accessible to different sections of society.',
    strength3Title: 'Academic inquiry',
    strength3Text: 'An environment where research, conferences, discussion and the exchange of ideas have a place.',
    strength4Title: 'Culture and identity',
    strength4Text: 'A learning environment connected to the cultural traditions and shared life of Bhaktapur.'
  });

  const [testimonials, setTestimonials] = useState({
    eyebrow: 'Student voices',
    quote: 'Every student has a story worth sharing.',
    description: 'This space is dedicated to genuine experiences from the students and alumni who make up the Khwopa community.',
    tag: 'Experiences from our community',
    ctaEyebrow: 'Your experience matters',
    ctaTitle: 'Be part of the Khwopa story.',
    ctaText: 'We look forward to featuring authentic student perspectives, meaningful campus experiences and stories from our alumni.'
  });

  const [newsletter, setNewsletter] = useState({
    eyebrow: 'Stay connected',
    title: 'Keep up with life at Khwopa.',
    description: 'Receive college news, academic announcements and important updates in one place.'
  });

  // About Page Form State
  const [aboutHero, setAboutHero] = useState({
    eyebrow: 'About Khwopa College',
    heading: 'Rooted in our community. Built for the future.',
    description: 'Khwopa College is a community college in Bhaktapur, undertaken by Bhaktapur Municipality and affiliated with the National Examinations Board (NEB). Its identity is closely connected with the educational, cultural and intellectual life of the community it serves.',
    bannerImage: 'https://wms.edigitalnepal.com/wms/files/ws-post-images/1751512628392_35a0f113-7f94-43bb-9bf6-4a2d56daf8d6.jpg'
  });

  // Admissions Page Form State
  const [admissionsContent, setAdmissionsContent] = useState({
    eyebrow: 'Admissions 2083 Open',
    heading: 'Your Gateway to Academic Excellence in Bhaktapur',
    subtext: 'Join Khwopa Secondary School for Grade 11 (+2) in Science, Management, Humanities, and Law. Merit and municipal quotas available.',
    applicationDeadline: 'Baisakh 30, 2083',
    entranceExamDate: 'Jestha 05, 2083',
    formFee: 'NPR 125',
    scienceGPA: '2.80 GPA (C+ in Sci & Math)',
    mgmtGPA: '2.00 GPA (D+ in Math & Eng)',
    municipalQuotaSeats: '145 Quota Seats'
  });

  // Vision & Mission Form State
  const [visionMissionContent, setVisionMissionContent] = useState({
    eyebrow: 'Guiding Philosophy',
    heading: 'Intellectual Freedom, Civic Duty & Cultural Pride',
    vision: 'To establish Bhaktapur as a premier educational sanctuary of Nepal, producing patriotic, morally upright, and intellectually capable citizens.',
    mission: 'Delivering world-class +2 education at accessible costs undertaken by Bhaktapur Municipality, integrating modern scientific inquiry with deep community roots.',
    motto: 'Knowledge, Character, and Community Service'
  });

  // Examinations Form State
  const [examContent, setExamContent] = useState({
    eyebrow: 'National Examinations Board Center 104',
    heading: 'NEB Board Examinations, Mock Terminals & Routines',
    description: 'Khwopa serves as official Exam Center 104 for Bhaktapur district. Access up-to-date board schedules, admit card notifications, and terminal circulars.',
    centerCode: 'Center 104 (Bhaktapur)',
    chiefSuperintendent: 'Principal / Senior Exam Officer',
    helpline: '+977-1-6610932'
  });

  // Campus Life Form State
  const [campusLifeContent, setCampusLifeContent] = useState({
    eyebrow: 'Beyond Academics',
    heading: 'Vibrant Campus Life, Clubs & Athletic Tradition',
    subtext: 'From competitive programming hackathons to municipal heritage cleanup drives, life at Khwopa nurtures well-rounded leadership.',
    activeClubsCount: '8 Active Clubs',
    annualEvents: '15+ Campus Events Annually'
  });

  // Facilities Form State
  const [facilitiesContent, setFacilitiesContent] = useState({
    eyebrow: 'Modern Infrastructure',
    heading: 'State-of-the-Art Laboratories & Learning Spaces',
    subtext: 'High-speed optic fiber computer suites, advanced physics and chemistry labs, and an open-access digital library.'
  });

  // Load Page Data on change
  useEffect(() => {
    let isMounted = true;
    const fetchPage = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get(`/pages/${selectedPage}`);
        if (res.data?.data && isMounted) {
          const page = res.data.data;

          if (selectedPage === 'home') {
            const hero = page.sections?.find(s => s.type === 'hero')?.content;
            if (hero) {
              setHomeHero({
                eyebrow: hero.eyebrow || 'Khwopa College, Bhaktapur',
                line1: hero.headingLines?.[0] || 'Learn.',
                line2: hero.headingLines?.[1] || 'Discover.',
                line3: hero.headingLines?.[2] || 'Belong.',
                description: hero.description || '',
                ctaText: hero.ctaText || 'Explore academics',
                ctaLink: hero.ctaLink || '#academics',
                secondaryCtaText: hero.secondaryCtaText || 'Discover Khwopa',
                secondaryCtaLink: hero.secondaryCtaLink || '#about',
                bannerImage: hero.bannerImage || 'https://wms.edigitalnepal.com/wms/files/ws-post-images/1678958957817_007be5e2-a1dc-4580-9809-4964d79fa1a0.jpg'
              });
            }

            const why = page.sections?.find(s => s.type === 'why_khwopa')?.content;
            if (why) {
              setWhyKhwopa({
                eyebrow: why.eyebrow || 'The Khwopa difference',
                title: why.title || 'Education with',
                titleItalic: why.titleItalic || 'purpose and identity.',
                strength1Title: why.strengths?.[0]?.title || 'Community-rooted',
                strength1Text: why.strengths?.[0]?.text || '',
                strength2Title: why.strengths?.[1]?.title || 'Accessible education',
                strength2Text: why.strengths?.[1]?.text || '',
                strength3Title: why.strengths?.[2]?.title || 'Academic inquiry',
                strength3Text: why.strengths?.[2]?.text || '',
                strength4Title: why.strengths?.[3]?.title || 'Culture and identity',
                strength4Text: why.strengths?.[3]?.text || ''
              });
            }

            const test = page.sections?.find(s => s.type === 'testimonials')?.content;
            if (test) {
              setTestimonials({
                eyebrow: test.eyebrow || 'Student voices',
                quote: test.quote || 'Every student has a story worth sharing.',
                description: test.description || '',
                tag: test.tag || 'Experiences from our community',
                ctaEyebrow: test.ctaEyebrow || 'Your experience matters',
                ctaTitle: test.ctaTitle || 'Be part of the Khwopa story.',
                ctaText: test.ctaText || ''
              });
            }

            const news = page.sections?.find(s => s.type === 'newsletter')?.content;
            if (news) {
              setNewsletter({
                eyebrow: news.eyebrow || 'Stay connected',
                title: news.title || 'Keep up with life at Khwopa.',
                description: news.description || ''
              });
            }

          } else if (selectedPage === 'about') {
            const hero = page.sections?.find(s => s.type === 'hero')?.content;
            if (hero) {
              setAboutHero({
                eyebrow: hero.eyebrow || 'About Khwopa College',
                heading: hero.heading || 'Rooted in our community. Built for the future.',
                description: hero.description || '',
                bannerImage: hero.bannerImage || 'https://wms.edigitalnepal.com/wms/files/ws-post-images/1751512628392_35a0f113-7f94-43bb-9bf6-4a2d56daf8d6.jpg'
              });
            }
          } else if (selectedPage === 'admissions') {
            const hero = page.sections?.find(s => s.type === 'admissions_hero')?.content;
            const quotas = page.sections?.find(s => s.type === 'eligibility_quotas')?.content;
            if (hero || quotas) {
              setAdmissionsContent({
                eyebrow: hero?.eyebrow || 'Admissions 2083 Open',
                heading: hero?.heading || 'Your Gateway to Academic Excellence in Bhaktapur',
                subtext: hero?.subtext || '',
                applicationDeadline: hero?.applicationDeadline || 'Baisakh 30, 2083',
                entranceExamDate: hero?.entranceExamDate || 'Jestha 05, 2083',
                formFee: hero?.formFee || 'NPR 125',
                scienceGPA: quotas?.scienceGPA || '2.80 GPA (C+ in Sci & Math)',
                mgmtGPA: quotas?.mgmtGPA || '2.00 GPA (D+ in Math & Eng)',
                municipalQuotaSeats: quotas?.municipalQuotaSeats || '145 Quota Seats'
              });
            }
          } else if (selectedPage === 'vision-mission') {
            const vm = page.sections?.find(s => s.type === 'vision_mission_content')?.content;
            if (vm) {
              setVisionMissionContent({
                eyebrow: vm.eyebrow || 'Guiding Philosophy',
                heading: vm.heading || 'Intellectual Freedom, Civic Duty & Cultural Pride',
                vision: vm.vision || '',
                mission: vm.mission || '',
                motto: vm.motto || 'Knowledge, Character, and Community Service'
              });
            }
          } else if (selectedPage === 'examinations') {
            const ex = page.sections?.find(s => s.type === 'exam_info')?.content;
            if (ex) {
              setExamContent({
                eyebrow: ex.eyebrow || 'National Examinations Board Center 104',
                heading: ex.heading || 'NEB Board Examinations, Mock Terminals & Routines',
                description: ex.description || '',
                centerCode: ex.centerCode || 'Center 104 (Bhaktapur)',
                chiefSuperintendent: ex.chiefSuperintendent || 'Principal / Senior Exam Officer',
                helpline: ex.helpline || '+977-1-6610932'
              });
            }
          } else if (selectedPage === 'campus-life') {
            const cl = page.sections?.find(s => s.type === 'campus_life_hero')?.content;
            if (cl) {
              setCampusLifeContent({
                eyebrow: cl.eyebrow || 'Beyond Academics',
                heading: cl.heading || 'Vibrant Campus Life, Clubs & Athletic Tradition',
                subtext: cl.subtext || '',
                activeClubsCount: cl.activeClubsCount || '8 Active Clubs',
                annualEvents: cl.annualEvents || '15+ Campus Events Annually'
              });
            }
          } else if (selectedPage === 'facilities') {
            const fac = page.sections?.find(s => s.type === 'facilities_hero')?.content;
            if (fac) {
              setFacilitiesContent({
                eyebrow: fac.eyebrow || 'Modern Infrastructure',
                heading: fac.heading || 'State-of-the-Art Laboratories & Learning Spaces',
                subtext: fac.subtext || ''
              });
            }
          }
        }
      } catch {
        // Use defaults if not found
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchPage();
    return () => { isMounted = false; };
  }, [selectedPage]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (selectedPage === 'home') {
        const payload = {
          title: 'Home, Khwopa Secondary School (+2)',
          slug: 'home',
          pageType: 'home',
          template: 'editorial',
          status: 'published',
          sections: [
            {
              type: 'hero',
              enabled: true,
              order: 1,
              content: {
                eyebrow: homeHero.eyebrow,
                headingLines: [homeHero.line1, homeHero.line2, homeHero.line3],
                description: homeHero.description,
                ctaText: homeHero.ctaText,
                ctaLink: homeHero.ctaLink,
                secondaryCtaText: homeHero.secondaryCtaText,
                secondaryCtaLink: homeHero.secondaryCtaLink,
                bannerImage: homeHero.bannerImage
              }
            },
            {
              type: 'why_khwopa',
              enabled: true,
              order: 2,
              content: {
                eyebrow: whyKhwopa.eyebrow,
                title: whyKhwopa.title,
                titleItalic: whyKhwopa.titleItalic,
                strengths: [
                  { number: '01', title: whyKhwopa.strength1Title, text: whyKhwopa.strength1Text },
                  { number: '02', title: whyKhwopa.strength2Title, text: whyKhwopa.strength2Text },
                  { number: '03', title: whyKhwopa.strength3Title, text: whyKhwopa.strength3Text },
                  { number: '04', title: whyKhwopa.strength4Title, text: whyKhwopa.strength4Text }
                ]
              }
            },
            {
              type: 'testimonials',
              enabled: true,
              order: 3,
              content: {
                eyebrow: testimonials.eyebrow,
                quote: testimonials.quote,
                description: testimonials.description,
                tag: testimonials.tag,
                ctaEyebrow: testimonials.ctaEyebrow,
                ctaTitle: testimonials.ctaTitle,
                ctaText: testimonials.ctaText
              }
            },
            {
              type: 'newsletter',
              enabled: true,
              order: 4,
              content: {
                eyebrow: newsletter.eyebrow,
                title: newsletter.title,
                description: newsletter.description
              }
            }
          ]
        };
        await apiClient.put('/pages/home', payload);
        showToast('All Homepage sections saved and published live to Atlas!');
      } else if (selectedPage === 'about') {
        const payload = {
          title: 'About Khwopa Secondary School',
          slug: 'about',
          pageType: 'about',
          template: 'editorial',
          status: 'published',
          sections: [
            {
              type: 'hero',
              enabled: true,
              order: 1,
              content: {
                eyebrow: aboutHero.eyebrow,
                heading: aboutHero.heading,
                description: aboutHero.description,
                bannerImage: aboutHero.bannerImage
              }
            },
            {
              type: 'statistics',
              enabled: true,
              order: 2,
              content: {
                stats: [
                  { value: '2058 BS', label: 'Established (2001 AD)' },
                  { value: '116+', label: 'Faculty Members' },
                  { value: '4', label: 'Core Faculties' },
                  { value: '100%', label: 'NEB Affiliated' }
                ]
              }
            }
          ]
        };
        await apiClient.put('/pages/about', payload);
        showToast('About page content saved and published live to Atlas!');
      } else if (selectedPage === 'admissions') {
        const payload = {
          title: 'Admissions & Intakes, Khwopa',
          slug: 'admissions',
          pageType: 'admissions',
          template: 'standard',
          status: 'published',
          sections: [
            {
              type: 'admissions_hero',
              enabled: true,
              order: 1,
              content: {
                eyebrow: admissionsContent.eyebrow,
                heading: admissionsContent.heading,
                subtext: admissionsContent.subtext,
                applicationDeadline: admissionsContent.applicationDeadline,
                entranceExamDate: admissionsContent.entranceExamDate,
                formFee: admissionsContent.formFee
              }
            },
            {
              type: 'eligibility_quotas',
              enabled: true,
              order: 2,
              content: {
                scienceGPA: admissionsContent.scienceGPA,
                mgmtGPA: admissionsContent.mgmtGPA,
                municipalQuotaSeats: admissionsContent.municipalQuotaSeats
              }
            }
          ]
        };
        await apiClient.put('/pages/admissions', payload);
        showToast('Admissions page updated and published live!');
      } else if (selectedPage === 'vision-mission') {
        const payload = {
          title: 'Vision, Mission & Goals, Khwopa',
          slug: 'vision-mission',
          pageType: 'vision-mission',
          template: 'standard',
          status: 'published',
          sections: [
            {
              type: 'vision_mission_content',
              enabled: true,
              order: 1,
              content: visionMissionContent
            }
          ]
        };
        await apiClient.put('/pages/vision-mission', payload);
        showToast('Vision & Mission page updated live!');
      } else if (selectedPage === 'examinations') {
        const payload = {
          title: 'Examinations & NEB Center, Khwopa',
          slug: 'examinations',
          pageType: 'examinations',
          template: 'standard',
          status: 'published',
          sections: [
            {
              type: 'exam_info',
              enabled: true,
              order: 1,
              content: examContent
            }
          ]
        };
        await apiClient.put('/pages/examinations', payload);
        showToast('Examinations Hub updated live!');
      } else if (selectedPage === 'campus-life') {
        const payload = {
          title: 'Campus Life & Student Chapters, Khwopa',
          slug: 'campus-life',
          pageType: 'campus-life',
          template: 'standard',
          status: 'published',
          sections: [
            {
              type: 'campus_life_hero',
              enabled: true,
              order: 1,
              content: campusLifeContent
            }
          ]
        };
        await apiClient.put('/pages/campus-life', payload);
        showToast('Campus Life & Activities updated live!');
      } else if (selectedPage === 'facilities') {
        const payload = {
          title: 'Facilities & Infrastructure, Khwopa',
          slug: 'facilities',
          pageType: 'facilities',
          template: 'standard',
          status: 'published',
          sections: [
            {
              type: 'facilities_hero',
              enabled: true,
              order: 1,
              content: facilitiesContent
            }
          ]
        };
        await apiClient.put('/pages/facilities', payload);
        showToast('Facilities & Labs updated live!');
      }
    } catch (err) {
      alert({
        title: 'Page Builder Error',
        message: err.response?.data?.message || err.message,
        type: 'error'
      });
    } finally {
      setSaving(false);
    }
  };

  const pagesCatalog = [
    { slug: 'home', label: 'Homepage', icon: Sparkles },
    { slug: 'about', label: 'About Us', icon: BookOpen },
    { slug: 'admissions', label: 'Admissions Hub', icon: GraduationCap },
    { slug: 'vision-mission', label: 'Vision & Mission', icon: ShieldCheck },
    { slug: 'examinations', label: 'Examinations', icon: Layers },
    { slug: 'campus-life', label: 'Campus Life', icon: Compass },
    { slug: 'facilities', label: 'Facilities & Labs', icon: Building }
  ];

  return (
    <div className="space-y-6">
      {/* Header and Page Selector */}
      <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">
              Dynamic Page Builder & Live Content Studio
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Edit text, headlines, and banners for any public page with real-time side-by-side preview
            </p>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-[#EFECE3] flex flex-wrap items-center gap-2">
          {pagesCatalog.map((pg) => {
            const Icon = pg.icon;
            return (
              <button
                key={pg.slug}
                onClick={() => setSelectedPage(pg.slug)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                  selectedPage === pg.slug
                    ? 'bg-[#101B2D] text-[#C5A15B] font-bold shadow-sm'
                    : 'bg-[#FAF8F5] border border-[#E3DCCB] text-slate-700 hover:bg-white hover:text-[#101B2D]'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{pg.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split Editor + Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Form Editor (6 cols) */}
        <div className="lg:col-span-6 rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#EFECE3] pb-4 mb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#A68238]">
                Editing Page
              </span>
              <h4 className="font-serif text-lg font-bold text-[#101B2D] capitalize mt-0.5">
                {selectedPage.replace('-', ' ')} Page Content
              </h4>
            </div>
            <span className="px-3 py-1 rounded-xl bg-[#FAF8F5] text-[#A68238] border border-[#E3DCCB] text-xs font-bold">
              Active Page
            </span>
          </div>

          {selectedPage === 'home' && (
            <div className="flex flex-wrap gap-1.5 mb-5 p-1.5 rounded-xl bg-[#FAF8F5] border border-[#E3DCCB]">
              {[
                { id: 'hero', label: '1. Hero Banner' },
                { id: 'why_khwopa', label: '2. Why Khwopa (4 Pillars)' },
                { id: 'testimonials', label: '3. Student Voices' },
                { id: 'newsletter', label: '4. Stay Connected' }
              ].map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveSection(sec.id)}
                  className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold transition ${
                    activeSection === sec.id
                      ? 'bg-[#101B2D] text-[#C5A15B] shadow-xs'
                      : 'text-slate-600 hover:text-[#101B2D]'
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="py-12 text-center text-sm text-slate-500">Loading page configuration...</div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4 text-sm">
              {/* HOME PAGE SECTIONS */}
              {selectedPage === 'home' && (
                <>
                  {activeSection === 'hero' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Eyebrow Tagline</label>
                        <input
                          type="text"
                          value={homeHero.eyebrow}
                          onChange={(e) => setHomeHero({ ...homeHero, eyebrow: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2.5">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Heading Line 1</label>
                          <input
                            type="text"
                            value={homeHero.line1}
                            onChange={(e) => setHomeHero({ ...homeHero, line1: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Heading Line 2</label>
                          <input
                            type="text"
                            value={homeHero.line2}
                            onChange={(e) => setHomeHero({ ...homeHero, line2: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Line 3 (Gold Italic)</label>
                          <input
                            type="text"
                            value={homeHero.line3}
                            onChange={(e) => setHomeHero({ ...homeHero, line3: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Hero Subtext Description</label>
                        <textarea
                          rows={3}
                          value={homeHero.description}
                          onChange={(e) => setHomeHero({ ...homeHero, description: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] leading-relaxed"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Primary Button Label</label>
                          <input
                            type="text"
                            value={homeHero.ctaText}
                            onChange={(e) => setHomeHero({ ...homeHero, ctaText: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Secondary Button Label</label>
                          <input
                            type="text"
                            value={homeHero.secondaryCtaText}
                            onChange={(e) => setHomeHero({ ...homeHero, secondaryCtaText: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Hero Background Image (Upload or URL)</label>
                        <ImageUploadInput
                          value={homeHero.bannerImage}
                          onChange={(val) => setHomeHero({ ...homeHero, bannerImage: val })}
                          placeholder="https://... or click Upload on the left"
                        />
                      </div>
                    </div>
                  )}

                  {activeSection === 'why_khwopa' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Eyebrow</label>
                          <input
                            type="text"
                            value={whyKhwopa.eyebrow}
                            onChange={(e) => setWhyKhwopa({ ...whyKhwopa, eyebrow: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Heading Part 1</label>
                          <input
                            type="text"
                            value={whyKhwopa.title}
                            onChange={(e) => setWhyKhwopa({ ...whyKhwopa, title: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Heading Part 2 (Gold Italic)</label>
                        <input
                          type="text"
                          value={whyKhwopa.titleItalic}
                          onChange={(e) => setWhyKhwopa({ ...whyKhwopa, titleItalic: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                        />
                      </div>

                      {/* 4 Pillars */}
                      <div className="space-y-3 pt-3 border-t border-[#EFECE3]">
                        <p className="font-bold text-sm text-[#101B2D]">4 Core Pillars of Khwopa</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E3DCCB] space-y-2">
                            <span className="text-xs font-bold text-[#A68238] uppercase tracking-wider block">Pillar 01</span>
                            <input
                              type="text"
                              value={whyKhwopa.strength1Title}
                              onChange={(e) => setWhyKhwopa({ ...whyKhwopa, strength1Title: e.target.value })}
                              className="w-full px-3 py-2 text-sm font-bold rounded-lg bg-white border border-[#E3DCCB] text-[#101B2D]"
                            />
                            <textarea
                              rows={2}
                              value={whyKhwopa.strength1Text}
                              onChange={(e) => setWhyKhwopa({ ...whyKhwopa, strength1Text: e.target.value })}
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#E3DCCB] text-slate-700 leading-relaxed"
                            />
                          </div>

                          <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E3DCCB] space-y-2">
                            <span className="text-xs font-bold text-[#A68238] uppercase tracking-wider block">Pillar 02</span>
                            <input
                              type="text"
                              value={whyKhwopa.strength2Title}
                              onChange={(e) => setWhyKhwopa({ ...whyKhwopa, strength2Title: e.target.value })}
                              className="w-full px-3 py-2 text-sm font-bold rounded-lg bg-white border border-[#E3DCCB] text-[#101B2D]"
                            />
                            <textarea
                              rows={2}
                              value={whyKhwopa.strength2Text}
                              onChange={(e) => setWhyKhwopa({ ...whyKhwopa, strength2Text: e.target.value })}
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#E3DCCB] text-slate-700 leading-relaxed"
                            />
                          </div>

                          <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E3DCCB] space-y-2">
                            <span className="text-xs font-bold text-[#A68238] uppercase tracking-wider block">Pillar 03</span>
                            <input
                              type="text"
                              value={whyKhwopa.strength3Title}
                              onChange={(e) => setWhyKhwopa({ ...whyKhwopa, strength3Title: e.target.value })}
                              className="w-full px-3 py-2 text-sm font-bold rounded-lg bg-white border border-[#E3DCCB] text-[#101B2D]"
                            />
                            <textarea
                              rows={2}
                              value={whyKhwopa.strength3Text}
                              onChange={(e) => setWhyKhwopa({ ...whyKhwopa, strength3Text: e.target.value })}
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#E3DCCB] text-slate-700 leading-relaxed"
                            />
                          </div>

                          <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E3DCCB] space-y-2">
                            <span className="text-xs font-bold text-[#A68238] uppercase tracking-wider block">Pillar 04</span>
                            <input
                              type="text"
                              value={whyKhwopa.strength4Title}
                              onChange={(e) => setWhyKhwopa({ ...whyKhwopa, strength4Title: e.target.value })}
                              className="w-full px-3 py-2 text-sm font-bold rounded-lg bg-white border border-[#E3DCCB] text-[#101B2D]"
                            />
                            <textarea
                              rows={2}
                              value={whyKhwopa.strength4Text}
                              onChange={(e) => setWhyKhwopa({ ...whyKhwopa, strength4Text: e.target.value })}
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#E3DCCB] text-slate-700 leading-relaxed"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'testimonials' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Eyebrow</label>
                        <input
                          type="text"
                          value={testimonials.eyebrow}
                          onChange={(e) => setTestimonials({ ...testimonials, eyebrow: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Featured Quote</label>
                        <input
                          type="text"
                          value={testimonials.quote}
                          onChange={(e) => setTestimonials({ ...testimonials, quote: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Description Subtext</label>
                        <textarea
                          rows={2}
                          value={testimonials.description}
                          onChange={(e) => setTestimonials({ ...testimonials, description: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] leading-relaxed"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">CTA Heading</label>
                          <input
                            type="text"
                            value={testimonials.ctaTitle}
                            onChange={(e) => setTestimonials({ ...testimonials, ctaTitle: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">CTA Subtext</label>
                          <input
                            type="text"
                            value={testimonials.ctaText}
                            onChange={(e) => setTestimonials({ ...testimonials, ctaText: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'newsletter' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Eyebrow</label>
                        <input
                          type="text"
                          value={newsletter.eyebrow}
                          onChange={(e) => setNewsletter({ ...newsletter, eyebrow: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Banner Title</label>
                        <input
                          type="text"
                          value={newsletter.title}
                          onChange={(e) => setNewsletter({ ...newsletter, title: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Description Subtext</label>
                        <textarea
                          rows={2}
                          value={newsletter.description}
                          onChange={(e) => setNewsletter({ ...newsletter, description: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] leading-relaxed"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* ABOUT US PAGE */}
              {selectedPage === 'about' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Eyebrow Tagline</label>
                    <input
                      type="text"
                      value={aboutHero.eyebrow}
                      onChange={(e) => setAboutHero({ ...aboutHero, eyebrow: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Main Title</label>
                    <input
                      type="text"
                      value={aboutHero.heading}
                      onChange={(e) => setAboutHero({ ...aboutHero, heading: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Description Paragraph</label>
                    <textarea
                      rows={4}
                      value={aboutHero.description}
                      onChange={(e) => setAboutHero({ ...aboutHero, description: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Campus Photography (Upload or URL)</label>
                    <ImageUploadInput
                      value={aboutHero.bannerImage}
                      onChange={(val) => setAboutHero({ ...aboutHero, bannerImage: val })}
                      placeholder="https://... or click Upload on the left"
                    />
                  </div>
                </>
              )}

              {/* ADMISSIONS PAGE */}
              {selectedPage === 'admissions' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Hero Eyebrow Tagline</label>
                    <input
                      type="text"
                      value={admissionsContent.eyebrow}
                      onChange={(e) => setAdmissionsContent({ ...admissionsContent, eyebrow: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Heading Title</label>
                    <input
                      type="text"
                      value={admissionsContent.heading}
                      onChange={(e) => setAdmissionsContent({ ...admissionsContent, heading: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Subtext</label>
                    <textarea
                      rows={3}
                      value={admissionsContent.subtext}
                      onChange={(e) => setAdmissionsContent({ ...admissionsContent, subtext: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Deadline</label>
                      <input
                        type="text"
                        value={admissionsContent.applicationDeadline}
                        onChange={(e) => setAdmissionsContent({ ...admissionsContent, applicationDeadline: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Entrance Date</label>
                      <input
                        type="text"
                        value={admissionsContent.entranceExamDate}
                        onChange={(e) => setAdmissionsContent({ ...admissionsContent, entranceExamDate: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Form Fee</label>
                      <input
                        type="text"
                        value={admissionsContent.formFee}
                        onChange={(e) => setAdmissionsContent({ ...admissionsContent, formFee: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Science Minimum SEE</label>
                      <input
                        type="text"
                        value={admissionsContent.scienceGPA}
                        onChange={(e) => setAdmissionsContent({ ...admissionsContent, scienceGPA: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Management Minimum SEE</label>
                      <input
                        type="text"
                        value={admissionsContent.mgmtGPA}
                        onChange={(e) => setAdmissionsContent({ ...admissionsContent, mgmtGPA: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* VISION & MISSION */}
              {selectedPage === 'vision-mission' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Eyebrow</label>
                    <input
                      type="text"
                      value={visionMissionContent.eyebrow}
                      onChange={(e) => setVisionMissionContent({ ...visionMissionContent, eyebrow: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Main Heading</label>
                    <input
                      type="text"
                      value={visionMissionContent.heading}
                      onChange={(e) => setVisionMissionContent({ ...visionMissionContent, heading: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Institutional Vision</label>
                    <textarea
                      rows={3}
                      value={visionMissionContent.vision}
                      onChange={(e) => setVisionMissionContent({ ...visionMissionContent, vision: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Mission Statement</label>
                    <textarea
                      rows={3}
                      value={visionMissionContent.mission}
                      onChange={(e) => setVisionMissionContent({ ...visionMissionContent, mission: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">College Motto</label>
                    <input
                      type="text"
                      value={visionMissionContent.motto}
                      onChange={(e) => setVisionMissionContent({ ...visionMissionContent, motto: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                    />
                  </div>
                </>
              )}

              {/* EXAMINATIONS HUB */}
              {selectedPage === 'examinations' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Eyebrow</label>
                    <input
                      type="text"
                      value={examContent.eyebrow}
                      onChange={(e) => setExamContent({ ...examContent, eyebrow: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Examinations Heading</label>
                    <input
                      type="text"
                      value={examContent.heading}
                      onChange={(e) => setExamContent({ ...examContent, heading: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Description / Overview</label>
                    <textarea
                      rows={3}
                      value={examContent.description}
                      onChange={(e) => setExamContent({ ...examContent, description: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Center Code</label>
                      <input
                        type="text"
                        value={examContent.centerCode}
                        onChange={(e) => setExamContent({ ...examContent, centerCode: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Exam Helpline</label>
                      <input
                        type="text"
                        value={examContent.helpline}
                        onChange={(e) => setExamContent({ ...examContent, helpline: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* CAMPUS LIFE */}
              {selectedPage === 'campus-life' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Eyebrow</label>
                    <input
                      type="text"
                      value={campusLifeContent.eyebrow}
                      onChange={(e) => setCampusLifeContent({ ...campusLifeContent, eyebrow: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Main Title</label>
                    <input
                      type="text"
                      value={campusLifeContent.heading}
                      onChange={(e) => setCampusLifeContent({ ...campusLifeContent, heading: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Subtext</label>
                    <textarea
                      rows={3}
                      value={campusLifeContent.subtext}
                      onChange={(e) => setCampusLifeContent({ ...campusLifeContent, subtext: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Active Chapters</label>
                      <input
                        type="text"
                        value={campusLifeContent.activeClubsCount}
                        onChange={(e) => setCampusLifeContent({ ...campusLifeContent, activeClubsCount: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Annual Activities</label>
                      <input
                        type="text"
                        value={campusLifeContent.annualEvents}
                        onChange={(e) => setCampusLifeContent({ ...campusLifeContent, annualEvents: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* FACILITIES */}
              {selectedPage === 'facilities' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Eyebrow</label>
                    <input
                      type="text"
                      value={facilitiesContent.eyebrow}
                      onChange={(e) => setFacilitiesContent({ ...facilitiesContent, eyebrow: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Main Title</label>
                    <input
                      type="text"
                      value={facilitiesContent.heading}
                      onChange={(e) => setFacilitiesContent({ ...facilitiesContent, heading: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Subtext</label>
                    <textarea
                      rows={3}
                      value={facilitiesContent.subtext}
                      onChange={(e) => setFacilitiesContent({ ...facilitiesContent, subtext: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] leading-relaxed"
                    />
                  </div>
                </>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-md disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  <span>{saving ? 'Publishing to Atlas...' : 'Publish Live to Public Website'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right: Live Interactive Render Preview (6 cols) */}
        <div className="lg:col-span-6">
          <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs sticky top-4">
            <div className="flex items-center justify-between border-b border-[#EFECE3] pb-4 mb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#A68238] flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5 text-[#A68238]" />
                  <span>Live Interactive Render</span>
                </span>
                <h4 className="font-serif text-lg font-bold text-[#101B2D] capitalize mt-0.5">
                  Preview: {selectedPage === 'home' ? activeSection.replace('_', ' ') : selectedPage.replace('-', ' ')}
                </h4>
              </div>
              <a
                href={
                  selectedPage === 'home' ? '/'
                    : selectedPage === 'about' ? '/about'
                      : selectedPage === 'admissions' ? '/admissions'
                        : selectedPage === 'vision-mission' ? '/vision-mission'
                          : selectedPage === 'examinations' ? '/examinations'
                            : selectedPage === 'campus-life' ? '/campus-life'
                              : '/facilities'
                }
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#E3DCCB] text-xs font-bold text-[#A68238] hover:bg-[#101B2D] hover:text-[#C5A15B] transition"
              >
                Open Real Page ↗
              </a>
            </div>

            {/* Simulated Desktop Preview */}
            <div className="rounded-xl border border-[#101B2D]/20 overflow-hidden shadow-md bg-[#101B2D] text-[#F5F2EA] p-6 text-left">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <span className="text-xs font-mono text-white/50 tracking-wider">
                  PREVIEW WINDOW
                </span>
                <span className="text-xs font-mono text-white/40 tracking-wider">
                  khwopa.edu.np/{selectedPage === 'home' ? '' : selectedPage}
                </span>
              </div>

              {selectedPage === 'home' && activeSection === 'hero' && (
                <div className="space-y-4">
                  <p className="text-xs font-mono text-[#C5A15B] tracking-widest uppercase">
                    — {homeHero.eyebrow}
                  </p>
                  <h1 className="font-serif text-3xl font-bold leading-tight">
                    <span>{homeHero.line1} </span>
                    <span>{homeHero.line2} </span>
                    <span className="italic text-[#C5A15B] block">{homeHero.line3}</span>
                  </h1>
                  <p className="text-sm text-white/75 leading-relaxed max-w-md">
                    {homeHero.description}
                  </p>
                  <div className="flex items-center gap-2.5 pt-2">
                    <span className="px-3.5 py-2 rounded-lg bg-[#C5A15B] text-[#101B2D] font-bold text-xs">
                      {homeHero.ctaText}
                    </span>
                    <span className="px-3.5 py-2 rounded-lg border border-white/30 text-white font-semibold text-xs">
                      {homeHero.secondaryCtaText}
                    </span>
                  </div>
                </div>
              )}

              {selectedPage === 'home' && activeSection === 'why_khwopa' && (
                <div className="space-y-3.5">
                  <p className="text-xs font-mono text-[#C5A15B] uppercase tracking-widest">— {whyKhwopa.eyebrow}</p>
                  <h2 className="font-serif text-2xl font-bold">
                    {whyKhwopa.title} <span className="italic text-[#C5A15B]">{whyKhwopa.titleItalic}</span>
                  </h2>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-xs font-bold text-[#C5A15B]">01: {whyKhwopa.strength1Title}</p>
                      <p className="text-xs text-white/70 line-clamp-2 mt-1">{whyKhwopa.strength1Text}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-xs font-bold text-[#C5A15B]">02: {whyKhwopa.strength2Title}</p>
                      <p className="text-xs text-white/70 line-clamp-2 mt-1">{whyKhwopa.strength2Text}</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedPage === 'home' && activeSection === 'testimonials' && (
                <div className="space-y-3.5">
                  <p className="text-xs font-mono text-[#C5A15B] uppercase tracking-widest">— {testimonials.eyebrow}</p>
                  <blockquote className="font-serif text-xl italic text-[#C5A15B] border-l-2 border-[#C5A15B] pl-3.5">
                    "{testimonials.quote}"
                  </blockquote>
                  <p className="text-sm text-white/75 leading-relaxed">{testimonials.description}</p>
                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 mt-3">
                    <p className="text-xs font-bold text-white">{testimonials.ctaTitle}</p>
                    <p className="text-xs text-white/65 mt-1">{testimonials.ctaText}</p>
                  </div>
                </div>
              )}

              {selectedPage === 'home' && activeSection === 'newsletter' && (
                <div className="space-y-3.5 text-center py-4">
                  <p className="text-xs font-mono text-[#C5A15B] uppercase tracking-widest">{newsletter.eyebrow}</p>
                  <h3 className="font-serif text-2xl font-bold text-white">{newsletter.title}</h3>
                  <p className="text-sm text-white/75 max-w-md mx-auto leading-relaxed">{newsletter.description}</p>
                  <div className="inline-block px-4 py-2 rounded-lg bg-[#C5A15B] text-[#101B2D] font-bold text-xs mt-2">
                    Subscribe with Institutional Email
                  </div>
                </div>
              )}

              {selectedPage === 'about' && (
                <div className="space-y-4">
                  <p className="text-xs font-mono text-[#C5A15B] tracking-widest uppercase">— {aboutHero.eyebrow}</p>
                  <h1 className="font-serif text-2xl font-bold leading-tight">{aboutHero.heading}</h1>
                  <p className="text-sm text-white/75 leading-relaxed">{aboutHero.description}</p>
                  {aboutHero.bannerImage && (
                    <img
                      src={aboutHero.bannerImage}
                      alt="Khwopa Campus"
                      className="rounded-lg h-36 w-full object-cover border border-white/20 mt-3"
                    />
                  )}
                </div>
              )}

              {selectedPage === 'admissions' && (
                <div className="space-y-3.5">
                  <p className="text-xs font-mono text-[#C5A15B] tracking-widest uppercase">— {admissionsContent.eyebrow}</p>
                  <h1 className="font-serif text-2xl font-bold leading-tight">{admissionsContent.heading}</h1>
                  <p className="text-sm text-white/75 leading-relaxed">{admissionsContent.subtext}</p>
                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-white/50 block text-[11px] uppercase">Form Fee:</span>
                      <span className="font-bold text-[#C5A15B] mt-0.5 block">{admissionsContent.formFee}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-white/50 block text-[11px] uppercase">SEE Cutoff:</span>
                      <span className="font-bold text-[#C5A15B] mt-0.5 block">{admissionsContent.scienceGPA}</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedPage === 'vision-mission' && (
                <div className="space-y-3.5">
                  <p className="text-xs font-mono text-[#C5A15B] tracking-widest uppercase">— {visionMissionContent.eyebrow}</p>
                  <h2 className="font-serif text-2xl font-bold">{visionMissionContent.heading}</h2>
                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 space-y-1">
                    <span className="text-xs font-bold text-[#C5A15B] uppercase block">Vision:</span>
                    <p className="text-sm text-white/80 leading-relaxed">{visionMissionContent.vision}</p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 space-y-1">
                    <span className="text-xs font-bold text-[#C5A15B] uppercase block">Mission:</span>
                    <p className="text-sm text-white/80 leading-relaxed">{visionMissionContent.mission}</p>
                  </div>
                </div>
              )}

              {selectedPage === 'examinations' && (
                <div className="space-y-3.5">
                  <p className="text-xs font-mono text-[#C5A15B] tracking-widest uppercase">— {examContent.eyebrow}</p>
                  <h2 className="font-serif text-2xl font-bold">{examContent.heading}</h2>
                  <p className="text-sm text-white/75 leading-relaxed">{examContent.description}</p>
                  <div className="flex items-center gap-3 pt-2 text-xs">
                    <span className="px-3 py-1 rounded bg-[#C5A15B]/20 text-[#C5A15B] font-mono font-bold">
                      {examContent.centerCode}
                    </span>
                    <span className="text-white/70 font-mono">
                      {examContent.helpline}
                    </span>
                  </div>
                </div>
              )}

              {selectedPage === 'campus-life' && (
                <div className="space-y-3.5">
                  <p className="text-xs font-mono text-[#C5A15B] tracking-widest uppercase">— {campusLifeContent.eyebrow}</p>
                  <h2 className="font-serif text-2xl font-bold">{campusLifeContent.heading}</h2>
                  <p className="text-sm text-white/75 leading-relaxed">{campusLifeContent.subtext}</p>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-center">
                      <span className="text-sm font-bold text-[#C5A15B] block">{campusLifeContent.activeClubsCount}</span>
                      <span className="text-[11px] text-white/50 uppercase">Student Societies</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-center">
                      <span className="text-sm font-bold text-[#C5A15B] block">{campusLifeContent.annualEvents}</span>
                      <span className="text-[11px] text-white/50 uppercase">Campus Activities</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedPage === 'facilities' && (
                <div className="space-y-3.5">
                  <p className="text-xs font-mono text-[#C5A15B] tracking-widest uppercase">— {facilitiesContent.eyebrow}</p>
                  <h2 className="font-serif text-2xl font-bold">{facilitiesContent.heading}</h2>
                  <p className="text-sm text-white/75 leading-relaxed">{facilitiesContent.subtext}</p>
                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/80">
                    Physics, Chemistry, Biology & Optic Fiber ICT Suites
                  </div>
                </div>
              )}
            </div>

            <div className="text-xs text-slate-600 bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E3DCCB] flex items-center justify-between">
              <span>Live changes sync directly with MongoDB Atlas collection <code className="text-[#A68238] font-bold">pages</code></span>
              <span className="font-bold text-[#101B2D]">v2.4 Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
