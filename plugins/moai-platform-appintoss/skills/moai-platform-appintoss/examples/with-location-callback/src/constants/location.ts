/**
 * 위치 관련 거리 기준값을 모아놓은 상수예요.
 *
 * - DISTANCE_THRESHOLD_METERS: 이 거리 이상 떨어지면 특정 동작을 수행하도록 트리거돼요. 예: 위치 저장, 알림 등.
 * - DISTANCE_WARNING_METERS: 이 거리 이내로 접근하면 사용자에게 경고 메시지를 보여줄 수 있어요.
 */
export const LOCATION = {
  DISTANCE_THRESHOLD_METERS: 30,
  DISTANCE_WARNING_METERS: 10,
};
