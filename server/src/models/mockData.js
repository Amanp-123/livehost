const statsData = {
  activeUsers: "1.2M+ Patients",
  uptime: "99.99% Uptime",
  satisfactionRate: "99.4% Clinical CSAT",
  integrations: "450+ Hospitals"
};

const bannerAnnouncement = {
  enabled: true,
  badgeText: "🏥 ABDM MILESTONE",
  message: "mediOS 2.0 achieves 100% ABDM M1, M2 & M3 National Health Authority Certification!",
  linkText: "Read Certification",
  linkUrl: "#features"
};

const siteSettings = {
  siteName: "mediOS Health",
  supportEmail: "clinical-support@medios.health",
  maintenanceMode: false,
  allowRegistrations: true
};

const plansData = [
  {
    id: 1,
    name: "Clinic & Polyclinic",
    badge: "For Solo / Group Clinics",
    priceMonthly: 89,
    priceYearly: 69,
    desc: "Complete OPD queuing, digital e-prescriptions, WhatsApp patient updates, and billing.",
    popular: false,
    cta: "Start Clinic Trial"
  },
  {
    id: 2,
    name: "Hospital Multi-Specialty",
    badge: "Most Popular",
    priceMonthly: 299,
    priceYearly: 249,
    desc: "Full OPD/IPD beds management, OT Scheduling, LIMS Lab & Pharmacy sync, NABH reports.",
    popular: true,
    cta: "Schedule Hospital Onboarding"
  },
  {
    id: 3,
    name: "Enterprise Hospital Chain",
    badge: "For Hospital Networks",
    priceMonthly: 799,
    priceYearly: 649,
    desc: "Multi-branch EHR centralization, AI Diagnostic Copilot, custom HL7/FHIR integrations, and 24/7 dedicated clinical support.",
    popular: false,
    cta: "Contact Enterprise Healthcare"
  }
];

const faqsData = [
  {
    id: 1,
    question: "Is mediOS ABDM and ABHA compliant?",
    answer: "Yes, mediOS is officially certified across Milestone 1, 2, and 3 by the National Health Authority (NHA), enabling seamless digital health record exchange."
  },
  {
    id: 2,
    question: "Can mediOS integrate with our existing laboratory and radiology hardware?",
    answer: "Absolutely. mediOS comes with bidirectional HL7 / DICOM and ASTM protocol bridges that integrate directly with diagnostic analyzers, PACS, and imaging servers."
  },
  {
    id: 3,
    question: "How is patient medical data protected?",
    answer: "All EHR records are encrypted using AES-256 at rest and TLS 1.3 in transit with strict role-based access control complying with HIPAA and Indian DISHA regulations."
  }
];

const testimonialsData = [
  {
    id: 1,
    name: "Dr. Rajeshwar Rao",
    role: "Medical Director, Apollo City Hospitals",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
    comment: "mediOS cut our patient emergency discharge time from 45 minutes to under 8 minutes. The AI clinical summary is a gamechanger for our intensive care unit.",
    rating: 5
  },
  {
    id: 2,
    name: "Dr. Ananya Sen",
    role: "Head of Cardiology, Fortis Heart Institute",
    avatar: "https://images.unsplash.com/photo-1594824813637-280be0e2cf70?w=150&auto=format&fit=crop&q=80",
    comment: "The real-time ICU telemetry and zero-click prescription workflow helped our doctors see 30% more OPD patients with zero administrative fatigue.",
    rating: 5
  },
  {
    id: 3,
    name: "Vikram Malhotra",
    role: "Chief Operating Officer, MaxCare Health Network",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80",
    comment: "Switching our 6 hospital branches to mediOS reduced billing reconciliation errors to 0%. The best hospital operating system we've ever deployed.",
    rating: 5
  }
];


const leadsData = [
  { id: 1, email: "vikram.singh@techhub.in", createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: 2, email: "ananya.patel@startup.io", createdAt: new Date(Date.now() - 7200000).toISOString() }
];

const contactMessages = [
  {
    id: 1,
    name: "Rahul Mehta",
    email: "rahul@devstudio.com",
    subject: "Enterprise Custom Architecture",
    message: "Hey team, we are scaling to 1M users next month. Need custom SLA pricing.",
    createdAt: new Date(Date.now() - 1800000).toISOString()
  }
];

const activityLogs = [
  { id: 1, action: "Admin Logged in", time: "Just now", type: "auth" },
  { id: 2, action: "Live Stats updated", time: "5 mins ago", type: "edit" },
  { id: 3, action: "New lead captured: vikram.singh@techhub.in", time: "1 hour ago", type: "lead" }
];

module.exports = {
  statsData,
  bannerAnnouncement,
  siteSettings,
  plansData,
  faqsData,
  testimonialsData,
  leadsData,
  contactMessages,
  activityLogs
};

