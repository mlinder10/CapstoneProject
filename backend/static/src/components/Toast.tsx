import { useEffect, useState } from "react";
import styles from "./toast.module.css";

type ToastType = "success" | "error" | "warning" | "info";

type ToastProps = {
  message: string | null;
  type: ToastType;
};

export default function Toast({ message, type }: ToastProps) {
  const [show, setShow] = useState<boolean>(!!message);

  useEffect(() => {
    setShow(!!message);
  }, [message]);

  return (
    <div
      className={`
        ${styles.container}
        ${styles[type]}
        ${show ? styles.show : ""}
        `}
    >
      <p>{message}</p>
      <button onClick={() => setShow(false)}>X</button>
    </div>
  );
}
