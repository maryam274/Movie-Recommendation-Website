import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../redux/slices/appStateSlice";


const PageWrapper = ({ state, children }) => {
  const dispatch = useDispatch();

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
// Set app state
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setAppState(state));
  }, [state, dispatch]);

  return (
    children
  );
};

export default PageWrapper;