import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Html, useProgress, Center } from '@react-three/drei';
import { Suspense, useMemo, useEffect } from 'react';
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
  const copiedScene = useMemo(() => scene.clone(), [scene]);

  // LIMPAMOS O useFrame DAQUI! 
  // O objeto ficará estático. Assim, o <Stage> calcula seu tamanho perfeitamente 
  // apenas 1 vez e o erro do "zoom infinito" é resolvido.

  // Limpeza de memória
  useEffect(() => {
    return () => {
      copiedScene.traverse((child: any) => {
        if ((child as any).isMesh) {
          (child as any).geometry.dispose();
          if ((child as any).material.dispose) (child as any).material.dispose();
        }
      });
    };
  }, [copiedScene]);

  return (
    /* Mantemos a inclinação do grupo para uma visão bonita */
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
      <Canvas camera={{ position: [20, -50, 100], fov: 50 }}>
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
        
        {/* A MÁGICA ACONTECE AQUI NO ORBIT CONTROLS */}
        <OrbitControls 
          autoRotate={true}          // DELEGA A ROTAÇÃO PARA O CONTROLE
          autoRotateSpeed={2.5}      // VELOCIDADE (Ajuste conforme preferir, ex: 2.0 ou 3.0)
          enableZoom={enableZoom}    // TRAVA O ZOOM QUANDO FOR MINIATURA
          enablePan={enableZoom}
          enableRotate={enableRotate}
          makeDefault 
        />
      </Canvas>
    </div>
  );
}

// Melhor prática: pré-carregar o modelo que você está usando
useGLTF.preload("macropadpage/macropad.glb");