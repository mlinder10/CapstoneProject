import axios from "axios";
import { SERVER } from "../../App";
import { Classroom } from "../../types";
import styles from "./createclassroommodal.module.css";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Toast from "../../components/Toast";

type CreateClassroomModalProps = {
  show: boolean;
  handleClose: () => void;
  handleAddClassroom: (classroom: Classroom) => void;
};

export default function CreateClassroomModal({
  show,
  handleClose,
  handleAddClassroom,
}: CreateClassroomModalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post<Classroom>(`${SERVER}/classrooms`, {
        name,
      });
      handleAddClassroom(res.data);
      setName("");
    } catch (error) {
      console.error(error);
      setError("Failed to create classroom");
    } finally {
      setLoading(false);
    }
  }

  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <p className={styles.title}>Create Classroom</p>
          <button className={styles["toolbar-btn"]} onClick={handleClose}>
            <FaTimes />
          </button>
        </div>
        <input
          placeholder="Classroom Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <button
          className={styles.btn}
          onClick={handleSubmit}
          disabled={loading}
        >
          Create
        </button>
      </div>
      <Toast message={error} type="error" />
    </div>
  );
}
