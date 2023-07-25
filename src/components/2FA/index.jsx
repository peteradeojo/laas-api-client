import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useEnable2FaMutation } from "../../services/api";
import ProgressLoader from "../Loaders/ProgessLoader";

const TwoFaScreen = ({ data }) => {
  const [token, setToken] = useState("");
  const [enable2Fa, enable2FaResult] = useEnable2FaMutation();

  const submitForm = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      const body = { token: form.token.value, secret: data.secret };

      console.log(body);

      if (body.token && body.token.length > 0) {
        await enable2Fa(body).unwrap();
      }
      return;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <img src={data.qrCode} />

      <form onSubmit={submitForm}>
        <input
          type="text"
          name="token"
          id="token"
          className="form-control"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter 2FA token"
        />
        <button type="submit">Submit</button>
      </form>

      {enable2FaResult.isError && <></>}
      {enable2FaResult.isLoading && <ProgressLoader />}
      {enable2FaResult.isSuccess && <Navigate to={'/profile'} />}
    </div>
  );
};

export default TwoFaScreen;
