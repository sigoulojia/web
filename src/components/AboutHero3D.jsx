import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    Float,
    Stars,
    MeshDistortMaterial,
    GradientTexture,
    Center,
    Text,
    PerspectiveCamera
} from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// High-end Shader-like background without actual custom shader code to ensure stability
function Nebula() {
    const meshRef = useRef();
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.03;
        }
    });

    return (
        <mesh ref={meshRef} scale={10}>
            <sphereGeometry args={[1, 64, 64]} />
            <MeshDistortMaterial
                color="#101010"
                distort={0.5}
                speed={2}
                roughness={0.2}
                metalness={0.8}
            >
                <GradientTexture
                    stops={[0, 0.5, 1]}
                    colors={['#000000', '#1a1a2e', '#000000']}
                    size={1024}
                />
            </MeshDistortMaterial>
        </mesh>
    );
}

// Kinetic Dust Particles
function KineticDust({ count = 3000 }) {
    const points = useMemo(() => {
        const p = new Float32Array(count * 3);
        const v = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 15;
            p[i * 3 + 1] = (Math.random() - 0.5) * 15;
            p[i * 3 + 2] = (Math.random() - 0.5) * 15;
            v[i * 3] = (Math.random() - 0.5) * 0.01;
            v[i * 3 + 1] = (Math.random() - 1) * 0.02; // Slow falling
            v[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
        }
        return { p, v };
    }, [count]);

    const ref = useRef();
    useFrame((state) => {
        if (ref.current) {
            const positions = ref.current.geometry.attributes.position.array;
            for (let i = 0; i < count; i++) {
                positions[i * 3 + 1] -= 0.005; // Fall
                if (positions[i * 3 + 1] < -7.5) positions[i * 3 + 1] = 7.5; // Reset
            }
            ref.current.geometry.attributes.position.needsUpdate = true;
            ref.current.rotation.y += 0.001;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={points.p.length / 3}
                    array={points.p}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.015}
                color="#ffffff"
                transparent
                opacity={0.4}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

function MainScene() {
    return (
        <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} />
            <Nebula />
            <KineticDust />
            <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#4361ee" />
            <pointLight position={[-10, -10, -10]} intensity={2} color="#7209b7" />
            <spotLight position={[0, 5, 10]} intensity={2} angle={0.5} />

            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <Center>
                    <Text
                        fontSize={0.8}
                        color="white"
                        maxWidth={10}
                        textAlign="center"
                        letterSpacing={-0.02}
                        anchorX="center"
                        anchorY="middle"
                    >
                        MUSTAPHA{"\n"}ADEL TIRIRI
                        <meshStandardMaterial
                            color="white"
                            emissive="white"
                            emissiveIntensity={0.8}
                        />
                    </Text>
                </Center>
            </Float>
        </Suspense>
    );
}

const AboutHero3D = () => {
    return (
        <div className="w-full h-full absolute inset-0 bg-black overflow-hidden z-0">
            {/* The 3D World */}
            <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
                <MainScene />
            </Canvas>

            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black opacity-80" />

            {/* Legend Frame */}
            <div className="absolute inset-8 border border-white/5 pointer-events-none" />

            {/* Bottom Content (Legendary Styling) */}
            <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end pointer-events-none">
                <div className="flex flex-col gap-2">
                    <div className="h-px w-24 bg-white/20" />
                    <span className="text-[10px] uppercase tracking-[1em] text-white/40">Visual Visionary</span>
                </div>

                <div className="hidden md:flex flex-col items-end gap-2">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-mono">EST. MCMXCVIII</span>
                    <div className="h-px w-12 bg-white/10" />
                </div>
            </div>

            {/* Scroll Lead */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1.5 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
            >
                <div className="w-px h-24 bg-gradient-to-b from-white/0 via-white/40 to-white/0" />
            </motion.div>
        </div>
    );
};

export default AboutHero3D;
