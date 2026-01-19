import { RapierRigidBody } from '@react-three/rapier';

/**
 * RigidBody가 유효한지 확인하는 타입 가드 함수
 * @param body 확인할 RigidBody
 * @returns body가 유효한 RigidBody인지 여부
 */
export const isValidRigidBody = (
  body: RapierRigidBody | null
): body is RapierRigidBody => {
  return body !== null && body.translation() !== null && body.linvel() !== null;
};
