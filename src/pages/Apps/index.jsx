import { useContext, useState } from "react";
import { useGetAppsQuery, useCreateAppMutation } from "../../services/api";

import authStyles from "../Login/styles.module.scss";
import { Link } from "react-router-dom";
import ProgressLoader from "../../components/Loaders/ProgessLoader";

import Modal from "../../components/Modal";
import styles from './style.module.scss'
import { TeamContext } from "../../context/TeamContext";

const NewAppForm = ({ refetch, closer }) => {
  const [title, setTitle] = useState("");
  const [createApp, result] = useCreateAppMutation();
  // const navigate = useNavigate();

  const submitForm = async () => {
    const data = await createApp({ title }).unwrap();
    refetch();
  };

  return (
    <Modal closer={() => closer(false)}>
      <h3 className="py-5">Create Application</h3>
      <form
        className={authStyles.loginForm}
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
      >
        <input
          type="text"
          placeholder="App Name"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </Modal>
  );
};

const Apps = () => {
  const [newAppForm, setNewAppForm] = useState(false);
  const team = useContext(TeamContext);
  const { data, error, isLoading, refetch } = useGetAppsQuery(team.onTeam);

  return (
    <div className="container">
      {/* <AppHeader app={{ title: "Apps" }} clearResult={() => {}} /> */}
      <h1 className="pb-2">Apps</h1>
      <button
        onClick={() => {
          setNewAppForm(!newAppForm);
        }}
        className="btn"
      >
        Create App
      </button>

      {error && <p>An error occured</p>}
      {isLoading && <ProgressLoader isLoading={true} />}
      {data && data.data.length >= 1 ? (
        <>
          <table className={styles.appTable}>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Created</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {data.data.map((app, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`${app.id}`}>{app.title}</Link>
                  </td>
                  <td>{app.createdAt}</td>
                  <td>{app.token ? "Active" : "Inactive"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No apps. </p>
      )}

      {newAppForm && <NewAppForm refetch={refetch} closer={setNewAppForm} />}
    </div>
  );
};

export default Apps;
