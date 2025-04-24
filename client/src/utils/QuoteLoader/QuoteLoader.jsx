import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const QuoteLoader = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      context: canvas.getContext("webgl2"),
      antialias: true,
      alpha: true,
    });

    renderer.setSize(240, 240);
    renderer.setPixelRatio(window.devicePixelRatio || 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 500;

    const shape = new THREE.TorusGeometry(70, 20, 60, 160);
    const material = new THREE.MeshPhongMaterial({
      color: 0x2563eb,
      shininess: 20,
      opacity: 0.96,
      transparent: true,
    });

    const donut = new THREE.Mesh(shape, material);
    scene.add(donut);

    const lightTop = new THREE.DirectionalLight(0xffffff, 0.3);
    lightTop.position.set(0, 200, 0);
    scene.add(lightTop);

    const frontTop = new THREE.DirectionalLight(0xffffff, 0.4);
    frontTop.position.set(0, 0, 300);
    scene.add(frontTop);

    scene.add(new THREE.AmbientLight(0xcdd9ed));

    const twist = (geometry, amount) => {
      const posAttr = geometry.attributes.position;
      const vertex = new THREE.Vector3();
      const quaternion = new THREE.Quaternion();

      for (let i = 0; i < posAttr.count; i++) {
        vertex.fromBufferAttribute(posAttr, i);

        const angle = (Math.PI / 180) * (vertex.x / amount);
        quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), angle);
        vertex.applyQuaternion(quaternion);

        posAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
      }

      posAttr.needsUpdate = true;
    };

    let mat = Math.PI;
    const speed = Math.PI / 120;
    let forwards = 1;

    const renderLoop = () => {
      requestAnimationFrame(renderLoop);

      donut.rotation.x -= speed * forwards;
      mat = mat - speed;

      if (mat <= 0) {
        mat = Math.PI;
        forwards *= -1;
      }

      twist(donut.geometry, (mat >= Math.PI / 2 ? -120 : 120) * forwards);
      renderer.render(scene, camera);
    };

    renderLoop();
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <canvas
        ref={canvasRef}
        width={240}
        height={240}
        className="w-[240px] h-[240px]"
      />
    </div>
  );
};

export default QuoteLoader;