import { Grid, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  CuboidCollider,
  CylinderCollider,
  RigidBody,
  useRevoluteJoint,
} from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { FixedJoint } from "./joints/FixedJoints";

import { AxleJoint } from "./joints/AxleJoints";
import { SteeredJoint } from "./joints/SteeredJoints";

export const TestCar3 = () => {
  //carBodyRef
  const chassisRef = useRef();

  // wheelRefs
  const frontLeftWheelRef = useRef();
  const frontRightWheelRef = useRef();
  const rearLeftWheelRef = useRef();
  const rearRightWheelRef = useRef();

  // axleRefs
  const frontLeftAxleRef = useRef();
  const frontRightAxleRef = useRef();
  const rearLeftAxleRef = useRef();
  const rearRightAxleRef = useRef();

  const [subscribeKeys, getKeys] = useKeyboardControls();

  const wheelOffset = {
    width: 1.2, // Distance from center to wheel (left/right)
    length: 1.3, // Distance from center to wheel (front/back)
    height: -0.5, // Height offset for wheels
  };

  const axleOffset = {
    width: 1, // Distance from center to wheel (left/right)
    length: 1.3, // Distance from center to wheel (front/back)
    height: -0.5, // Height offset for wheels
  };

  const wheelPosition = [
    {
      name: "frontLeftWheel",
      position: [-wheelOffset.length, wheelOffset.height, wheelOffset.width],
      wheelRef: frontLeftWheelRef,
    },
    {
      name: "frontRightWheel",
      position: [-wheelOffset.length, wheelOffset.height, -wheelOffset.width],
      wheelRef: frontRightWheelRef,
    },
    {
      name: "rearLeftWheel",
      position: [wheelOffset.length, wheelOffset.height, wheelOffset.width],
      wheelRef: rearLeftWheelRef,
    },
    {
      name: "rearRightWheel",
      position: [wheelOffset.length, wheelOffset.height, -wheelOffset.width],
      wheelRef: rearRightWheelRef,
    },
  ];

  const axlePosition = [
    {
      name: "frontLeftAxle",
      position: [-axleOffset.length, axleOffset.height, axleOffset.width],
      axleRef: frontLeftAxleRef,
    },
    {
      name: "frontRightAxle",
      position: [-axleOffset.length, axleOffset.height, -axleOffset.width],
      axleRef: frontRightAxleRef,
    },
    {
      name: "rearLeftAxle",
      position: [axleOffset.length, axleOffset.height, axleOffset.width],
      axleRef: rearLeftAxleRef,
    },
    {
      name: "rearRightAxle",
      position: [axleOffset.length, axleOffset.height, -axleOffset.width],
      axleRef: rearRightAxleRef,
    },
  ];

  const axleJointsData = [
    {
      key: "frontLeftAxleJoint",
      body: frontLeftAxleRef,
      wheel: frontLeftWheelRef,
      bodyAnchor: [0, 0, 0.35],
      wheelAnchor: [0, 0, 0],
      rotationAxis: [0, 0, 1],
      isDriven: false,
    },
    {
      key: "frontRightAxleJoint",
      body: frontRightAxleRef,
      wheel: frontRightWheelRef,
      bodyAnchor: [0, 0, -0.35],
      wheelAnchor: [0, 0, 0],
      rotationAxis: [0, 0, 1],
      isDriven: false,
    },
    {
      key: "rearLeftAxleJoint",
      body: rearLeftAxleRef,
      wheel: rearLeftWheelRef,
      bodyAnchor: [0, 0, 0.35],
      wheelAnchor: [0, 0, 0],
      rotationAxis: [0, 0, 1],
      isDriven: true,
    },
    {
      key: "rearRightAxleJoint",
      body: rearRightAxleRef,
      wheel: rearRightWheelRef,
      bodyAnchor: [0, 0, -0.35],
      wheelAnchor: [0, 0, 0],
      rotationAxis: [0, 0, 1],
      isDriven: true,
    },
  ];

  const rearAxleJointsData = [
    {
      key: "rearLeftAxleToBodyJoint",
      body: chassisRef,
      wheel: rearLeftAxleRef,
      body1Anchor: axlePosition[2].position,
      body1LocalFrame: [0, 0, 0, 1],
      body2Anchor: [0, 0, 0],
      body2LocalFrame: [0, 0, 0, 1],
    },
    {
      key: "rearRightAxleToBodyJoint",
      body: chassisRef,
      wheel: rearRightAxleRef,
      body1Anchor: axlePosition[3].position,
      body1LocalFrame: [0, 0, 0, 1],
      body2Anchor: [0, 0, 0],
      body2LocalFrame: [0, 0, 0, 1],
    },
  ];

  const steeredJointsData = [
    {
      key: "frontLeftSteeredJoint",
      body: chassisRef,
      wheel: frontLeftAxleRef,
      bodyAnchor: axlePosition[0].position,
      wheelAnchor: [0, 0, 0],
      rotationAxis: [0, 1, 0],
    },
    {
      key: "frontRightSteeredJoint",
      body: chassisRef,
      wheel: frontRightAxleRef,
      bodyAnchor: axlePosition[1].position,
      wheelAnchor: [0, 0, 0],
      rotationAxis: [0, 1, 0],
    },
  ];

  useFrame(() => {
    const { forward, backward, left, right } = getKeys();
  });

  return (
    <>
      {/* Car body */}
      <RigidBody ref={chassisRef} colliders="cuboid" mass={5}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.5, 0.5, 1.5]} />
          <meshStandardMaterial color="#cccccc" />
        </mesh>
      </RigidBody>
      {/* wheels */}
      {wheelPosition.map((wheel, index) => {
        return (
          <RigidBody
            key={wheel.name}
            ref={wheel.wheelRef}
            position={wheel.position}
            mass={0.2}
            restitution={0}
            colliders={false}
          >
            <mesh rotation-x={-Math.PI / 2} castShadow receiveShadow>
              <cylinderGeometry args={[0.25, 0.25, 0.24, 32]} />
              <meshStandardMaterial color="#666" />
            </mesh>

            <mesh rotation-x={-Math.PI / 2}>
              <cylinderGeometry args={[0.251, 0.251, 0.241, 16]} />
              <meshStandardMaterial color="#000" wireframe />
            </mesh>
            <CylinderCollider
              mass={0.5}
              friction={1.5}
              args={[0.125, 0.25]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </RigidBody>
        );
      })}
      {/* axles */}
      {axlePosition.map((axle, index) => {
        return (
          <RigidBody
            key={axle.name}
            ref={axle.axleRef}
            position={axle.position}
          >
            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.3, 0.3, 0.3]} />
              <meshStandardMaterial color="#999" />
            </mesh>
          </RigidBody>
        );
      })}

      {/* wheel to axle joint */}
      {axleJointsData.map((axleJoint, index) => {
        return <AxleJoint key={axleJoint.key} {...axleJoint} />;
      })}

      {/* axle to body rear joints */}
      {rearAxleJointsData.map((rearAxleJoint, index) => {
        return <FixedJoint key={rearAxleJoint.key} {...rearAxleJoint} />;
      })}

      {/* steered joints */}
      {steeredJointsData.map((steeredJoint, index) => {
        return <SteeredJoint key={steeredJoint.key} {...steeredJoint} />;
      })}
    </>
  );
};
