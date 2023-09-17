import { useState } from "react";

import style from './style.module.scss';

const ContextItem = ({ item, name }) => {
  const [open, setOpen] = useState(false);

  return (
    <p onClick={() => setOpen(!open)} className={`${style.context} ${open ? style.open : style.closed}`}>
      <b>{name}</b>:
      {item.toString().length <= 100
        ? item
        : !open
        ? item.toString().substring(0, 100) + "..."
        : item}
    </p>
  );
};

const LogContext = ({ context }) => {
  if (!context) {
    return <p>No context data</p>;
  }

  return (
    <>
      {Object.keys(context).map((key) => (
        <ContextItem item={context[key]} key={key} name={key} />
      ))}
    </>
  );
};

export default LogContext;
