import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage } from '@react-three/drei';
import { Suspense, useMemo } from 'react';

// Componente que carrega efetivamente o modelo
function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const copiedScene = useMemo(() => scene.clone(), [scene]);
  return <primitive object={copiedScene} />;
}

export default function ModelViewer({ url, enableZoom = false }: { url: string, enableZoom?: boolean }) {
  return (
    <div className={`w-full h-full bg-secondary/20 ${enableZoom ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}>
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6} shadows={false}>
            <Model url={url} />
          </Stage>
        </Suspense>
        
        <OrbitControls 
          autoRotate 
          autoRotateSpeed={2} 
          enableZoom={enableZoom} 
          enablePan={enableZoom}
          enableRotate={enableZoom}
          makeDefault 
        />
      </Canvas>
    </div>
  );
}