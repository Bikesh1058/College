export const programmes = [
  {
    slug: "plus-two-science",
    code: "+2 SCIENCE",
    shortName: "+2 Science",
    fullName: "Higher Secondary (+2) Science",
    level: "Higher Secondary (+2)",
    faculty: "Science",
    facultySlug: "science",
    duration: "2 Years (Grades 11 & 12)",
    affiliation: "National Examination Board (NEB)",
    tagline: "Cultivating scientific inquiry, analytical discipline and pre-university mastery.",
    description: "The +2 Science programme at Khwopa Secondary School / Khwopa College offers rigorous theoretical education backed by modern laboratory experimentation in Physics, Chemistry, Biology, and Computer Science.",
    objectives: [
      "Develop analytical thinking and a solid grounding in physical and life sciences.",
      "Provide extensive hands-on laboratory training with modern apparatus.",
      "Prepare students for competitive entrance examinations in Engineering (IOE), Medicine (CEE/MBBS), and Pure Sciences."
    ],
    curriculum: [
      {
        year: "Grade 11",
        subjects: [
          "Compulsory English",
          "Compulsory Nepali",
          "Physics",
          "Chemistry",
          "Mathematics",
          "Biology (Bio Group) or Computer Science (CS Group)"
        ]
      },
      {
        year: "Grade 12",
        subjects: [
          "Compulsory English",
          "Compulsory Nepali",
          "Physics",
          "Chemistry",
          "Mathematics",
          "Biology (Bio Group) or Computer Science (CS Group)"
        ]
      }
    ],
    eligibility: "Minimum GPA 2.4 in SEE with minimum grade C+ in Compulsory Mathematics and Science.",
    careers: [
      "Engineering (Civil, Computer, Electrical, Architecture)",
      "Medical Sciences (MBBS, BDS, Pharmacy, Nursing)",
      "Information Technology & Software Engineering",
      "Applied Physics, Chemistry & Environmental Research"
    ]
  },
  {
    slug: "plus-two-management",
    code: "+2 MANAGEMENT",
    shortName: "+2 Management",
    fullName: "Higher Secondary (+2) Management",
    level: "Higher Secondary (+2)",
    faculty: "Management",
    facultySlug: "management",
    duration: "2 Years (Grades 11 & 12)",
    affiliation: "National Examination Board (NEB)",
    tagline: "Building dynamic business leadership, financial acumen and commerce foundations.",
    description: "Designed for future entrepreneurs, chartered accountants, and management professionals, blending foundational business principles with practical accounting, economics, and computing.",
    objectives: [
      "Master foundational principles of business, accounting, economics, and commerce.",
      "Gain proficiency in financial bookkeeping, business mathematics, and computer applications.",
      "Build organizational leadership, commercial communication, and corporate analytical skills."
    ],
    curriculum: [
      {
        year: "Grade 11",
        subjects: [
          "Compulsory English",
          "Compulsory Nepali",
          "Principles of Accounting",
          "Economics",
          "Business Mathematics or Social Studies",
          "Business Studies, Computer Science or Hotel Management"
        ]
      },
      {
        year: "Grade 12",
        subjects: [
          "Compulsory English",
          "Compulsory Nepali",
          "Principles of Accounting",
          "Economics",
          "Business Mathematics or Social Studies",
          "Business Studies, Computer Science, Marketing or Hotel Management"
        ]
      }
    ],
    eligibility: "Minimum GPA 2.0 in SEE. For Computer/Math combination, minimum grade C+ in Compulsory Mathematics.",
    careers: [
      "Chartered Accountancy (CA / ACCA)",
      "Banking, Insurance & Financial Services",
      "Business Management & Corporate Leadership",
      "Hospitality & Hotel Enterprise Management"
    ]
  },
  {
    slug: "plus-two-humanities",
    code: "+2 HUMANITIES",
    shortName: "+2 Humanities",
    fullName: "Higher Secondary (+2) Humanities & Social Sciences",
    level: "Higher Secondary (+2)",
    faculty: "Humanities & Social Sciences",
    facultySlug: "humanities-social-sciences",
    duration: "2 Years (Grades 11 & 12)",
    affiliation: "National Examination Board (NEB)",
    tagline: "Fostering social consciousness, literature, heritage preservation and critical thought.",
    description: "The +2 Humanities stream nurtures social awareness, literary appreciation, and civic responsibility through comprehensive study of Sociology, Mass Communication, Political Science, and Languages in historic Bhaktapur.",
    objectives: [
      "Cultivate critical inquiry into social structures, cultural heritage, and contemporary society.",
      "Master written and verbal communication in English, Nepali, and literature.",
      "Engage in community participatory fieldwork and social research."
    ],
    curriculum: [
      {
        year: "Grade 11",
        subjects: [
          "Compulsory English",
          "Compulsory Nepali",
          "Social Studies & Life Skills",
          "Sociology",
          "Major English / Major Nepali",
          "Mass Communication / Political Science / Economics"
        ]
      },
      {
        year: "Grade 12",
        subjects: [
          "Compulsory English",
          "Compulsory Nepali",
          "Social Studies & Life Skills",
          "Sociology",
          "Major English / Major Nepali",
          "Mass Communication / Political Science / Economics"
        ]
      }
    ],
    eligibility: "Minimum GPA 1.6 in SEE.",
    careers: [
      "Journalism, Media & Mass Communication",
      "Civil Services & Public Administration (Lok Sewa Aayog)",
      "Social Work & Community Development (NGO/INGO)",
      "Creative Writing, Literature & Translation Studies"
    ]
  },
  {
    slug: "plus-two-law",
    code: "+2 LAW",
    shortName: "+2 Law",
    fullName: "Higher Secondary (+2) Law",
    level: "Higher Secondary (+2)",
    faculty: "Law",
    facultySlug: "humanities-social-sciences",
    duration: "2 Years (Grades 11 & 12)",
    affiliation: "National Examination Board (NEB)",
    tagline: "Cultivating legal ethics, constitutional awareness and social justice advocacy.",
    description: "The +2 Law stream provides students with an early, comprehensive foundation in constitutional law, jurisprudence, procedural mechanisms, and legal drafting under experienced judicial mentors.",
    objectives: [
      "Understand constitutional frameworks, fundamental rights, and civil liberties.",
      "Build basic legal research, moot court argumentation, and advocacy skills.",
      "Prepare for advanced legal studies and judicial careers."
    ],
    curriculum: [
      {
        year: "Grade 11",
        subjects: [
          "Compulsory English",
          "Compulsory Nepali",
          "General Principles of Law",
          "Nepalese Legal System",
          "Constitutional Law",
          "Procedural Law"
        ]
      },
      {
        year: "Grade 12",
        subjects: [
          "Compulsory English",
          "Compulsory Nepali",
          "Jurisprudence & Legal Theories",
          "Civil & Criminal Law",
          "Human Rights & International Law",
          "Legal Drafting & Court Practice"
        ]
      }
    ],
    eligibility: "Minimum GPA 2.0 in SEE.",
    careers: [
      "Higher Legal Education & Jurisprudence Studies",
      "Judicial Services, Legal Practice & Advocacy",
      "Human Rights & Corporate Compliance",
      "Public Policy & Legislative Advisory"
    ]
  }
];

export const faculties = [
  {
    slug: "science",
    name: "Faculty of Science (+2)",
    shortName: "Science",
    deanOrHead: "Head of Science Faculty",
    affiliation: "National Examination Board (NEB)",
    description: "Equipped with dedicated physics, chemistry, biology and computer laboratories for practical learning.",
    programmes: ["plus-two-science"],
    studyAreas: [
      { number: "01", title: "Physics & Instrumentation", description: "Hands-on mechanics, optics, electricity, and electronics experiments." },
      { number: "02", title: "Chemical Sciences", description: "Comprehensive inorganic, organic, and physical chemistry qualitative analysis." },
      { number: "03", title: "Biological Sciences", description: "Specimen microscopy, botanical morphology, and ecological fieldwork." },
      { number: "04", title: "Computational Science", description: "Algorithmic thinking, C programming, database concepts, and networking." }
    ],
    learningApproach: [
      "Mandatory weekly 3-hour practical laboratory rotations per science discipline.",
      "Competitive entrance examination preparation sessions for engineering and medical boards.",
      "Scientific project exhibitions and field excursions."
    ]
  },
  {
    slug: "management",
    name: "Faculty of Management (+2)",
    shortName: "Management",
    deanOrHead: "Head of Management Faculty",
    affiliation: "National Examination Board (NEB)",
    description: "Developing dynamic young leaders with a strong grounding in accounting, economics, and business technology.",
    programmes: ["plus-two-management"],
    studyAreas: [
      { number: "01", title: "Financial Accounting", description: "Ledger bookkeeping, trial balances, final accounts, and taxation principles." },
      { number: "02", title: "Micro & Macro Economics", description: "Demand-supply mechanics, national income accounting, and monetary policy." },
      { number: "03", title: "Business Mathematics", description: "Financial calculus, statistical indices, probabilities, and commercial arithmetic." },
      { number: "04", title: "Hotel & Enterprise Management", description: "Hospitality operations, food production principles, and marketing strategies." }
    ],
    learningApproach: [
      "Computerized accounting software training in dedicated multimedia labs.",
      "Business model case presentations and enterprise simulation exercises.",
      "Guest sessions with chartered accountants and financial analysts."
    ]
  },
  {
    slug: "humanities-social-sciences",
    name: "Faculty of Humanities & Law (+2)",
    shortName: "Humanities & Law",
    deanOrHead: "Head of Humanities Faculty",
    affiliation: "National Examination Board (NEB)",
    description: "Fostering social consciousness, literature, mass media, and constitutional legal studies.",
    programmes: ["plus-two-humanities", "plus-two-law"],
    studyAreas: [
      { number: "01", title: "Sociological Inquiry", description: "Nepalese social diversity, community structures, and cultural heritage." },
      { number: "02", title: "Mass Communication & Media", description: "News reporting, broadcast journalism, and media ethics." },
      { number: "03", title: "Constitutional & Civil Law", description: "Fundamental human rights, legal systems, and courtroom procedure." },
      { number: "04", title: "Literary Studies", description: "Critical analysis of classical and contemporary English and Nepali literature." }
    ],
    learningApproach: [
      "Heritage walks and community social observation visits in historic Bhaktapur.",
      "Moot court trial demonstrations and legal debate competitions.",
      "Campus literary magazine publishing and feature writing workshops."
    ]
  }
];
