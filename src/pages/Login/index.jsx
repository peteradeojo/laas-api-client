import styles from "./styles.module.scss";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useLoginMutation, useVerify2FaMutation } from "../../services/api";
import ProgressLoader from "../../components/Loaders/ProgessLoader";
import { FaGithub } from "react-icons/fa";
import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const [twoFaScreen, setTwoFaScreen] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [password, setPassword] = useState("");
  const [twoFaToken, setTwoFaToken] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();
  const [verify2Fa, verify2FaResult] = useVerify2FaMutation();

  const verifyToken = async (e) => {
    e.preventDefault();
    const body = {
      token: twoFaToken,
      email,
    };

    try {
      const {
        data: { token },
      } = await verify2Fa(body).unwrap();

      localStorage.setItem("authToken", token);
      navigate("/dashboard");
    } catch (err) {}
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      const {
        data: { token, twoFactorEnabled },
      } = result;

      if (twoFactorEnabled) {
        setTwoFaScreen(true);
      } else {
        localStorage.setItem("authToken", token);
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      setErrorMsg(err.data.message || "something went Wrong");
    }
  };

  const loginWithGithub = async (e) => {
    // githubLogin();
    window.location.href = __APP_ENV__.API_URL + "/auth/github";
  };

  return (
    <>
      <div className={styles.container}>
        {verify2FaResult.isLoading && <ProgressLoader />}
        {isLoading && (
          <>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isLoading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </>
        )}
        {/* {isError && <p>Something went wrong: {error.message}</p>} */}

        {!twoFaScreen ? (
          <>
            <form className={styles.loginForm} onSubmit={submitForm}>
              <h1 className={styles.authTitle}>Login</h1>
              {errorMsg && (
                <Alert
                  severity="error"
                  onClose={() => {
                    setErrorMsg("");
                  }}
                >
                  {errorMsg}
                </Alert>
              )}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className={styles.btn} type="submit" disabled={isLoading}>
                Login
              </button>
              <div className={styles.loginOption}>
                <span />
                <p>or</p>
                <span />
              </div>
              <div>
                <button
                  onClick={loginWithGithub}
                  className={styles.githubLogin}
                >
                  <FaGithub /> Login with Github
                </button>
              </div>
              <p className="center">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </form>
          </>
        ) : (
          <>
            <div className="center">
              <h2>Enter Verification Token</h2>
              <form className="my-3" onSubmit={verifyToken}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Enter token"
                    required
                    className="form-control"
                    value={twoFaToken}
                    onChange={(e) => setTwoFaToken(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Login;
