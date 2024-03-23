import { useContext } from "react";
import { AuthContext } from "@/contexts/jwt-context";

const useAuth = () => useContext(AuthContext);

export default useAuth;
