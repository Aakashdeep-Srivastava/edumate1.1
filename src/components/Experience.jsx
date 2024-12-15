'use client';

import { useAITeacher } from "../hooks/useAITeacher";
import {
  CameraControls,
  Environment,
  Float,
  Gltf,
  Html,
  Loader,
  useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva, button, useControls } from "leva";
import { Suspense, useEffect, useRef } from "react";
import { degToRad } from "three/src/math/MathUtils";
import { BoardSettings } from "./BoardSettings";
import { MessagesList } from "./MessagesList";
import { Teacher } from "./Teacher";
import { TypingBox } from "./TypingBox";

// This configuration defines the positioning of key elements in our classroom scenes.
// Each setup includes precise coordinates for optimal viewing and interaction.
const itemPlacement = {
  // Standard front-facing classroom layout
  default: {
    classroom: {
      position: [0.2, -1.7, -2], // Places the classroom at a comfortable viewing distance
    },
    teacher: {
      position: [-1, -1.7, -3], // Positions the teacher slightly to the left for natural presence
    },
    board: {
      position: [0.45, 0.382, -6], // Positions the board at optimal reading height and distance
    },
  },
  // Alternative side-view layout for different perspective
  alternative: {
    classroom: {
      position: [0.3, -1.7, -1.5],
      rotation: [0, degToRad(-90), 0], // Rotates the classroom 90 degrees
      scale: 0.4, // Scales down to fit the view
    },
    teacher: { position: [-1, -1.7, -3] },
    board: { position: [1.4, 0.84, -8] },
  },
};

// Camera positions for different interaction states
const CAMERA_POSITIONS = {
  default: [0, 6.123233995736766e-21, 0.0001], // Initial viewing position
  loading: [                                    // Position during loading states
    0.00002621880610890309,
    0.00000515037441056466,
    0.00009636414192870058,
  ],
  speaking: [0, -1.6481333940859815e-7, 0.00009999846226827279], // Position during conversations
};

// Zoom levels that correspond to each camera position
const CAMERA_ZOOMS = {
  default: 1,      // Standard view
  loading: 1.3,    // Slightly zoomed in during loading
  speaking: 2.1204819420055387, // Close-up during conversations
};

// Manages camera movements and interactions
const CameraManager = () => {
  const controls = useRef();
  const loading = useAITeacher((state) => state.loading);
  const currentMessage = useAITeacher((state) => state.currentMessage);

  // Handles automatic camera transitions based on the application state
  useEffect(() => {
    if (loading) {
      controls.current?.setPosition(...CAMERA_POSITIONS.loading, true);
      controls.current?.zoomTo(CAMERA_ZOOMS.loading, true);
    } else if (currentMessage) {
      controls.current?.setPosition(...CAMERA_POSITIONS.speaking, true);
      controls.current?.zoomTo(CAMERA_ZOOMS.speaking, true);
    }
  }, [loading, currentMessage]);

  // Development helper to get current camera position
  useControls("Helper", {
    getCameraPosition: button(() => {
      const position = controls.current.getPosition();
      const zoom = controls.current.camera.zoom;
      console.log([...position], zoom);
    }),
  });

  return (
    <CameraControls
      ref={controls}
      minZoom={1}
      maxZoom={3}
      polarRotateSpeed={-0.3}    // Reversed for more intuitive control
      azimuthRotateSpeed={-0.3}  // Reversed for more intuitive control
      mouseButtons={{
        left: 1,   // Left mouse button controls rotation
        wheel: 16, // Mouse wheel controls zoom
      }}
      touches={{
        one: 32,   // Single finger controls rotation
        two: 512,  // Two fingers control zoom
      }}
    />
  );
};

// Main component that renders the entire 3D classroom experience
export const Experience = () => {
  const teacher = useAITeacher((state) => state.teacher);
  const classroom = useAITeacher((state) => state.classroom);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Main 3D scene container */}
      <div className="absolute inset-0">
        <Canvas
          style={{
            width: '100%',
            height: '100%'
          }}
          camera={{
            position: [0, 0, 0.0001],
            fov: 75
          }}
        >
          <CameraManager />

          <Suspense fallback={null}>
            <Float speed={0.5} floatIntensity={0.2} rotationIntensity={0.1}>
              {/* Message board and settings */}
              <Html
                transform
                {...itemPlacement[classroom].board}
                distanceFactor={1}
              >
                <MessagesList />
                <BoardSettings />
              </Html>

              {/* Scene lighting */}
              <Environment preset="sunset" />
              <ambientLight intensity={0.8} color="pink" />

              {/* Classroom model */}
              <Gltf
                src={`/models/classroom_${classroom}.glb`}
                {...itemPlacement[classroom].classroom}
              />

              {/* Teacher character */}
              <Teacher
                teacher={teacher}
                key={teacher}
                {...itemPlacement[classroom].teacher}
                scale={1.5}
                rotation-y={degToRad(20)}
              />
            </Float>
          </Suspense>
        </Canvas>
      </div>

      {/* Single chat interface positioned at the bottom */}
      <div className="absolute left-1/2 bottom-20 -translate-x-1/2 w-full max-w-3xl px-6 z-10">
        <div className="rounded-3xl backdrop-blur-[12px] bg-gradient-to-r from-black/30 via-black/20 to-black/30 p-6">
          <div className="space-y-2">
            <h2 className="text-white/90 font-semibold text-lg">
              How can I learn this better ?
            </h2>
            <p className="text-white/70 text-sm">
              Type a sentence you want to understand and AI Tutor will comprehend it for you.
            </p>
          </div>
          <div className="mt-4">
            <TypingBox />
          </div>
        </div>
      </div>

      {/* Development tools */}
      <Leva hidden />
      <Loader />
    </div>
  );
};

// Preload 3D models to improve initial loading experience
useGLTF.preload("/models/classroom_default.glb");
useGLTF.preload("/models/classroom_alternative.glb");

export default Experience;