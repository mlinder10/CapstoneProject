import styles from "./createsetmodal.module.css";
import { useState } from "react";
import axios from "axios";
import { SERVER } from "../../App";
import Toast from "../../components/Toast";
import { ProblemSet } from "../../types";

type CreateSetModalProps = {
  show: boolean;
  handleClose: () => void;
  updateSets: (set: ProblemSet) => void;
  classroomId: string;
};

export default function CreateSetModal({
  show,
  handleClose,
  updateSets,
  classroomId,
}: CreateSetModalProps) {
  const [success, setSuccess] = useState<"Success" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");

  async function handleSubmit() {
    try {
      const res = await axios.post<ProblemSet>(
        `${SERVER}/sets/${classroomId}`,
        { name }
      );
      updateSets(res.data);
      setSuccess("Success");
    } catch (error) {
      console.error(error);
      setError("Failed to create set");
    }
  }

  function close() {
    setSuccess(null);
    setError(null);
    setName("");
    handleClose();
  }

  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <p>Create Set</p>
          <button onClick={close}>X</button>
        </div>
        <div className={styles.body}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Set Name"
          />
          <button onClick={handleSubmit}>Create</button>
        </div>
      </div>
      <Toast message={success} type="success" />
      <Toast message={error} type="error" />
    </div>
  );
}
