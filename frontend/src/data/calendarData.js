// Official Khwopa College (+2) Comprehensive Academic Calendar & Event Directory (2083 BS / 2026-2027 AD)

export const BS_MONTHS = [
  { id: 1, name: "Baishakh", nepali: "बैशाख", engRange: "Mid Apr – Mid May 2026", days: 31, startDayOfWeek: 1 }, // Starts on Monday
  { id: 2, name: "Jestha", nepali: "जेठ", engRange: "Mid May – Mid Jun 2026", days: 31, startDayOfWeek: 4 },
  { id: 3, name: "Ashadh", nepali: "असार", engRange: "Mid Jun – Mid Jul 2026", days: 32, startDayOfWeek: 0 },
  { id: 4, name: "Shrawan", nepali: "श्रावण", engRange: "Mid Jul – Mid Aug 2026", days: 31, startDayOfWeek: 4 },
  { id: 5, name: "Bhadra", nepali: "भाद्र", engRange: "Mid Aug – Mid Sep 2026", days: 31, startDayOfWeek: 0 },
  { id: 6, name: "Ashwin", nepali: "असोज", engRange: "Mid Sep – Mid Oct 2026", days: 30, startDayOfWeek: 3 },
  { id: 7, name: "Kartik", nepali: "कार्तिक", engRange: "Mid Oct – Mid Nov 2026", days: 30, startDayOfWeek: 5 },
  { id: 8, name: "Mangsir", nepali: "मंसिर", engRange: "Mid Nov – Mid Dec 2026", days: 29, startDayOfWeek: 0 },
  { id: 9, name: "Poush", nepali: "पुष", engRange: "Mid Dec – Mid Jan 2027", days: 30, startDayOfWeek: 1 },
  { id: 10, name: "Magh", nepali: "माघ", engRange: "Mid Jan – Mid Feb 2027", days: 29, startDayOfWeek: 3 },
  { id: 11, name: "Falgun", nepali: "फाल्गुन", engRange: "Mid Feb – Mid Mar 2027", days: 30, startDayOfWeek: 4 },
  { id: 12, name: "Chaitra", nepali: "चैत", engRange: "Mid Mar – Mid Apr 2027", days: 30, startDayOfWeek: 6 }
];

export const CALENDAR_CATEGORIES = [
  { id: "all", label: "All Items", color: "bg-slate-800 text-white" },
  { id: "exam", label: "Examinations & NEB", color: "bg-rose-100 text-rose-800 border-rose-300" },
  { id: "academic", label: "Academic & Terms", color: "bg-blue-100 text-blue-800 border-blue-300" },
  { id: "holiday", label: "Holidays & Festivals", color: "bg-amber-100 text-amber-800 border-amber-300" },
  { id: "event", label: "Campus Activities & Sports", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
  { id: "admission", label: "Class 11 Intake", color: "bg-purple-100 text-purple-800 border-purple-300" }
];

export const KHWOPA_CALENDAR_EVENTS = [
  // Baishakh 2083
  { id: "ev-1", monthId: 1, day: 1, title: "Nepali New Year 2083 / Bisket Jatra Commences", category: "holiday", time: "All Day", venue: "Bhaktapur Durbar Square & Taumadhi", desc: "Public Holiday & traditional Newar cultural celebration." },
  { id: "ev-2", monthId: 1, day: 2, title: "New Academic Session Orientation (Grade 12)", category: "academic", time: "7:00 AM", venue: "Central Auditorium", desc: "Welcome assembly and NEB curriculum distribution for senior scholars." },
  { id: "ev-3", monthId: 1, day: 14, title: "NEB Grade 12 Annual Board Examination Commences", category: "exam", time: "8:00 AM – 11:00 AM", venue: "Exam Center 104 (Blocks B & C)", desc: "Mandatory admit card and uniform verification." },
  { id: "ev-4", monthId: 1, day: 28, title: "Loktantra Diwas (National Democracy Day)", category: "holiday", time: "All Day", venue: "Campus Closed", desc: "Official institutional holiday." },

  // Jestha 2083
  { id: "ev-5", monthId: 2, day: 5, title: "Khwopa Annual Entrance Preparation Boot Camp", category: "academic", time: "11:30 AM", venue: "Science Lecture Hall 1", desc: "Model MCQ speed solving workshops for Grade 12 students." },
  { id: "ev-6", monthId: 2, day: 8, title: "NEB Grade 11 Annual Examination Starts", category: "exam", time: "8:00 AM – 11:00 AM", venue: "Exam Hall A & B", desc: "Grade 11 internal board exam evaluation under NEB supervision." },
  { id: "ev-7", monthId: 2, day: 22, title: "Science & Computer Practical Project Assessments", category: "academic", time: "9:00 AM – 4:00 PM", venue: "Physics & CS Labs", desc: "Viva voce, journal checks, and hardware simulation demos." },
  { id: "ev-8", monthId: 2, day: 29, title: "Bhaktapur Heritage Awareness & Social Fieldwork", category: "event", time: "8:00 AM", venue: "Bhaktapur Core Ward 1–10", desc: "Sociology & Culture department field observation survey." },

  // Ashadh 2083
  { id: "ev-9", monthId: 3, day: 15, title: "National SEE Results 2082 Published", category: "admission", time: "Afternoon", venue: "Online Portal / See.gov.np", desc: "SEE score cards and grade ledger released by OCE Sanothimi." },
  { id: "ev-10", monthId: 3, day: 18, title: "Khwopa +2 Online Admission Portal Opens (Class 11)", category: "admission", time: "9:00 AM", venue: "khwopa.edu.np/admissions/apply", desc: "Online applications open for Science, Management, Humanities, and Law." },
  { id: "ev-11", monthId: 3, day: 28, title: "Khwopa Class 11 Entrance Examination (Phase I)", category: "exam", time: "8:00 AM – 10:00 AM", venue: "Dekocha Campus Main Block", desc: "Mandatory entrance written test for all registered applicants." },

  // Shrawan 2083
  { id: "ev-12", monthId: 4, day: 5, title: "Entrance Merit List & Interview Counseling", category: "admission", time: "10:00 AM – 4:00 PM", venue: "Admissions Desk (Block A)", desc: "Document verification, scholarship quota seat awards, and fee settlement." },
  { id: "ev-13", monthId: 4, day: 15, title: "Class 11 Inauguration & Academic Kit Distribution", category: "academic", time: "8:00 AM", venue: "Khwopa Open Grounds", desc: "Formal inauguration with Bhaktapur Municipality representatives." },
  { id: "ev-14", monthId: 4, day: 20, title: "Commencement of Class 11 Regular Lectures", category: "academic", time: "6:30 AM (M) / 11:00 AM (D)", venue: "All Stream Classrooms", desc: "Regular classroom instructions start across all four faculties." },

  // Bhadra 2083
  { id: "ev-15", monthId: 5, day: 1, title: "Gai Jatra (Saparu Festival) & Gunla Parva", category: "holiday", time: "All Day", venue: "Bhaktapur Municipality", desc: "Local traditional cultural festival holiday in Bhaktapur." },
  { id: "ev-16", monthId: 5, day: 18, title: "Teej Festival (Haritalika Teej)", category: "holiday", time: "All Day", venue: "Campus Holiday", desc: "Traditional cultural holiday for women students and faculty." },
  { id: "ev-17", monthId: 5, day: 25, title: "First Unit Assessment (Class 11 & 12)", category: "exam", time: "Regular Class Hours", venue: "Department Classrooms", desc: "Diagnostic unit test to gauge conceptual retention." },

  // Ashwin 2083
  { id: "ev-18", monthId: 6, day: 3, title: "Constitution Day (Sambidhan Diwas)", category: "holiday", time: "All Day", venue: "National Holiday", desc: "Commemoration of the promulgation of the Constitution of Nepal." },
  { id: "ev-19", monthId: 6, day: 12, title: "Ghatasthapana / Autumn Dashain Vacation Commences", category: "holiday", time: "Full Recess", venue: "College Closed", desc: "Bada Dashain festival vacation starts." },

  // Kartik 2083
  { id: "ev-20", monthId: 7, day: 8, title: "College Reopens Post-Dashain", category: "academic", time: "6:30 AM", venue: "Campus Resumes", desc: "Resumption of all academic lectures and lab schedules." },
  { id: "ev-21", monthId: 7, day: 15, title: "Tihar / Deepawali & Chhath Holidays", category: "holiday", time: "Recess", venue: "College Closed", desc: "Festival of lights, Mha Puja, and Chhath Parva holiday." },
  { id: "ev-22", monthId: 7, day: 28, title: "First Terminal Examination (Grades 11 & 12)", category: "exam", time: "8:00 AM – 11:00 AM", venue: "Examination Block", desc: "Comprehensive 50-mark theoretical and practical midterm assessment." },

  // Mangsir 2083
  { id: "ev-23", monthId: 8, day: 10, title: "First Terminal Result Declaration & Parent Interaction", category: "academic", time: "11:00 AM – 3:00 PM", venue: "Central Hall", desc: "Distribution of progress reports and parent-teacher counseling." },
  { id: "ev-24", monthId: 8, day: 16, title: "Khwopa Science & Tech Exhibition 2083", category: "event", time: "10:00 AM – 5:00 PM", venue: "Campus Courtyard", desc: "Student engineering models, robotics, and biology exhibits." },
  { id: "ev-25", monthId: 8, day: 24, title: "Annual Inter-College Moot Court Competition", category: "event", time: "9:00 AM", venue: "Moot Court Room", desc: "+2 Law simulated trial debates and judicial argumentation." },

  // Poush 2083
  { id: "ev-26", monthId: 9, day: 12, title: "Khwopa Annual Sports Week 2083", category: "event", time: "All Week", venue: "Sports Ground & Indoor Arena", desc: "Track, football, volleyball, badminton, and table tennis matches." },
  { id: "ev-27", monthId: 9, day: 22, title: "Sports Week Prize Gala & Cultural Night", category: "event", time: "1:00 PM", venue: "Main Open Auditorium", desc: "Trophy presentations, medals, and traditional Newar dance." },
  { id: "ev-28", monthId: 9, day: 27, title: "Winter Recess Commences", category: "holiday", time: "Winter Break", venue: "Campus Closed", desc: "Annual winter vacation period." },

  // Magh 2083
  { id: "ev-29", monthId: 10, day: 8, title: "College Reopens after Winter Recess", category: "academic", time: "6:30 AM", venue: "Dekocha Campus", desc: "All departments resume regular lecture schedules." },
  { id: "ev-30", monthId: 10, day: 16, title: "Martyrs' Day (Shahid Diwas)", category: "holiday", time: "National Holiday", venue: "Campus Closed", desc: "Tribute to the martyrs of democratic movements in Nepal." },
  { id: "ev-31", monthId: 10, day: 24, title: "Second Terminal Examination (Pre-Board Assessment)", category: "exam", time: "8:00 AM – 11:00 AM", venue: "Exam Center 104", desc: "Full 75-mark mock test matching NEB annual question paper grid." },

  // Falgun 2083
  { id: "ev-32", monthId: 11, day: 7, title: "National Democracy Day (Prajatantra Diwas)", category: "holiday", time: "All Day", venue: "Campus Closed", desc: "National holiday." },
  { id: "ev-33", monthId: 11, day: 14, title: "Maha Shivaratri & Army Day", category: "holiday", time: "All Day", venue: "Public Holiday", desc: "National cultural holiday." },
  { id: "ev-34", monthId: 11, day: 22, title: "Pre-Board Exam Result & NEB Admit Card Distribution", category: "exam", time: "10:00 AM", venue: "Admissions & Exam Office", desc: "Clearance of library dues and distribution of NEB board admit cards." },

  // Chaitra 2083
  { id: "ev-35", monthId: 12, day: 8, title: "Fagu Purnima (Holi Festival)", category: "holiday", time: "All Day", venue: "Public Holiday", desc: "Festival of colours." },
  { id: "ev-36", monthId: 12, day: 15, title: "NEB Board Practical External Examination", category: "exam", time: "9:00 AM – 4:00 PM", venue: "Science & Computer Labs", desc: "External board examiners evaluate Physics, Chemistry, Biology & CS." },
  { id: "ev-37", monthId: 12, day: 28, title: "Academic Session Concludes / Prep Leave for NEB", category: "academic", time: "All Day", venue: "Dekocha Campus", desc: "Study leave granted for final NEB Annual Board Examinations." }
];

