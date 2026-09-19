/* ==========================================================================
   AMRIT RAJ PORTFOLIO — 3D CERTIFICATE CAROUSEL ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  init3DCarousel();
});

function init3DCarousel() {
  const stage = document.getElementById('certificate-3d-stage');
  const ring = document.getElementById('certificate-3d-ring');
  if (!stage || !ring) return;

  // Render cards dynamically if certificatesData exists
  if (typeof certificatesData !== 'undefined' && Array.isArray(certificatesData)) {
    ring.innerHTML = '';
    const total = certificatesData.length;
    const angleStep = 360 / total;
    const radius = Math.min(280, window.innerWidth > 600 ? 280 : 200);

    certificatesData.forEach((cert, idx) => {
      const angle = angleStep * idx;
      const card = document.createElement('div');
      card.className = 'carousel-card';
      card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;

      const hasImage = cert.image !== null && cert.image !== '';
      const imageHtml = hasImage 
        ? `<div style="height:110px; overflow:hidden; border-radius:4px; margin:0.5rem 0;"><img src="${cert.image}" alt="${cert.title}" style="width:100%; height:100%; object-fit:cover;"></div>`
        : `<div class="cert-placeholder-tile"><span style="font-size:1.4rem;">📜</span><span>Image not added yet</span></div>`;

      card.innerHTML = `
        <div>
          <span class="cert-badge">${cert.issuer}</span>
          <h4 class="cert-card-title">${cert.title}</h4>
        </div>
        ${imageHtml}
        <div style="display:flex; justify-shadow:space-between; align-items:center; font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted); margin-top:0.4rem;">
          <span>${cert.date}</span>
          <span style="color:var(--accent-amber);">View details &rarr;</span>
        </div>
      `;

      card.addEventListener('click', () => {
        if (typeof openCertificateModal === 'function') {
          openCertificateModal(cert.id);
        } else {
          window.location.href = 'certificates/index.html';
        }
      });

      ring.appendChild(card);
    });
  }
}
