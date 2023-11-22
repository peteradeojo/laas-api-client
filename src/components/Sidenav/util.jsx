import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import styles from "./style.module.scss";

export const buildUserEl = (data) => {
  const { user } = data;

  return (
    <>
        <img src={`https://ui-avatars.com/api?name=${user.name}`} alt="" />
      <p className={styles.nametag}>{user.name}</p>
    </>
  );
};

export const buildAppLinks = (apps) => {
  return (
    <>
      {apps.map((app) => (
        <Link key={app.id} to={`/dashboard/apps/${app.id}`}>
          {app.title}
        </Link>
      ))}
    </>
  );
};
