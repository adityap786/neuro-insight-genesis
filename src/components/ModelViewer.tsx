import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Environment, PerspectiveCamera } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RotateCw, ZoomIn, ZoomOut, Maximize2, Minimize2 } from "lucide-react";
import { motion } from "framer-motion";

const BrainModel = ({ abnormalityHighlight = false }) => {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#7c7c7c" roughness={0.4} />
      </mesh>
      
      {abnormalityHighlight && (
        <mesh position={[0.8, 0.5, 1.2]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial 
            color="#ea384c"
            emissive="#ff0000"
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      )}
    </group>
  );
};

interface ModelViewerProps {
  imageFile: File | null;
  abnormalityDetected: boolean;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ imageFile, abnormalityDetected }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<'3d' | 'axial' | 'coronal' | 'sagittal'>('3d');
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (imageFile) {
      console.log(`Processing ${imageFile.name} for 3D visualization...`);
    }
  }, [imageFile]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full h-full"
    >
      <Card className="neo-blur h-full flex flex-col card-gradient">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-gradient">3D Brain Visualization</CardTitle>
            <motion.div 
              className="flex gap-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button 
                variant="outline" 
                size="icon" 
                onClick={toggleFullscreen}
                className="hover-glow"
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </motion.div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-0 relative">
          <Tabs defaultValue="3d" className="h-full flex flex-col">
            <div className="px-4">
              <TabsList className="grid grid-cols-4 mb-2 glass-panel">
                <TabsTrigger value="3d" onClick={() => setViewMode('3d')}>3D View</TabsTrigger>
                <TabsTrigger value="axial" onClick={() => setViewMode('axial')}>Axial</TabsTrigger>
                <TabsTrigger value="coronal" onClick={() => setViewMode('coronal')}>Coronal</TabsTrigger>
                <TabsTrigger value="sagittal" onClick={() => setViewMode('sagittal')}>Sagittal</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="3d" className="flex-grow m-0 rounded-b-lg overflow-hidden">
              <div className="controls absolute top-4 right-4 z-10 flex gap-2 bg-neuro-darker/60 p-2 rounded-lg backdrop-blur-sm">
                <Button variant="ghost" size="icon">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <RotateCw className="h-4 w-4" />
                </Button>
              </div>
              <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} />
                <Environment preset="city" />
                <ambientLight intensity={0.8} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <BrainModel abnormalityHighlight={abnormalityDetected} />
                <OrbitControls />
              </Canvas>
              
              {abnormalityDetected && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 right-4 glass-panel bg-red-500/20 text-white p-3 rounded-md border border-red-500/30"
                >
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                    <p className="text-sm font-medium">Abnormality detected in temporal lobe region</p>
                  </div>
                </motion.div>
              )}
            </TabsContent>
            
            <TabsContent value="axial" className="flex-grow m-0">
              <div className="h-full flex items-center justify-center bg-neuro-darker/50">
                {imageFile && (
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">Axial View</p>
                    <div className="w-64 h-64 mx-auto bg-gray-800 rounded-md flex items-center justify-center">
                      <img src={URL.createObjectURL(imageFile)} alt="Axial MRI Slice" className="max-w-full max-h-full" />
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="coronal" className="flex-grow m-0">
              <div className="h-full flex items-center justify-center bg-neuro-darker/50">
                <p className="text-muted-foreground">Coronal view would be displayed here</p>
              </div>
            </TabsContent>
            
            <TabsContent value="sagittal" className="flex-grow m-0">
              <div className="h-full flex items-center justify-center bg-neuro-darker/50">
                <p className="text-muted-foreground">Sagittal view would be displayed here</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ModelViewer;
