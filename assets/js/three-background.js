/* ==========================================================================
   AMRIT RAJ PORTFOLIO — SITE-WIDE 3D BACKGROUND (Three.js)
   A drifting particle field + slowly rotating wireframe polyhedra that sit
   behind every section, with subtle parallax on mouse move & scroll.
   ========================================================================== */
(function () {
  const canvas = document.getElementById('three-bg');
  if (!canvas || typeof THREE === 'undefined') return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const AMBER = 0xE8A33D;
  const TEAL = 0x4FB3A9;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 60;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  /* Particle starfield */
  const particleCount = window.innerWidth < 700 ? 140 : 320;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 220;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 220;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 160 - 20;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: TEAL, size: 1.1, transparent: true, opacity: 0.7,
    blending: THREE.AdditiveBlending, depthWrite: false
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  /* Slowly rotating wireframe polyhedra floating at different depths */
  const shapes = [];
  const shapeDefs = [
    { geo: new THREE.IcosahedronGeometry(14, 0), color: AMBER, pos: [-32, 14, -30] },
    { geo: new THREE.OctahedronGeometry(10, 0), color: TEAL, pos: [34, -12, -50] },
    { geo: new THREE.IcosahedronGeometry(8, 1), color: TEAL, pos: [-20, -22, -20] },
    { geo: new THREE.TetrahedronGeometry(9, 0), color: AMBER, pos: [26, 22, -40] }
  ];
  shapeDefs.forEach((def) => {
    const mat = new THREE.MeshBasicMaterial({ color: def.color, wireframe: true, transparent: true, opacity: 0.35 });
    const mesh = new THREE.Mesh(def.geo, mat);
    mesh.position.set(...def.pos);
    mesh.userData.spin = { x: (Math.random() - 0.5) * 0.0025, y: (Math.random() - 0.5) * 0.003 };
    scene.add(mesh);
    shapes.push(mesh);
  });

  /* Mouse & scroll driven parallax */
  const target = { x: 0, y: 0 };
  const current = { x: 0, y: 0 };
  window.addEventListener('mousemove', (e) => {
    target.x = (e.clientX / window.innerWidth - 0.5) * 2;
    target.y = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  let scrollFactor = 0;
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollFactor = max > 0 ? window.scrollY / max : 0;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  let paused = document.hidden;
  document.addEventListener('visibilitychange', () => { paused = document.hidden; });

  function renderStaticFrame() {
    camera.position.x = 0;
    camera.position.y = 0;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }

  if (reduceMotion) {
    renderStaticFrame();
    return;
  }

  function animate() {
    requestAnimationFrame(animate);
    if (paused) return;

    current.x += (target.x - current.x) * 0.04;
    current.y += (target.y - current.y) * 0.04;

    camera.position.x = current.x * 8;
    camera.position.y = -current.y * 6 + scrollFactor * -10;
    camera.lookAt(scene.position);

    particles.rotation.y += 0.0006;
    particles.rotation.x += 0.0002;

    shapes.forEach((mesh) => {
      mesh.rotation.x += mesh.userData.spin.x;
      mesh.rotation.y += mesh.userData.spin.y;
    });

    renderer.render(scene, camera);
  }
  animate();
})();
