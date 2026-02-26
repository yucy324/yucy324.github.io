const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const masthead = document.querySelector(".masthead");
const navOverview = document.getElementById("navOverview");
const navNews = document.getElementById("navNews");
const navJourney = document.getElementById("navJourney");
const navPublications = document.getElementById("navPublications");
const navProjects = document.getElementById("navProjects");
const navAwards = document.getElementById("navAwards");
const navContact = document.getElementById("navContact");

const profileName = document.getElementById("profileName");
const profileTitle = document.getElementById("profileTitle");
const profileBio = document.getElementById("profileBio");
const profileSections = document.getElementById("profileSections");
const profileMeta = document.getElementById("profileMeta");

const summaryText = document.getElementById("summaryText");

const aboutText = document.getElementById("aboutText");
const aboutFeatures = document.getElementById("aboutFeatures");

const newsList = document.getElementById("newsList");
const journeyList = document.getElementById("journeyList");
const pubFilterChips = document.getElementById("pubFilterChips");
const pubList = document.getElementById("pubList");
const projectFilterChips = document.getElementById("projectFilterChips");
const projectList = document.getElementById("projectList");
const awardsList = document.getElementById("awardsList");
const contactText = document.getElementById("contactText");
const contactEmail = document.getElementById("contactEmail");
const updatedAt = document.getElementById("updatedAt");
const updatedLabel = document.getElementById("updatedLabel");
const footerInspired = document.getElementById("footerInspired");
const profileGlobeSection = document.getElementById("profileGlobeSection");
const profileGlobeTitle = document.getElementById("profileGlobeTitle");
const clustrGlobeScript = document.getElementById("clstr_globe");
const newsTitle = document.getElementById("newsTitle");
const journeyTitle = document.getElementById("journeyTitle");
const publicationsTitle = document.getElementById("publicationsTitle");
const publicationsTitleText = document.getElementById("publicationsTitleText");
const publicationsFullListLink = document.getElementById("publicationsFullListLink");
const projectsTitle = document.getElementById("projectsTitle");
const awardsTitle = document.getElementById("awardsTitle");
const contactTitle = document.getElementById("contactTitle");
const pubFilterHint = document.getElementById("pubFilterHint");
const projectFilterHint = document.getElementById("projectFilterHint");
const langBtnEn = document.getElementById("langBtnEn");
const langBtnZh = document.getElementById("langBtnZh");
let emailModal = null;
let emailModalAddress = null;
let emailModalCopyBtn = null;
let emailModalKicker = null;
let emailModalTitle = null;
let emailModalClose = null;
let pubImageModal = null;
let pubImageModalImg = null;
let pubImageModalPdf = null;
let contentCache = null;

const LANGS = new Set(["en", "zh"]);
let currentLang = "en";
const isPublicationsPage = document.body.classList.contains("publications-page");
const PROFILE_TIME_PANEL_ID = "profileTimeSection";
const PROFILE_TIME_TZ = [
  { key: "cn", label: "China Time", timeZone: "Asia/Shanghai", fallbackOffset: 8 },
  {
    key: "aoe",
    label: "AOE Time",
    subLabel: "UTC-12",
    link: "https://time.is/Anywhere_on_Earth",
    timeZone: "Etc/GMT+12",
    fallbackOffset: -12,
  },
  { key: "utc", label: "UTC Time", timeZone: "Etc/UTC", fallbackOffset: 0 },
  { key: "utc8", label: "UTC-8 Time", timeZone: "Etc/GMT+8", fallbackOffset: -8 },
];
let profileTimeTicker = null;
const PUBLICATION_SORT_MODE = {
  YEAR: "year",
  AUTHOR: "author",
};
const PUBLICATION_AUTHOR_ROLE_OPTIONS = [
  { label: "First/Co-first", value: "caiyang-first" },
  { label: "Corresponding/Co-corresponding", value: "caiyang-corresponding" },
];
let currentPublicationSortMode = PUBLICATION_SORT_MODE.YEAR;
let currentPublicationCards = [];

const CONTENT_BASE = window.CONTENT_BASE_PATH || "./content";
const PUBLICATIONS_LEGACY_FILE = "publications.json";

const FALLBACK = {
  profile: {
    name: "Your Name",
    title: "Researcher / Engineer",
    bio: "Focused on practical AI and machine learning systems.",
    sections: [
      {
        title: "Current",
        items: ["Research Scientist, Your Lab / Company", "Wenzhou, China"],
      },
      {
        title: "Research",
        items: ["Multimodal Learning", "Representation Learning", "Model Efficiency"],
      },
      {
        title: "Education",
        items: ["Ph.D. Candidate in Computer Science", "B.Sc. in AI / CS"],
      },
    ],
    meta: [
      { icon: "📍", iconSrc: "./pic/address.png", text: "Wenzhou, China" },
      { icon: "✉️", iconSrc: "./pic/email.png", text: "Email", url: "mailto:you@example.com" },
      {
        icon: "🔩",
        iconSrc: "./pic/researchgate.png",
        text: "ResearchGate",
        url: "https://www.researchgate.net/",
      },
      { icon: "🐙", iconSrc: "./pic/GitHub.png", text: "Github", url: "https://github.com/" },
      {
        icon: "🎗",
        iconSrc: "./pic/Google%20Scholar.png",
        text: "Google Scholar",
        url: "https://scholar.google.com/",
      },
      { icon: "🧬", text: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { icon: "🆔", iconSrc: "./pic/orcid.png", text: "ORCID", url: "https://orcid.org/" },
    ],
  },
  overview: {
    summary: {
      en: "I am focused on practical machine learning and AI systems, turning research ideas into reliable, deliverable products.",
      zh: "我专注机器学习与 AI 系统落地，擅长把研究想法快速变成稳定可交付的产品能力。",
    },
  },
  about: {
    intro:
      "I focus on applying machine learning in real scenarios, especially multimodal understanding and efficient model design.",
    cards: [
      {
        title: "Research Focus",
        items: ["Representation Learning", "Multimodal Modeling", "Model Efficiency"],
      },
      {
        title: "Engineering",
        items: ["PyTorch / CUDA", "Training & Inference Pipeline", "Production Deployment"],
      },
      {
        title: "Collaboration",
        items: ["Academic Collaboration", "Industry Deployment", "Open Source"],
      },
    ],
  },
  news: {
    items: [
      { date: "2026.02", text: "Launched the new personal homepage with timeline and multi-select filters." },
      { date: "2026.01", text: "One multimodal paper accepted by a top conference (example)." },
      { date: "2025.11", text: "Invited to share model deployment experience in a tech community (example)." },
    ],
  },
  journey: {
    items: [
      {
        period: "2024.01 - Present",
        title: "AI Research & Engineering",
        detail: "Focused on multimodal understanding and efficient training/inference, with research and project outputs.",
      },
      {
        period: "2022.09 - 2024.01",
        title: "Graduate Research",
        detail: "Built a full research workflow from problem definition to experiments.",
      },
      {
        period: "2018.09 - 2022.06",
        title: "Undergraduate Study",
        detail: "Completed core training in computer science and mathematics.",
      },
    ],
  },
  publications: {
    items: [
      {
        badge: "CVPR 2026",
        imageSrc: "./assets/img/avatar.svg",
        title: "Title of Your Paper One",
        authors: "Your Name, Co-author A, Co-author B",
        venue: "Conference / Journal, 2026",
        type: "Multimodal",
        sci: "SCI Q1",
        ccf: "CCF A",
        tags: ["Vision", "Efficiency"],
        resources: { paper: "#", code: "#", cite: "#" },
      },
      {
        badge: "NeurIPS 2025",
        imageSrc: "./assets/img/avatar.svg",
        title: "Title of Your Paper Two",
        authors: "Your Name, Co-author C",
        venue: "Conference / Journal, 2025",
        type: "Medical",
        sci: "SCI Q2",
        ccf: "CCF B",
        tags: ["Multimodal"],
        resources: { paper: "#", cite: "#" },
      },
      {
        badge: "ICML 2025",
        imageSrc: "./assets/img/avatar.svg",
        title: "Title of Your Paper Three",
        authors: "Your Name, Co-author D, Co-author E",
        venue: "Conference / Journal, 2025",
        type: "Other",
        sci: "SCI Q1",
        ccf: "CCF C",
        tags: ["Vision", "Multimodal"],
        resources: { paper: "#", code: "#", cite: "#" },
      },
    ],
  },
  projects: {
    items: [
      {
        name: "Realtime Visual QA Assistant",
        period: "2025",
        summary: "Integrated visual understanding models into QA systems with image-text retrieval and explainability.",
        impact: "Served 5 internal teams and improved issue localization efficiency by ~35%.",
        tags: ["Vision", "Multimodal", "Product"],
        links: [
          { label: "Case", url: "#" },
          { label: "Code", url: "#" },
        ],
      },
      {
        name: "Efficient Fine-tuning Toolkit",
        period: "2024 - 2025",
        summary: "Unified fine-tuning workflow with training, evaluation, and export tools.",
        impact: "Reduced single experiment cost by ~40% and increased script reuse.",
        tags: ["Efficiency", "Infra"],
        links: [{ label: "Repo", url: "#" }],
      },
      {
        name: "Cross-modal Retrieval Demo",
        period: "2024",
        summary: "Implemented a cross-modal retrieval demo with bi-directional image-text matching.",
        impact: "Used as PoC demo to support multimodal project kickoff.",
        tags: ["Multimodal", "Demo"],
        links: [{ label: "Demo", url: "#" }],
      },
    ],
  },
  awards: {
    items: [
      { date: "2025", text: "Outstanding Graduate Scholarship (example)" },
      { date: "2024", text: "Competition First Prize (example)" },
    ],
  },
  contact: {
    text: "If you would like to collaborate on projects, papers, or technical topics, feel free to reach out by email.",
    email: "you@example.com",
  },
  meta: {
    updatedAt: "",
    clustrmaps: {
      enabled: true,
      title: "Visitor Globe",
      siteId: "1c979",
      globeToken: "Vr-eYn9fNnJRWR6kcXJa5akQlOll4HKWjM--Xfn5inY",
    },
  },
};

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add("in");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 },
);

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.4 },
);

const slugify = (text) =>
  String(text || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getAnchorIdFromHref = (href) => {
  const raw = String(href || "").trim();
  if (!raw) {
    return "";
  }
  const hashIndex = raw.indexOf("#");
  if (hashIndex < 0 || hashIndex === raw.length - 1) {
    return "";
  }
  return raw.slice(hashIndex + 1);
};

const isPdfAsset = (src) => /\.pdf(?:$|[?#])/i.test(String(src || "").trim());
const PDFJS_LIB_SRC = "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js";
const PDFJS_WORKER_SRC = "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";
let pdfJsLoadPromise = null;

const resolveAssetUrl = (src) => {
  const raw = String(src || "").trim();
  if (!raw) {
    return "";
  }
  try {
    return new URL(raw, window.location.href).toString();
  } catch (_err) {
    return encodeURI(raw);
  }
};

const buildPdfPreviewSrc = (src) => {
  const resolved = resolveAssetUrl(src);
  if (!resolved) {
    return "";
  }
  const base = resolved.split("#")[0];
  return `${base}#page=1&view=Fit&toolbar=0&navpanes=0&scrollbar=0`;
};

const ensurePdfJsLib = async () => {
  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_SRC;
    return window.pdfjsLib;
  }
  if (pdfJsLoadPromise) {
    return pdfJsLoadPromise;
  }

  pdfJsLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = PDFJS_LIB_SRC;
    script.async = true;
    script.onload = () => {
      if (!window.pdfjsLib) {
        reject(new Error("pdfjsLib not found after script load"));
        return;
      }
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_SRC;
      resolve(window.pdfjsLib);
    };
    script.onerror = () => reject(new Error("Failed to load PDF.js"));
    document.head.appendChild(script);
  });

  return pdfJsLoadPromise;
};

const renderPdfThumbnail = async (canvas, src, fallbackNode) => {
  if (!(canvas instanceof HTMLCanvasElement)) {
    return;
  }
  const pdfSrc = resolveAssetUrl(src);
  if (!pdfSrc) {
    if (fallbackNode) {
      fallbackNode.hidden = false;
    }
    return;
  }

  try {
    const pdfjsLib = await ensurePdfJsLib();
    const task = pdfjsLib.getDocument({ url: pdfSrc });
    const pdf = await task.promise;
    const page = await pdf.getPage(1);

    const holder = canvas.parentElement;
    const maxWidth = Math.max(180, holder?.clientWidth || 320);
    const maxHeight = Math.max(140, Math.min(260, Math.round(maxWidth * 0.9)));

    const baseViewport = page.getViewport({ scale: 1 });
    const scale = Math.max(0.1, Math.min(maxWidth / baseViewport.width, maxHeight / baseViewport.height));
    const viewport = page.getViewport({ scale });

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.floor(viewport.width * dpr));
    canvas.height = Math.max(1, Math.floor(viewport.height * dpr));
    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      throw new Error("No 2d context");
    }
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, viewport.width, viewport.height);

    await page.render({ canvasContext: context, viewport }).promise;

    if (fallbackNode) {
      fallbackNode.hidden = true;
    }
  } catch (error) {
    console.warn("PDF thumbnail render failed:", error);
    if (fallbackNode) {
      fallbackNode.hidden = false;
    }
  }
};

const UI_TEXT = {
  en: {
    menuAria: "Toggle navigation menu",
    nav: {
      overview: "Profile",
      news: "News",
      journey: "Journey",
      publications: "Publications",
      projects: "Projects",
      awards: "Awards",
      contact: "Contact",
    },
    titles: {
      news: "News",
      journey: "Journey Timeline",
      publications: "Publications",
      projects: "Projects",
      awards: "Awards",
      contact: "Contact",
    },
    filterHint: "Multiple selection, intersection filter (AND).",
    publicationFilterHint: "★ First Author    ✉ Corresponding Author",
    publicationsFullList: "(Full List)",
    footerUpdated: "Updated at",
    footerInspired: "Inspired by academic homepage style.",
    allChip: "All",
    emailModal: {
      closeAria: "Close",
      kicker: "Contact",
      title: "Email Address",
      copy: "Copy email",
      copied: "Copied",
    },
  },
  zh: {
    menuAria: "Toggle navigation menu",
    nav: {
      overview: "Profile",
      news: "News",
      journey: "Journey",
      publications: "Publications",
      projects: "Projects",
      awards: "Awards",
      contact: "Contact",
    },
    titles: {
      news: "News",
      journey: "Journey Timeline",
      publications: "Publications",
      projects: "Projects",
      awards: "Awards",
      contact: "Contact",
    },
    filterHint: "Multiple selection, intersection filter (AND).",
    publicationFilterHint: "★ First Author    ✉ Corresponding Author",
    publicationsFullList: "(Full List)",
    footerUpdated: "Updated at",
    footerInspired: "Inspired by academic homepage style.",
    allChip: "All",
    emailModal: {
      closeAria: "Close",
      kicker: "Contact",
      title: "Email Address",
      copy: "Copy email",
      copied: "Copied",
    },
  },
};

const getUiText = () => UI_TEXT[currentLang] || UI_TEXT.en;

const getLocalizedText = (value, fallback = "") => {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const picked = value[currentLang] ?? value.en ?? value.zh;
    if (typeof picked === "string") {
      return picked;
    }
    return fallback;
  }

  if (value === undefined || value === null) {
    return fallback;
  }

  return String(value);
};

const getEnglishText = (value, fallback = "") => {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const picked = value.en ?? value.zh;
    if (typeof picked === "string") {
      return picked;
    }
    return fallback;
  }

  if (value === undefined || value === null) {
    return fallback;
  }

  return String(value);
};

const updateEmailModalLanguage = (copied = false) => {
  const ui = UI_TEXT.en;
  emailModalKicker = emailModalKicker || document.getElementById("emailModalKicker");
  emailModalTitle = emailModalTitle || document.getElementById("emailModalTitle");
  emailModalClose = emailModalClose || document.getElementById("emailModalClose");
  emailModalCopyBtn = emailModalCopyBtn || document.getElementById("emailModalCopyBtn");

  if (emailModalClose) {
    emailModalClose.setAttribute("aria-label", ui.emailModal.closeAria);
  }
  if (emailModalKicker) {
    emailModalKicker.textContent = ui.emailModal.kicker;
  }
  if (emailModalTitle) {
    emailModalTitle.textContent = ui.emailModal.title;
  }
  const copyLabel = emailModalCopyBtn?.querySelector(".copy-label");
  if (copyLabel) {
    copyLabel.textContent = copied ? ui.emailModal.copied : ui.emailModal.copy;
  }
};

const applyStaticLanguage = () => {
  const ui = UI_TEXT.en;

  document.documentElement.lang = "en";

  if (menuToggle) {
    menuToggle.setAttribute("aria-label", ui.menuAria);
  }
  if (navOverview) {
    navOverview.textContent = ui.nav.overview;
  }
  if (navNews) {
    navNews.textContent = ui.nav.news;
  }
  if (navJourney) {
    navJourney.textContent = ui.nav.journey;
  }
  if (navPublications) {
    navPublications.textContent = ui.nav.publications;
  }
  if (navProjects) {
    navProjects.textContent = ui.nav.projects;
  }
  if (navAwards) {
    navAwards.textContent = ui.nav.awards;
  }
  if (navContact) {
    navContact.textContent = ui.nav.contact;
  }

  if (newsTitle) {
    newsTitle.textContent = ui.titles.news;
  }
  if (journeyTitle) {
    journeyTitle.textContent = ui.titles.journey;
  }
  if (publicationsTitleText) {
    publicationsTitleText.textContent = ui.titles.publications;
  } else if (publicationsTitle) {
    publicationsTitle.textContent = ui.titles.publications;
  }
  if (publicationsFullListLink) {
    publicationsFullListLink.textContent = ui.publicationsFullList;
    publicationsFullListLink.href = "./publications.html";
  }
  if (projectsTitle) {
    projectsTitle.textContent = ui.titles.projects;
  }
  if (awardsTitle) {
    awardsTitle.textContent = ui.titles.awards;
  }
  if (contactTitle) {
    contactTitle.textContent = ui.titles.contact;
  }
  if (pubFilterHint) {
    if (pubFilterHint.classList.contains("filter-hint--authors")) {
      pubFilterHint.textContent = "";
      const legend = document.createElement("div");
      legend.className = "hint-author-legend";

      const first = document.createElement("span");
      first.className = "hint-author-item";
      first.textContent = "★ First Author";

      const corresponding = document.createElement("span");
      corresponding.className = "hint-author-item";
      corresponding.textContent = "✉ Corresponding Author";

      legend.appendChild(first);
      legend.appendChild(corresponding);
      pubFilterHint.appendChild(legend);

      if (isPublicationsPage) {
        const sortSwitch = document.createElement("div");
        sortSwitch.className = "pub-sort-switch";

        const sortYearBtn = document.createElement("button");
        sortYearBtn.type = "button";
        sortYearBtn.className = "pub-sort-btn";
        sortYearBtn.dataset.sortMode = PUBLICATION_SORT_MODE.YEAR;
        sortYearBtn.textContent = "Sort by Year";
        sortYearBtn.addEventListener("click", () => setPublicationSortMode(PUBLICATION_SORT_MODE.YEAR));

        const sortDivider = document.createElement("span");
        sortDivider.className = "pub-sort-divider";
        sortDivider.textContent = "/";

        const sortAuthorBtn = document.createElement("button");
        sortAuthorBtn.type = "button";
        sortAuthorBtn.className = "pub-sort-btn";
        sortAuthorBtn.dataset.sortMode = PUBLICATION_SORT_MODE.AUTHOR;
        sortAuthorBtn.textContent = "Sort by Author Order";
        sortAuthorBtn.addEventListener("click", () => setPublicationSortMode(PUBLICATION_SORT_MODE.AUTHOR));

        sortSwitch.appendChild(sortYearBtn);
        sortSwitch.appendChild(sortDivider);
        sortSwitch.appendChild(sortAuthorBtn);
        pubFilterHint.appendChild(sortSwitch);
        updatePublicationSortSwitchUI();
      }
    } else {
      pubFilterHint.textContent = ui.publicationFilterHint || ui.filterHint;
    }
  }
  if (projectFilterHint) {
    projectFilterHint.textContent = ui.filterHint;
  }
  if (updatedLabel) {
    updatedLabel.textContent = ui.footerUpdated;
  }
  if (footerInspired) {
    footerInspired.textContent = ui.footerInspired;
  }

  if (langBtnEn) {
    langBtnEn.textContent = "EN";
    langBtnEn.classList.toggle("active", currentLang === "en");
    langBtnEn.setAttribute("aria-pressed", currentLang === "en" ? "true" : "false");
  }
  if (langBtnZh) {
    langBtnZh.textContent = "中文";
    langBtnZh.classList.toggle("active", currentLang === "zh");
    langBtnZh.setAttribute("aria-pressed", currentLang === "zh" ? "true" : "false");
  }

  updateEmailModalLanguage(false);
};

const observeRevealElements = (root = document) => {
  root.querySelectorAll(".reveal").forEach((el) => {
    if (el.dataset.revealBound === "1") {
      return;
    }
    el.dataset.revealBound = "1";
    revealObserver.observe(el);
  });
};

const createTag = (text) => {
  const span = document.createElement("span");
  span.textContent = getEnglishText(text);
  return span;
};

const createLink = (item) => {
  const link = document.createElement("a");
  link.href = item.url || "#";
  link.textContent = getEnglishText(item.label, "Link");
  if (/^https?:\/\//.test(link.href)) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
  return link;
};

const pad2 = (value) => String(value).padStart(2, "0");

const formatTimeByUtcOffset = (baseDate, offsetHours) => {
  const utcMs = baseDate.getTime() + baseDate.getTimezoneOffset() * 60 * 1000;
  const targetMs = utcMs + Number(offsetHours || 0) * 60 * 60 * 1000;
  const d = new Date(targetMs);
  const year = d.getUTCFullYear();
  const month = pad2(d.getUTCMonth() + 1);
  const day = pad2(d.getUTCDate());
  const hour = pad2(d.getUTCHours());
  const minute = pad2(d.getUTCMinutes());
  const second = pad2(d.getUTCSeconds());
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

const formatTimeByIanaTimeZone = (baseDate, timeZone, fallbackOffset = 0) => {
  try {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).formatToParts(baseDate);

    const map = {};
    parts.forEach((part) => {
      map[part.type] = part.value;
    });

    if (map.year && map.month && map.day && map.hour && map.minute && map.second) {
      return `${map.year}-${map.month}-${map.day} ${map.hour}:${map.minute}:${map.second}`;
    }
  } catch (_err) {
    // Ignore and fallback to UTC offset math.
  }
  return formatTimeByUtcOffset(baseDate, fallbackOffset);
};

const ensureProfileTimePanel = () => {
  if (isPublicationsPage || !profileGlobeSection) {
    return null;
  }

  let panel = document.getElementById(PROFILE_TIME_PANEL_ID);
  if (!panel) {
    panel = document.createElement("section");
    panel.id = PROFILE_TIME_PANEL_ID;
    panel.className = "profile-time-section";

    const title = document.createElement("h3");
    title.className = "profile-time-title";
    title.textContent = "World Clocks";
    panel.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "profile-time-grid";

    PROFILE_TIME_TZ.forEach((item) => {
      const row = document.createElement("div");
      row.className = "profile-time-row";

      const labelWrap = document.createElement("div");
      labelWrap.className = "profile-time-label-wrap";
      if (item.link) {
        const labelLink = document.createElement("a");
        labelLink.className = "profile-time-label profile-time-label--link";
        labelLink.href = item.link;
        labelLink.target = "_blank";
        labelLink.rel = "noopener noreferrer";
        labelLink.textContent = item.label;
        labelWrap.appendChild(labelLink);
      } else {
        const label = document.createElement("span");
        label.className = "profile-time-label";
        label.textContent = item.label;
        labelWrap.appendChild(label);
      }
      if (item.subLabel) {
        const subLabel = document.createElement("span");
        subLabel.className = "profile-time-sublabel";
        subLabel.textContent = item.subLabel;
        labelWrap.appendChild(subLabel);
      }

      const value = document.createElement("span");
      value.className = "profile-time-value";
      value.dataset.timezone = item.timeZone || "";
      value.dataset.offset = String(item.fallbackOffset || 0);
      value.dataset.key = item.key;
      value.textContent = "--";

      row.appendChild(labelWrap);
      row.appendChild(value);
      grid.appendChild(row);
    });

    panel.appendChild(grid);
  }

  const parent = profileGlobeSection.parentElement;
  if (parent) {
    const nextNode = profileGlobeSection.nextSibling;
    if (nextNode) {
      parent.insertBefore(panel, nextNode);
    } else {
      parent.appendChild(panel);
    }
  }

  return panel;
};

const updateProfileTimes = () => {
  const panel = document.getElementById(PROFILE_TIME_PANEL_ID);
  if (!panel) {
    return;
  }
  const now = new Date();
  panel.querySelectorAll(".profile-time-value").forEach((el) => {
    const timeZone = String(el.dataset.timezone || "").trim();
    const offset = Number(el.dataset.offset || "0");
    el.textContent = formatTimeByIanaTimeZone(now, timeZone, offset);
  });
};

const startProfileTimeTicker = () => {
  if (isPublicationsPage) {
    const panel = document.getElementById(PROFILE_TIME_PANEL_ID);
    panel?.remove();
    if (profileTimeTicker) {
      window.clearInterval(profileTimeTicker);
      profileTimeTicker = null;
    }
    return;
  }

  const panel = ensureProfileTimePanel();
  if (!panel) {
    return;
  }
  updateProfileTimes();
  if (!profileTimeTicker) {
    profileTimeTicker = window.setInterval(updateProfileTimes, 1000);
  }
};

const extractEmail = (item) => {
  if (!item) {
    return "";
  }

  if (item.email) {
    return String(item.email).trim();
  }

  const rawUrl = String(item.url || "").trim();
  if (!rawUrl) {
    return "";
  }

  if (rawUrl.startsWith("mailto:")) {
    return rawUrl.slice("mailto:".length).trim();
  }

  if (rawUrl.includes("@") && !/^https?:\/\//.test(rawUrl)) {
    return rawUrl;
  }

  return "";
};

const closeEmailModal = () => {
  if (!emailModal) {
    return;
  }
  emailModal.classList.remove("open");
  const hasOpenModal =
    emailModal.classList.contains("open") || Boolean(pubImageModal?.classList.contains("open"));
  document.body.classList.toggle("modal-open", hasOpenModal);
};

const openEmailModal = (email) => {
  if (!emailModal || !emailModalAddress || !emailModalCopyBtn) {
    return;
  }

  emailModalAddress.textContent = email;
  emailModalCopyBtn.dataset.email = email;
  updateEmailModalLanguage(false);
  emailModal.classList.add("open");
  document.body.classList.add("modal-open");
};

const copyText = async (text) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "absolute";
  helper.style.left = "-9999px";
  document.body.appendChild(helper);
  helper.select();
  document.execCommand("copy");
  helper.remove();
};

const initEmailModal = () => {
  if (document.getElementById("emailModal")) {
    emailModal = document.getElementById("emailModal");
    emailModalAddress = document.getElementById("emailModalAddress");
    emailModalCopyBtn = document.getElementById("emailModalCopyBtn");
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.id = "emailModal";
  wrapper.className = "email-modal";
  wrapper.innerHTML = `
    <div class="email-modal__backdrop" data-close="1"></div>
    <div class="email-modal__card" role="dialog" aria-modal="true" aria-labelledby="emailModalTitle">
      <button type="button" class="email-modal__close" id="emailModalClose" aria-label="Close">脳</button>
      <p class="email-modal__kicker" id="emailModalKicker">Contact</p>
      <h3 class="email-modal__title" id="emailModalTitle">Email Address</h3>
      <p class="email-modal__address" id="emailModalAddress">you@example.com</p>
      <button type="button" class="email-modal__copy" id="emailModalCopyBtn" data-email="">
        <span class="copy-icon" aria-hidden="true"></span>
        <span class="copy-label">Copy email</span>
      </button>
    </div>
  `;

  document.body.appendChild(wrapper);

  emailModal = wrapper;
  emailModalAddress = document.getElementById("emailModalAddress");
  emailModalCopyBtn = document.getElementById("emailModalCopyBtn");
  emailModalClose = document.getElementById("emailModalClose");
  emailModalKicker = document.getElementById("emailModalKicker");
  emailModalTitle = document.getElementById("emailModalTitle");

  wrapper.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.dataset.close === "1") {
      closeEmailModal();
    }
  });

  emailModalClose?.addEventListener("click", closeEmailModal);

  emailModalCopyBtn?.addEventListener("click", async () => {
    const email = emailModalCopyBtn.dataset.email || "";
    if (!email) {
      return;
    }

    try {
      await copyText(email);
      const label = emailModalCopyBtn.querySelector(".copy-label");
      if (label) {
        label.textContent = UI_TEXT.en.emailModal.copied;
      }
    } catch (err) {
      console.error("Failed to copy email.", err);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeEmailModal();
    }
  });

  updateEmailModalLanguage(false);
};

const closePublicationImageModal = () => {
  if (!pubImageModal) {
    return;
  }
  pubImageModal.classList.remove("open");
  pubImageModal.classList.remove("pdf-mode");
  if (pubImageModalImg) {
    pubImageModalImg.src = "";
  }
  if (pubImageModalPdf) {
    pubImageModalPdf.src = "about:blank";
  }
  const hasOpenModal =
    pubImageModal.classList.contains("open") || Boolean(emailModal?.classList.contains("open"));
  document.body.classList.toggle("modal-open", hasOpenModal);
};

const openPublicationImageModal = (src, alt = "Publication image") => {
  if (!pubImageModal || !pubImageModalImg || !src) {
    return;
  }
  const mediaSrc = resolveAssetUrl(src);
  const pdf = isPdfAsset(mediaSrc);

  if (pdf) {
    if (pubImageModalPdf) {
      pubImageModalPdf.src = buildPdfPreviewSrc(mediaSrc);
    }
    pubImageModal.classList.add("pdf-mode");
    pubImageModalImg.src = "";
  } else {
    pubImageModal.classList.remove("pdf-mode");
    pubImageModalImg.src = mediaSrc;
  }
  pubImageModalImg.alt = alt;
  pubImageModal.classList.add("open");
  document.body.classList.add("modal-open");
};

const initPublicationImageModal = () => {
  if (document.getElementById("pubImageModal")) {
    pubImageModal = document.getElementById("pubImageModal");
    pubImageModalImg = document.getElementById("pubImageModalImg");
    pubImageModalPdf = document.getElementById("pubImageModalPdf");
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.id = "pubImageModal";
  wrapper.className = "pub-image-modal";
  wrapper.innerHTML = `
    <div class="pub-image-modal__backdrop" data-close="1"></div>
    <div class="pub-image-modal__panel" role="dialog" aria-modal="true" aria-label="Publication image preview">
      <img id="pubImageModalImg" class="pub-image-modal__img" src="" alt="Publication image preview" />
      <iframe id="pubImageModalPdf" class="pub-image-modal__pdf" src="about:blank" title="Publication PDF preview"></iframe>
    </div>
  `;

  document.body.appendChild(wrapper);

  pubImageModal = wrapper;
  pubImageModalImg = document.getElementById("pubImageModalImg");
  pubImageModalPdf = document.getElementById("pubImageModalPdf");

  wrapper.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.dataset.close === "1") {
      closePublicationImageModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && pubImageModal?.classList.contains("open")) {
      closePublicationImageModal();
    }
  });
};

const normalizePublicationResources = (item) => {
  const resources =
    item?.resources && typeof item.resources === "object" && !Array.isArray(item.resources)
      ? item.resources
      : {};

  const links = Array.isArray(item?.links) ? item.links : [];
  const findByLabel = (patterns) => {
    const matched = links.find((x) => patterns.some((p) => p.test(String(x?.label || ""))));
    return String(matched?.url || "").trim();
  };

  const paper = String(item?.paper || item?.paperUrl || resources.paper || findByLabel([/^paper$/i])).trim();
  const code = String(
    item?.code ||
      item?.codeUrl ||
      resources.code ||
      findByLabel([/^code$/i, /^project$/i, /^demo$/i, /^repo$/i]),
  ).trim();
  const cite = String(
    item?.cite || item?.citeUrl || resources.cite || findByLabel([/^cite$/i, /^citation$/i, /^bib/i]),
  ).trim();

  return {
    paper,
    code,
    cite,
  };
};

const PUBLICATION_LEVEL_ORDER = ["SCI Q1", "SCI Q2", "SCI Q3", "SCI Q4", "CCF A", "CCF B", "CCF C", "Other"];

const inferPublicationTypeFromTags = (tags) => {
  const normalized = (Array.isArray(tags) ? tags : [])
    .map((tag) => getEnglishText(tag).toLowerCase())
    .join(" ");

  if (/multimodal|multi-modal|vision-language|v-l/.test(normalized)) {
    return "Multimodal";
  }
  if (/medical|medicine|biomed|biomedical|clinical|health/.test(normalized)) {
    return "Medical";
  }
  return "Other";
};

const normalizePublicationTypeLabel = (value, fallbackTags = []) => {
  const raw = getEnglishText(value).trim();
  if (!raw) {
    return inferPublicationTypeFromTags(fallbackTags);
  }

  if (/multimodal|multi-modal|vision-language|多模态|跨模态|图文/i.test(raw)) {
    return "Multimodal";
  }
  if (/medical|medicine|biomed|biomedical|clinical|health|医学|医疗|生物医/i.test(raw)) {
    return "Medical";
  }
  if (/other|others|其它|其他/i.test(raw)) {
    return "Other";
  }

  if (/[\u4e00-\u9fff]/.test(raw)) {
    return "Other";
  }

  return raw;
};

const normalizePublicationTypeLabels = (value, fallbackTags = []) => {
  if (Array.isArray(value)) {
    const normalized = value
      .map((x) => normalizePublicationTypeLabel(x, []))
      .map((x) => String(x || "").trim())
      .filter(Boolean);
    const deduped = Array.from(new Set(normalized));
    if (deduped.length) {
      return deduped;
    }
    return [inferPublicationTypeFromTags(fallbackTags)];
  }

  const raw = getEnglishText(value).trim();
  if (!raw) {
    return [inferPublicationTypeFromTags(fallbackTags)];
  }

  const pieces = raw
    .split(/[,;/|]+/)
    .map((x) => x.trim())
    .filter(Boolean);
  if (pieces.length <= 1) {
    return [normalizePublicationTypeLabel(raw, fallbackTags)];
  }

  const normalized = pieces
    .map((x) => normalizePublicationTypeLabel(x, []))
    .map((x) => String(x || "").trim())
    .filter(Boolean);
  const deduped = Array.from(new Set(normalized));
  return deduped.length ? deduped : [inferPublicationTypeFromTags(fallbackTags)];
};

const normalizeSciLabel = (value) => {
  const raw = getEnglishText(value).trim();
  if (!raw) {
    return "";
  }

  if (/(other|others|其它|其他)/i.test(raw)) {
    return "Other";
  }
  if (/(q?\s*1|一区|1区)/i.test(raw)) {
    return "SCI Q1";
  }
  if (/(q?\s*2|二区|2区)/i.test(raw)) {
    return "SCI Q2";
  }
  if (/(q?\s*3|三区|3区)/i.test(raw)) {
    return "SCI Q3";
  }
  if (/(q?\s*4|四区|4区)/i.test(raw)) {
    return "SCI Q4";
  }
  return "";
};

const normalizeCcfLabel = (value) => {
  const raw = getEnglishText(value).trim();
  if (!raw) {
    return "";
  }

  if (/(other|others|其它|其他)/i.test(raw)) {
    return "Other";
  }
  if (/^(ccf\s*)?a(\s*class|\s*类)?$/i.test(raw) || /a类/i.test(raw) || /ccf\s*a/i.test(raw)) {
    return "CCF A";
  }
  if (/^(ccf\s*)?b(\s*class|\s*类)?$/i.test(raw) || /b类/i.test(raw) || /ccf\s*b/i.test(raw)) {
    return "CCF B";
  }
  if (/^(ccf\s*)?c(\s*class|\s*类)?$/i.test(raw) || /c类/i.test(raw) || /ccf\s*c/i.test(raw)) {
    return "CCF C";
  }
  return "";
};

const normalizePublicationYear = (item) => {
  const findYear = (value) => {
    const raw = getEnglishText(value).trim();
    if (!raw) {
      return "";
    }
    const match = raw.match(/\b(19|20)\d{2}\b/);
    return match ? match[0] : "";
  };

  const direct = [
    item?.year,
    item?.publicationYear,
    item?.date,
    item?.published,
    item?.publishedAt,
  ];
  for (const value of direct) {
    const year = findYear(value);
    if (year) {
      return year;
    }
  }

  const inferred = [item?.venue, item?.badge, item?.title];
  for (const value of inferred) {
    const year = findYear(value);
    if (year) {
      return year;
    }
  }
  return "";
};

const normalizePublicationTaxonomy = (item) => {
  const rawLevelScalar = typeof item?.level === "string" ? item.level : "";
  const types = normalizePublicationTypeLabels(
    item?.type || item?.category?.type || item?.articleType || "",
    item?.tags,
  );
  const sci = normalizeSciLabel(
    item?.level?.sci || item?.sci || item?.tier?.sci || item?.rank?.sci || rawLevelScalar,
  );
  const ccf = normalizeCcfLabel(
    item?.level?.ccf || item?.ccf || item?.tier?.ccf || item?.rank?.ccf || rawLevelScalar,
  );
  const year = normalizePublicationYear(item);
  const levels = Array.from(new Set([sci, ccf].filter(Boolean)));
  if (levels.length === 0) {
    levels.push("Other");
  }

  return { types, type: types[0] || "Other", levels, sci, ccf, year };
};

const collectPublicationFilterOptions = (items) => {
  const typeMap = new Map();
  const yearSet = new Set();

  (items || []).forEach((item) => {
    const taxonomy = normalizePublicationTaxonomy(item);

    (taxonomy.types || []).forEach((label) => {
      const typeKey = slugify(label);
      if (typeKey && !typeMap.has(typeKey)) {
        typeMap.set(typeKey, label);
      }
    });
    if (taxonomy.year) {
      yearSet.add(taxonomy.year);
    }
  });

  return {
    type: Array.from(typeMap.values()),
    year: Array.from(yearSet).sort((a, b) => Number(b) - Number(a)),
    level: [...PUBLICATION_LEVEL_ORDER],
    authorRole: [...PUBLICATION_AUTHOR_ROLE_OPTIONS],
  };
};

const TRANSIENT_TOAST_ID = "transientToast";
let transientToastTimer = null;

const isAvailableLink = (value) => {
  const href = String(value || "").trim();
  return Boolean(href && href !== "#");
};

const ensureTransientToast = () => {
  let toast = document.getElementById(TRANSIENT_TOAST_ID);
  if (toast) {
    return toast;
  }

  toast = document.createElement("div");
  toast.id = TRANSIENT_TOAST_ID;
  toast.className = "transient-toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  document.body.appendChild(toast);
  return toast;
};

const showTransientToast = (message, variant = "info", duration = 2200) => {
  const toast = ensureTransientToast();
  toast.textContent = message;
  toast.classList.remove("transient-toast--info", "transient-toast--success");
  toast.classList.add(variant === "success" ? "transient-toast--success" : "transient-toast--info");
  toast.classList.add("show");

  if (transientToastTimer) {
    window.clearTimeout(transientToastTimer);
  }
  transientToastTimer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
};

const publicationActionMeta = (kind) => {
  const config = {
    paper: { icon: "📄", text: "Paper" },
    code: { icon: "💻", text: "Code" },
    cite: { icon: "❝", text: "Cite" },
  };
  return config[kind] || { icon: "🔗", text: "Link" };
};

const appendPublicationActionContent = (node, kind) => {
  const meta = publicationActionMeta(kind);
  const icon = document.createElement("span");
  icon.className = "pub-action__icon";
  icon.textContent = meta.icon;

  const text = document.createElement("span");
  text.className = "pub-action__text";
  text.textContent = meta.text;

  node.appendChild(icon);
  node.appendChild(text);
};

const createPublicationLinkAction = (kind, url) => {
  const href = String(url || "").trim();
  if (!isAvailableLink(href)) {
    return null;
  }

  const action = document.createElement("a");
  action.className = `pub-action pub-action--${kind}`;
  action.href = href;
  action.setAttribute("aria-label", publicationActionMeta(kind).text);
  if (/^https?:\/\//i.test(href)) {
    action.target = "_blank";
    action.rel = "noopener noreferrer";
  }
  appendPublicationActionContent(action, kind);
  return action;
};

const createPaperAction = (url) => {
  if (isAvailableLink(url)) {
    return createPublicationLinkAction("paper", url);
  }

  const button = document.createElement("button");
  button.type = "button";
  button.className = "pub-action pub-action--paper";
  button.setAttribute("aria-label", publicationActionMeta("paper").text);
  appendPublicationActionContent(button, "paper");
  button.addEventListener("click", () => {
    showTransientToast("Coming Soon", "info", 2300);
  });
  return button;
};

const normalizePublicationCitation = (item) => {
  const pick = (...values) => {
    const hit = values.find((v) => typeof v === "string" && String(v).trim());
    return String(hit || "").trim();
  };

  const citationObjCandidates = [
    item?.citation,
    item?.citations,
    item?.resources?.citation,
    item?.resources?.cite,
  ];
  const citationObj =
    citationObjCandidates.find((x) => x && typeof x === "object" && !Array.isArray(x)) || {};

  return {
    gbt: pick(
      item?.citeGbt,
      item?.citationGbt,
      citationObj.gbt,
      citationObj.gbt7714,
      citationObj.gbt_7714,
      citationObj.cn,
    ),
    bibtex: pick(
      item?.citeBibtex,
      item?.citationBibtex,
      citationObj.bibtex,
      citationObj.bibTeX,
      citationObj.bib,
    ),
  };
};

const normalizePublicationAuthors = (item) => {
  const rawAuthors = item?.authors;
  if (Array.isArray(rawAuthors)) {
    const normalized = rawAuthors
      .map((entry) => {
        if (entry && typeof entry === "object" && !Array.isArray(entry)) {
          const name = getEnglishText(entry.name || entry.author || entry.text || "").trim();
          return {
            name,
            first: Boolean(
              entry.first ||
                entry.firstAuthor ||
                entry.isFirst ||
                entry.coFirst ||
                entry.equalFirst ||
                entry.jointFirst,
            ),
            corresponding: Boolean(
              entry.corresponding ||
                entry.correspondingAuthor ||
                entry.isCorresponding ||
                entry.contact ||
                entry.coCorresponding ||
                entry.equalCorresponding ||
                entry.jointCorresponding,
            ),
          };
        }
        return {
          name: getEnglishText(entry).trim(),
          first: false,
          corresponding: false,
        };
      })
      .filter((entry) => entry.name);
    if (normalized.length) {
      return normalized;
    }
  }

  const authorsText = getEnglishText(rawAuthors).trim();
  if (!authorsText) {
    return [];
  }
  const parts = authorsText
    .replace(/\s+and\s+/gi, ", ")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
  if (parts.length <= 1) {
    return [{ name: authorsText, first: false, corresponding: false }];
  }
  return parts.map((name) => ({ name, first: false, corresponding: false }));
};

const normalizeAuthorIdentityKey = (value) =>
  getEnglishText(value)
    .toLowerCase()
    .replace(/[^a-z]/g, "");

const isCaiyangYuAuthor = (value) => {
  const key = normalizeAuthorIdentityKey(value);
  return key === "caiyangyu" || key === "yucaiyang";
};

const getCaiyangAuthorFlags = (item) => {
  const authors = normalizePublicationAuthors(item);
  let firstOrCoFirst = false;
  let correspondingOrCoCorresponding = false;
  let position = Number.POSITIVE_INFINITY;

  authors.forEach((author, idx) => {
    if (!isCaiyangYuAuthor(author?.name)) {
      return;
    }
    position = Math.min(position, idx + 1);
    if (author.first) {
      firstOrCoFirst = true;
    }
    if (author.corresponding) {
      correspondingOrCoCorresponding = true;
    }
  });

  return {
    firstOrCoFirst,
    correspondingOrCoCorresponding,
    position: Number.isFinite(position) ? position : Number.POSITIVE_INFINITY,
  };
};

const formatPublicationAuthorsForCitation = (item) => {
  const normalized = normalizePublicationAuthors(item);
  if (!normalized.length) {
    return {
      inline: "Unknown Authors",
      bibtex: "Unknown Authors",
    };
  }
  return {
    inline: normalized.map((entry) => entry.name).join(", "),
    bibtex: normalized.map((entry) => entry.name).join(" and "),
  };
};

const renderPublicationAuthors = (container, item) => {
  if (!container) {
    return;
  }
  container.textContent = "";
  const authors = normalizePublicationAuthors(item);
  if (!authors.length) {
    container.textContent = "Unknown Authors";
    return;
  }

  authors.forEach((author, index) => {
    if (index > 0) {
      container.appendChild(document.createTextNode(", "));
    }

    const name = document.createElement("span");
    name.className = "author-name";
    const isTargetAuthor = isCaiyangYuAuthor(author.name);
    if (isTargetAuthor) {
      name.classList.add("author-name--first");
    }
    name.textContent = author.name;

    if (author.first) {
      const firstBadge = document.createElement("sup");
      firstBadge.className = "author-badge author-badge--first";
      firstBadge.textContent = "★";
      firstBadge.title = "First Author";
      name.appendChild(firstBadge);
    }
    if (author.corresponding && (!isTargetAuthor || author.first)) {
      const corrBadge = document.createElement("sup");
      corrBadge.className = "author-badge author-badge--corresponding";
      corrBadge.textContent = "✉";
      corrBadge.title = "Corresponding Author";
      name.appendChild(corrBadge);
    }

    container.appendChild(name);
  });
};

const fallbackCitation = (item) => {
  const title = getEnglishText(item?.title, "Untitled").trim();
  const authorText = formatPublicationAuthorsForCitation(item);
  const venue = getEnglishText(item?.venue, "Unknown Venue").trim();
  const key = slugify(title).replace(/-/g, "").slice(0, 30) || "paper";

  return {
    gbt: `${authorText.inline}. ${title}[J]. ${venue}.`,
    bibtex: `@article{${key},\n  title={${title}},\n  author={${authorText.bibtex}},\n  journal={${venue}}\n}`,
  };
};

const createCitationAction = (citation) => {
  const gbt = String(citation?.gbt || "").trim();
  const bibtex = String(citation?.bibtex || "").trim();
  if (!gbt && !bibtex) {
    return null;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "pub-cite";

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "pub-action pub-action--cite pub-cite-trigger";
  trigger.setAttribute("aria-haspopup", "menu");
  trigger.setAttribute("aria-expanded", "false");
  appendPublicationActionContent(trigger, "cite");

  const menu = document.createElement("div");
  menu.className = "pub-cite-menu";
  menu.setAttribute("role", "menu");

  const addOption = (label, payload) => {
    const text = String(payload || "").trim();
    if (!text) {
      return;
    }
    const option = document.createElement("button");
    option.type = "button";
    option.className = "pub-cite-option";
    option.setAttribute("role", "menuitem");
    option.textContent = label;
    option.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      try {
        await copyText(text);
        showTransientToast("已复制", "success", 2000);
      } catch (err) {
        console.error("Failed to copy citation.", err);
        showTransientToast("Copy failed", "info", 2200);
      }
    });
    menu.appendChild(option);
  };

  addOption("GB/T 7714", gbt);
  addOption("BibTeX", bibtex);
  if (!menu.childElementCount) {
    return null;
  }

  wrapper.addEventListener("mouseenter", () => trigger.setAttribute("aria-expanded", "true"));
  wrapper.addEventListener("mouseleave", () => trigger.setAttribute("aria-expanded", "false"));

  wrapper.appendChild(trigger);
  wrapper.appendChild(menu);
  return wrapper;
};

const renderProfile = (data) => {
  if (profileName) {
    profileName.textContent = getEnglishText(data.name);
  }
  if (profileTitle) {
    profileTitle.textContent = getEnglishText(data.title);
  }
  if (profileBio) {
    profileBio.textContent = getEnglishText(data.bio);
  }
  if (profileSections) {
    profileSections.innerHTML = "";
    (data.sections || []).forEach((section) => {
      const block = document.createElement("section");
      block.className = "profile-section";

      const title = document.createElement("h3");
      title.textContent = getEnglishText(section.title);

      const ul = document.createElement("ul");
      (section.items || []).forEach((item) => {
        const li = document.createElement("li");
        li.textContent = getEnglishText(item);
        ul.appendChild(li);
      });

      block.appendChild(title);
      block.appendChild(ul);
      profileSections.appendChild(block);
    });
  }
  if (profileMeta) {
    profileMeta.innerHTML = "";
    (data.meta || []).forEach((item) => {
      const li = document.createElement("li");
      li.className = "meta-item";

      let iconEl;
      if (item.iconSrc) {
        const img = document.createElement("img");
        img.className = "meta-icon-img";
        img.src = item.iconSrc;
        img.alt = `${getEnglishText(item.text, "meta")} icon`;
        img.loading = "lazy";
        iconEl = img;
      } else {
        const icon = document.createElement("span");
        icon.className = "meta-icon";
        icon.textContent = item.icon || "•";
        iconEl = icon;
      }

      const text = document.createElement("span");
      text.className = "meta-text";
      text.textContent = getEnglishText(item.text);

      if (item.url) {
        const a = document.createElement("a");
        const email = extractEmail(item);
        const localizedMetaText = getEnglishText(item.text).trim();
        const isEmailPopup =
          item.popup === "email" ||
          /^email$/i.test(localizedMetaText) ||
          Boolean(email);

        a.href = isEmailPopup ? "#" : item.url;
        a.className = "meta-link";
        a.appendChild(iconEl);
        a.appendChild(text);
        if (isEmailPopup) {
          a.setAttribute("aria-haspopup", "dialog");
          a.addEventListener("click", (event) => {
            event.preventDefault();
            openEmailModal(email || String(item.url || "").replace(/^mailto:/, "").trim());
          });
        } else if (/^https?:\/\//.test(a.href)) {
          a.target = "_blank";
          a.rel = "noopener noreferrer";
        }
        li.appendChild(a);
      } else {
        li.appendChild(iconEl);
        li.appendChild(text);
      }
      profileMeta.appendChild(li);
    });
  }
  startProfileTimeTicker();
};

const parseCount = (value) => {
  const cleaned = String(value ?? "")
    .replace(/[,\s]/g, "")
    .trim();
  if (!cleaned) {
    return null;
  }
  const n = Number.parseInt(cleaned, 10);
  if (!Number.isFinite(n) || n < 0) {
    return null;
  }
  return n;
};

const buildOverviewStats = (data, context = {}) => {
  const papersCount = parseCount(context.papersCount) ?? 0;
  const projectsCount = parseCount(context.projectsCount) ?? 0;

  const citations =
    parseCount(context.scholarMetrics?.citations) ?? parseCount(data?.scholar?.citations);
  const hIndex = parseCount(context.scholarMetrics?.hIndex) ?? parseCount(data?.scholar?.hIndex);

  const fourthLabel = data?.fourthStat?.label || "h-index";
  const fourthKey = String(data?.fourthStat?.key || "hIndex");
  const customFourth = parseCount(data?.fourthStat?.value);
  let fourthValue = hIndex;
  if (/citation/i.test(fourthKey)) {
    fourthValue = citations;
  } else if (!/hindex/i.test(fourthKey) && customFourth !== null) {
    fourthValue = customFourth;
  }

  return [
    { label: "Papers", value: papersCount, suffix: "" },
    { label: "Projects", value: projectsCount, suffix: "" },
    { label: "Citations", value: citations, valueText: "--", suffix: "" },
    { label: fourthLabel, value: fourthValue, valueText: "--", suffix: "" },
  ];
};

const renderOverview = (data, context = {}) => {
  if (summaryText) {
    const summary = getLocalizedText(data.summary || context.aboutIntro || "").trim();
    summaryText.textContent = summary;
  }
};

const renderAbout = (data) => {
  if (aboutText) {
    aboutText.textContent = getEnglishText(data.intro);
  }
  if (aboutFeatures) {
    aboutFeatures.innerHTML = "";
    (data.cards || []).forEach((card) => {
      const box = document.createElement("article");
      box.className = "feature-card";

      const h3 = document.createElement("h3");
      h3.textContent = getEnglishText(card.title);

      const ul = document.createElement("ul");
      (card.items || []).forEach((item) => {
        const li = document.createElement("li");
        li.textContent = getEnglishText(item);
        ul.appendChild(li);
      });

      box.appendChild(h3);
      box.appendChild(ul);
      aboutFeatures.appendChild(box);
    });
  }
};

const renderNews = (items) => {
  if (!newsList) {
    return;
  }
  newsList.innerHTML = "";
  items.forEach((item, index) => {
    const li = document.createElement("li");
    if (index === 0) {
      li.classList.add("news-latest");
      li.setAttribute("aria-label", "Latest update");
    }
    const strong = document.createElement("strong");
    strong.textContent = getEnglishText(item.date);
    li.appendChild(strong);
    li.append(`: ${getEnglishText(item.text)}`);
    newsList.appendChild(li);
  });
};

const renderJourney = (items) => {
  if (!journeyList) {
    return;
  }
  journeyList.innerHTML = "";
  items.forEach((item) => {
    const row = document.createElement("article");
    row.className = "journey-item reveal";

    const period = document.createElement("p");
    period.className = "journey-period";
    period.textContent = getEnglishText(item.period);

    const title = document.createElement("h3");
    title.className = "journey-title";
    title.textContent = getEnglishText(item.title);

    const detail = document.createElement("p");
    detail.className = "journey-detail";
    detail.textContent = getEnglishText(item.detail);

    row.appendChild(period);
    row.appendChild(title);
    row.appendChild(detail);
    journeyList.appendChild(row);
  });
};

const renderPublications = (items) => {
  if (!pubList) {
    return [];
  }
  pubList.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = isPublicationsPage ? "pub-card pub-card--text-only reveal" : "pub-card reveal";
    card.dataset.tags = (item.tags || []).map((tag) => slugify(getEnglishText(tag))).join(" ");
    const taxonomy = normalizePublicationTaxonomy(item);
    const caiyangFlags = getCaiyangAuthorFlags(item);
    card.dataset.filterType = (taxonomy.types || []).map((label) => slugify(label)).join(" ");
    card.dataset.filterYear = slugify(taxonomy.year || "");
    card.dataset.filterLevel = (taxonomy.levels || []).map((label) => slugify(label)).filter(Boolean).join(" ");
    const roleKeys = [];
    if (caiyangFlags.firstOrCoFirst) {
      roleKeys.push("caiyang-first");
    }
    if (caiyangFlags.correspondingOrCoCorresponding) {
      roleKeys.push("caiyang-corresponding");
    }
    card.dataset.filterAuthorRole = roleKeys.join(" ");
    card.dataset.sortYear = String(Number.parseInt(taxonomy.year || "0", 10) || 0);
    card.dataset.sortAuthorPosition = Number.isFinite(caiyangFlags.position)
      ? String(caiyangFlags.position)
      : String(Number.MAX_SAFE_INTEGER);
    const titleText = getEnglishText(item.title);
    const mediaLabel = getEnglishText(item.imageLabel || item.mediaLabel || item.coverLabel || "").trim();

    let thumb = null;
    if (!isPublicationsPage) {
      const mediaSrc = String(item.imageSrc || item.mediaSrc || item.figureSrc || "").trim();
      if (mediaSrc) {
        const resolvedMediaSrc = resolveAssetUrl(mediaSrc);
        const thumbButton = document.createElement("button");
        thumbButton.type = "button";
        thumbButton.className = "pub-thumb pub-thumb-button";
        thumbButton.setAttribute("aria-label", `Preview media for ${titleText}`);

        if (isPdfAsset(resolvedMediaSrc)) {
          thumbButton.classList.add("pub-thumb-button--pdf");
          const canvas = document.createElement("canvas");
          canvas.className = "pub-thumb-pdf-canvas";
          canvas.setAttribute("aria-hidden", "true");
          thumbButton.appendChild(canvas);

          const file = document.createElement("span");
          file.className = "pub-thumb-file";
          file.textContent = "PDF";
          file.hidden = true;
          thumbButton.appendChild(file);

          window.requestAnimationFrame(() => {
            renderPdfThumbnail(canvas, resolvedMediaSrc, file);
          });
        } else {
          const img = document.createElement("img");
          img.className = "pub-thumb-img";
          img.src = resolvedMediaSrc;
          img.alt = `${titleText} thumbnail`;
          img.loading = "lazy";
          thumbButton.appendChild(img);
        }
        if (mediaLabel) {
          const label = document.createElement("span");
          label.className = "pub-thumb-corner-label";
          label.textContent = mediaLabel;
          thumbButton.appendChild(label);
        }
        thumbButton.addEventListener("click", () => {
          openPublicationImageModal(resolvedMediaSrc, `${titleText} media`);
        });
        thumb = thumbButton;
      } else {
        const thumbBadge = document.createElement("div");
        thumbBadge.className = "pub-thumb pub-thumb--badge";
        thumbBadge.textContent = getEnglishText(item.badge);
        thumb = thumbBadge;
      }
    }

    const body = document.createElement("div");
    body.className = "pub-body";

    const title = document.createElement("h3");
    title.textContent = titleText;

    const authors = document.createElement("p");
    authors.className = "authors";
    renderPublicationAuthors(authors, item);

    const venue = document.createElement("p");
    venue.className = "venue";
    venue.textContent = getEnglishText(item.venue);

    const levels = document.createElement("div");
    levels.className = "pub-levels";
    (taxonomy.levels || []).forEach((label) => {
      const level = document.createElement("span");
      level.className = "pub-level";
      const key = slugify(label);
      if (key.startsWith("sci")) {
        level.classList.add("pub-level--sci");
      } else if (key.startsWith("ccf")) {
        level.classList.add("pub-level--ccf");
      } else {
        level.classList.add("pub-level--other");
      }
      level.textContent = label;
      levels.appendChild(level);
    });
    if (taxonomy.year) {
      const year = document.createElement("span");
      year.className = "pub-level pub-level--year";
      year.textContent = taxonomy.year;
      levels.appendChild(year);
    }

    const tags = document.createElement("div");
    tags.className = "tags";
    const typeKeys = new Set((taxonomy.types || []).map((label) => slugify(label)).filter(Boolean));
    (item.tags || []).forEach((tag) => {
      const tagEl = createTag(tag);
      if (typeKeys.has(slugify(getEnglishText(tag)))) {
        tagEl.classList.add("tag-type-match");
      }
      tags.appendChild(tagEl);
    });

    const actions = document.createElement("div");
    actions.className = "pub-actions";
    const resources = normalizePublicationResources(item);
    const hasPaperLink = isAvailableLink(resources.paper);
    const paperAction = createPaperAction(resources.paper);
    const codeAction = createPublicationLinkAction("code", resources.code);

    const citation = normalizePublicationCitation(item);
    const citeAction = hasPaperLink ? createCitationAction({ ...fallbackCitation(item), ...citation }) : null;

    actions.appendChild(paperAction);
    if (codeAction) {
      actions.appendChild(codeAction);
    }
    if (citeAction) {
      actions.appendChild(citeAction);
    }

    body.appendChild(title);
    body.appendChild(authors);
    body.appendChild(venue);
    if (levels.childElementCount > 0) {
      body.appendChild(levels);
    }
    body.appendChild(tags);
    body.appendChild(actions);

    if (thumb) {
      card.appendChild(thumb);
    }
    card.appendChild(body);
    pubList.appendChild(card);
  });

  return Array.from(pubList.querySelectorAll(".pub-card"));
};

const getPublicationSortValue = (card, key, fallback = 0) => {
  if (!card) {
    return fallback;
  }
  const raw = Number.parseInt(card.dataset[key] || "", 10);
  return Number.isFinite(raw) ? raw : fallback;
};

const sortPublicationCards = (cards) => {
  if (!pubList || !Array.isArray(cards) || cards.length === 0) {
    return;
  }

  const sorted = [...cards];
  sorted.sort((a, b) => {
    const yearA = getPublicationSortValue(a, "sortYear", 0);
    const yearB = getPublicationSortValue(b, "sortYear", 0);
    const posA = getPublicationSortValue(a, "sortAuthorPosition", Number.MAX_SAFE_INTEGER);
    const posB = getPublicationSortValue(b, "sortAuthorPosition", Number.MAX_SAFE_INTEGER);
    const titleA = (a.querySelector("h3")?.textContent || "").toLowerCase();
    const titleB = (b.querySelector("h3")?.textContent || "").toLowerCase();

    if (currentPublicationSortMode === PUBLICATION_SORT_MODE.AUTHOR) {
      if (posA !== posB) {
        return posA - posB;
      }
      if (yearA !== yearB) {
        return yearB - yearA;
      }
      return titleA.localeCompare(titleB);
    }

    if (yearA !== yearB) {
      return yearB - yearA;
    }
    if (posA !== posB) {
      return posA - posB;
    }
    return titleA.localeCompare(titleB);
  });

  sorted.forEach((card) => pubList.appendChild(card));
};

const updatePublicationSortSwitchUI = () => {
  if (!pubFilterHint) {
    return;
  }
  const sortButtons = Array.from(pubFilterHint.querySelectorAll(".pub-sort-btn"));
  sortButtons.forEach((btn) => {
    const mode = btn.dataset.sortMode || "";
    const active = mode === currentPublicationSortMode;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });
};

const setPublicationSortMode = (mode) => {
  if (![PUBLICATION_SORT_MODE.YEAR, PUBLICATION_SORT_MODE.AUTHOR].includes(mode)) {
    return;
  }
  currentPublicationSortMode = mode;
  updatePublicationSortSwitchUI();
  sortPublicationCards(currentPublicationCards);
};

const renderProjects = (items) => {
  if (!projectList) {
    return [];
  }
  projectList.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "project-card reveal";
    card.dataset.tags = (item.tags || []).map((tag) => slugify(getEnglishText(tag))).join(" ");

    const top = document.createElement("div");
    top.className = "project-top";

    const name = document.createElement("h3");
    name.textContent = getEnglishText(item.name);

    const period = document.createElement("p");
    period.className = "project-period";
    period.textContent = getEnglishText(item.period);

    top.appendChild(name);
    top.appendChild(period);

    const summary = document.createElement("p");
    summary.className = "project-summary";
    summary.textContent = getEnglishText(item.summary);

    const impact = document.createElement("p");
    impact.className = "project-impact";
    impact.textContent = getEnglishText(item.impact);

    const tags = document.createElement("div");
    tags.className = "tags";
    (item.tags || []).forEach((tag) => tags.appendChild(createTag(tag)));

    const links = document.createElement("p");
    links.className = "links";
    (item.links || []).forEach((linkItem) => links.appendChild(createLink(linkItem)));

    card.appendChild(top);
    card.appendChild(summary);
    card.appendChild(impact);
    card.appendChild(tags);
    card.appendChild(links);

    projectList.appendChild(card);
  });

  return Array.from(projectList.querySelectorAll(".project-card"));
};

const renderAwards = (items) => {
  if (!awardsList) {
    return;
  }
  awardsList.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    const strong = document.createElement("strong");
    strong.textContent = getEnglishText(item.date);
    li.appendChild(strong);
    li.append(`: ${getEnglishText(item.text)}`);
    awardsList.appendChild(li);
  });
};

const renderContact = (data) => {
  if (contactText) {
    contactText.textContent = getEnglishText(data.text);
  }
  if (contactEmail) {
    const email = data.email || "you@example.com";
    contactEmail.textContent = email;
    contactEmail.href = `mailto:${email}`;
  }
};

const getScholarProfileUrl = (profile, overview) => {
  const fromProfileMeta = (profile?.meta || []).find(
    (item) =>
      /google scholar/i.test(String(item?.text || "")) ||
      /scholar\.google\.com/i.test(String(item?.url || "")),
  );
  const candidate = fromProfileMeta?.url || overview?.scholar?.url || "";
  return String(candidate).trim();
};

const getScholarUserId = (url) => {
  const raw = String(url || "").trim();
  if (!raw) {
    return "";
  }
  try {
    const parsed = new URL(raw);
    return parsed.searchParams.get("user") || "";
  } catch (err) {
    const matched = raw.match(/[?&]user=([^&]+)/i);
    return matched ? decodeURIComponent(matched[1]) : "";
  }
};

const parseScholarMetrics = (payload) => {
  const text = String(payload || "");
  if (!text) {
    return null;
  }

  if (
    /returned error 403|we're sorry|automated queries|can't process your request right now/i.test(text)
  ) {
    return null;
  }

  const byLabel = new Map();
  const tableRowPattern =
    /<tr[^>]*>\s*<td[^>]*class=["'][^"']*gsc_rsb_sc1[^"']*["'][^>]*>\s*([^<]+?)\s*<\/td>\s*<td[^>]*class=["'][^"']*gsc_rsb_std[^"']*["'][^>]*>\s*([^<\s]+)\s*<\/td>/gi;
  let tableMatch = tableRowPattern.exec(text);
  while (tableMatch) {
    const label = tableMatch[1].toLowerCase();
    const value = parseCount(tableMatch[2]);
    if (value !== null) {
      byLabel.set(label, value);
    }
    tableMatch = tableRowPattern.exec(text);
  }

  const fromTableCitations = Array.from(byLabel.entries()).find(([label]) =>
    /(citations|寮曠敤)/i.test(label),
  )?.[1];
  const fromTableHIndex = Array.from(byLabel.entries()).find(([label]) =>
    /(h-index|h 鎸囨暟|h鎸囨暟)/i.test(label),
  )?.[1];

  const rawCitations = text.match(/(?:Citations|寮曠敤)[^\d]{0,20}([\d,]+)/i)?.[1];
  const rawHIndex = text.match(/(?:h-index|h 鎸囨暟|h鎸囨暟)[^\d]{0,20}([\d,]+)/i)?.[1];

  const citations = fromTableCitations ?? parseCount(rawCitations);
  const hIndex = fromTableHIndex ?? parseCount(rawHIndex);

  if (citations === null && hIndex === null) {
    return null;
  }

  return { citations, hIndex };
};

const getOrcidId = (profile, overview) => {
  const fromProfileMeta = (profile?.meta || []).find(
    (item) => /orcid/i.test(String(item?.text || "")) || /orcid\.org/i.test(String(item?.url || "")),
  );
  const candidate =
    fromProfileMeta?.url || overview?.scholar?.orcid || overview?.orcid || profile?.orcid || "";
  const raw = String(candidate || "").trim();
  if (!raw) {
    return "";
  }

  const queryMatched = raw.match(/[?&]orcid=([\dXx-]{15,20})/);
  if (queryMatched?.[1]) {
    return queryMatched[1];
  }

  const pathMatched = raw.match(/orcid\.org\/([\dXx-]{15,20})/i);
  if (pathMatched?.[1]) {
    return pathMatched[1];
  }

  if (/^[\dXx-]{15,20}$/.test(raw)) {
    return raw;
  }

  return "";
};

const fetchTextWithTimeout = async (url, timeoutMs = 3000) => {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(`fetch failed: ${res.status}`);
    }
    return await res.text();
  } finally {
    window.clearTimeout(timer);
  }
};

const fetchScholarMetrics = async (userId) => {
  if (!userId) {
    return null;
  }

  const endpoints = [
    `https://r.jina.ai/http://scholar.google.com/citations?user=${encodeURIComponent(userId)}&hl=en`,
    `https://r.jina.ai/http://scholar.google.com/citations?user=${encodeURIComponent(userId)}&hl=zh-CN`,
  ];

  for (const endpoint of endpoints) {
    try {
      const payload = await fetchTextWithTimeout(endpoint);
      const parsed = parseScholarMetrics(payload);
      if (parsed && (parsed.citations !== null || parsed.hIndex !== null)) {
        return parsed;
      }
    } catch (err) {
      console.warn("Scholar metrics fetch failed on endpoint:", endpoint, err);
    }
  }

  return null;
};

const fetchOpenAlexMetricsByOrcid = async (orcidId) => {
  if (!orcidId) {
    return null;
  }

  const endpoint = `https://api.openalex.org/authors/orcid:${encodeURIComponent(orcidId)}`;
  try {
    const res = await fetch(endpoint, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`fetch failed: ${res.status}`);
    }

    const data = await res.json();
    const citations = parseCount(data?.cited_by_count);
    const hIndex = parseCount(data?.summary_stats?.h_index);

    if (citations === null && hIndex === null) {
      return null;
    }

    return { citations, hIndex };
  } catch (err) {
    console.warn("OpenAlex metrics fetch failed:", endpoint, err);
    return null;
  }
};

const enrichOverviewWithScholar = async (profile, overview, context) => {
  const scholarUrl = getScholarProfileUrl(profile, overview);
  const scholarUserId = getScholarUserId(scholarUrl);
  const orcidId = getOrcidId(profile, overview);

  const openAlexMetrics = await fetchOpenAlexMetricsByOrcid(orcidId);
  if (openAlexMetrics) {
    renderOverview(overview, { ...context, scholarMetrics: openAlexMetrics });
    observeRevealElements(document);
    watchCounters();
  }

  if (scholarUserId) {
    const scholarMetrics = await fetchScholarMetrics(scholarUserId);
    if (scholarMetrics) {
      renderOverview(overview, { ...context, scholarMetrics: scholarMetrics });
      observeRevealElements(document);
      watchCounters();
    }
  }
};

const initVisitorGlobe = (meta) => {
  if (!profileGlobeSection || !clustrGlobeScript) {
    return;
  }

  const cfg = meta?.clustrmaps || {};
  if (cfg.enabled === false) {
    profileGlobeSection.style.display = "none";
    return;
  }

  const title = cfg.title || "Visitor Globe";
  const token = cfg.globeToken || "Vr-eYn9fNnJRWR6kcXJa5akQlOll4HKWjM--Xfn5inY";

  if (profileGlobeTitle) {
    profileGlobeTitle.textContent = title;
  }

  if (!token) {
    profileGlobeSection.style.display = "none";
    return;
  }

  clustrGlobeScript.setAttribute(
    "src",
    `//clustrmaps.com/globe.js?d=${encodeURIComponent(token)}`,
  );
};

const createFilterChipButton = (label, group, value, active = false) => {
  const chip = document.createElement("button");
  chip.type = "button";
  chip.className = active ? "chip active" : "chip";
  chip.dataset.group = group;
  chip.dataset.filter = value;
  chip.textContent = label;
  return chip;
};

const renderPublicationFilterChips = (container, items) => {
  if (!container) {
    return;
  }

  const options = collectPublicationFilterOptions(items);
  container.innerHTML = "";
  container.classList.add("pub-filter-groups");

  const groups = [
    {
      key: "all",
      title: "",
      chips: [{ label: UI_TEXT.en.allChip, value: "all" }],
      defaultActive: true,
    },
    {
      key: "type",
      title: "Type",
      chips: options.type.map((label) => ({ label, value: slugify(label) })),
    },
    {
      key: "year",
      title: "Year",
      chips: options.year.map((label) => ({ label, value: slugify(label) })),
    },
    {
      key: "level",
      title: "Level",
      chips: options.level.map((label) => ({ label, value: slugify(label) })),
    },
    {
      key: "authorRole",
      title: "ROLE",
      chips: options.authorRole.map((role) => ({ label: role.label, value: role.value })),
    },
  ];

  groups.forEach((group) => {
    if (group.key !== "all" && group.chips.length === 0) {
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "pub-filter-group";

    const row = document.createElement("div");
    row.className = "pub-filter-row";

    if (group.title) {
      const label = document.createElement("span");
      label.className = "pub-filter-label";
      label.textContent = group.title;
      wrapper.appendChild(label);
    }

    group.chips.forEach((chipInfo) => {
      row.appendChild(
        createFilterChipButton(
          chipInfo.label,
          group.key,
          chipInfo.value,
          Boolean(group.defaultActive),
        ),
      );
    });

    wrapper.appendChild(row);
    container.appendChild(wrapper);
  });
};

const setupPublicationTierFilter = (chipContainer, cards) => {
  if (!chipContainer) {
    return;
  }

  const selected = {
    type: new Set(),
    year: new Set(),
    level: new Set(),
    authorRole: new Set(),
  };
  const groups = ["type", "year", "level", "authorRole"];
  const allChip = chipContainer.querySelector('.chip[data-group="all"]');
  const groupChips = groups.reduce((acc, group) => {
    acc[group] = Array.from(chipContainer.querySelectorAll(`.chip[data-group="${group}"]`));
    return acc;
  }, {});

  const applyFilter = () => {
    cards.forEach((card) => {
      const cardTypes = (card.dataset.filterType || "").split(" ").filter(Boolean);
      const cardYear = card.dataset.filterYear || "";
      const cardLevels = (card.dataset.filterLevel || "").split(" ").filter(Boolean);
      const cardAuthorRoles = (card.dataset.filterAuthorRole || "").split(" ").filter(Boolean);

      const hitType =
        selected.type.size === 0 || Array.from(selected.type).every((typeKey) => cardTypes.includes(typeKey));
      const hitYear = selected.year.size === 0 || selected.year.has(cardYear);
      const hitLevel =
        selected.level.size === 0 || cardLevels.some((levelKey) => selected.level.has(levelKey));
      const hitAuthorRole =
        selected.authorRole.size === 0 ||
        Array.from(selected.authorRole).every((roleKey) => cardAuthorRoles.includes(roleKey));

      card.classList.toggle("hidden", !(hitType && hitYear && hitLevel && hitAuthorRole));
    });
    sortPublicationCards(cards);
  };

  const syncGroupChipState = () => {
    groups.forEach((group) => {
      (groupChips[group] || []).forEach((chip) => {
        chip.classList.toggle("active", selected[group].has(chip.dataset.filter || ""));
      });
    });
  };

  const syncAllChipState = () => {
    if (!allChip) {
      return;
    }
    const noFilter = groups.every((group) => selected[group].size === 0);
    allChip.classList.toggle("active", noFilter);
  };

  const clearFilters = () => {
    groups.forEach((group) => {
      selected[group].clear();
    });
    syncGroupChipState();
    syncAllChipState();
    applyFilter();
  };

  allChip?.addEventListener("click", () => {
    clearFilters();
  });

  groups.forEach((group) => {
    (groupChips[group] || []).forEach((chip) => {
      chip.addEventListener("click", () => {
        const value = chip.dataset.filter || "";
        const singleSelectGroup = group === "year" || group === "level" || group === "authorRole";

        if (singleSelectGroup) {
          if (selected[group].has(value)) {
            selected[group].clear();
          } else {
            selected[group].clear();
            selected[group].add(value);
          }
        } else {
          if (selected[group].has(value)) {
            selected[group].delete(value);
          } else {
            selected[group].add(value);
          }
        }
        syncGroupChipState();
        syncAllChipState();
        applyFilter();
      });
    });
  });

  clearFilters();
};

const renderFilterChips = (container, tags) => {
  if (!container) {
    return;
  }
  container.innerHTML = "";

  const all = document.createElement("button");
  all.type = "button";
  all.className = "chip active";
  all.dataset.filter = "all";
  all.textContent = UI_TEXT.en.allChip;
  container.appendChild(all);

  tags.forEach((tag) => {
    const localizedTag = getEnglishText(tag);
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip";
    chip.dataset.filter = slugify(localizedTag);
    chip.textContent = localizedTag;
    container.appendChild(chip);
  });
};

const setupMultiFilter = (chipContainer, cards) => {
  if (!chipContainer || !cards.length) {
    return;
  }

  const chips = Array.from(chipContainer.querySelectorAll(".chip"));
  const allChip = chips.find((chip) => chip.dataset.filter === "all");

  const applyFilter = () => {
    const activeTags = chips
      .filter((chip) => chip.dataset.filter !== "all" && chip.classList.contains("active"))
      .map((chip) => chip.dataset.filter);

    cards.forEach((card) => {
      const tags = (card.dataset.tags || "").split(" ").filter(Boolean);
      const hit = activeTags.length === 0 || activeTags.every((tag) => tags.includes(tag));
      card.classList.toggle("hidden", !hit);
    });

    if (allChip) {
      allChip.classList.toggle("active", activeTags.length === 0);
    }
  };

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.dataset.filter;
      if (filter === "all") {
        chips.forEach((x) => {
          x.classList.toggle("active", x.dataset.filter === "all");
        });
        applyFilter();
        return;
      }

      chip.classList.toggle("active");
      allChip?.classList.remove("active");

      const pickedCount = chips.filter(
        (x) => x.dataset.filter !== "all" && x.classList.contains("active"),
      ).length;

      if (pickedCount === 0) {
        allChip?.classList.add("active");
      }

      applyFilter();
    });
  });

  applyFilter();
};

const getUniqueTags = (items) => {
  const map = new Map();
  items.forEach((item) => {
    (item.tags || []).forEach((tag) => {
      const label = getEnglishText(tag);
      const key = slugify(label);
      if (!map.has(key)) {
        map.set(key, label);
      }
    });
  });
  return Array.from(map.values());
};

const animateCounter = (el) => {
  const target = Number.parseInt(el.dataset.target || "0", 10);
  const suffix = el.dataset.suffix || "";
  if (!Number.isFinite(target) || target < 0) {
    el.textContent = `0${suffix}`;
    return;
  }

  const start = performance.now();
  const duration = 1000;
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.round(progress * target);
    el.textContent = `${value}${suffix}`;
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };
  requestAnimationFrame(tick);
};

const watchCounters = () => {
  document.querySelectorAll(".stat-number[data-target]").forEach((counter) => {
    counterObserver.observe(counter);
  });
};

const initMenu = () => {
  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      siteNav.classList.toggle("open");
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav?.classList.remove("open");
      navLinks.forEach((x) => x.classList.toggle("active", x === link));
      const target = link.getAttribute("href");
      if (target && target.startsWith("#")) {
        history.replaceState(null, "", target);
      }
    });
  });
};

const setActiveNavByScroll = () => {
  const sections = Array.from(document.querySelectorAll("main .section"));
  if (!sections.length || !navLinks.length) {
    return;
  }

  const headerHeight = masthead ? masthead.offsetHeight : 0;
  const marker = window.scrollY + headerHeight + 24;

  let current = sections[0];
  for (const section of sections) {
    if (section.offsetTop <= marker) {
      current = section;
    } else {
      break;
    }
  }

  navLinks.forEach((link) => {
    const target = getAnchorIdFromHref(link.getAttribute("href"));
    link.classList.toggle("active", target === current.id);
  });
};

const initNavScrollSync = () => {
  window.addEventListener("scroll", setActiveNavByScroll, { passive: true });
  window.addEventListener("resize", setActiveNavByScroll);
  setActiveNavByScroll();
};

const loadJson = async (file, fallback) => {
  try {
    const res = await fetch(`${CONTENT_BASE}/${file}`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`load failed: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error(`Failed to load ${file}, fallback to defaults.`, err);
    return fallback;
  }
};

const normalizeVisibilityFlag = (value, defaultValue) => {
  if (value === undefined || value === null) {
    return defaultValue;
  }
  if (typeof value === "boolean") {
    return value;
  }
  const raw = String(value).trim().toLowerCase();
  if (["false", "0", "no", "off"].includes(raw)) {
    return false;
  }
  if (["true", "1", "yes", "on"].includes(raw)) {
    return true;
  }
  return defaultValue;
};

const filterPublicationsByPage = (items, fullListPage) => {
  return (items || []).filter((item) => {
    if (fullListPage) {
      return true;
    }

    const hasHomeFlag =
      item?.showOnHome !== undefined || item?.homeVisible !== undefined || item?.showInHome !== undefined;
    if (hasHomeFlag) {
      return normalizeVisibilityFlag(item?.showOnHome ?? item?.homeVisible ?? item?.showInHome, true);
    }

    // Legacy compatibility: old "fullListOnly" style means hidden on Home.
    const fullListOnly = normalizeVisibilityFlag(item?.fullListOnly ?? item?.onlyFullList, false);
    return !fullListOnly;
  });
};

const renderAllFromCache = () => {
  if (!contentCache) {
    return;
  }

  const { profile, overview, news, journey, publications, projects, awards, contact, meta } =
    contentCache;

  const allPubItems = publications.items || [];
  const pubItems = filterPublicationsByPage(allPubItems, isPublicationsPage);
  const projectItems = projects.items || [];

  renderProfile(profile);
  renderOverview(overview);
  renderNews(news.items || []);
  renderJourney(journey.items || []);

  renderPublicationFilterChips(pubFilterChips, pubItems);
  renderFilterChips(projectFilterChips, getUniqueTags(projectItems));

  const pubCards = renderPublications(pubItems);
  currentPublicationCards = pubCards;
  const projectCards = renderProjects(projectItems);

  setupPublicationTierFilter(pubFilterChips, pubCards);
  setupMultiFilter(projectFilterChips, projectCards);

  renderAwards(awards.items || []);
  renderContact(contact);
  initVisitorGlobe(meta);

  if (updatedAt) {
    updatedAt.textContent = meta.updatedAt || new Date().toISOString().slice(0, 10);
  }

  observeRevealElements(document);
  setActiveNavByScroll();
};

const setLanguage = (lang) => {
  if (!LANGS.has(lang)) {
    return;
  }

  currentLang = lang;

  applyStaticLanguage();
  renderAllFromCache();
};

const initLanguageSwitch = () => {
  langBtnEn?.addEventListener("click", () => setLanguage("en"));
  langBtnZh?.addEventListener("click", () => setLanguage("zh"));
  applyStaticLanguage();
};

const loadAllContent = async () => {
  const [profile, overview, news, journey, publications, projects, awards, contact, meta] =
    await Promise.all([
    loadJson("profile.json", FALLBACK.profile),
    loadJson("overview.json", FALLBACK.overview),
    loadJson("news.json", FALLBACK.news),
    loadJson("journey.json", FALLBACK.journey),
    loadJson(PUBLICATIONS_LEGACY_FILE, FALLBACK.publications),
    loadJson("projects.json", FALLBACK.projects),
    loadJson("awards.json", FALLBACK.awards),
    loadJson("contact.json", FALLBACK.contact),
    loadJson("meta.json", FALLBACK.meta),
  ]);

  contentCache = {
    profile,
    overview,
    news,
    journey,
    publications,
    projects,
    awards,
    contact,
    meta,
  };
  renderAllFromCache();
};

initMenu();
initNavScrollSync();
initEmailModal();
initPublicationImageModal();
initLanguageSwitch();
loadAllContent();


