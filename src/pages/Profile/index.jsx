import { useState } from "react";
import ProgressLoader from "../../components/Loaders/ProgessLoader";
import { useGetUserQuery, useUpdateProfileMutation } from "../../services/api";

const Profile = () => {
  let { data, isLoading, isError, error } = useGetUserQuery();
  const [update, updateResult] = useUpdateProfileMutation();
  const [name, setName] = useState("");

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>{error.data.message}</>;
  }

  data = data.data;

  const submitForm = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      const body = { name: form.name.value };

      if (body.name && body.name.length > 0) {
        const result = await update(body).unwrap();
      }
      return;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <title>Profile | {data.user.name}</title>
      <div className="container">
        <h1>Profile</h1>

        <form onSubmit={submitForm}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              value={name || data.user.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              value={data.user.email}
            />
          </div> */}
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>

        {!(data.user.twoFactorEnabled) && <p>Enable 2FA</p>}

        {updateResult.isLoading && <ProgressLoader />}
      </div>
    </>
  );
};

export default Profile;
