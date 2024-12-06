"use client";

import {
  Box,
  Grid,
  KeyboardControls,
  OrbitControls,
  PerspectiveCamera,
  Torus,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import { Suspense } from "react";
import TestCar3 from "./car/TestCar3";

export default function Home() {
  const CONTROLS = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "left", keys: ["ArrowLeft", "KeyA"] },
    { name: "right", keys: ["ArrowRight", "KeyD"] },
    { name: "brake", keys: ["Space"] },
  ];

  return (
    <div className=" h-screen w-full">
      <Canvas shadows>
        <KeyboardControls map={CONTROLS}>
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 10]}
            intensity={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <Suspense>
            <OrbitControls />
            <Physics debug paused={false}>
              {/* <RigidBody type="fixed" colliders={false} position={[0, -1, 0]}>
                <Grid
                  args={[30, 30]} // Width and height of the grid
                  cellSize={1} // Size of each cell
                  cellThickness={0.5} // Thickness of grid lines
                  cellColor="#6f6f6f" // Color of cells
                  sectionSize={5} // Size of the sections
                  sectionThickness={1} // Thickness of section lines
                  sectionColor="#9d4b4b" // Color of sections
                  fadeDistance={30} // Distance at which the grid starts to fade
                  fadeStrength={1} // Strength of the fade
                  followCamera={false} // Whether the grid should follow the camera
                  position={[0, -0.01, 0]} // Slightly below the ground level
                />
                <CuboidCollider args={[10, 0, 10]} />
              </RigidBody> */}
              <RigidBody type="fixed" colliders={"hull"}>
                <Box position={[0, -8, 0]} args={[200, 10, 200]} receiveShadow>
                  <meshStandardMaterial color="white" />
                </Box>
              </RigidBody>

              <TestCar3 />
            </Physics>
            <PerspectiveCamera makeDefault position={[5, 5, 10]} />
          </Suspense>
        </KeyboardControls>
      </Canvas>
    </div>
  );
}
