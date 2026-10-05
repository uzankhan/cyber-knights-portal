/* ============================================================
   Cyber Knights — Enhanced 3D Scene (Obsidian & Neon)
   ============================================================ */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var glow = document.getElementById("glow");
  if (glow) {
    window.addEventListener("pointermove", function (e) {
      glow.style.setProperty("--mx", e.clientX + "px");
      glow.style.setProperty("--my", e.clientY + "px");
    }, { passive: true });
  }

  var canvas = document.getElementById("scene");
  if (!canvas || typeof THREE === "undefined") return;

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 11);

  function glowTexture(color) {
    var c = document.createElement("canvas"); c.width = c.height = 128;
    var ctx = c.getContext("2d");
    var g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, color + "ff");
    g.addColorStop(0.4, color + "55");
    g.addColorStop(1, color + "00");
    ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }

  var NEON = 0x00FF41;
  var CYAN = 0x00E5FF;

  // ============ Core rotating rings ============
  var core = new THREE.Group();
  scene.add(core);

  var outerRing = new THREE.Mesh(
    new THREE.TorusGeometry(2.4, 0.06, 16, 96),
    new THREE.MeshBasicMaterial({ color: NEON, transparent: true, opacity: 0.6 })
  );
  core.add(outerRing);

  var ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(1.7, 0.05, 16, 64),
    new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.5 })
  );
  ring2.rotation.x = Math.PI / 2;
  core.add(ring2);

  var ring3 = new THREE.Mesh(
    new THREE.TorusGeometry(1.0, 0.04, 16, 48),
    new THREE.MeshBasicMaterial({ color: NEON, transparent: true, opacity: 0.45 })
  );
  ring3.rotation.z = Math.PI / 3;
  core.add(ring3);

  // ============ Particle field ============
  var pCount = 2200;
  var pPos = new Float32Array(pCount * 3);
  var pCol = new Float32Array(pCount * 3);
  var cGreen = new THREE.Color(NEON), cCyan = new THREE.Color(CYAN);
  for (var i = 0; i < pCount; i++) {
    var r = 3.5 + Math.random() * 6.5;
    var th = Math.random() * Math.PI * 2, ph = Math.acos((Math.random() * 2) - 1);
    pPos[i*3]     = r * Math.sin(ph) * Math.cos(th);
    pPos[i*3 + 1] = r * Math.sin(ph) * Math.sin(th);
    pPos[i*3 + 2] = r * Math.cos(ph);
    var mix = Math.random() > 0.8 ? cCyan : cGreen;
    pCol[i*3] = mix.r; pCol[i*3 + 1] = mix.g; pCol[i*3 + 2] = mix.b;
  }
  var pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
  pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
  var points = new THREE.Points(pGeo, new THREE.PointsMaterial({
    size: 0.055, map: glowTexture("#00FF41"), transparent: true,
    vertexColors: true, depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  scene.add(points);

  // ============ Glow sprite ============
  var glowSprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture("#00FF41"), transparent: true, depthWrite: false,
    blending: THREE.AdditiveBlending, opacity: 0.4,
  }));
  glowSprite.scale.set(16, 16, 1);
  glowSprite.position.z = -2;
  scene.add(glowSprite);

  // ============ Floating wireframe shapes ============
  function wireMat(color, op) {
    return new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: op === undefined ? 0.4 : op });
  }

  function makeShield(color) {
    var s = new THREE.Shape();
    s.moveTo(0, 1.15); s.lineTo(0.82, 0.72); s.lineTo(0.82, -0.1);
    s.quadraticCurveTo(0.82, -0.95, 0, -1.35);
    s.quadraticCurveTo(-0.82, -0.95, -0.82, -0.1);
    s.lineTo(-0.82, 0.72); s.closePath();
    var geo = new THREE.ExtrudeGeometry(s, { depth: 0.08, bevelEnabled: false });
    geo.center();
    var g = new THREE.Group();
    g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), wireMat(color, 0.5)));
    return g;
  }

  function makeHexagon(color) {
    var g = new THREE.Group();
    var geo = new THREE.CylinderGeometry(0.4, 0.4, 0.05, 6);
    g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), wireMat(color, 0.5)));
    return g;
  }

  function makeCube(color) {
    var g = new THREE.Group();
    g.add(new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(0.8, 0.8, 0.8)),
      wireMat(color, 0.4)
    ));
    return g;
  }

  function makeTerminal(color) {
    var g = new THREE.Group();
    g.add(new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(1.8, 1.1, 0.05)),
      wireMat(color, 0.45)
    ));
    var bar = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(1.8, 0.15, 0.06)),
      wireMat(color, 0.5)
    );
    bar.position.y = 0.47;
    g.add(bar);
    for (var i = 0; i < 4; i++) {
      var w = 0.3 + Math.random() * 0.8;
      var lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-0.75, 0.25 - i * 0.18, 0.04),
        new THREE.Vector3(-0.75 + w, 0.25 - i * 0.18, 0.04),
      ]);
      g.add(new THREE.Line(lineGeo, wireMat(color, 0.6)));
    }
    return g;
  }

  function makeBrace(color) {
    var g = new THREE.Group();
    var s = new THREE.Shape();
    s.moveTo(0.3, 0.7);
    s.quadraticCurveTo(0, 0.7, 0, 0.35);
    s.lineTo(0, 0.1);
    s.quadraticCurveTo(0, 0, -0.15, 0);
    s.quadraticCurveTo(0, 0, 0, -0.1);
    s.lineTo(0, -0.35);
    s.quadraticCurveTo(0, -0.7, 0.3, -0.7);
    var geo = new THREE.ExtrudeGeometry(s, { depth: 0.06, bevelEnabled: false });
    geo.center();
    g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), wireMat(color, 0.5)));
    return g;
  }

  function makeDatabase(color) {
    var g = new THREE.Group();
    g.add(new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.CylinderGeometry(0.4, 0.4, 0.9, 16)),
      wireMat(color, 0.45)
    ));
    for (var i = 0; i < 3; i++) {
      var disc = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.CylinderGeometry(0.4, 0.4, 0.02, 16)),
        wireMat(color, 0.4)
      );
      disc.position.y = 0.3 - i * 0.3;
      g.add(disc);
    }
    return g;
  }

  function makeBinaryPanel() {
    var c = document.createElement("canvas"); c.width = 256; c.height = 256;
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#00FF41"; ctx.font = "bold 22px monospace";
    for (var row = 0; row < 8; row++) {
      var str = "";
      for (var col = 0; col < 8; col++) str += Math.random() > 0.5 ? "1" : "0";
      ctx.fillText(str, 6, 30 + row * 30);
    }
    var tex = new THREE.CanvasTexture(c);
    var mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.6, 1.6),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.32, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    var g = new THREE.Group(); g.add(mesh);
    return g;
  }

  var driftShapes = [];
  function addDrift(makerFn, color, x, y, z, s, speed, sway, side) {
    var m = makerFn(color);
    m.position.set(x, y, z); m.scale.setScalar(s);
    scene.add(m);
    driftShapes.push({
      mesh: m, speed: speed, base: { x: x, y: y },
      phase: Math.random() * Math.PI * 2, swayAmp: sway, side: side,
    });
  }

  addDrift(makeShield,   NEON, -5.5,  1.8, -4,   1.1, 0.55, 0.5, -0.6);
  addDrift(makeTerminal, CYAN,  5.5, -1.5, -5,   1.0, 0.6,  0.4,  0.7);
  addDrift(makeBrace,    NEON,  4.5,  2.8, -4.5, 1.2, 0.7,  0.6,  0.5);
  addDrift(makeDatabase, CYAN, -4.8, -2.5, -5.5, 1.0, 0.5,  0.4, -0.4);
  addDrift(makeHexagon,  NEON,  6.2,  1.2, -5,   1.3, 0.55, 0.5,  0.6);
  addDrift(makeBinaryPanel, NEON, -4.2, -0.5, -6, 1.0, 0.4, 0.35, -0.5);
  addDrift(makeCube,     CYAN,  3.6, -3.2, -6,   0.9, 0.5,  0.4,  0.3);
  addDrift(makeHexagon,  NEON, -6,    3.4, -5.5, 0.9, 0.6,  0.5, -0.7);
  addDrift(makeBrace,    CYAN,  6.5, -2.8, -6,   0.85, 0.65, 0.5,  0.4);
  addDrift(makeCube,     NEON,  3.8,  0.6, -3.2, 1.4, 0.55, 0.4,  0.3);
  addDrift(makeShield,   CYAN, -3.5,  2.4, -3.5, 1.1, 0.5,  0.4, -0.3);
  addDrift(makeDatabase, NEON, -2.5, -1.8, -3.8, 0.9, 0.45, 0.35, -0.3);
  addDrift(makeTerminal, NEON, 7.5,  2.4, -4.5, 0.85, 0.55, 0.4,  0.5);
  addDrift(makeHexagon,  CYAN, -7.2, -0.8, -4.2, 1.1,  0.5,  0.4, -0.5);
  addDrift(makeShield,   NEON,  0.8,  3.8, -5.5, 0.9,  0.6,  0.5,  0.2);
  addDrift(makeCube,     CYAN, -1.5,  3.5, -5.2, 0.75, 0.65, 0.4, -0.2);
  addDrift(makeBrace,    NEON,  1.8, -4.0, -5.0, 0.95, 0.5,  0.35, 0.3);
  addDrift(makeDatabase, CYAN, -8.0,  1.6, -5.8, 0.85, 0.45, 0.4, -0.6);
  addDrift(makeBinaryPanel, CYAN, 8.0, -1.5, -5.5, 0.9, 0.4, 0.3, 0.6);

  var mx = 0, my = 0;
  window.addEventListener("pointermove", function (e) {
    mx = (e.clientX / window.innerWidth - 0.5);
    my = (e.clientY / window.innerHeight - 0.5);
  }, { passive: true });

  var sTarget = 0, sCurrent = 0;
  window.addEventListener("scroll", function () {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    sTarget = max > 0 ? window.scrollY / max : 0;
  }, { passive: true });

  function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", onResize);

  var clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    var t = clock.getElapsedTime();
    sCurrent += (sTarget - sCurrent) * 0.06;

    core.rotation.y = t * 0.12 + sCurrent * Math.PI * 2;
    core.rotation.x = Math.sin(t * 0.15) * 0.15;
    ring2.rotation.z = t * 0.25;
    ring3.rotation.y = -t * 0.18;

    points.rotation.y = -t * 0.06 + sCurrent * 1.1;

    var pulse = 0.5 + Math.sin(t * 1.2) * 0.1;
    outerRing.material.opacity = 0.45 + pulse * 0.2;
    glowSprite.material.opacity = 0.35 + pulse * 0.15;

    camera.position.z = 11 - sCurrent * 3;
    camera.position.x += (mx * 0.8 - camera.position.x) * 0.04;
    camera.position.y += (-my * 0.6 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    driftShapes.forEach(function (d) {
      d.mesh.rotation.x = t * 0.08 * d.speed + d.phase + sCurrent * 0.8 * d.speed;
      d.mesh.rotation.y = t * 0.12 * d.speed + sCurrent * 1.4;
      d.mesh.rotation.z = Math.sin(t * 0.22 * d.speed + d.phase) * 0.2;
      d.mesh.position.x = d.base.x + Math.sin(t * 0.28 * d.speed + d.phase) * d.swayAmp + sCurrent * d.side * 4;
      d.mesh.position.y = d.base.y - sCurrent * 5 * d.speed + Math.cos(t * 0.22 * d.speed + d.phase) * 0.4;
    });

    renderer.render(scene, camera);
  }
  animate();

  // ============ Custom Cursor ============
  if (window.matchMedia("(pointer: fine)").matches && !reduce) {
    document.body.classList.add("has-cursor");
    var dot = document.getElementById("cdot"), ring = document.getElementById("cring");
    if (!dot || !ring) return;

    var cx = innerWidth / 2, cy = innerHeight / 2, rx = cx, ry = cy;
    window.addEventListener("pointermove", function (e) { cx = e.clientX; cy = e.clientY; }, { passive: true });

    document.querySelectorAll("a, button, .card, .chip, .point, .mini-btn, .icon-btn").forEach(function (el) {
      el.addEventListener("pointerenter", function () { ring.classList.add("big"); });
      el.addEventListener("pointerleave", function () { ring.classList.remove("big"); });
    });

    var trail = document.getElementById("trail"), tctx = trail.getContext("2d");
    function sizeTrail() { trail.width = innerWidth; trail.height = innerHeight; }
    sizeTrail();
    window.addEventListener("resize", sizeTrail);

    var particles = [], last = { x: cx, y: cy };
    window.addEventListener("pointermove", function (e) {
      var dx = e.clientX - last.x, dy = e.clientY - last.y;
      if (Math.sqrt(dx*dx + dy*dy) > 6) {
        particles.push({
          x: e.clientX, y: e.clientY, r: 2 + Math.random() * 2.5, life: 1,
          c: Math.random() > 0.65 ? "0, 229, 255" : "0, 255, 65",
        });
        last = { x: e.clientX, y: e.clientY };
        if (particles.length > 100) particles.shift();
      }
    }, { passive: true });

    function loop() {
      requestAnimationFrame(loop);
      rx += (cx - rx) * 0.16; ry += (cy - ry) * 0.16;
      dot.style.left = cx + "px"; dot.style.top = cy + "px";
      ring.style.left = rx + "px"; ring.style.top = ry + "px";

      tctx.clearRect(0, 0, trail.width, trail.height);
      tctx.globalCompositeOperation = "lighter";
      for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        p.life -= 0.03;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        tctx.beginPath();
        tctx.fillStyle = "rgba(" + p.c + "," + (p.life * 0.5) + ")";
        tctx.arc(p.x, p.y, p.r * p.life * 1.8, 0, Math.PI * 2);
        tctx.fill();
      }
    }
    loop();
  }
})();