import styles from "./style.module.scss";

import { useDeleteLogMutation } from "../../services/api";

const Log = ({
  log,
  refetchLogs,
  empty,
  appToken,
  generateAppToken,
  deleteLog,
}) => {
  if (empty) {
    return (
      <div
        className={`${styles.log} ${styles.empty}`}
        key={`log-for-${appToken}`}
      >
        <span className={"h3"}>Empty</span>
        <div>
          You haven't stored any logs here yet.
          {appToken ? (
            <>
              <p>
                Copy your app token to send logs <br />
                <br />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(appToken);
                  }}
                >
                  Copy
                </button>
              </p>
              <span>{appToken}</span>
            </>
          ) : (
            <p>
              <br />
              Generate an app token to begin sending logs
              <br />
              <button className="btn btn-primary" onClick={generateAppToken}>
                Generate
              </button>
            </p>
          )}
        </div>
        <br />
        <br />
        <pre>
          curl
          <br />
          -X POST
          <br />
          https://laas-api-nest.onrender.com/logs
          <br />
          -H "APP_ID: {appToken}"
          <br />
          --json
          <br />
          {'{"level": "info", "text": "Hello World"}'}
        </pre>
      </div>
    );
  }

  // const [deleteLog, deleteResult] = useDeleteLogMutation();

  const deleteLogHandler = async (id) => {
    await deleteLog(id);
    // alert("Log deleted");
    refetchLogs();
  };

  return (
    <>
      <div className={`${styles.log} ${styles[log.level]}`}>
        <span
          className={styles.close}
          onClick={() => {
            deleteLogHandler(log.id);
          }}
        >
          &times;
        </span>
        <p className={"h3"}>{log.level}</p>
        <span>{log.ip}</span>
        <p>{log.text}</p>
        <p>{log.createdAt}</p>
      </div>
    </>
  );
};

export default Log;
