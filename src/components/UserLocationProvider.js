import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setUserPosition } from "../slices/weatherSlice";

const UserLocationProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(
          setUserPosition({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
        );
      },
      (error) => {
        dispatch(setUserPosition());
      }
    );
  }, []);

  return { ...children };
};

export default UserLocationProvider;
