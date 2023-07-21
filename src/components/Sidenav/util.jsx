import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import styles from "./style.module.scss";

export const buildUserEl = (data) => {
  const { user } = data;

  return (
    <>
      <Link to={'/profile'}>
        <img src={`https://ui-avatars.com/api?name=${user.name}`} alt="" />
      </Link>
      <p className={styles.nametag}>{user.name}</p>
    </>
  );
};

export const buildAppLinks = (apps) => {
  return (
    <>
      <Link to={"/dashboard/apps"}>
        <FaPlus /> Create App
      </Link>
      {apps.map((app) => (
        <Link key={app.id} to={`/dashboard/apps/${app.id}`}>
          {app.title}
        </Link>
      ))}
    </>
  );
};
