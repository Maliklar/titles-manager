import { useContext } from "react";
import { Context } from ".";

const useUIContext = () => {
  try {
    const context = useContext(Context);
    return context;
  } catch (error) {
    throw Error("Context accessed outside of provider");
  }
};
export default useUIContext;
