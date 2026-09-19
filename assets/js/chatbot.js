/* ==========================================================================
   AMRIT RAJ PORTFOLIO — TERMINAL ACCESS INTERACTIVE AI CHATBOT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initChatbot();
});

function initChatbot() {
  const widgetBtn = document.getElementById('chatbot-toggle-btn');
  const chatWindow = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('chat-close-btn');
  const chatInput = document.getElementById('chat-user-input');
  const sendBtn = document.getElementById('chat-send-trigger');
  const messagesContainer = document.getElementById('chat-messages-body');
  const chipContainer = document.getElementById('chat-quick-chips');

  if (!widgetBtn || !chatWindow) return;

  // Toggle Open/Close
  widgetBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('open');
    if (chatWindow.classList.contains('open') && messagesContainer.children.length === 0) {
      sendBotMessage("Hello! I am Amrit's Portfolio Terminal AI assistant. Ask me anything about Amrit's education, Cyber Security MCA, HerSentinel project, skills, certificates, or contact info!");
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      chatWindow.classList.remove('open');
    });
  }

  // Quick Chips
  const quickQuestions = [
    { label: "Who is Amrit?", query: "Who is Amrit?" },
    { label: "HerSentinel Project", query: "Tell me about HerSentinel project" },
    { label: "Skills & Stack", query: "What are your technical skills?" },
    { label: "Education & MCA", query: "Tell me about your education" },
    { label: "Contact Info", query: "How can I contact Amrit?" }
  ];

  if (chipContainer) {
    chipContainer.innerHTML = '';
    quickQuestions.forEach(q => {
      const btn = document.createElement('button');
      btn.className = 'chat-chip-btn';
      btn.innerText = q.label;
      btn.addEventListener('click', () => {
        handleUserMessage(q.query);
      });
      chipContainer.appendChild(btn);
    });
  }

  // Send Event
  if (sendBtn && chatInput) {
    sendBtn.addEventListener('click', () => {
      const val = chatInput.value.trim();
      if (val) {
        handleUserMessage(val);
        chatInput.value = '';
      }
    });

    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = chatInput.value.trim();
        if (val) {
          handleUserMessage(val);
          chatInput.value = '';
        }
      }
    });
  }

  function handleUserMessage(msgText) {
    appendUserMessage(msgText);
    
    // Simulate thinking/response latency
    setTimeout(() => {
      const reply = generateBotResponse(msgText);
      sendBotMessage(reply);
    }, 400);
  }

  function appendUserMessage(text) {
    const msgEl = document.createElement('div');
    msgEl.className = 'chat-msg user';
    msgEl.innerText = text;
    messagesContainer.appendChild(msgEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function sendBotMessage(text) {
    const msgEl = document.createElement('div');
    msgEl.className = 'chat-msg bot';
    msgEl.innerHTML = text;
    messagesContainer.appendChild(msgEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Knowledge Base & Intelligent Matcher
  function generateBotResponse(input) {
    const q = input.toLowerCase();

    if (q.includes('who') || q.includes('about') || q.includes('amrit') || q.includes('bio')) {
      return `<strong>Amrit Raj</strong> (socially known as Amrit Dwivedi) is an MCA (Cyber Security) postgraduate student at SGT University, based in Delhi, India.<br><br>He specializes in Python, Web Development, and Cyber Security. He holds a BCA from GGSIPU (8.4 CGPA) and is co-author of the published research paper <em>HerSentinel</em>.`;
    }

    if (q.includes('project') || q.includes('hersentinel') || q.includes('sentinel') || q.includes('paper') || q.includes('research')) {
      return `<strong>HerSentinel — An Intelligent Companion for Women's Safety</strong><br>
      • BCA Final Year Major Project built with React Native, Node.js, HTTPS, and JWT.<br>
      • Features: Instant SOS alerts to guardians, hands-free motion-sensor distress triggers, voice command activation, and real-time location sharing.<br>
      • Published in <em>International Journal of Current Research and Techniques (IJCRT)</em>, Vol. 16, Issue 2, 2026 (DOI: 10.5281/ZENODO.21234236).`;
    }

    if (q.includes('skill') || q.includes('python') || q.includes('java') || q.includes('sql') || q.includes('stack') || q.includes('language')) {
      return `<strong>Technical Skills Overview:</strong><br>
      • <strong>Programming:</strong> Python (90%), C/C++ (60%), Java (60%)<br>
      • <strong>Databases:</strong> SQL (90%), MongoDB (~80%), MySQL (~80%), PostgreSQL (50% - learning)<br>
      • <strong>Web Technologies:</strong> HTML, CSS, JavaScript, Django, Flask, Django REST Framework<br>
      • <strong>Security & Tools:</strong> Pandas, NumPy, OpenCV, Selenium, socket network programming.`;
    }

    if (q.includes('education') || q.includes('mca') || q.includes('bca') || q.includes('degree') || q.includes('college') || q.includes('sgt') || q.includes('ggsipu')) {
      return `<strong>Educational Qualifications:</strong><br>
      1. <strong>MCA (Cyber Security Specialization):</strong> SGT University, 1st Semester (2026–Present)<br>
      2. <strong>BCA:</strong> GGSIPU (Guru Gobind Singh Indraprastha University), <strong>CGPA 8.4</strong> (2023–2026)<br>
      3. <strong>Class XII (BSEB):</strong> GM High School, 70.2% (2023)<br>
      4. <strong>Class X (BSEB):</strong> GM High School, 69.2% (2021)`;
    }

    if (q.includes('cert') || q.includes('aws') || q.includes('tutedude') || q.includes('corizo') || q.includes('publication')) {
      return `<strong>Certificates & Credentials:</strong><br>
      1. IJCRT Certificate of Publication (HerSentinel Paper, 2026)<br>
      2. AWS Cloud Practitioner Essentials (AWS Training & Certification)<br>
      3. Python Training — Tutedude (Django, Pandas, Flask, Automation)<br>
      4. Web Development Training — Corizo (Full-stack web fundamentals)`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('linkedin') || q.includes('github') || q.includes('reach') || q.includes('hire')) {
      return `<strong>Contact Amrit Raj:</strong><br>
      📧 <strong>Email:</strong> <a href="mailto:amritraj1st@gmail.com" style="color:var(--accent-amber);">amritraj1st@gmail.com</a><br>
      📞 <strong>Phone:</strong> +91 74810 82060<br>
      🔗 <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/amritdwivedi1" target="_blank" style="color:var(--accent-teal);">amritdwivedi1</a><br>
      💻 <strong>GitHub:</strong> <a href="https://github.com/amritdwivedi1" target="_blank" style="color:var(--accent-teal);">amritdwivedi1</a><br>
      📍 <strong>Location:</strong> Delhi, India`;
    }

    return `I understand you are asking about: <em>"${input}"</em>.<br><br>Amrit Raj is an MCA (Cyber Security) postgraduate with expertise in Python, SQL, Django, and Web Development. Try asking specifically about his <strong>skills</strong>, <strong>HerSentinel project</strong>, <strong>education</strong>, <strong>certificates</strong>, or <strong>contact info</strong>!`;
  }
}
