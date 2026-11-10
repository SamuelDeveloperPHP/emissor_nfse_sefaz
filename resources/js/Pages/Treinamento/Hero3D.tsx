import React, { useEffect, useRef, useState } from "react";

const ETAPAS = [
  { nome: "Planilha", texto: "Você envia um Excel ou CSV com uma nota por linha (ou preenche a nota avulsa).", cor: 0x4cc9f0 },
  { nome: "DPS (XML)", texto: "O sistema monta a Declaração de Prestação de Serviços e valida contra o esquema oficial.", cor: 0x4895ef },
  { nome: "Assinatura", texto: "A DPS é assinada com o certificado A1 do emitente, ou o do escritório quando há procuração.", cor: 0xb388ff },
  { nome: "ADN / SEFIN", texto: "A DPS segue por conexão segura (mTLS) ao Ambiente de Dados Nacional, que valida e autoriza.", cor: 0xffb703 },
  { nome: "NFS-e", texto: "A nota autorizada volta: você baixa o XML e o PDF (DANFSE) e envia ao tomador.", cor: 0x2ec4b6 },
];

function etiqueta(THREE: typeof import("three"), texto: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  ctx.font = "600 52px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "#e8f1ff";
  ctx.fillText(texto, 256, 80);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
  sprite.scale.set(3, 0.75, 1);
  return sprite;
}

/** Cena three.js: cinco estações ligadas por um trilho; pacotes de luz percorrem o caminho da planilha até a NFS-e. */
export default function Hero3D() {
  const ref = useRef<HTMLDivElement>(null);
  const [ativa, setAtiva] = useState(0);
  const [semWebgl, setSemWebgl] = useState(false);
  const ativaRef = useRef(0);

  useEffect(() => {
    ativaRef.current = ativa;
  }, [ativa]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelado = false;
    let limpar = () => {};

    import("three").then((THREE) => {
      if (cancelado || !el) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        setSemWebgl(true);
        return;
      }
      const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      el.appendChild(renderer.domElement);
      renderer.domElement.style.display = "block";
      renderer.domElement.setAttribute("aria-hidden", "true");

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 2.2, 13);
      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const luz = new THREE.PointLight(0xffffff, 60, 40);
      luz.position.set(0, 6, 8);
      scene.add(luz);

      // trilho
      const pontos = ETAPAS.map((_, i) => new THREE.Vector3(-6.4 + i * 3.2, Math.sin(i * 1.3) * 0.9, Math.cos(i * 0.9) * 0.6));
      const curva = new THREE.CatmullRomCurve3(pontos);
      const trilho = new THREE.Mesh(new THREE.TubeGeometry(curva, 120, 0.045, 8, false), new THREE.MeshBasicMaterial({ color: 0x35507a }));
      scene.add(trilho);

      // estações
      const geos = [
        new THREE.BoxGeometry(1.2, 1.2, 0.25),
        new THREE.OctahedronGeometry(0.85),
        new THREE.TorusKnotGeometry(0.5, 0.17, 80, 12),
        new THREE.IcosahedronGeometry(0.85),
        new THREE.DodecahedronGeometry(0.85),
      ];
      const estacoes = ETAPAS.map((etapa, i) => {
        const grupo = new THREE.Group();
        grupo.position.copy(pontos[i]);
        const malha = new THREE.Mesh(geos[i], new THREE.MeshStandardMaterial({ color: etapa.cor, roughness: 0.35, metalness: 0.4, emissive: etapa.cor, emissiveIntensity: 0.15 }));
        const borda = new THREE.LineSegments(new THREE.EdgesGeometry(geos[i]), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 }));
        malha.userData.indice = i;
        grupo.add(malha, borda);
        const rotulo = etiqueta(THREE, etapa.nome);
        rotulo.position.set(0, -1.55, 0);
        grupo.add(rotulo);
        scene.add(grupo);
        return { grupo, malha };
      });

      // pacotes de luz
      const pacotes = Array.from({ length: 7 }, (_, i) => {
        const m = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        scene.add(m);
        return { m, t: i / 7 };
      });

      // poeira de fundo
      const n = 220;
      const pos = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 30;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 3;
      }
      const poeiraGeo = new THREE.BufferGeometry();
      poeiraGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const poeira = new THREE.Points(poeiraGeo, new THREE.PointsMaterial({ color: 0x8fb3ff, size: 0.045, transparent: true, opacity: 0.6 }));
      scene.add(poeira);

      // interação
      const raycaster = new THREE.Raycaster();
      const ponteiro = new THREE.Vector2();
      let alvoX = 0;
      let alvoY = 0;

      const ajustar = () => {
        const w = el.clientWidth || 600;
        const h = el.clientHeight || 360;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.position.z = w < 520 ? 17 : 13;
        camera.updateProjectionMatrix();
      };
      ajustar();
      const ro = new ResizeObserver(ajustar);
      ro.observe(el);

      const mover = (e: PointerEvent) => {
        const r = renderer.domElement.getBoundingClientRect();
        ponteiro.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        alvoX = ponteiro.x * 0.5;
        alvoY = ponteiro.y * 0.25;
      };
      const clicar = (e: PointerEvent) => {
        mover(e);
        raycaster.setFromCamera(ponteiro, camera);
        const hit = raycaster.intersectObjects(estacoes.map((s) => s.malha))[0];
        if (hit) setAtiva(hit.object.userData.indice);
      };
      renderer.domElement.addEventListener("pointermove", mover);
      renderer.domElement.addEventListener("pointerdown", clicar);

      let visivel = true;
      const io = new IntersectionObserver(([entrada]) => (visivel = entrada.isIntersecting));
      io.observe(el);

      const relogio = new THREE.Clock();
      let raf = 0;
      const desenhar = () => {
        raf = requestAnimationFrame(desenhar);
        if (!visivel || document.hidden) return;
        const t = relogio.getElapsedTime();
        const foco = ativaRef.current;
        estacoes.forEach((s, i) => {
          const ligada = i === foco;
          s.malha.rotation.y = reduzir ? 0.4 : t * (ligada ? 1.1 : 0.35) + i;
          s.malha.rotation.x = reduzir ? 0.3 : t * 0.2;
          const alvoEscala = ligada ? 1.35 : 1;
          s.grupo.scale.lerp(new THREE.Vector3(alvoEscala, alvoEscala, alvoEscala), 0.12);
          (s.malha.material as import("three").MeshStandardMaterial).emissiveIntensity = ligada ? 0.7 : 0.15;
        });
        pacotes.forEach((p) => {
          p.t = (p.t + (reduzir ? 0 : 0.0016)) % 1;
          p.m.position.copy(curva.getPointAt(p.t));
        });
        camera.position.x += (alvoX - camera.position.x) * 0.04;
        camera.position.y += (2.2 + alvoY - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);
        poeira.rotation.y = reduzir ? 0 : t * 0.01;
        renderer.render(scene, camera);
      };
      desenhar();

      limpar = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        renderer.domElement.removeEventListener("pointermove", mover);
        renderer.domElement.removeEventListener("pointerdown", clicar);
        scene.traverse((o) => {
          const m = o as import("three").Mesh;
          m.geometry?.dispose?.();
          const mat = m.material as import("three").Material | import("three").Material[] | undefined;
          (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => {
            (x as import("three").SpriteMaterial).map?.dispose?.();
            x.dispose();
          });
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      cancelado = true;
      limpar();
    };
  }, []);

  return (
    <div className="tr-hero">
      <div ref={ref} className="tr-hero-cena" />
      {semWebgl && <p className="tr-hero-fallback">Seu navegador não conseguiu abrir a cena 3D. Use os botões abaixo para ver cada etapa.</p>}
      <div className="tr-hero-passos" role="tablist" aria-label="Etapas da emissão">
        {ETAPAS.map((e, i) => (
          <button key={e.nome} role="tab" aria-selected={ativa === i} className={ativa === i ? "on" : ""} onClick={() => setAtiva(i)}>
            <span style={{ background: `#${e.cor.toString(16).padStart(6, "0")}` }} />
            {e.nome}
          </button>
        ))}
      </div>
      <p className="tr-hero-legenda" aria-live="polite">
        <strong>{ETAPAS[ativa].nome}.</strong> {ETAPAS[ativa].texto}
        <em> Mova o mouse sobre a cena para mudar o ângulo e clique nas formas.</em>
      </p>
    </div>
  );
}
