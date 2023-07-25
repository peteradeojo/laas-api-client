import styles from "./styles.module.scss";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useLoginMutation, useVerify2FaMutation } from "../../services/api";
import ProgressLoader from "../../components/Loaders/ProgessLoader";

const Login = () => {
  const [twoFaScreen, setTwoFaScreen] = useState(false);
  const [email, setEmail] = useState("");
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

    // console.log(body);
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
    } catch (err) {}
  };

  return (
    <>
      <div className={styles.container}>
        <h1>Login</h1>

        {verify2FaResult.isLoading && <ProgressLoader />}
        {isLoading && <p>Loading...</p>}
        {isError && <p>Something went wrong: {error.message}</p>}

        {!twoFaScreen ? (
          <>
            <form className={styles.loginForm} onSubmit={submitForm}>
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

              <button type="submit" disabled={isLoading ? true : false}>
                Login
              </button>
            </form>

            <p className="center">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
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
