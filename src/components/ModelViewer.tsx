import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Html, useProgress, Center } from '@react-three/drei';
import { Suspense, useMemo, useRef, useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 text-primary bg-background/80 p-3 rounded-lg backdrop-blur-sm border border-border/50 shadow-lg">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="text-sm font-bold">{progress.toFixed(0)}%</span>
      </div>
    </Html>
  );
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  // O memo garante que a cena só é clonada quando a URL realmente mudar
  const copiedScene = useMemo(() => scene.clone(), [scene]);

  return (
    <group rotation={[Math.PI / -4, -3, 4]}>
      <Center>
        <primitive object={copiedScene} />
      </Center>
    </group>
  );
}

// Garante ao menos um frame desenhado quando frameloop="demand"
// (ex.: após o modelo carregar ou ao voltar à viewport).
function FrameNudge() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    invalidate();
  });
  return null;
}

const maxDpr = typeof window !== 'undefined' ? Math.min(2, window.devicePixelRatio) : 2;

export default function ModelViewer({
  url,
  enableZoom = false,
  enableRotate = true,
}: {
  url: string;
  enableZoom?: boolean;
  enableRotate?: boolean;
}) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Pausa o canvas quando fora da viewport (economia de GPU/bateria).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isInteractive = enableZoom || enableRotate;
  // Auto-rotação só com movimento permitido, visível e sem reduced-motion.
  const autoRotate = enableRotate && !reduce && visible;

  return (
    <div
      ref={containerRef}
      className={`w-full h-full bg-secondary/20 ${isInteractive ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
    >
      <Canvas
        camera={{ position: [20, -50, 100], fov: 50 }}
        dpr={[1, maxDpr]}
        frameloop={autoRotate ? 'always' : 'demand'}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <Stage
            environment="city"
            intensity={0.6}
            shadows={{ type: 'contact', opacity: 0.5, blur: 2 }}
            adjustCamera={enableZoom ? 1.2 : 0.9}
          >
            <Model url={url} />
          </Stage>
          <FrameNudge />
        </Suspense>

        <OrbitControls
          autoRotate={autoRotate}
          autoRotateSpeed={2.5}
          enableZoom={enableZoom}
          enablePan={enableZoom}
          enableRotate={enableRotate}
          makeDefault
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("macropadpage/macropad.glb");
