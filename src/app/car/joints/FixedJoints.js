import { useFixedJoint } from "@react-three/rapier";

export const FixedJoint = ({ 
  body, 
  wheel, 
  body1Anchor, 
  body1LocalFrame, 
  body2Anchor, 
  body2LocalFrame 
}) => {
  useFixedJoint(body, wheel, [
    body1Anchor, 
    body1LocalFrame, 
    body2Anchor, 
    body2LocalFrame
  ]);

  return null;
};