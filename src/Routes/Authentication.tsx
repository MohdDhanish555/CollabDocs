import { Navigate } from "react-router";
import { useAppSelector } from "../Redux/hooks";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const AuthenticatedRoute: React.FC<Props> = ({ children }) => {
  const { isUserAuthenticated } = useAppSelector((state) => state.user);

  if (!isUserAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
};

export const UnAuthenticatedRoute: React.FC<any> = ({ children }) => {
  const { isUserAuthenticated } = useAppSelector((state) => state.user);

  if (isUserAuthenticated) {
    return <Navigate to="/app" />;
  }

  return <>{children}</>;
};
