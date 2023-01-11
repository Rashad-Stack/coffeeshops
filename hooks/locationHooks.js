import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentLocation } from "../redux/slices/currentLocationSlices";

const useTrackLocation = () => {
  const [locationErrorMsg, SetLocationErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    dispatch(setCurrentLocation(`${latitude},${longitude}`));
    setIsLoading(false);
  };

  const error = () => {
    setIsLoading(false);
    SetLocationErrorMsg("Unable to retrieve your location");
  };

  const handleTrackLocation = () => {
    setIsLoading(true);
    if (!navigator.geolocation) {
      SetLocationErrorMsg("Geolocation is not supported by your browser");
      setIsLoading(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
      SetLocationErrorMsg("");
    }
  };
  return { handleTrackLocation, locationErrorMsg, isLoading };
};

export default useTrackLocation;
