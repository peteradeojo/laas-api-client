import { useSearchParams, Navigate, useNavigate } from "react-router-dom";
import { useGithubLoginCallbackQuery } from "../../services/auth";
import ProgressLoader from "../../components/Loaders/ProgessLoader";

const LoginWithGithub = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGithubLoginCallbackQuery({
    code: searchParams.get("code"),
  });

  if (isError) return <Navigate to={"/login"} />;
  if (isLoading)
    return (
      <>
        <ProgressLoader />
      </>
    );

  if (data) {
    localStorage.setItem("authToken", data.token);
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <Navigate to={"/login"} />
    </>
  );
};

export default LoginWithGithub;
