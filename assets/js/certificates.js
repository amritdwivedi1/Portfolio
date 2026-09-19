/* ==========================================================================
   AMRIT RAJ PORTFOLIO — REUSABLE CERTIFICATES DATA & MODAL ENGINE
   ========================================================================== */

const certificatesData = [
  {
    id: "ijcrt-publication",
    title: "Certificate of Publication — HerSentinel",
    issuer: "International Journal of Current Research and Techniques (IJCRT)",
    date: "2026",
    description: "Official Certificate of Publication for the co-authored research paper 'HerSentinel - An Intelligent Companion for Women's Safety', published in IJCRT Vol. 16, Issue 2, 2026. DOI: 10.5281/ZENODO.21234236. Co-authored with Dr. Archana Sharma, Harsh Kumar Rai, and Manan Kundra.",
    image: "https://raw.githubusercontent.com/amritdwivedi1/Certificates/main/IJCRT-Her%20Sentinels%20Research%20Certificate-1.png",
    verifyUrl: "https://raw.githubusercontent.com/amritdwivedi1/Certificates/main/IJCRT-Her%20Sentinels%20Research%20Certificate-1.png", // <!-- TODO: paste link here -->
    tags: ["Research Paper", "Cyber Security", "Women's Safety", "Publication"]
  },
  {
    id: "aws-cloud-practitioner",
    title: "AWS Cloud Practitioner Essentials",
    issuer: "AWS Training & Certification",
    date: "19 Sept 2026",
    description: "Completion certificate for AWS Cloud Practitioner Essentials, covering core AWS cloud concepts, security, IAM roles, cloud architecture, and infrastructure services.",
    image: "https://raw.githubusercontent.com/amritdwivedi1/Certificates/main/AWS%20Training%20Certificate-1.png",
    verifyUrl: "https://raw.githubusercontent.com/amritdwivedi1/Certificates/main/AWS%20Training%20Certificate-1.png", // <!-- TODO: paste link here -->
    tags: ["AWS", "Cloud Computing", "Infrastructure", "Cloud Security"]
  },
  {
    id: "python-tutedude",
    title: "Python Training — Tutedude",
    issuer: "Tutedude",
    date: "2026",
    description: "Comprehensive training covering Django, Pandas, NumPy, SciPy, Object-Oriented Programming (OOP), Flask, REST APIs, web scraping, and process automation.",
    image: null, // "image not added yet" placeholder tile
    verifyUrl: "#", // <!-- TODO: paste link here -->
    tags: ["Python", "Django", "Flask", "Pandas", "Automation"]
  },
  {
    id: "web-dev-corizo",
    title: "Web Development Training — Corizo",
    issuer: "Corizo",
    date: "05 Feb 2024 — 05 Mar 2024",
    description: "Certificate of Training in full-stack web development fundamentals, front-end architecture, responsive design, and JavaScript web apps.",
    image: "https://raw.githubusercontent.com/amritdwivedi1/Certificates/main/Corizo%20Training-1.png", 
    verifyUrl: "https://raw.githubusercontent.com/amritdwivedi1/Certificates/main/Corizo%20Training-1.png", // <!-- TODO: paste link here -->
    tags: ["Web Development", "HTML/CSS", "JavaScript", "Frontend"]
  },
{
    id: "cyber-security-introduction",
    title: "Introduction to Cyber Security",
    issuer: "SimpliLearn",
    date: "02 May 2026",
    description: "Completed Simplilearn SkillUp’s Introduction to Cyber Security course, building foundational knowledge of cybersecurity concepts, threats, vulnerabilities, and digital security practices.",
    image: "https://raw.githubusercontent.com/amritdwivedi1/Certificates/main/Cyber%20Security-1.png", 
    verifyUrl: "https://raw.githubusercontent.com/amritdwivedi1/Certificates/main/Cyber%20Security-1.png", // <!-- TODO: paste link here -->
    tags: ["Cyber Security", "Digital Security", "Threats", "Vulnerabilities"]
  },
{
  id: "data-analysis-microsoft-excel",
  title: "Introduction to Data Analysis using Microsoft Excel",
  issuer: "Coursera",
  date: "02 May 2026",
  description: "Completed Coursera’s Introduction to Data Analysis using Microsoft Excel project, developing practical skills in organizing, analyzing, and interpreting data using Microsoft Excel.",
  image: "https://raw.githubusercontent.com/amritdwivedi1/Certificates/main/Data%20Anlalysis%20using%20MS%20Excel%20Training-1.png",
  verifyUrl: "https://raw.githubusercontent.com/amritdwivedi1/Certificates/main/Data%20Anlalysis%20using%20MS%20Excel%20Training-1.png",
  tags: ["Data Analysis", "Microsoft Excel", "Data Interpretation", "Data Management"]
}


];

document.addEventListener('DOMContentLoaded', () => {
  renderCertificatesGrid();
  initModalListeners();
});

/* Render Certificate Cards Grid on Certificates Page */
function renderCertificatesGrid() {
  const container = document.getElementById('certificates-grid-container');
  if (!container) return;

  container.innerHTML = '';
  
  certificatesData.forEach(cert => {
    const card = document.createElement('div');
    card.className = 'card-tilt';
    card.style.cursor = 'pointer';

    const imageHtml = cert.image !== null
      ? `<div style="height:160px; overflow:hidden; border-radius:6px; margin:1rem 0; background:var(--raised-surf);"><img src="${cert.image}" alt="${cert.title}" style="width:100%; height:100%; object-fit:cover;"></div>`
      : `<div class="cert-placeholder-tile" style="height:160px; margin:1rem 0;"><span style="font-size:2rem;">📜</span><span>Image not added yet</span><span style="font-size:0.7rem; opacity:0.7;">Drop file in assets folder</span></div>`;

    const tagsHtml = cert.tags.map(t => `<span class="tag-chip">${t}</span>`).join(' ');

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="cert-badge">${cert.issuer}</span>
        <span class="font-mono text-dim" style="font-size:0.8rem;">${cert.date}</span>
      </div>
      <h3 style="font-size:1.25rem; margin-top:0.75rem;">${cert.title}</h3>
      ${imageHtml}
      <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:1rem; line-height:1.5;">${cert.description}</p>
      <div class="tags-cloud" style="margin-bottom:1rem;">${tagsHtml}</div>
      <div style="display:flex; justify-content:flex-end;">
        <button class="btn btn-secondary" style="padding:0.4rem 0.9rem; font-size:0.8rem;">Inspect Record &rarr;</button>
      </div>
    `;

    card.addEventListener('click', () => openCertificateModal(cert.id));
    container.appendChild(card);
  });
}

/* Open Animated Modal Viewer */
function openCertificateModal(certId) {
  const cert = certificatesData.find(c => c.id === certId);
  if (!cert) return;

  const backdrop = document.getElementById('certificate-modal-backdrop');
  const panel = document.getElementById('certificate-modal-panel');
  if (!backdrop || !panel) return;

  const imageHtml = cert.image !== null
    ? `<div style="width:100%; height:260px; overflow:hidden; border-radius:8px; margin:1.2rem 0; background:var(--raised-surf); border:1px solid var(--border-strong);"><img src="${cert.image}" alt="${cert.title}" style="width:100%; height:100%; object-fit:contain; background:#000;"></div>`
    : `<div class="cert-placeholder-tile" style="height:200px; margin:1.2rem 0;"><span style="font-size:2.5rem;">📜</span><span style="font-size:1rem; font-weight:bold;">Image not added yet</span><span style="color:var(--text-muted);">Replace null with image path in assets/js/certificates.js</span></div>`;

  const tagsHtml = cert.tags.map(t => `<span class="tag-chip">${t}</span>`).join(' ');

  panel.innerHTML = `
    <button class="modal-close-btn" id="modal-close-trigger">&times;</button>
    <div style="display:flex; align-items:center; gap:0.75rem;">
      <span class="cert-badge">${cert.issuer}</span>
      <span class="font-mono text-dim" style="font-size:0.85rem;">${cert.date}</span>
    </div>
    <h2 style="font-size:1.6rem; margin-top:0.6rem;">${cert.title}</h2>
    
    <div class="modal-status-line">
      <span style="width:8px; height:8px; border-radius:50%; background:var(--accent-teal); display:inline-block; box-shadow:0 0 8px var(--accent-teal);"></span>
      <span>&gt; VERIFIED CREDENTIAL — ACCESS GRANTED</span>
    </div>

    ${imageHtml}

    <p style="color:var(--text-muted); font-size:0.95rem; line-height:1.6; margin-bottom:1.2rem;">${cert.description}</p>
    
    <div class="tags-cloud" style="margin-bottom:1.5rem;">${tagsHtml}</div>

    <!-- TODO: paste link here -->
    <a href="${cert.verifyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width:100%;">
      View Original Certificate / Document &rarr;
    </a>
  `;

  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';

  document.getElementById('modal-close-trigger').addEventListener('click', closeCertificateModal);
}

/* Close Modal */
function closeCertificateModal() {
  const backdrop = document.getElementById('certificate-modal-backdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* Modal Event Listeners */
function initModalListeners() {
  const backdrop = document.getElementById('certificate-modal-backdrop');
  if (!backdrop) return;

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeCertificateModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCertificateModal();
  });
}
