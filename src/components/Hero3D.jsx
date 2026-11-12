import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Lights
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 6, 8);
    scene.add(keyLight);
    const blueFill = new THREE.PointLight(0x2a4a8a, 2.5, 30);
    blueFill.position.set(-6, -2, 4);
    scene.add(blueFill);
    const sulfurRim = new THREE.PointLight(0xdfff00, 1.8, 25);
    sulfurRim.position.set(4, -4, -6);
    scene.add(sulfurRim);
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    // Central hero object — faceted icosahedron
    const heroGeo = new THREE.IcosahedronGeometry(1.7, 1);
    const heroMat = new THREE.MeshStandardMaterial({
      color: 0x0a1f44,
      metalness: 0.85,
      roughness: 0.18,
      flatShading: true,
    });
    const hero = new THREE.Mesh(heroGeo, heroMat);
    scene.add(hero);

    // Wireframe overlay
    const wireGeo = new THREE.IcosahedronGeometry(1.72, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xdfff00,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    hero.add(wire);

    // Orbiting shards
    const shards = [];
    const shardGeo = new THREE.OctahedronGeometry(0.18, 0);
    for (let i = 0; i < 14; i++) {
      const mat = new THREE.MeshStandardMaterial({
        color: i % 3 === 0 ? 0xdfff00 : 0xc0c8d8,
        metalness: 0.9,
        roughness: 0.2,
        flatShading: true,
      });
      const shard = new THREE.Mesh(shardGeo, mat);
      const angle = (i / 14) * Math.PI * 2;
      const radius = 2.6 + Math.random() * 1.4;
      shard.userData = {
        angle,
        radius,
        speed: 0.3 + Math.random() * 0.5,
        yOff: (Math.random() - 0.5) * 3,
        rotSpeed: 0.5 + Math.random(),
      };
      scene.add(shard);
      shards.push(shard);
    }

    // Floating ring
    const ringGeo = new THREE.TorusGeometry(2.8, 0.04, 16, 120);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x0a1f44,
      metalness: 0.9,
      roughness: 0.3,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.4;
    scene.add(ring);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.4, 0.025, 16, 120),
      new THREE.MeshStandardMaterial({ color: 0xdfff00, metalness: 0.8, roughness: 0.4 })
    );
    ring2.rotation.x = Math.PI / 1.8;
    ring2.rotation.y = 0.4;
    scene.add(ring2);

    // Mouse parallax
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);

    const clock = new THREE.Clock();
    let raf;
    const animate = () => {
      const t = clock.getElapsedTime();
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      hero.rotation.y = t * 0.25 + mouse.x * 0.6;
      hero.rotation.x = mouse.y * 0.4;
      hero.position.y = Math.sin(t * 0.8) * 0.15;

      ring.rotation.z = t * 0.15;
      ring2.rotation.z = -t * 0.1;

      shards.forEach((s) => {
        const d = s.userData;
        d.angle += d.speed * 0.005;
        s.position.x = Math.cos(d.angle) * d.radius;
        s.position.z = Math.sin(d.angle) * d.radius;
        s.position.y = d.yOff + Math.sin(t * d.speed) * 0.3;
        s.rotation.x = t * d.rotSpeed;
        s.rotation.y = t * d.rotSpeed * 0.7;
      });

      camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.04;
      camera.position.y += (-mouse.y * 0.6 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      heroGeo.dispose();
      heroMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      shardGeo.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}