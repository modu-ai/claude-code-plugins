interface Location {
  latitude: number;
  longitude: number;
}

interface GetDistanceFromCurrentLocation {
  current: Location;
  target: Location;
}

const convertDegreesToRadians = (degrees: number): number =>
  (degrees * Math.PI) / 180;
export const getDistanceFromCurrentLocation = ({
  current,
  target,
}: GetDistanceFromCurrentLocation): number => {
  const EARTH_RADIUS_METERS = 6371e3;

  const latitudeDifference = convertDegreesToRadians(
    target.latitude - current.latitude
  );
  const longitudeDifference = convertDegreesToRadians(
    target.longitude - current.longitude
  );

  const currentLatitudeInRadians = convertDegreesToRadians(current.latitude);
  const targetLatitudeInRadians = convertDegreesToRadians(target.latitude);

  const haversineFormula = () => {
    const sinLatDiff = Math.sin(latitudeDifference / 2);
    const sinLonDiff = Math.sin(longitudeDifference / 2);

    return (
      sinLatDiff * sinLatDiff +
      Math.cos(currentLatitudeInRadians) *
        Math.cos(targetLatitudeInRadians) *
        sinLonDiff *
        sinLonDiff
    );
  };

  const haversineValue = haversineFormula();
  const centralAngle =
    2 * Math.atan2(Math.sqrt(haversineValue), Math.sqrt(1 - haversineValue));

  return EARTH_RADIUS_METERS * centralAngle;
};
