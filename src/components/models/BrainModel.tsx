
import { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

interface BrainModelProps {
  abnormalityHighlight?: boolean;
}

const BrainModel = ({ abnormalityHighlight = false }: BrainModelProps) => {
  const brainTexture = useLoader(TextureLoader, '/lovable-uploads/62fb6d06-31d1-4f5c-8ddf-9bb3015ed8d8.png');
  const meshRef = useRef<THREE.Mesh>(null);

  // Create a more complex brain geometry using parametric equations
  const brainGeometry = new THREE.SphereGeometry(2, 128, 128);
  
  // Distort the geometry to create brain-like folds
  const positions = brainGeometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z = positions.getZ(i);
    
    // Add wrinkles and folds using noise-like patterns
    const frequency = 3;
    const amplitude = 0.2;
    const distortion = Math.sin(x * frequency) * Math.cos(y * frequency) * Math.sin(z * frequency) * amplitude;
    
    positions.setXYZ(
      i,
      x + x * distortion,
      y + y * distortion,
      z + z * distortion
    );
  }

  brainGeometry.computeVertexNormals();

  return (
    <group>
      <mesh ref={meshRef} geometry={brainGeometry}>
        <meshStandardMaterial 
          map={brainTexture}
          normalScale={new THREE.Vector2(2, 2)}
          roughness={0.6}
          metalness={0.1}
          bumpScale={0.3}
        />
      </mesh>

      {abnormalityHighlight && (
        <>
          {/* Abnormality indicators with glowing effects */}
          <mesh position={[0.8, 0.5, 1.2]}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial 
              color="#ff4444"
              emissive="#ff0000"
              emissiveIntensity={2}
              transparent
              opacity={0.6}
            />
          </mesh>
          
          {/* Edema region */}
          <mesh position={[1, 0.3, 1]}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial 
              color="#44ff44"
              emissive="#00ff00"
              emissiveIntensity={1.5}
              transparent
              opacity={0.4}
            />
          </mesh>
          
          {/* Enhanced region */}
          <mesh position={[0.6, 0.7, 1.4]}>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial 
              color="#4444ff"
              emissive="#0000ff"
              emissiveIntensity={1.5}
              transparent
              opacity={0.5}
            />
          </mesh>
        </>
      )}
    </group>
  );
};

export default BrainModel;
