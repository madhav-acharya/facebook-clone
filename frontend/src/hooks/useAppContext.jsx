import { AppContext } from "../context/AppContext";
import { useContext } from "react";

const useAppContext = () =>
{
    return useContext(AppContext);
}
export default useAppContext;