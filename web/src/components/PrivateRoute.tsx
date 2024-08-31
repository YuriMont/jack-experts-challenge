import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

interface PrivateRouteProps {
  element: React.ComponentType;
}

export function PrivateRoute({ element: Component }: PrivateRouteProps) {
  const cookies = new Cookies();
  const token = cookies.get("token");

  return token ? <Component /> : <Navigate to="/sign-in" />;
}
