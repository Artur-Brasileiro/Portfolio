import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Html, useProgress, Center } from '@react-three/drei';
import { Suspense, useMemo } from 'react';
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

  // REMOVIDO o useEffect de dispose()! 
  // Deixe o useGLTF gerenciar o cache das geometrias/materiais.

  return (
    <group rotation={[Math.PI / -4, -3, 4]}>
      <Center>
        <primitive object={copiedScene} />
      </Center>
    </group>
  );
}

export default function ModelViewer({ 
  url, 
  enableZoom = false,
  enableRotate = true 
}: { 
  url: string, 
  enableZoom?: boolean,
  enableRotate?: boolean
}) {
  const isInteractive = enableZoom || enableRotate;

  return (
    <div className={`w-full h-full bg-secondary/20 ${isInteractive ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}>
      {/* dpr restrito e frameloop="demand" se não houver animação constante */}
      <Canvas 
        camera={{ position: [20, -50, 100], fov: 50 }} 
        dpr={[1, Math.min(2, window.devicePixelRatio)]} // Limita o DPR a 2 (evita travamentos em telas 3x e 4x)
        gl={{ antialias: true, powerPreference: "high-performance" }} // Pede prioridade para a GPU
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
        </Suspense>
        
        <OrbitControls 
          autoRotate={true}
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