import { MotorModel } from "@dimforge/rapier3d-compat";
import { useKeyboardControls } from "@react-three/drei";
import { useRevoluteJoint } from "@react-three/rapier";
import { useEffect } from "react";

const DRIVEN_WHEEL_TARGET_VELOCITY = 1000;
const DRIVEN_WHEEL_FACTOR = 10;

export const AxleJoint = ({
  body,
  wheel,
  bodyAnchor,
  wheelAnchor,
  rotationAxis,
  isDriven,
}) => {
  const joint = useRevoluteJoint(body, wheel, [
    bodyAnchor,
    wheelAnchor,
    rotationAxis,
  ]);

  const forwardPressed = useKeyboardControls((state) => state.forward);
  const backwardPressed = useKeyboardControls((state) => state.backward);

  useEffect(() => {
    if (!isDriven) return;

    let forward = 0;
    if (forwardPressed) forward += 1;
    if (backwardPressed) forward -= 1;

    forward *= DRIVEN_WHEEL_TARGET_VELOCITY;

    if (forward !== 0) {
      wheel.current?.wakeUp();
    }
    joint.current?.configureMotorModel(MotorModel.AccelerationBased);
    joint.current?.configureMotorVelocity(forward, DRIVEN_WHEEL_FACTOR);
  }, [forwardPressed, backwardPressed]);

  return null;
};
