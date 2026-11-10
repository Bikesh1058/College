export const examinationsData = {
  routines: [
    {
      id: "rout-01",
      title: "Final Schedule – NEB Grade 12 Annual Board Examination 2083",
      programme: "+2 Science, Management, Humanities & Law",
      year: "Grade 12",
      level: "Higher Secondary (+2)",
      publishedDate: "12 October 2026",
      examStartDate: "28 April 2027",
      fileType: "PDF",
      fileSize: "410 KB",
      downloadUrl: "https://neb.gov.np",
      isRevised: false
    },
    {
      id: "rout-02",
      title: "Routine – NEB Grade 11 Annual Examination & Practical Evaluation 2083",
      programme: "+2 Science & Management",
      year: "Grade 11",
      level: "Higher Secondary (+2)",
      publishedDate: "05 October 2026",
      examStartDate: "10 May 2027",
      fileType: "PDF",
      fileSize: "320 KB",
      downloadUrl: "https://neb.gov.np",
      isRevised: false
    },
    {
      id: "rout-03",
      title: "Revised Routine – Grade 12 Supplementary Examination 2082",
      programme: "+2 All Streams",
      year: "Grade 12 Supplementary",
      level: "Higher Secondary (+2)",
      publishedDate: "20 September 2026",
      examStartDate: "08 October 2026",
      fileType: "PDF",
      fileSize: "284 KB",
      downloadUrl: "https://neb.gov.np",
      isRevised: true
    },
    {
      id: "rout-04",
      title: "Schedule – Second Terminal Examination (Grades 11 & 12)",
      programme: "+2 Science, Management, Law & Humanities",
      year: "Internal Evaluation",
      level: "Higher Secondary (+2)",
      publishedDate: "15 September 2026",
      examStartDate: "25 Poush 2082",
      fileType: "PDF",
      fileSize: "195 KB",
      downloadUrl: "https://neb.gov.np",
      isRevised: false
    }
  ],
  forms: [
    {
      id: "form-01",
      title: "NEB Board Examination Registration Form – Grade 11 Regular Intake 2082",
      programme: "+2 All Streams (Science, Management, Law, Humanities)",
      level: "Higher Secondary (+2)",
      publishedDate: "15 September 2026",
      deadlineRegular: "15 Mangsir 2082",
      deadlineLate: "30 Mangsir 2082",
      feeRegular: "Rs. 600",
      feeLate: "Rs. 1,200",
      fileType: "PDF",
      fileSize: "380 KB",
      instructions: "Attach 2 passport-size photographs in college uniform, certified copy of SEE Grade Sheet, and submit at the Examination Desk (Block B)."
    },
    {
      id: "form-02",
      title: "NEB Board Exam Application Form – Grade 12 Annual Examination 2083",
      programme: "+2 Grade 12 Regular & Partial",
      level: "Higher Secondary (+2)",
      publishedDate: "20 Poush 2082",
      deadlineRegular: "15 Magh 2082",
      deadlineLate: "29 Magh 2082",
      feeRegular: "Rs. 800",
      feeLate: "Rs. 1,600",
      fileType: "PDF",
      fileSize: "420 KB",
      instructions: "Fill subject codes carefully as per Grade 11 registration card. Clear all college dues before obtaining the clearance voucher."
    }
  ],
  seatPlans: [
    {
      id: "seat-01",
      title: "NEB Board Examination Centre & Hall Allocation – Khwopa Centre (Code: 104)",
      examName: "NEB Grade 12 Annual Examination",
      noticeDate: "20 Baishakh 2083",
      centreName: "Khwopa Higher Secondary School, Dekocha, Bhaktapur",
      allocations: [
        { college: "Khwopa College (+2 Science)", rollNumbers: "1040001 - 1040380", rooms: "Block B (Rooms 201 - 208)" },
        { college: "Khwopa College (+2 Management)", rollNumbers: "1040381 - 1040750", rooms: "Block C (Rooms 101 - 106)" },
        { college: "External Institutional Examinees", rollNumbers: "1040751 - 1040920", rooms: "Block B (Top Floor Hall)" }
      ]
    },
    {
      id: "seat-02",
      title: "Pre-Board Terminal Examination Seating Distribution",
      examName: "+2 Terminal Examination",
      noticeDate: "10 Poush 2082",
      centreName: "Main Academic Complex, Blocks B & C",
      allocations: [
        { college: "Grade 11 All Streams", rollNumbers: "All Regular Students", rooms: "Block B Halls" },
        { college: "Grade 12 All Streams", rollNumbers: "All Regular Students", rooms: "Block C Halls" }
      ]
    }
  ],
  guidelines: [
    {
      title: "Admit Card & Institutional Identification",
      rule: "Candidates must bring their original NEB Admit Card along with their official Khwopa College Student ID card to every examination session. No candidate will be admitted without valid credentials."
    },
    {
      title: "Reporting Time & Entry Protocol",
      rule: "Examinees must report to the campus gate at least 30 minutes prior to the commencement of the examination. The exam hall doors close strictly 15 minutes after the starting bell."
    },
    {
      title: "Prohibited Electronics & Smart Devices",
      rule: "Mobile phones, smartwatches, programmable calculators, electronic memory aids, and loose papers are strictly forbidden inside examination halls. Possession entails immediate paper cancellation."
    },
    {
      title: "CCTV Surveillance & Hall Decorum",
      rule: "All examination halls are under active CCTV surveillance and external NEB superintendent monitoring. Any attempt at cheating or disruption will result in expulsion and police custody as per the Education Act."
    },
    {
      title: "Stationery & Permitted Materials",
      rule: "Candidates must bring their own pens, geometry sets, and non-programmable calculators. Borrowing items during the examination is strictly prohibited."
    }
  ]
};
