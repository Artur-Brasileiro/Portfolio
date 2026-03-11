import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Html, useProgress, Center } from '@react-three/drei';
import { Suspense, useMemo, useEffect, useRef } from 'react';
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
  // O useMemo garante que a cópia da cena só seja criada uma vez
  const copiedScene = useMemo(() => scene.clone(), [scene]);
  const modelRef = useRef<any>(null);

  // Animação de rotação no próprio eixo
  useFrame((_state, delta) => {
    if (modelRef.current) {
      // Altere para .x, .y ou .z dependendo de qual eixo você quer que gire
      modelRef.current.rotation.z += delta * 0.5;
    }
  });

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
    /* O group recebe a inclinação desejada (PI/3) e a referência da animação */
    /* O Center garante que o giro aconteça em volta do meio da placa */
    <group ref={modelRef} rotation={[Math.PI / 2, 2, 0]}>
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
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
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
          autoRotate={false} 
          enableZoom={enableZoom} 
          enablePan={enableZoom}
          enableRotate={enableRotate}
          makeDefault 
          target={enableZoom ? [0, 0, 0] : [-20, -10, 0]} 
        />
      </Canvas>
    </div>
  );
}

// Melhor prática: pré-carregar o modelo que você está usando
useGLTF.preload("macropadpage/macropad.glb");