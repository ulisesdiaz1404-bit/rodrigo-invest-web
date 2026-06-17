"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Shader de fondo del hero — adaptado para Rodrigo.invest:
 * - Vive DENTRO del contenedor del hero (absolute), no fixed a toda la página.
 * - La salida se tinta hacia la paleta de marca (azul profundo + dorado),
 *   en vez del RGB neón original, para una estética sobria.
 * - Respeta prefers-reduced-motion (congela la animación).
 * - resolution toma el tamaño del contenedor, no del window.
 */

interface ShaderUniforms {
  resolution: { value: [number, number] };
  time: { value: number };
  xScale: { value: number };
  yScale: { value: number };
  distortion: { value: number };
}

interface SceneRefs {
  scene: THREE.Scene | null;
  camera: THREE.OrthographicCamera | null;
  renderer: THREE.WebGLRenderer | null;
  mesh: THREE.Mesh | null;
  uniforms: ShaderUniforms | null;
  animationId: number | null;
}

export function WebGLShader({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<SceneRefs>({
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    uniforms: null,
    animationId: null,
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const { current: refs } = sceneRef;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

        float d = length(p) * distortion;

        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
        float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
        float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);

        // Tinte de marca: platino frío + azul acero (sobrio, sin neón)
        vec3 platinum = vec3(0.74, 0.82, 0.92);
        vec3 steel = vec3(0.20, 0.40, 0.66);
        vec3 col = r * platinum + g * (platinum * 0.3 + steel * 0.4) + b * steel;

        // Atenuar para que sea un fondo sutil, no protagonista
        col *= 0.8;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const getSize = (): [number, number] => {
      const rect = canvas.getBoundingClientRect();
      return [Math.max(1, rect.width), Math.max(1, rect.height)];
    };

    const initScene = () => {
      refs.scene = new THREE.Scene();
      refs.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      refs.renderer.setClearColor(new THREE.Color(0x05080f));

      refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1);

      const [w, h] = getSize();
      refs.uniforms = {
        resolution: { value: [w, h] },
        time: { value: 0.0 },
        xScale: { value: 1.0 },
        yScale: { value: 0.5 },
        distortion: { value: 0.05 },
      };

      const position = [
        -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0,
        1.0, 0.0, 1.0, 1.0, 0.0,
      ];

      const positions = new THREE.BufferAttribute(
        new Float32Array(position),
        3,
      );
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", positions);

      const material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: refs.uniforms as unknown as {
          [uniform: string]: THREE.IUniform;
        },
        side: THREE.DoubleSide,
      });

      refs.mesh = new THREE.Mesh(geometry, material);
      refs.scene.add(refs.mesh);

      handleResize();
    };

    const renderFrame = () => {
      if (refs.renderer && refs.scene && refs.camera) {
        refs.renderer.render(refs.scene, refs.camera);
      }
    };

    const animate = () => {
      if (refs.uniforms) refs.uniforms.time.value += 0.008;
      renderFrame();
      refs.animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms) return;
      const [width, height] = getSize();
      refs.renderer.setSize(width, height, false);
      refs.uniforms.resolution.value = [width, height];
      renderFrame();
    };

    initScene();
    if (reduceMotion) {
      renderFrame();
    } else {
      animate();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener("resize", handleResize);
      if (refs.mesh) {
        refs.scene?.remove(refs.mesh);
        refs.mesh.geometry.dispose();
        if (refs.mesh.material instanceof THREE.Material) {
          refs.mesh.material.dispose();
        }
      }
      refs.renderer?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className ?? "absolute inset-0 block h-full w-full"}
    />
  );
}
