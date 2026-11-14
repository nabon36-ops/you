import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  BookOpen, Briefcase, Newspaper, Share2, Mic, MicOff, Volume2, VolumeX,
  Sun, Moon, Globe, CheckCircle2, Circle, RefreshCw, Sparkles, Send,
  Hand, Camera, CameraOff, Play, Pause, Eye, Ear, Accessibility,
  User, ExternalLink, Award, ChevronRight, Terminal, ShieldCheck,
  Radio, MessageSquare, X, Maximize2, Minimize2, Plus, ArrowUpRight,
  Keyboard, HelpCircle, Sparkle, Check, AlertCircle, Sliders
} from 'lucide-react';

// ============================================================================
// 1. BILINGUAL DICTIONARY (ENGLISH & AMHARIC)
// ============================================================================
const TRANSLATIONS = {
  en: {
    brand: "AccessHub",
    tagline: "Universal Learning, Career & Profile Sync Hub",
    triageTitle: "Welcome to AccessHub",
    triageSubtitle: "Select your language and accessibility profile so we can tailor the entire interface, voice engine, and sign-language interpreter to your needs.",
    selectLanguage: "1. Select Language / ቋንቋ ይምረጡ",
    selectProfile: "2. Choose Your Accessibility Experience",
    profiles: {
      blind: {
        title: "Blind / Visually Impaired",
        desc: "Auto-starts AI Voice Assistant, conversational voice sign-in, and hands-free Spacebar section looping.",
        badge: "Audio-First + Spacebar Nav"
      },
      deaf: {
        title: "Deaf / Hard of Hearing",
        desc: "Auto-opens Real-Time Sign Language Avatar Interpreter, live captions, and Webcam Sign Detector.",
        badge: "Sign Avatar + Cam Detector"
      },
      motor: {
        title: "Motor / Physical Handicap",
        desc: "Enlarged hit targets, full voice-command control, and single-key shortcuts without precision dragging.",
        badge: "Voice Commands + Large Targets"
      },
      standard: {
        title: "Standard Multimodal",
        desc: "Full GitHub-style workspace with on-demand AI voice assistant, sign interpreter, and LinkedIn sync.",
        badge: "Full Multimodal Access"
      }
    },
    onboarding: {
      title: "Conversational Profile Setup",
      subtitle: "Answer via voice or text. We'll automatically curate courses, jobs, and prepare your LinkedIn sync.",
      steps: [
        { key: "name", question: "What is your full name?", placeholder: "e.g., Selamawit Tadesse" },
        { key: "email", question: "What is your Gmail address?", placeholder: "e.g., selam.dev@gmail.com" },
        { key: "career", question: "What is your target career or profession?", placeholder: "e.g., Full-Stack Web Developer" },
        { key: "studyPlan", question: "What is your current study plan or goal?", placeholder: "e.g., Master React, TypeScript & Cloud Accessibility" }
      ],
      quickDemo: "Auto-Fill Demo Profile",
      speakAnswer: "Speak Answer",
      listening: "Listening...",
      next: "Continue",
      finish: "Launch My Accessible Workspace"
    },
    sections: {
      unfinished: "Section 1: Unfinished Courses & Active Applications",
      profileSync: "Section 2: Update LinkedIn & External Profiles",
      news: "Section 3: Daily Career News",
      recommendations: "Section 4: AI Course & Job Recommendations"
    },
    spacebarBar: {
      title: "Hands-Free Spacebar Audio Loop",
      hintSingle: "Press [SPACE] once to enter & read section",
      hintDouble: "Double-tap [SPACE] quickly to exit section",
      looping: "Scanning Sections:",
      inside: "Reading Section:",
      paused: "Loop Paused"
    },
    workspace: {
      leftTitle: "Profile Sync & Integrations",
      leftSubtitle: "Update external profiles directly without leaving AccessHub",
      centerTitle: "Active Workspace",
      rightTitle: "AI Recommendations",
      unfinishedCourses: "Unfinished Courses",
      activeApps: "Active Job Applications",
      dailyNews: "Daily Career News",
      recCourses: "Matched Courses",
      recJobs: "Matched Job Openings",
      syncLinkedInBtn: "Push Update to LinkedIn",
      postCertBtn: "Post Latest Certificate",
      readAloud: "Read Aloud",
      signThis: "Sign Interpret",
      continueLesson: "Open Lesson",
      progressPlus: "+10% Progress",
      enroll: "Add to Workspace",
      apply: "1-Click Apply"
    },
    signBox: {
      title: "Sign Language Hub",
      tabAvatar: "Sign Interpreter",
      tabDetector: "Webcam Detector",
      detectorHint: "Show hand gesture or simulate sign command below:",
      startCam: "Enable Webcam",
      stopCam: "Stop Webcam",
      autoActiveBadge: "AUTO-ACTIVE: Translating Live Audio/Video",
      autoToggleLabel: "Auto-Open on Media"
    },
    aiChat: {
      title: "Bilingual AI Copilot (EN / አማ)",
      placeholder: "Ask in English or Amharic (e.g., 'Draft a LinkedIn post' or 'Summarize my courses')...",
      send: "Send"
    }
  },
  am: {
    brand: "AccessHub (አክሰስ ሀብ)",
    tagline: "ሁሉን አቀፍ የትምህርት፣ የስራ እና የሊንክድኢን መድረክ",
    triageTitle: "እንኳን ወደ AccessHub በደህና መጡ",
    triageSubtitle: "የድምፅ ረዳቱን እና የምልክት ቋንቋ ተርጓሚውን እንደፍላጎትዎ ለማስተካከል እባክዎ ቋንቋ እና የአካል ጉዳት ሁኔታዎን ይምረጡ።",
    selectLanguage: "1. ቋንቋ ይምረጡ / Select Language",
    selectProfile: "2. የተደራሽነት ሁኔታዎን ይምረጡ",
    profiles: {
      blind: {
        title: "ዓይነ ስውር / የማየት እክል ያለባቸው",
        desc: "የአማርኛ እና እንግሊዝኛ የድምፅ ረዳትን በራስ-ሰር ይከፍታል፤ በSpacebar ቁልፍ ብቻ ሁሉንም ክፍሎች ያስሱ።",
        badge: "በድምፅ + Spacebar መቆጣጠሪያ"
      },
      deaf: {
        title: "መስማት የተሳናቸው / የመስማት እክል ያለባቸው",
        desc: "የምልክት ቋንቋ አስተርጓሚ አቫታር እና የካሜራ ምልክት መለያ በቀኝ በኩል በራስ-ሰር ይከፍታል።",
        badge: "የምልክት ቋንቋ + ካሜራ መለያ"
      },
      motor: {
        title: "የአካል እንቅስቃሴ እክል ያለባቸው",
        desc: "ሰፋፊ መጫኛ ቁልፎች እና ሙሉ በሙሉ በድምፅ ትዕዛዝ የሚሰራ አሰሳ።",
        badge: "በድምፅ ትዕዛዝ + ሰፊ ቁልፎች"
      },
      standard: {
        title: "መደበኛ ሁለገብ አጠቃቀም",
        desc: "ሙሉ የGitHub ቅርጽ ያለው ዳሽቦርድ ከድምፅ ረዳት እና ሊንክድኢን ማዘመኛ ጋር።",
        badge: "ሙሉ አገልግሎት"
      }
    },
    onboarding: {
      title: "በድምፅ እና በጽሁፍ መመዝገቢያ",
      subtitle: "በድምፅ ወይም በጽሁፍ ይመልሱ። ከሙያዎ ጋር የሚሄዱ ትምህርቶችን እና ስራዎችን እናዘጋጃለን።",
      steps: [
        { key: "name", question: "ሙሉ ስምዎ ማን ነው?", placeholder: "ለምሳሌ፡ ሰላማዊት ታደሰ" },
        { key: "email", question: "የጂሜይል (Gmail) አድራሻዎ ምንድን ነው?", placeholder: "ለምሳሌ፡ selam.dev@gmail.com" },
        { key: "career", question: "የስራ መስክዎ ወይም ሙያዎ ምንድን ነው?", placeholder: "ለምሳሌ፡ ሶፍትዌር ዴቨሎፐር" },
        { key: "studyPlan", question: "የወደፊት የትምህርት እቅድዎ ምንድን ነው?", placeholder: "ለምሳሌ፡ React እና AI መማር" }
      ],
      quickDemo: "በናሙና መረጃ ሙላ",
      speakAnswer: "በድምፅ መልስ",
      listening: "በማዳመጥ ላይ...",
      next: "ቀጥል",
      finish: "ወደ ዋናው ገጽ ግባ"
    },
    sections: {
      unfinished: "ክፍል 1፡ ያልተጠናቀቁ ትምህርቶች እና የስራ ማመልከቻዎች",
      profileSync: "ክፍል 2፡ የሊንክድኢን እና ሌሎች ፕሮፋይሎችን ማዘመኛ",
      news: "ክፍል 3፡ ዕለታዊ የሙያ ዜናዎች",
      recommendations: "ክፍል 4፡ በAI የተመረጡ ትምህርቶች እና ስራዎች"
    },
    spacebarBar: {
      title: "በSpacebar የድምፅ መቆጣጠሪያ",
      hintSingle: "ክፍሉን ለመክፈት [SPACE] አንድ ጊዜ ይጫኑ",
      hintDouble: "ለመውጣት [SPACE] ሁለት ጊዜ በፍጥነት ይጫኑ",
      looping: "ክፍሎችን በመጥራት ላይ፡",
      inside: "በማንበብ ላይ፡",
      paused: "ቆሟል"
    },
    workspace: {
      leftTitle: "የፕሮፋይል ማዘመኛ (Sync)",
      leftSubtitle: "ወደ ሌላ ድረ-ገጽ ሳይወጡ ፕሮፋይልዎን እዚህ ያዘምኑ",
      centerTitle: "ዋና የስራ ቦታ",
      rightTitle: "የAI ጥቆማዎች",
      unfinishedCourses: "ያልተጠናቀቁ ትምህርቶች",
      activeApps: "የተላኩ የስራ ማመልከቻዎች",
      dailyNews: "ዕለታዊ የሙያ ዜናዎች",
      recCourses: "የተመረጡ አዳዲስ ትምህርቶች",
      recJobs: "ተዛማጅ የስራ እድሎች",
      syncLinkedInBtn: "ሊንክድኢን ፕሮፋይል አዘምን",
      postCertBtn: "ሰርተፊኬት ፖስት አድርግ",
      readAloud: "በድምፅ አንብብ",
      signThis: "በምልክት ቋንቋ",
      continueLesson: "ትምህርቱን ቀጥል",
      progressPlus: "+10% ጨምር",
      enroll: "ትምህርቱን ጀምር",
      apply: "በአንድ ጠቅታ አመልክት"
    },
    signBox: {
      title: "የምልክት ቋንቋ ማዕከል",
      tabAvatar: "አስተርጓሚ አቫታር",
      tabDetector: "የካሜራ መለያ",
      detectorHint: "የእጅ ምልክት ያሳዩ ወይም ከታች ያሉትን ትዕዛዞች ይሞክሩ፡",
      startCam: "ካሜራ ክፈት",
      stopCam: "ካሜራ ዝጋ",
      autoActiveBadge: "በራስ-ሰር የነቃ፡ ድምፅ/ቪዲዮ ወደ ምልክት ቋንቋ በመተርጎም ላይ",
      autoToggleLabel: "በድምፅ ጊዜ ክፈት"
    },
    aiChat: {
      title: "የአማርኛ እና እንግሊዝኛ AI ረዳት",
      placeholder: "በአማርኛ ወይም በእንግሊዝኛ ይጠይቁ (ለምሳሌ፡ 'የሊንክድኢን ጽሁፍ አዘጋጅልኝ')...",
      send: "ላክ"
    }
  }
};

// ============================================================================
// 2. INITIAL MOCK DATA (COURSES, JOBS, NEWS, INTEGRATIONS)
// ============================================================================
const INITIAL_COURSES = [
  {
    id: "c1",
    title: "Accessible Web Architecture & WCAG 2.2 AAA",
    platform: "edX",
    progress: 68,
    nextModule: "ARIA Live Regions & Screen Reader State Machines",
    duration: "4h 20m remaining",
    signSummary: "COURSE: ACCESSIBLE WEB. MODULE: SCREEN READERS AND ARIA LIVE REGIONS."
  },
  {
    id: "c2",
    title: "Full-Stack React, TypeScript & AI Agents",
    platform: "Coursera",
    progress: 42,
    nextModule: "Building Multimodal Voice & Vision Hooks",
    duration: "7h 15m remaining",
    signSummary: "COURSE: REACT AND AI AGENTS. MODULE: VOICE AND VISION HOOKS."
  },
  {
    id: "c3",
    title: "Python for Assistive Computer Vision",
    platform: "Udemy",
    progress: 85,
    nextModule: "Hand Landmark Gesture Classification",
    duration: "1h 10m remaining",
    signSummary: "COURSE: PYTHON COMPUTER VISION. MODULE: HAND GESTURE RECOGNITION."
  }
];

const INITIAL_APPLICATIONS = [
  { id: "a1", role: "Accessibility Engineer (Remote)", company: "GitHub Inclusive Tech", status: "Interview Scheduled", date: "Nov 12" },
  { id: "a2", role: "Frontend React Developer", company: "Addis FinTech Labs", status: "Under Review", date: "Nov 10" }
];

const DAILY_NEWS = [
  {
    id: "n1",
    tag: "AI & Accessibility",
    time: "2h ago",
    titleEn: "W3C Publishes New Multimodal Voice & Sign Language Web Standards",
    titleAm: "W3C አዲስ የድምፅ እና የምልክት ቋንቋ የድረ-ገጽ መስፈርቶችን ይፋ አደረገ",
    summaryEn: "New browser APIs make real-time sign language avatars and bilingual voice navigation native across modern web applications.",
    summaryAm: "አዳዲስ የብራውዘር ቴክኖሎጂዎች የምልክት ቋንቋ አቫታሮችን እና የድምፅ አሰሳን በቀላሉ ተደራሽ አድርገዋል።"
  },
  {
    id: "n2",
    tag: "Career & Remote Work",
    time: "5h ago",
    titleEn: "Global Tech Hiring Surge for Certified Accessibility & React Engineers",
    titleAm: "በዓለም አቀፍ ደረጃ የተደራሽነት እና የReact ባለሙያዎች የስራ ቅጥር በከፍተኛ ሁኔታ ጨመረ",
    summaryEn: "Remote-first companies report a 44% increase in demand for engineers skilled in inclusive UI design and AI integration.",
    summaryAm: "በርቀት የሚያሰሩ የቴክኖሎጂ ኩባንያዎች የአካል ጉዳተኞችን ተደራሽነት የሚያረጋግጡ ባለሙያዎችን በብዛት እየቀጠሩ ነው።"
  }
];

const RECOMMENDED_COURSES = [
  {
    id: "rc1",
    title: "Cloud AI Engineering with Gemini API",
    platform: "Google Cloud Skills",
    match: "98% Match",
    duration: "6 hours"
  },
  {
    id: "rc2",
    title: "System Design for High-Contrast UIs",
    platform: "Coursera",
    match: "94% Match",
    duration: "4.5 hours"
  }
];

const RECOMMENDED_JOBS = [
  {
    id: "rj1",
    role: "Senior Inclusive UI Developer",
    company: "OpenAI Accessibility Team",
    location: "Remote • $135k - $165k",
    match: "97% Match"
  },
  {
    id: "rj2",
    role: "AI Solutions Architect (Bilingual)",
    company: "EthioCloud Digital",
    location: "Addis Ababa / Hybrid",
    match: "95% Match"
  }
];

const SIGN_GLOSSARY = {
  WELCOME: { handLeft: "wave", handRight: "heart", expression: "smile", gloss: "HELLO / WELCOME TO ACCESSHUB" },
  COURSES: { handLeft: "book-open", handRight: "point-up", expression: "focus", gloss: "LEARN / UNFINISHED COURSES" },
  LINKEDIN: { handLeft: "link", handRight: "thumbs-up", expression: "smile", gloss: "SYNC / UPDATE LINKEDIN PROFILE" },
  NEWS: { handLeft: "read", handRight: "wave", expression: "alert", gloss: "DAILY CAREER NEWS UPDATE" },
  JOBS: { handLeft: "briefcase", handRight: "check", expression: "smile", gloss: "CAREER / MATCHED JOB OPPORTUNITIES" },
  AI: { handLeft: "sparkle", handRight: "point-head", expression: "smile", gloss: "AI ASSISTANT READY TO HELP" }
};

// ============================================================================
// 3. GEMINI API HELPER WITH EXPONENTIAL BACKOFF
// ============================================================================
async function callGeminiAssistant(promptText, systemInstruction) {
  const apiKey = "";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: promptText }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };

  let delay = 1000;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply) return reply;
    } catch (err) {
      if (attempt === 3) break;
      await new Promise((r) => setTimeout(r, delay));
      delay *= 2;
    }
  }
  return null;
}

// ============================================================================
// 4. EXPRESSIVE SVG SIGN LANGUAGE INTERPRETER AVATAR COMPONENT
// ============================================================================
function SignLanguageAvatar({ activeSignKey, caption, isDark, lang, isLiveTranslating, mediaSourceLabel }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const speed = isLiveTranslating ? 360 : 600;
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 4);
    }, speed);
    return () => clearInterval(interval);
  }, [activeSignKey, isLiveTranslating]);

  const signMeta = SIGN_GLOSSARY[activeSignKey] || SIGN_GLOSSARY.WELCOME;

  // Dynamic hand coordinates for realistic expressive signing motion
  const leftHandOffsets = isLiveTranslating
    ? [
        { x: 64, y: 116, rot: -22 },
        { x: 58, y: 98, rot: -35 },
        { x: 76, y: 106, rot: -10 },
        { x: 62, y: 112, rot: -26 }
      ]
    : [
        { x: 68, y: 122, rot: -15 },
        { x: 62, y: 108, rot: -28 },
        { x: 74, y: 114, rot: -8 },
        { x: 65, y: 118, rot: -20 }
      ];
  const rightHandOffsets = isLiveTranslating
    ? [
        { x: 136, y: 112, rot: 24 },
        { x: 142, y: 94, rot: 38 },
        { x: 124, y: 102, rot: 12 },
        { x: 138, y: 110, rot: 28 }
      ]
    : [
        { x: 132, y: 118, rot: 18 },
        { x: 138, y: 102, rot: 32 },
        { x: 126, y: 108, rot: 10 },
        { x: 135, y: 115, rot: 22 }
      ];

  const lh = leftHandOffsets[frame];
  const rh = rightHandOffsets[frame];

  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative w-full h-44 rounded-lg border overflow-hidden flex items-center justify-center ${
          isLiveTranslating
            ? "border-emerald-500/60 ring-2 ring-emerald-500/20"
            : isDark
            ? "border-[#30363d]"
            : "border-[#d0d7de]"
        } ${isDark ? "bg-[#0d1117]" : "bg-[#f6f8fa]"}`}
      >
        {/* Live Signing Status & Waveform Indicator */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-1">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{isLiveTranslating ? (lang === "am" ? "ቀጥታ ትርጉም" : "LIVE STREAM") : (lang === "am" ? "ዝግጁ" : "READY")}</span>
          </div>

          {isLiveTranslating && (
            <div className="flex items-end gap-0.5 h-3.5 px-2 py-0.5 rounded bg-purple-500/20 border border-purple-500/30" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((bar) => (
                <span
                  key={bar}
                  className="w-0.5 bg-purple-400 rounded-full transition-all duration-150"
                  style={{ height: `${((frame + bar) % 4) * 3 + 4}px` }}
                />
              ))}
            </div>
          )}
        </div>

        {mediaSourceLabel && (
          <div className="absolute bottom-1.5 left-2 right-2 text-center">
            <span className="inline-block max-w-full truncate px-2 py-0.5 rounded bg-black/65 text-[10px] font-mono text-amber-300 border border-amber-500/30">
              {mediaSourceLabel}
            </span>
          </div>
        )}

        <svg viewBox="0 0 200 175" className="w-44 h-40">
          {/* Shoulders / Torso */}
          <path
            d="M45,175 C45,138 155,138 155,175 Z"
            fill={isDark ? "#1f6feb" : "#0969da"}
            opacity="0.9"
          />
          {/* Neck */}
          <rect x="91" y="108" width="18" height="22" rx="8" fill="#f1c27d" />
          {/* Head */}
          <ellipse cx="100" cy="78" rx="28" ry="34" fill="#f1c27d" />
          {/* Hair */}
          <path
            d="M72,72 C72,40 128,40 128,72 C128,55 72,55 72,72 Z"
            fill={isDark ? "#21262d" : "#24292f"}
          />
          {/* Eyebrows (expressive facial grammar in sign language) */}
          <path
            d={frame % 2 === 0 ? "M83,65 Q89,61 95,65" : "M83,63 Q89,58 95,63"}
            stroke="#24292f"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={frame % 2 === 0 ? "M105,65 Q111,61 117,65" : "M105,63 Q111,58 117,63"}
            stroke="#24292f"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Eyes */}
          <circle cx="89" cy="73" r="3" fill="#1f2328" />
          <circle cx="111" cy="73" r="3" fill="#1f2328" />
          {/* Mouth */}
          <path
            d="M91,91 Q100,98 109,91"
            stroke="#8c3b2b"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Left Arm & Articulated Signing Hand */}
          <path
            d={`M55,152 Q${lh.x - 12},${lh.y + 15} ${lh.x},${lh.y}`}
            stroke={isDark ? "#388bfd" : "#218bff"}
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          <g transform={`translate(${lh.x}, ${lh.y}) rotate(${lh.rot})`}>
            <circle cx="0" cy="0" r="10" fill="#f1c27d" />
            {/* Fingers */}
            <line x1="-6" y1="-7" x2="-9" y2="-17" stroke="#f1c27d" strokeWidth="3" strokeLinecap="round" />
            <line x1="-2" y1="-9" x2="-2" y2="-20" stroke="#f1c27d" strokeWidth="3" strokeLinecap="round" />
            <line x1="3" y1="-9" x2="4" y2="-19" stroke="#f1c27d" strokeWidth="3" strokeLinecap="round" />
            <line x1="7" y1="-6" x2="10" y2="-15" stroke="#f1c27d" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Right Arm & Articulated Signing Hand */}
          <path
            d={`M145,152 Q${rh.x + 12},${rh.y + 15} ${rh.x},${rh.y}`}
            stroke={isDark ? "#388bfd" : "#218bff"}
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          <g transform={`translate(${rh.x}, ${rh.y}) rotate(${rh.rot})`}>
            <circle cx="0" cy="0" r="10" fill="#f1c27d" />
            {/* Fingers */}
            <line x1="-7" y1="-6" x2="-10" y2="-15" stroke="#f1c27d" strokeWidth="3" strokeLinecap="round" />
            <line x1="-3" y1="-9" x2="-4" y2="-19" stroke="#f1c27d" strokeWidth="3" strokeLinecap="round" />
            <line x1="2" y1="-9" x2="2" y2="-20" stroke="#f1c27d" strokeWidth="3" strokeLinecap="round" />
            <line x1="6" y1="-7" x2="9" y2="-17" stroke="#f1c27d" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* Gloss & Live Synchronized Caption */}
      <div
        className={`w-full mt-2 p-2.5 rounded-lg border text-xs ${
          isDark ? "bg-[#161b22] border-[#30363d] text-[#e6edf3]" : "bg-white border-[#d0d7de] text-[#1f2328]"
        }`}
      >
        <div className="font-mono text-[10px] uppercase tracking-wider text-blue-400 font-bold mb-0.5">
          ASL / EthSL GLOSS: {signMeta.gloss}
        </div>
        <p className="leading-snug font-medium line-clamp-2">{caption}</p>
      </div>
    </div>
  );
}

// ============================================================================
// 5. MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  // Theme & Language
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState("en"); // 'en' | 'am'
  const t = TRANSLATIONS[lang];

  // Accessibility Profile & App Stage
  // stage: 'triage' | 'onboarding' | 'dashboard'
  const [stage, setStage] = useState("triage");
  const [disabilityType, setDisabilityType] = useState(null); // 'blind' | 'deaf' | 'motor' | 'standard'

  // Onboarding State
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    career: "",
    studyPlan: ""
  });
  const [currentInput, setCurrentInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  // Voice Engine State (TTS & Audio Feedback)
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastSpokenText, setLastSpokenText] = useState("");

  // Blind Mode Hands-Free Spacebar Navigation Loop State
  const SECTION_KEYS = ["unfinished", "profileSync", "news", "recommendations"];
  const [loopActive, setLoopActive] = useState(false);
  const [announcedSectionIdx, setAnnouncedSectionIdx] = useState(0);
  const [activeLockedSection, setActiveLockedSection] = useState(null); // null when looping, or section key when entered
  const lastSpacePressRef = useRef(0);
  const singleSpaceTimerRef = useRef(null);

  // Dashboard Data State
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [activeLessonModal, setActiveLessonModal] = useState(null);

  // LinkedIn & External Profile Sync State
  const [linkedAccounts, setLinkedAccounts] = useState([
    { id: "linkedin", name: "LinkedIn", handle: "@selam-dev", connected: true, lastSynced: "Just now" },
    { id: "coursera", name: "Coursera", handle: "Synced (3 courses)", connected: true, lastSynced: "12m ago" },
    { id: "edx", name: "edX", handle: "Synced (1 course)", connected: true, lastSynced: "1h ago" },
    { id: "upwork", name: "Upwork", handle: "Profile Ready", connected: true, lastSynced: "3h ago" }
  ]);
  const [linkedInDraft, setLinkedInDraft] = useState("");
  const [syncLogs, setSyncLogs] = useState([
    "Ready to sync certificates, skills, and headline updates directly via OAuth API."
  ]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Floating Bottom-Right Sign Language Mini-Box State
  const [signBoxOpen, setSignBoxOpen] = useState(false);
  const [autoSignOnMedia, setAutoSignOnMedia] = useState(true); // Automatically opens & translates whenever ANY audio/video plays
  const [signBoxTab, setSignBoxTab] = useState("avatar"); // 'avatar' | 'detector'
  const [activeSignKey, setActiveSignKey] = useState("WELCOME");
  const [signCaption, setSignCaption] = useState("Welcome to AccessHub! Select a section or play any audio/video to auto-interpret.");
  const [activeMediaSource, setActiveMediaSource] = useState(null); // Tracks active audio/video stream label
  const [newsBriefingPlaying, setNewsBriefingPlaying] = useState(false);
  const [lessonMediaPlaying, setLessonMediaPlaying] = useState(true);
  const [lessonAudioOnly, setLessonAudioOnly] = useState(false);
  const [webcamActive, setWebcamActive] = useState(false);
  const [detectedGesture, setDetectedGesture] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Bilingual Gemini AI Assistant Drawer State
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      text: "Hello! ሰላም! I am your bilingual AccessHub AI Assistant. Ask me in English or Amharic to summarize courses, update your LinkedIn profile, or read today's career news."
    }
  ]);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState(null);
  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  }, []);

  // ============================================================================
  // 6. TEXT-TO-SPEECH (TTS) & AUTOMATIC SIGN LANGUAGE SYNCHRONIZER
  // ============================================================================
  const triggerAutoSignInterpreter = useCallback(
    (transcriptText, signKey = "WELCOME", sourceLabel = null) => {
      setSignCaption(transcriptText);
      if (signKey) setActiveSignKey(signKey);
      if (sourceLabel !== undefined) setActiveMediaSource(sourceLabel);

      // Automatically open & switch to the Sign Language Avatar whenever audio/video plays
      // unless the user explicitly toggled off auto-activation
      if (autoSignOnMedia || disabilityType === "deaf") {
        setSignBoxOpen(true);
        setSignBoxTab("avatar");
      }
    },
    [autoSignOnMedia, disabilityType]
  );

  const speakAndSign = useCallback(
    (text, signKey = "WELCOME", forceSpeak = false, sourceLabel = "AI Voice Stream") => {
      setLastSpokenText(text);
      triggerAutoSignInterpreter(text, signKey, sourceLabel);

      if (!voiceEnabled && !forceSpeak) return;

      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        try {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = lang === "am" ? "am-ET" : "en-US";
          utterance.rate = 0.98;
          utterance.onstart = () => setIsSpeaking(true);
          utterance.onend = () => {
            setIsSpeaking(false);
            setNewsBriefingPlaying(false);
            setActiveMediaSource(null);
          };
          utterance.onerror = () => {
            setIsSpeaking(false);
            setNewsBriefingPlaying(false);
            setActiveMediaSource(null);
          };
          window.speechSynthesis.speak(utterance);
        } catch (e) {
          setIsSpeaking(true);
          setTimeout(() => {
            setIsSpeaking(false);
            setNewsBriefingPlaying(false);
            setActiveMediaSource(null);
          }, 2500);
        }
      } else {
        setIsSpeaking(true);
        setTimeout(() => {
          setIsSpeaking(false);
          setNewsBriefingPlaying(false);
          setActiveMediaSource(null);
        }, 2500);
      }
    },
    [voiceEnabled, lang, triggerAutoSignInterpreter]
  );

  // Stop all active audio/video media playback cleanly
  const stopAllMediaPlayback = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setNewsBriefingPlaying(false);
    setLessonMediaPlaying(false);
    setActiveMediaSource(null);
  }, []);

  // Play/Toggle Daily Career News Audio Briefing (Auto-triggers Sign Interpreter)
  const handleToggleNewsBriefing = () => {
    if (newsBriefingPlaying) {
      stopAllMediaPlayback();
      return;
    }
    setNewsBriefingPlaying(true);
    const fullBriefing = DAILY_NEWS.map((n) =>
      lang === "am" ? `${n.titleAm}። ${n.summaryAm}` : `${n.titleEn}. ${n.summaryEn}`
    ).join(" ... ");

    const sourceTag = lang === "am" ? "🔊 የዜና ኦዲዮ (News Audio Briefing)" : "🔊 Daily Career News Audio Briefing";
    speakAndSign(fullBriefing, "NEWS", true, sourceTag);
  };

  // Speech-to-Text (STT) Voice Input Helper
  const startVoiceRecognition = (onTranscriptCallback) => {
    const SpeechRecognition =
      typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (!SpeechRecognition) {
      showToast(
        lang === "am"
          ? "የድምፅ ማወቂያ በዚህ ብራውዘር አይደገፍም። እባክዎ በጽሁፍ ይጠቀሙ።"
          : "Speech recognition is not supported in this browser. Please type your input."
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === "am" ? "am-ET" : "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      if (transcript && onTranscriptCallback) {
        onTranscriptCallback(transcript);
      }
    };
    recognition.onerror = () => {
      setIsListening(false);
      showToast("Voice input stopped. You can type or try again.");
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  // ============================================================================
  // 7. PRE-LOGIN TRIAGE & ONBOARDING FLOW HANDLERS
  // ============================================================================
  const handleSelectProfile = (type) => {
    setDisabilityType(type);
    setStage("onboarding");
    setOnboardingStep(0);

    if (type === "blind") {
      setVoiceEnabled(true);
      const firstQ = TRANSLATIONS[lang].onboarding.steps[0].question;
      const intro =
        lang === "am"
          ? `የድምፅ ረዳት ተጀምሯል። ${firstQ} እባክዎ በድምፅ ይመልሱ። ረዳቱ አሁን ድምፅዎን እያዳመጠ ነው።`
          : `Blind accessibility mode activated. Voice assistant ready. ${firstQ} Please speak your answer. Listening automatically now.`;
      
      // Speak the prompt first, then automatically start listening for voice input
      speakAndSign(intro, "AI", true, "🔊 Voice Assistant Onboarding");
      setTimeout(() => {
        startVoiceRecognitionAndAutoFill();
      }, 4000);
    } else if (type === "deaf") {
      setSignBoxOpen(true);
      setSignBoxTab("avatar");
      speakAndSign(
        lang === "am"
          ? "የምልክት ቋንቋ አስተርጓሚ ተከፍቷል። እባክዎ መረጃዎን ያስገቡ።"
          : "Deaf accessibility mode active. Real-time Sign Language Interpreter is open on the bottom right.",
        "WELCOME",
        false
      );
    } else if (type === "motor") {
      setVoiceEnabled(true);
      speakAndSign(
        "Motor accessibility mode active. Large targets and voice commands enabled.",
        "WELCOME",
        true
      );
    }
  };

  // Dedicated helper for blind mode automatic speech-to-text input capture & form fill
  const startVoiceRecognitionAndAutoFill = () => {
    const SpeechRecognition =
      typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (!SpeechRecognition) {
      showToast(
        lang === "am"
          ? "የድምፅ ማወቂያ በዚህ ብራውዘር አይደገፍም። እባክዎ በጽሁፍ ይጻፉ።"
          : "Speech recognition not supported. Please type your answer."
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === "am" ? "am-ET" : "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      if (transcript) {
        setCurrentInput(transcript);
        // Automatically submit the recognized voice transcript after a brief pause
        setTimeout(() => {
          handleOnboardingSubmitStep(transcript);
        }, 600);
      }
    };
    recognition.onerror = () => {
      setIsListening(false);
      showToast("Listening paused. Tap speak or type your answer.");
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleOnboardingSubmitStep = (valueOverride) => {
    const val = (valueOverride !== undefined ? valueOverride : currentInput).trim();
    if (!val) return;

    const steps = t.onboarding.steps;
    const currentKey = steps[onboardingStep].key;
    const updated = { ...userProfile, [currentKey]: val };
    setUserProfile(updated);
    setCurrentInput("");

    if (onboardingStep < steps.length - 1) {
      const nextIdx = onboardingStep + 1;
      setOnboardingStep(nextIdx);
      const nextQ = steps[nextIdx].question;
      if (disabilityType === "blind" || voiceEnabled) {
        speakAndSign(nextQ, "AI", true, "🔊 Voice Assistant Prompt");
        // Automatically trigger microphone listening for the next question if blind mode is active
        if (disabilityType === "blind") {
          setTimeout(() => {
            startVoiceRecognitionAndAutoFill();
          }, 3500);
        }
      }
    } else {
      completeOnboarding(updated);
    }
  };

  const handleQuickDemoFill = () => {
    const demo =
      lang === "am"
        ? {
            name: "ሰላማዊት ታደሰ (Selamawit Tadesse)",
            email: "selamawit.dev@gmail.com",
            career: "Full-Stack & Accessibility Engineer",
            studyPlan: "React, AI Agents & Cloud Architecture"
          }
        : {
            name: "Selamawit Tadesse",
            email: "selamawit.dev@gmail.com",
            career: "Full-Stack & Accessibility Engineer",
            studyPlan: "React, AI Agents & Cloud Architecture"
          };
    setUserProfile(demo);
    completeOnboarding(demo);
  };

  const completeOnboarding = (finalProfile) => {
    setLinkedInDraft(
      `Excited to share my learning journey in ${finalProfile.studyPlan} as a ${finalProfile.career}! Synced automatically via AccessHub.`
    );
    setStage("dashboard");

    if (disabilityType === "blind") {
      setLoopActive(true);
      setAnnouncedSectionIdx(0);
      setActiveLockedSection(null);
      const welcomeMsg =
        lang === "am"
          ? `እንኳን ደህና መጡ ${finalProfile.name}። አሁን ክፍሎችን በድምፅ እጠራለሁ። ለመምረጥ Spacebar አንድ ጊዜ ይጫኑ፤ ለመውጣት ሁለት ጊዜ ይጫኑ።`
          : `Welcome ${finalProfile.name}. Starting section loop. Press Spacebar once to enter a section, or double-tap Spacebar to exit.`;
      speakAndSign(welcomeMsg, "WELCOME", true);
    } else if (disabilityType === "deaf") {
      setSignBoxOpen(true);
      setActiveSignKey("COURSES");
      setSignCaption(
        `Welcome ${finalProfile.name}! Your personalized courses and jobs for ${finalProfile.career} are ready.`
      );
    }
  };

  // Automatically trigger Sign Language Interpreter whenever a Course Lesson Video/Audio Modal is playing
  useEffect(() => {
    if (!activeLessonModal) return;
    if (lessonMediaPlaying) {
      const modeTag = lessonAudioOnly ? "🎧 Course Audio Lecture" : "🎬 Course Video & Audio";
      const script = `${activeLessonModal.title}: ${activeLessonModal.nextModule}. ${activeLessonModal.signSummary}`;
      speakAndSign(script, "COURSES", true, `${modeTag}: ${activeLessonModal.platform}`);
    } else {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      setActiveMediaSource(null);
    }
  }, [activeLessonModal, lessonMediaPlaying, lessonAudioOnly, speakAndSign]);

  // ============================================================================
  // 8. BLIND MODE HANDS-FREE SPACEBAR LOOPING ENGINE
  // ============================================================================
  const readSectionContentAloud = useCallback(
    (sectionKey) => {
      if (sectionKey === "unfinished") {
        const courseSummary = courses
          .map((c) => `${c.title} on ${c.platform}, ${c.progress}% complete`)
          .join(". ");
        speakAndSign(
          lang === "am"
            ? `ያልተጠናቀቁ ትምህርቶች፡ ${courseSummary}። ለመውጣት Spacebar ሁለት ጊዜ ይጫኑ።`
            : `Entering Unfinished Courses. You have ${courses.length} active courses: ${courseSummary}. Double-tap Spacebar to exit.`,
          "COURSES",
          true
        );
      } else if (sectionKey === "profileSync") {
        speakAndSign(
          lang === "am"
            ? "የሊንክድኢን እና ፕሮፋይል ማዘመኛ ክፍል። የቅርብ ጊዜ ትምህርትዎን ወደ ሊንክድኢን ለመላክ ዝግጁ ነው። ለመውጣት Spacebar ሁለት ጊዜ ይጫኑ።"
            : "Entering Update LinkedIn and External Profiles. Connected to LinkedIn, Coursera, edX, and Upwork. Double-tap Spacebar to exit.",
          "LINKEDIN",
          true
        );
      } else if (sectionKey === "news") {
        const headlines = DAILY_NEWS.map((n) => (lang === "am" ? n.titleAm : n.titleEn)).join(". ");
        speakAndSign(
          lang === "am"
            ? `ዕለታዊ የሙያ ዜናዎች፡ ${headlines}። ለመውጣት Spacebar ሁለት ጊዜ ይጫኑ።`
            : `Entering Daily Career News. Top stories: ${headlines}. Double-tap Spacebar to exit.`,
          "NEWS",
          true
        );
      } else if (sectionKey === "recommendations") {
        const recs = RECOMMENDED_JOBS.map((j) => `${j.role} at ${j.company}`).join(". ");
        speakAndSign(
          lang === "am"
            ? `የAI ስራ እና ትምህርት ጥቆማዎች፡ ${recs}። ለመውጣት Spacebar ሁለት ጊዜ ይጫኑ።`
            : `Entering AI Course and Job Recommendations. Matched jobs: ${recs}. Double-tap Spacebar to exit.`,
          "JOBS",
          true
        );
      }
    },
    [courses, lang, speakAndSign]
  );

  // Automatic Section Announcer Interval when loopActive && !activeLockedSection
  useEffect(() => {
    if (stage !== "dashboard" || !loopActive || activeLockedSection) return;

    const timer = setInterval(() => {
      setAnnouncedSectionIdx((prev) => {
        const next = (prev + 1) % SECTION_KEYS.length;
        const secKey = SECTION_KEYS[next];
        const label = t.sections[secKey];
        const signMap = {
          unfinished: "COURSES",
          profileSync: "LINKEDIN",
          news: "NEWS",
          recommendations: "JOBS"
        };
        speakAndSign(label, signMap[secKey], true);
        return next;
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [stage, loopActive, activeLockedSection, t.sections, speakAndSign]);

  // Global Keyboard Listener for Single vs. Double Spacebar Press
  useEffect(() => {
    if (stage !== "dashboard") return;

    const handleKeyDown = (e) => {
      // Ignore if typing inside an input/textarea
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      if (e.code === "Space") {
        e.preventDefault();
        const now = Date.now();
        const delta = now - lastSpacePressRef.current;
        lastSpacePressRef.current = now;

        // Double Spacebar Tap (< 340ms) -> Exit active section & resume loop
        if (delta < 340) {
          if (singleSpaceTimerRef.current) {
            clearTimeout(singleSpaceTimerRef.current);
            singleSpaceTimerRef.current = null;
          }
          setActiveLockedSection(null);
          setLoopActive(true);
          speakAndSign(
            lang === "am"
              ? "ከክፍሉ ወጥተዋል። ክፍሎችን እንደገና በመጥራት ላይ..."
              : "Exited section. Resuming section announcement loop.",
            "WELCOME",
            true
          );
          return;
        }

        // Single Spacebar Press -> Wait 340ms to ensure it's not a double tap, then lock into section
        singleSpaceTimerRef.current = setTimeout(() => {
          const targetKey = SECTION_KEYS[announcedSectionIdx];
          setActiveLockedSection(targetKey);
          readSectionContentAloud(targetKey);
        }, 340);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [stage, announcedSectionIdx, lang, readSectionContentAloud, speakAndSign]);

  // ============================================================================
  // 9. DASHBOARD INTERACTIVE ACTIONS
  // ============================================================================
  const handleIncrementProgress = (courseId) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c;
        const nextProg = Math.min(100, c.progress + 10);
        speakAndSign(`${c.title} updated to ${nextProg}% completion.`, "COURSES");
        showToast(`Progress updated: ${c.title} (${nextProg}%)`);
        return { ...c, progress: nextProg };
      })
    );
  };

  const handleEnrollRecommended = (rec) => {
    if (courses.some((c) => c.title === rec.title)) {
      showToast("Course is already in your Active Workspace.");
      return;
    }
    const newCourse = {
      id: `c-${Date.now()}`,
      title: rec.title,
      platform: rec.platform,
      progress: 5,
      nextModule: "Module 1: Foundations & Setup",
      duration: rec.duration,
      signSummary: `NEW COURSE ADDED: ${rec.title.toUpperCase()}`
    };
    setCourses((prev) => [newCourse, ...prev]);
    speakAndSign(`Enrolled in ${rec.title}. Added to your Active Workspace.`, "COURSES");
    showToast(`Added "${rec.title}" to Active Workspace!`);
  };

  const handleApplyJob = (job) => {
    if (applications.some((a) => a.role === job.role)) {
      showToast("Application already submitted!");
      return;
    }
    setApplications((prev) => [
      { id: `app-${Date.now()}`, role: job.role, company: job.company, status: "Submitted via AccessHub", date: "Today" },
      ...prev
    ]);
    speakAndSign(`Application submitted for ${job.role} at ${job.company}.`, "JOBS");
    showToast(`1-Click Application sent to ${job.company}!`);
  };

  const handleSyncExternalProfile = (actionType) => {
    setIsSyncing(true);
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setTimeout(() => {
      setIsSyncing(false);
      const message =
        actionType === "certificate"
          ? `Posted verified certificate "Accessible Web Architecture (68% Milestone)" to LinkedIn & Upwork.`
          : `Updated LinkedIn headline & bio: "${linkedInDraft || userProfile.career}"`;

      setSyncLogs((prev) => [`[${timestamp}] ✓ ${message}`, ...prev]);
      setLinkedAccounts((prev) =>
        prev.map((acc) => (acc.id === "linkedin" ? { ...acc, lastSynced: "Just now" } : acc))
      );
      speakAndSign(
        lang === "am"
          ? "የሊንክድኢን ፕሮፋይልዎ በተሳካ ሁኔታ ተዘምኗል።"
          : "LinkedIn profile updated directly via AccessHub API.",
        "LINKEDIN"
      );
      showToast("External LinkedIn profile updated without leaving AccessHub!");
    }, 850);
  };

  // ============================================================================
  // 10. WEBCAM SIGN LANGUAGE DETECTOR (MEDIA DEVICES + SIMULATOR FALLBACK)
  // ============================================================================
  const toggleWebcam = async () => {
    if (webcamActive) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      setWebcamActive(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      setWebcamActive(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err) {
      showToast("Camera permission unavailable — using interactive Sign Command Simulator.");
      setWebcamActive(false);
    }
  };

  const executeDetectedSignCommand = (gestureName) => {
    setDetectedGesture(gestureName);
    if (gestureName === "NEXT_SECTION") {
      const next = (announcedSectionIdx + 1) % SECTION_KEYS.length;
      setAnnouncedSectionIdx(next);
      setActiveLockedSection(SECTION_KEYS[next]);
      readSectionContentAloud(SECTION_KEYS[next]);
    } else if (gestureName === "SYNC_LINKEDIN") {
      setActiveLockedSection("profileSync");
      handleSyncExternalProfile("headline");
    } else if (gestureName === "READ_NEWS") {
      setActiveLockedSection("news");
      readSectionContentAloud("news");
    } else if (gestureName === "OPEN_AI") {
      setAiOpen(true);
      setActiveSignKey("AI");
      setSignCaption("AI Copilot opened via Sign Gesture.");
    }
  };

  // ============================================================================
  // 11. BILINGUAL GEMINI AI ASSISTANT HANDLER
  // ============================================================================
  const handleSendAiPrompt = async (customText) => {
    const query = (customText || aiPrompt).trim();
    if (!query || aiLoading) return;

    setAiPrompt("");
    setAiMessages((prev) => [...prev, { role: "user", text: query }]);
    setAiLoading(true);

    // Check for direct UI command intents first
    const lower = query.toLowerCase();
    if (lower.includes("linkedin") && (lower.includes("update") || lower.includes("post") || lower.includes("sync"))) {
      handleSyncExternalProfile("headline");
    }

    const sysInstruction = `You are AccessHub's bilingual (English & Amharic) accessibility AI copilot.
User Profile: Name=${userProfile.name || "Learner"}, Career=${userProfile.career || "Software Engineer"}, StudyPlan=${userProfile.studyPlan || "Web & AI"}, DisabilityMode=${disabilityType || "standard"}, PreferredLang=${lang}.
Respond concisely (2-4 sentences), empathetically, and clearly. If the user writes in Amharic or lang is 'am', respond in both Amharic and English.`;

    const aiResponse = await callGeminiAssistant(query, sysInstruction);
    const fallbackResponse =
      lang === "am"
        ? `ለ"${userProfile.career || "ሙያዎ"}" የተዘጋጀ ምክር፡ የReact እና የተደራሽነት ትምህርትዎን 68% አጠናቀዋል። የሊንክድኢን ፕሮፋይልዎን በአንድ ጠቅታ ማዘመን ይችላሉ።`
        : `Based on your goal in ${userProfile.career || "Software Engineering"}, you're 68% through your Accessibility course. I've prepared a LinkedIn milestone post and matched 2 high-priority remote roles in your right sidebar.`;

    const finalReply = aiResponse || fallbackResponse;
    setAiMessages((prev) => [...prev, { role: "assistant", text: finalReply }]);
    setAiLoading(false);
    speakAndSign(finalReply, "AI");
  };

  // ============================================================================
  // 12. GITHUB HIGH-CONTRAST THEME TOKENS
  // ============================================================================
  const theme = isDark
    ? {
        bg: "bg-[#0d1117]",
        surface: "bg-[#161b22]",
        surfaceHover: "hover:bg-[#1f242c]",
        border: "border-[#30363d]",
        text: "text-[#e6edf3]",
        textMuted: "text-[#8b949e]",
        accentBtn: "bg-[#238636] hover:bg-[#2ea043] text-white border-[#2ea043]",
        secondaryBtn: "bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border-[#30363d]",
        ringActive: "ring-2 ring-[#58a6ff] border-[#58a6ff]"
      }
    : {
        bg: "bg-[#f6f8fa]",
        surface: "bg-[#ffffff]",
        surfaceHover: "hover:bg-[#f3f4f6]",
        border: "border-[#d0d7de]",
        text: "text-[#1f2328]",
        textMuted: "text-[#57606a]",
        accentBtn: "bg-[#1f883d] hover:bg-[#1a7f37] text-white border-[#1f883d]",
        secondaryBtn: "bg-[#f6f8fa] hover:bg-[#eaeef2] text-[#24292f] border-[#d0d7de]",
        ringActive: "ring-2 ring-[#0969da] border-[#0969da]"
      };

  const isMotorMode = disabilityType === "motor";

  // ============================================================================
  // RENDER: HEADER BAR (PERSISTENT ACROSS ALL STAGES)
  // ============================================================================
  const renderHeader = () => (
    <header
      className={`sticky top-0 z-40 border-b ${theme.border} ${
        isDark ? "bg-[#010409]/95" : "bg-[#ffffff]/95"
      } backdrop-blur px-4 py-3`}
    >
      <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Mode Pill */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#238636] flex items-center justify-center text-white font-bold shadow-sm">
            <Accessibility className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight">{t.brand}</span>
              {disabilityType && (
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 uppercase">
                  {disabilityType} mode
                </span>
              )}
            </div>
            <p className={`text-xs ${theme.textMuted} hidden sm:block`}>{t.tagline}</p>
          </div>
        </div>

        {/* Right Controls: Language, Voice Status, Sign Box Toggle, Theme */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Language Switcher (English / Amharic) */}
          <button
            onClick={() => {
              const nextLang = lang === "en" ? "am" : "en";
              setLang(nextLang);
              showToast(nextLang === "am" ? "ቋንቋ ወደ አማርኛ ተቀይሯል" : "Language switched to English");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-semibold transition ${theme.secondaryBtn}`}
            aria-label="Switch Language between English and Amharic"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>{lang === "en" ? "English / አማርኛ" : "አማርኛ / English"}</span>
          </button>

          {/* Voice Engine Toggle */}
          <button
            onClick={() => {
              setVoiceEnabled((v) => !v);
              if (voiceEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
                window.speechSynthesis.cancel();
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-semibold transition ${
              voiceEnabled
                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/40"
                : theme.secondaryBtn
            }`}
            aria-label="Toggle Voice Assistant"
          >
            {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">
              {isSpeaking ? (lang === "am" ? "በማንበብ ላይ..." : "Speaking...") : voiceEnabled ? "Voice ON" : "Voice Muted"}
            </span>
          </button>

          {/* Sign Language Mini-Box Quick Toggle */}
          <button
            onClick={() => setSignBoxOpen((o) => !o)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-semibold transition ${
              signBoxOpen
                ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                : theme.secondaryBtn
            }`}
          >
            <Hand className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">{t.signBox.title}</span>
            {(isSpeaking || newsBriefingPlaying || (activeLessonModal && lessonMediaPlaying)) && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            )}
          </button>

          {/* AI Copilot Drawer Toggle */}
          {stage === "dashboard" && (
            <button
              onClick={() => setAiOpen((o) => !o)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-semibold transition ${theme.accentBtn}`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Copilot</span>
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark((d) => !d)}
            className={`p-2 rounded-md border transition ${theme.secondaryBtn}`}
            aria-label="Toggle Dark or Light High-Contrast Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );

  // ============================================================================
  // RENDER: STAGE 1 — ACCESSIBILITY TRIAGE (PRE-LOGIN)
  // ============================================================================
  if (stage === "triage") {
    const profileCards = [
      { id: "blind", icon: Eye, color: "text-amber-400", borderHover: "hover:border-amber-400" },
      { id: "deaf", icon: Ear, color: "text-purple-400", borderHover: "hover:border-purple-400" },
      { id: "motor", icon: Accessibility, color: "text-emerald-400", borderHover: "hover:border-emerald-400" },
      { id: "standard", icon: Sliders, color: "text-blue-400", borderHover: "hover:border-blue-400" }
    ];

    return (
      <div className={`min-h-screen ${theme.bg} ${theme.text} flex flex-col`}>
        {renderHeader()}
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-10 flex flex-col justify-center">
          <div className={`rounded-xl border ${theme.border} ${theme.surface} p-6 sm:p-8 shadow-lg`}>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-400 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>WCAG 2.2 AAA Adaptive Onboarding</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{t.triageTitle}</h1>
            <p className={`${theme.textMuted} text-sm sm:text-base mb-6`}>{t.triageSubtitle}</p>

            {/* Step 1: Language Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-3">{t.selectLanguage}</label>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <button
                  onClick={() => setLang("en")}
                  className={`p-3 rounded-lg border text-left font-semibold flex items-center justify-between transition ${
                    lang === "en" ? theme.ringActive : `${theme.border} ${theme.surfaceHover}`
                  }`}
                >
                  <span>English (US)</span>
                  {lang === "en" && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                </button>
                <button
                  onClick={() => setLang("am")}
                  className={`p-3 rounded-lg border text-left font-semibold flex items-center justify-between transition ${
                    lang === "am" ? theme.ringActive : `${theme.border} ${theme.surfaceHover}`
                  }`}
                >
                  <span>አማርኛ (Amharic)</span>
                  {lang === "am" && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                </button>
              </div>
            </div>

            {/* Step 2: Disability Profile Selection */}
            <div>
              <label className="block text-sm font-semibold mb-3">{t.selectProfile}</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profileCards.map(({ id, icon: Icon, color, borderHover }) => {
                  const info = t.profiles[id];
                  return (
                    <button
                      key={id}
                      onClick={() => handleSelectProfile(id)}
                      className={`p-5 rounded-xl border ${theme.border} ${borderHover} ${theme.surfaceHover} text-left transition flex flex-col justify-between group focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className={`p-2.5 rounded-lg border ${theme.border} ${theme.bg}`}>
                            <Icon className={`w-6 h-6 ${color}`} />
                          </div>
                          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400">
                            {info.badge}
                          </span>
                        </div>
                        <h2 className="text-lg font-bold mb-1.5 group-hover:text-blue-400 transition">
                          {info.title}
                        </h2>
                        <p className={`text-xs sm:text-sm ${theme.textMuted} leading-relaxed`}>
                          {info.desc}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-dashed border-gray-700/40 flex items-center justify-between text-xs font-semibold text-blue-400">
                        <span>{lang === "am" ? "ይህን ሁኔታ ይምረጡ" : "Select & Launch Setup"}</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ============================================================================
  // RENDER: STAGE 2 — CONVERSATIONAL VOICE & TEXT ONBOARDING
  // ============================================================================
  if (stage === "onboarding") {
    const steps = t.onboarding.steps;
    const currentStepObj = steps[onboardingStep];

    return (
      <div className={`min-h-screen ${theme.bg} ${theme.text} flex flex-col`}>
        {renderHeader()}
        <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-10 flex flex-col justify-center">
          <div className={`rounded-xl border ${theme.border} ${theme.surface} p-6 sm:p-8 shadow-lg`}>
            {/* Progress Stepper */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono uppercase text-blue-400 font-semibold">
                Step {onboardingStep + 1} of {steps.length}
              </span>
              <button
                onClick={handleQuickDemoFill}
                className={`px-3 py-1.5 rounded-md border text-xs font-semibold flex items-center gap-1.5 ${theme.secondaryBtn}`}
              >
                <Sparkle className="w-3.5 h-3.5 text-amber-400" />
                {t.onboarding.quickDemo}
              </button>
            </div>

            <div className="w-full h-2 rounded-full bg-gray-700/40 overflow-hidden mb-6">
              <div
                className="h-full bg-[#238636] transition-all duration-300"
                style={{ width: `${((onboardingStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            <h1 className="text-xl sm:text-2xl font-bold mb-1">{t.onboarding.title}</h1>
            <p className={`text-xs sm:text-sm ${theme.textMuted} mb-6`}>{t.onboarding.subtitle}</p>

            {/* Live AI Voice Prompt Card */}
            <div className={`p-4 rounded-lg border ${theme.border} ${theme.bg} mb-5`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <Radio className="w-4 h-4 animate-pulse" />
                  {lang === "am" ? "የAI ረዳት ጥያቄ" : "AI Assistant Prompt"}
                </span>
                <button
                  onClick={() => speakAndSign(currentStepObj.question, "AI", true)}
                  className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  {lang === "am" ? "ድገም" : "Replay Audio"}
                </button>
              </div>
              <p className="text-base sm:text-lg font-semibold">{currentStepObj.question}</p>
            </div>

            {/* Input + Voice Microphone */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleOnboardingSubmitStep()}
                  placeholder={currentStepObj.placeholder}
                  autoFocus
                  className={`flex-1 px-4 py-3 rounded-lg border ${theme.border} ${theme.bg} ${theme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <button
                  type="button"
                  onClick={() =>
                    startVoiceRecognition((transcript) => {
                      setCurrentInput(transcript);
                      handleOnboardingSubmitStep(transcript);
                    })
                  }
                  className={`px-4 py-3 rounded-lg border font-semibold text-xs flex items-center gap-2 transition ${
                    isListening
                      ? "bg-red-500/20 border-red-500 text-red-400 animate-pulse"
                      : theme.secondaryBtn
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-blue-400" />}
                  <span>{isListening ? t.onboarding.listening : t.onboarding.speakAnswer}</span>
                </button>
              </div>

              {/* Previously Captured Fields Summary */}
              {Object.entries(userProfile).some(([, v]) => v) && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {Object.entries(userProfile).map(([k, v]) =>
                    v ? (
                      <span
                        key={k}
                        className={`text-xs px-2.5 py-1 rounded-full border ${theme.border} ${theme.bg} flex items-center gap-1.5`}
                      >
                        <Check className="w-3 h-3 text-emerald-400" />
                        <strong className="capitalize">{k}:</strong> {v}
                      </span>
                    ) : null
                  )}
                </div>
              )}

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setStage("triage")}
                  className={`px-4 py-2 rounded-lg border text-xs font-semibold ${theme.secondaryBtn}`}
                >
                  ← {lang === "am" ? "ተመለስ" : "Back"}
                </button>
                <button
                  onClick={() => handleOnboardingSubmitStep()}
                  className={`px-6 py-2.5 rounded-lg border text-sm font-semibold flex items-center gap-2 ${theme.accentBtn}`}
                >
                  <span>{onboardingStep === steps.length - 1 ? t.onboarding.finish : t.onboarding.next}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ============================================================================
  // RENDER: STAGE 3 — POST-LOGIN 3-COLUMN GITHUB-STYLE WORKSPACE
  // ============================================================================
  const currentAnnouncedKey = SECTION_KEYS[announcedSectionIdx];

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} flex flex-col`}>
      {renderHeader()}

      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-lg bg-[#238636] text-white text-xs sm:text-sm font-semibold shadow-xl flex items-center gap-2 border border-emerald-400/40">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* BLIND MODE / KEYBOARD SPACEBAR AUDIO NAVIGATOR BAR */}
      <div className={`border-b ${theme.border} ${isDark ? "bg-[#161b22]" : "bg-[#eaeef2]"} px-4 py-2.5`}>
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 font-bold text-amber-400">
              <Keyboard className="w-4 h-4" />
              {t.spacebarBar.title}
            </span>
            <span className={`px-2.5 py-1 rounded border ${theme.border} ${theme.bg} font-mono`}>
              {activeLockedSection ? (
                <span className="text-emerald-400 font-semibold">
                  {t.spacebarBar.inside} {t.sections[activeLockedSection]}
                </span>
              ) : loopActive ? (
                <span className="text-blue-400 font-semibold">
                  {t.spacebarBar.looping} {t.sections[currentAnnouncedKey]}
                </span>
              ) : (
                <span className={theme.textMuted}>{t.spacebarBar.paused}</span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className={`${theme.textMuted} hidden lg:inline`}>
              • {t.spacebarBar.hintSingle} &nbsp;|&nbsp; • {t.spacebarBar.hintDouble}
            </span>
            <button
              onClick={() => {
                if (loopActive) {
                  setLoopActive(false);
                  setActiveLockedSection(null);
                } else {
                  setLoopActive(true);
                  setActiveLockedSection(null);
                  speakAndSign(t.sections[SECTION_KEYS[announcedSectionIdx]], "WELCOME", true);
                }
              }}
              className={`px-3 py-1 rounded border font-semibold flex items-center gap-1.5 ${
                loopActive ? "bg-amber-500/20 border-amber-500/40 text-amber-300" : theme.secondaryBtn
              }`}
            >
              {loopActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{loopActive ? "Pause Loop" : "Start Spacebar Loop"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* MAIN 3-COLUMN RESPONSIVE GITHUB DASHBOARD */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ==================================================================
              COLUMN 1 (LEFT NARROW - 3 COLS): PROFILE SYNC & INTEGRATIONS
             ================================================================== */}
          <section
            aria-label={t.sections.profileSync}
            className={`lg:col-span-3 rounded-xl border ${theme.border} ${theme.surface} p-4 transition-all ${
              activeLockedSection === "profileSync" || (loopActive && !activeLockedSection && currentAnnouncedKey === "profileSync")
                ? theme.ringActive
                : ""
            }`}
          >
            {/* User Identity Card */}
            <div className={`pb-4 mb-4 border-b ${theme.border}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                  {(userProfile.name || "S")[0]}
                </div>
                <div className="min-w-0">
                  <h2 className="font-bold text-base truncate">{userProfile.name || "Selamawit Tadesse"}</h2>
                  <p className={`text-xs ${theme.textMuted} truncate`}>{userProfile.career || "Full-Stack Developer"}</p>
                </div>
              </div>
              <p className={`text-xs ${theme.textMuted} mt-2`}>
                <strong>Study Goal:</strong> {userProfile.studyPlan || "React, AI & Accessibility"}
              </p>
            </div>

            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-blue-400" />
                {t.workspace.leftTitle}
              </h3>
            </div>
            <p className={`text-xs ${theme.textMuted} mb-3`}>{t.workspace.leftSubtitle}</p>

            {/* Connected External Accounts */}
            <div className="space-y-2 mb-4">
              {linkedAccounts.map((acc) => (
                <div
                  key={acc.id}
                  className={`p-2.5 rounded-lg border ${theme.border} ${theme.bg} flex items-center justify-between text-xs`}
                >
                  <div>
                    <div className="font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      {acc.name}
                    </div>
                    <div className={`text-[11px] ${theme.textMuted}`}>{acc.handle}</div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">{acc.lastSynced}</span>
                </div>
              ))}
            </div>

            {/* Direct LinkedIn / Profile Updater Box */}
            <div className={`p-3 rounded-lg border ${theme.border} ${theme.bg} space-y-2.5`}>
              <label className="block text-xs font-semibold">
                {lang === "am" ? "የሊንክድኢን ዝመና መልዕክት" : "Direct LinkedIn Headline / Post"}
              </label>
              <textarea
                rows={3}
                value={linkedInDraft}
                onChange={(e) => setLinkedInDraft(e.target.value)}
                className={`w-full p-2 rounded border ${theme.border} ${theme.surface} text-xs focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                onClick={() => handleSyncExternalProfile("headline")}
                disabled={isSyncing}
                className={`w-full ${isMotorMode ? "py-3.5 text-sm" : "py-2 text-xs"} px-3 rounded-lg border font-semibold flex items-center justify-center gap-1.5 transition ${theme.accentBtn}`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                <span>{t.workspace.syncLinkedInBtn}</span>
              </button>
              <button
                onClick={() => handleSyncExternalProfile("certificate")}
                disabled={isSyncing}
                className={`w-full ${isMotorMode ? "py-3 text-sm" : "py-2 text-xs"} px-3 rounded-lg border font-semibold flex items-center justify-center gap-1.5 transition ${theme.secondaryBtn}`}
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.workspace.postCertBtn}</span>
              </button>
            </div>

            {/* Live API Sync Terminal Log */}
            <div className={`mt-4 p-2.5 rounded-lg border ${theme.border} ${theme.bg} font-mono text-[11px]`}>
              <div className="flex items-center gap-1.5 text-blue-400 font-semibold mb-1">
                <Terminal className="w-3.5 h-3.5" />
                <span>OAuth Sync Activity</span>
              </div>
              <div className="space-y-1 max-h-24 overflow-y-auto">
                {syncLogs.map((log, i) => (
                  <p key={i} className={theme.textMuted}>
                    {log}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* ==================================================================
              COLUMN 2 (CENTER WIDE - 6 COLS): ACTIVE WORKSPACE & DAILY NEWS
             ================================================================== */}
          <div className="lg:col-span-6 space-y-6">
            {/* UNFINISHED COURSES & APPLICATIONS */}
            <section
              aria-label={t.sections.unfinished}
              className={`rounded-xl border ${theme.border} ${theme.surface} p-5 transition-all ${
                activeLockedSection === "unfinished" || (loopActive && !activeLockedSection && currentAnnouncedKey === "unfinished")
                  ? theme.ringActive
                  : ""
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                  {t.workspace.unfinishedCourses}
                </h2>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  {courses.length} Active
                </span>
              </div>

              <div className="space-y-3">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className={`p-4 rounded-lg border ${theme.border} ${theme.bg} transition`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30">
                          {course.platform}
                        </span>
                        <h3 className="font-bold text-sm sm:text-base mt-1.5">{course.title}</h3>
                        <p className={`text-xs ${theme.textMuted} mt-0.5`}>
                          Next: {course.nextModule} • {course.duration}
                        </p>
                      </div>
                      <span className="font-mono text-sm font-bold text-emerald-400">{course.progress}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-gray-700/40 overflow-hidden my-3">
                      <div
                        className="h-full bg-[#238636] transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>

                    {/* Action Controls */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        onClick={() => {
                          setLessonAudioOnly(false);
                          setLessonMediaPlaying(true);
                          setActiveLessonModal(course);
                        }}
                        className={`${isMotorMode ? "px-4 py-2.5 text-sm" : "px-3 py-1.5 text-xs"} rounded-md border font-semibold flex items-center gap-1.5 ${theme.accentBtn}`}
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>{t.workspace.continueLesson}</span>
                      </button>

                      <button
                        onClick={() => handleIncrementProgress(course.id)}
                        className={`${isMotorMode ? "px-4 py-2.5 text-sm" : "px-3 py-1.5 text-xs"} rounded-md border font-semibold ${theme.secondaryBtn}`}
                      >
                        {t.workspace.progressPlus}
                      </button>

                      <button
                        onClick={() => {
                          setSignBoxOpen(true);
                          setSignBoxTab("avatar");
                          setActiveSignKey("COURSES");
                          setSignCaption(course.signSummary);
                        }}
                        className={`${isMotorMode ? "px-4 py-2.5 text-sm" : "px-3 py-1.5 text-xs"} rounded-md border font-semibold flex items-center gap-1.5 ${theme.secondaryBtn}`}
                      >
                        <Hand className="w-3.5 h-3.5 text-purple-400" />
                        <span>{t.workspace.signThis}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Active Job Applications Sub-Panel */}
              <div className={`mt-5 pt-4 border-t ${theme.border}`}>
                <h3 className="text-sm font-bold flex items-center gap-2 mb-3">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                  {t.workspace.activeApps}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className={`p-3 rounded-lg border ${theme.border} ${theme.bg} text-xs flex flex-col justify-between`}
                    >
                      <div>
                        <div className="font-bold">{app.role}</div>
                        <div className={theme.textMuted}>{app.company}</div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[11px]">
                          {app.status}
                        </span>
                        <span className={theme.textMuted}>{app.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* DAILY CAREER NEWS FEED */}
            <section
              aria-label={t.sections.news}
              className={`rounded-xl border ${theme.border} ${theme.surface} p-5 transition-all ${
                activeLockedSection === "news" || (loopActive && !activeLockedSection && currentAnnouncedKey === "news")
                  ? theme.ringActive
                  : ""
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
                    <Newspaper className="w-5 h-5 text-amber-400" />
                    {t.workspace.dailyNews}
                  </h2>
                  <span className={`text-xs ${theme.textMuted}`}>
                    Tailored for {userProfile.career || "Tech & Accessibility"}
                  </span>
                </div>

                {/* Listen to News Briefing Audio Button -> Auto-activates Sign Language Interpreter */}
                <button
                  onClick={handleToggleNewsBriefing}
                  className={`px-3.5 py-2 rounded-lg border text-xs font-semibold flex items-center gap-2 transition ${
                    newsBriefingPlaying
                      ? "bg-amber-500/20 border-amber-500 text-amber-300"
                      : theme.accentBtn
                  }`}
                >
                  {newsBriefingPlaying ? <Pause className="w-3.5 h-3.5" /> : <Radio className="w-3.5 h-3.5" />}
                  <span>
                    {newsBriefingPlaying
                      ? lang === "am"
                        ? "ዜናውን አቁም"
                        : "Stop Briefing"
                      : lang === "am"
                      ? "የዜና ኦዲዮ አዳምጥ (Sign Auto)"
                      : "Listen to News Briefing"}
                  </span>
                </button>
              </div>

              <div className="space-y-3">
                {DAILY_NEWS.map((item) => {
                  const headline = lang === "am" ? item.titleAm : item.titleEn;
                  const summary = lang === "am" ? item.summaryAm : item.summaryEn;
                  return (
                    <article
                      key={item.id}
                      className={`p-4 rounded-lg border ${theme.border} ${theme.bg}`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-mono text-amber-400 font-semibold">{item.tag}</span>
                        <span className={theme.textMuted}>{item.time}</span>
                      </div>
                      <h3 className="font-bold text-sm sm:text-base mb-1">{headline}</h3>
                      <p className={`text-xs sm:text-sm ${theme.textMuted} mb-3`}>{summary}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            speakAndSign(`${headline}. ${summary}`, "NEWS", true, `🔊 Article Audio: ${item.tag}`)
                          }
                          className={`px-3 py-1.5 rounded-md border text-xs font-semibold flex items-center gap-1.5 ${theme.secondaryBtn}`}
                        >
                          <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{t.workspace.readAloud}</span>
                        </button>
                        <button
                          onClick={() => {
                            triggerAutoSignInterpreter(`${headline} — ${summary}`, "NEWS", `🤟 Sign View: ${item.tag}`);
                            setSignBoxOpen(true);
                          }}
                          className={`px-3 py-1.5 rounded-md border text-xs font-semibold flex items-center gap-1.5 ${theme.secondaryBtn}`}
                        >
                          <Hand className="w-3.5 h-3.5 text-purple-400" />
                          <span>{t.workspace.signThis}</span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </div>

          {/* ==================================================================
              COLUMN 3 (RIGHT NARROW - 3 COLS): AI RECOMMENDATIONS
             ================================================================== */}
          <section
            aria-label={t.sections.recommendations}
            className={`lg:col-span-3 rounded-xl border ${theme.border} ${theme.surface} p-4 space-y-5 transition-all ${
              activeLockedSection === "recommendations" ||
              (loopActive && !activeLockedSection && currentAnnouncedKey === "recommendations")
                ? theme.ringActive
                : ""
            }`}
          >
            <div>
              <h2 className="text-sm font-bold flex items-center gap-1.5 mb-3">
                <Sparkles className="w-4 h-4 text-purple-400" />
                {t.workspace.recCourses}
              </h2>
              <div className="space-y-2.5">
                {RECOMMENDED_COURSES.map((rc) => (
                  <div key={rc.id} className={`p-3 rounded-lg border ${theme.border} ${theme.bg}`}>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-mono text-blue-400">{rc.platform}</span>
                      <span className="text-emerald-400 font-semibold">{rc.match}</span>
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm mb-1">{rc.title}</h3>
                    <p className={`text-[11px] ${theme.textMuted} mb-2.5`}>{rc.duration}</p>
                    <button
                      onClick={() => handleEnrollRecommended(rc)}
                      className={`w-full py-1.5 px-2.5 rounded border text-xs font-semibold flex items-center justify-center gap-1 ${theme.secondaryBtn}`}
                    >
                      <Plus className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t.workspace.enroll}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className={`pt-4 border-t ${theme.border}`}>
              <h2 className="text-sm font-bold flex items-center gap-1.5 mb-3">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                {t.workspace.recJobs}
              </h2>
              <div className="space-y-2.5">
                {RECOMMENDED_JOBS.map((rj) => (
                  <div key={rj.id} className={`p-3 rounded-lg border ${theme.border} ${theme.bg}`}>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-semibold text-emerald-400">{rj.match}</span>
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm">{rj.role}</h3>
                    <p className={`text-xs ${theme.textMuted} mt-0.5`}>{rj.company}</p>
                    <p className={`text-[11px] ${theme.textMuted} mb-2.5`}>{rj.location}</p>
                    <button
                      onClick={() => handleApplyJob(rj)}
                      className={`w-full py-1.5 px-2.5 rounded border text-xs font-semibold flex items-center justify-center gap-1 ${theme.accentBtn}`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>{t.workspace.apply}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ======================================================================
          COURSE LESSON VIDEO + SIGN OVERLAY MODAL
         ====================================================================== */}
      {activeLessonModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`max-w-2xl w-full rounded-xl border ${theme.border} ${theme.surface} p-6 shadow-2xl`}>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-700/40">
              <div>
                <span className="text-xs font-mono text-blue-400">{activeLessonModal.platform}</span>
                <h3 className="text-lg font-bold">{activeLessonModal.title}</h3>
              </div>
              <button
                onClick={() => {
                  stopAllMediaPlayback();
                  setActiveLessonModal(null);
                }}
                className={`p-1.5 rounded-lg border ${theme.secondaryBtn}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive Video / Audio Course Player */}
            <div className="relative rounded-lg bg-[#010409] border border-[#30363d] p-5 mb-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-white/10">
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${lessonMediaPlaying ? "bg-emerald-400 animate-ping" : "bg-gray-500"}`} />
                  {lessonMediaPlaying ? "PLAYING LESSON STREAM" : "PAUSED"}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLessonAudioOnly((a) => !a)}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition ${
                      lessonAudioOnly
                        ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                        : "bg-white/5 border-white/15 text-gray-300"
                    }`}
                  >
                    {lessonAudioOnly ? "🎧 Audio-Only Mode" : "🎬 Video + Audio Mode"}
                  </button>
                  <button
                    onClick={() => setLessonMediaPlaying((p) => !p)}
                    className="px-3 py-1 rounded text-[11px] font-semibold bg-[#238636] text-white flex items-center gap-1"
                  >
                    {lessonMediaPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    <span>{lessonMediaPlaying ? "Pause" : "Play"}</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1">
                  <h4 className="text-white font-bold text-base mb-2">{activeLessonModal.nextModule}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed mb-3">
                    {lessonAudioOnly
                      ? "Audio-only lecture stream active. Bottom-right Sign Language Interpreter is automatically translating spoken narration."
                      : "Full HD video lecture with synchronized audio narration and automatic bottom-right Sign Language translation."}
                  </p>
                  <div className="p-2.5 rounded bg-white/5 border border-white/10 text-xs text-gray-200">
                    <strong>Live Transcript:</strong> "{activeLessonModal.signSummary}"
                  </div>
                </div>
                <div className="w-48 shrink-0">
                  <SignLanguageAvatar
                    activeSignKey="COURSES"
                    caption={activeLessonModal.signSummary}
                    isDark={true}
                    lang={lang}
                    isLiveTranslating={lessonMediaPlaying}
                    mediaSourceLabel={lessonAudioOnly ? "🎧 Audio Lecture" : "🎬 Video Lecture"}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setLessonMediaPlaying(true);
                  speakAndSign(
                    `${activeLessonModal.title}. ${activeLessonModal.nextModule}.`,
                    "COURSES",
                    true,
                    `🎬 ${activeLessonModal.platform} Lesson`
                  );
                }}
                className={`px-4 py-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 ${theme.secondaryBtn}`}
              >
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span>Restart Narration & Sign Sync</span>
              </button>
              <button
                onClick={() => {
                  stopAllMediaPlayback();
                  handleIncrementProgress(activeLessonModal.id);
                  setActiveLessonModal(null);
                }}
                className={`px-4 py-2 rounded-lg border text-xs font-semibold ${theme.accentBtn}`}
              >
                Complete Module (+10%)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================
          BILINGUAL GEMINI AI COPILOT DRAWER
         ====================================================================== */}
      {aiOpen && (
        <div
          className={`fixed bottom-20 left-4 z-40 w-[92vw] sm:w-96 rounded-xl border ${theme.border} ${theme.surface} shadow-2xl flex flex-col overflow-hidden`}
        >
          <div className={`px-4 py-3 border-b ${theme.border} flex items-center justify-between bg-[#161b22] text-white`}>
            <div className="flex items-center gap-2 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{t.aiChat.title}</span>
            </div>
            <button onClick={() => setAiOpen(false)} className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 h-64 overflow-y-auto space-y-2.5 text-xs">
            {aiMessages.map((m, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-lg ${
                  m.role === "user"
                    ? "bg-blue-600 text-white ml-8"
                    : `${theme.bg} border ${theme.border} mr-6`
                }`}
              >
                {m.text}
              </div>
            ))}
            {aiLoading && (
              <div className={`p-2.5 rounded-lg ${theme.bg} border ${theme.border} mr-6 text-xs animate-pulse`}>
                Thinking in English & አማርኛ...
              </div>
            )}
          </div>

          <div className={`p-2.5 border-t ${theme.border} flex items-center gap-1.5`}>
            <button
              onClick={() => startVoiceRecognition((text) => handleSendAiPrompt(text))}
              className={`p-2 rounded-lg border ${theme.secondaryBtn}`}
              title="Speak to AI in English or Amharic"
            >
              <Mic className={`w-4 h-4 ${isListening ? "text-red-400 animate-pulse" : "text-blue-400"}`} />
            </button>
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendAiPrompt()}
              placeholder={t.aiChat.placeholder}
              className={`flex-1 px-3 py-2 rounded-lg border ${theme.border} ${theme.bg} text-xs focus:outline-none`}
            />
            <button
              onClick={() => handleSendAiPrompt()}
              className={`p-2 rounded-lg border ${theme.accentBtn}`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================================
          FLOATING BOTTOM-RIGHT SIGN LANGUAGE INTERPRETER & WEBCAM DETECTOR BOX
         ====================================================================== */}
      <div className="fixed bottom-4 right-4 z-50">
        {!signBoxOpen ? (
          <button
            onClick={() => setSignBoxOpen(true)}
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-xl border border-purple-400/40 transition"
          >
            <Hand className="w-4 h-4" />
            <span>{t.signBox.title}</span>
          </button>
        ) : (
          <div
            className={`w-[320px] sm:w-[360px] rounded-xl border ${
              isSpeaking || newsBriefingPlaying || (activeLessonModal && lessonMediaPlaying)
                ? "border-emerald-400 ring-2 ring-emerald-500/30"
                : theme.border
            } ${theme.surface} shadow-2xl overflow-hidden transition-all`}
          >
            {/* Header */}
            <div className="px-3.5 py-2.5 bg-purple-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold">
                <Hand className="w-4 h-4" />
                <span>{t.signBox.title}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setAutoSignOnMedia((v) => !v)}
                  title="Toggle automatic sign language activation whenever audio or video plays"
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold border transition ${
                    autoSignOnMedia
                      ? "bg-emerald-500/25 border-emerald-300/50 text-emerald-100"
                      : "bg-black/25 border-white/20 text-purple-200"
                  }`}
                >
                  {autoSignOnMedia ? "Auto: ON" : "Auto: OFF"}
                </button>
                <button
                  onClick={() => setSignBoxOpen(false)}
                  className="p-1 rounded hover:bg-white/20"
                  aria-label="Minimize Sign Language Box"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* AUTO-ACTIVE Live Media Translation Banner */}
            {(isSpeaking || newsBriefingPlaying || (activeLessonModal && lessonMediaPlaying)) && (
              <div className="px-3 py-1.5 bg-emerald-500/15 border-b border-emerald-500/30 text-emerald-400 text-[11px] font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <span className="truncate">{t.signBox.autoActiveBadge}</span>
              </div>
            )}

            {/* Tabs: Avatar Interpreter vs Webcam Sign Detector */}
            <div className={`grid grid-cols-2 border-b ${theme.border} text-xs font-semibold`}>
              <button
                onClick={() => setSignBoxTab("avatar")}
                className={`py-2 flex items-center justify-center gap-1.5 border-b-2 transition ${
                  signBoxTab === "avatar"
                    ? "border-purple-500 text-purple-400"
                    : `border-transparent ${theme.textMuted}`
                }`}
              >
                <Hand className="w-3.5 h-3.5" />
                <span>{t.signBox.tabAvatar}</span>
              </button>
              <button
                onClick={() => setSignBoxTab("detector")}
                className={`py-2 flex items-center justify-center gap-1.5 border-b-2 transition ${
                  signBoxTab === "detector"
                    ? "border-purple-500 text-purple-400"
                    : `border-transparent ${theme.textMuted}`
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{t.signBox.tabDetector}</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-3">
              {signBoxTab === "avatar" ? (
                <SignLanguageAvatar
                  activeSignKey={activeSignKey}
                  caption={signCaption}
                  isDark={isDark}
                  lang={lang}
                  isLiveTranslating={isSpeaking || newsBriefingPlaying || (activeLessonModal && lessonMediaPlaying)}
                  mediaSourceLabel={activeMediaSource}
                />
              ) : (
                <div className="space-y-2.5">
                  <div
                    className={`relative w-full h-36 rounded-lg border ${theme.border} bg-black overflow-hidden flex items-center justify-center`}
                  >
                    {webcamActive ? (
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover scale-x-[-1]"
                      />
                    ) : (
                      <div className="text-center px-4">
                        <CameraOff className="w-6 h-6 text-gray-500 mx-auto mb-1" />
                        <p className="text-[11px] text-gray-400">
                          Webcam off. Enable camera or tap a sign gesture command below.
                        </p>
                      </div>
                    )}
                    {detectedGesture && (
                      <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-emerald-600/90 text-white text-[11px] font-mono text-center">
                        Detected Sign: {detectedGesture}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={toggleWebcam}
                    className={`w-full py-1.5 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 ${theme.secondaryBtn}`}
                  >
                    <Camera className="w-3.5 h-3.5 text-purple-400" />
                    <span>{webcamActive ? t.signBox.stopCam : t.signBox.startCam}</span>
                  </button>

                  <p className={`text-[11px] ${theme.textMuted}`}>{t.signBox.detectorHint}</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => executeDetectedSignCommand("NEXT_SECTION")}
                      className={`py-1.5 px-2 rounded border text-[11px] font-semibold ${theme.secondaryBtn}`}
                    >
                      ✋ Sign: "NEXT"
                    </button>
                    <button
                      onClick={() => executeDetectedSignCommand("SYNC_LINKEDIN")}
                      className={`py-1.5 px-2 rounded border text-[11px] font-semibold ${theme.secondaryBtn}`}
                    >
                      👍 Sign: "LINKEDIN"
                    </button>
                    <button
                      onClick={() => executeDetectedSignCommand("READ_NEWS")}
                      className={`py-1.5 px-2 rounded border text-[11px] font-semibold ${theme.secondaryBtn}`}
                    >
                      🤟 Sign: "NEWS"
                    </button>
                    <button
                      onClick={() => executeDetectedSignCommand("OPEN_AI")}
                      className={`py-1.5 px-2 rounded border text-[11px] font-semibold ${theme.secondaryBtn}`}
                    >
                      👋 Sign: "AI HELP"
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}