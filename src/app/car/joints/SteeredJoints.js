import { MotorModel } from "@dimforge/rapier3d-compat";
import { useKeyboardControls } from "@react-three/drei";
import { useRevoluteJoint } from "@react-three/rapier";
import { useEffect } from "react";

const TURN_ANGLE = 0.6;
const AXLE_TO_CHASSIS_JOINT_STIFFNESS = 1000;
const AXLE_TO_CHASSIS_JOINT_DAMPING = 10;

export const SteeredJoint = ({
  body,
  wheel,
  bodyAnchor,
  wheelAnchor,
  rotationAxis,
}) => {
  const joint = useRevoluteJoint(body, wheel, [
    bodyAnchor,
    wheelAnchor,
    rotationAxis,
  ]);

  const left = useKeyboardControls((state) => state.left);
  const right = useKeyboardControls((state) => state.right);
  let targetPos = 0;
  if (left) targetPos += TURN_ANGLE;
  if (right) targetPos -= TURN_ANGLE;

  useEffect(() => {
    joint.current?.configureMotorModel(MotorModel.ForceBased);
    joint.current?.configureMotorPosition(
      targetPos,
      AXLE_TO_CHASSIS_JOINT_STIFFNESS,
      AXLE_TO_CHASSIS_JOINT_DAMPING
    );
  }, [left, right]);

  return null;
};
