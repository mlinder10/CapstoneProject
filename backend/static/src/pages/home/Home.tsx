import styles from "./home.module.css";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Classroom } from "../../types";
import Toast from "../../components/Toast";
import axios from "axios";
import { SERVER } from "../../App";
import Loading from "../../components/Loading";
import useClassroom from "../../hooks/useClassroom";
import ClassRoomPage from "../classroom/Classroom";
import CreateClassroomModal from "./CreateClassroomModal";

export default function HomePage() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const { classroomId, setClassroomId, resetClassroomId } = useClassroom();

  async function fetchClassrooms() {
    setLoading(true);
    try {
      const res = await axios.get<Classroom[]>(`${SERVER}/classrooms`);
      setClassrooms(res.data);
    } catch (error: any) {
      console.error(error);
      setError("Failed to load classrooms");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchClassrooms();
  }, []);

  return (
    <>
      <section className={styles.page}>
        <header className={styles.header}>
          <p className={styles.title}>Classrooms</p>
          <button
            className={styles["toolbar-btn"]}
            onClick={setShowCreate.bind(null, true)}
          >
            <FaPlus />
            <span>Create Classroom</span>
          </button>
        </header>
        <div className={styles.body}>
          {classrooms.map((c) => (
            <ClassroomCell
              key={c.id}
              classroom={c}
              onClick={setClassroomId.bind(null, c.id)}
            />
          ))}
        </div>
        <Loading loading={loading} />
        <Toast message={error} type="error" />
      </section>
      <ClassRoomPage
        classroomId={classroomId}
        clearClassroomId={resetClassroomId}
      />
      <CreateClassroomModal
        show={showCreate}
        handleClose={setShowCreate.bind(null, false)}
        handleAddClassroom={(classroom) =>
          setClassrooms([...classrooms, classroom])
        }
      />
    </>
  );
}

type ClassroomCellProps = {
  classroom: Classroom;
  onClick?: () => void;
};

function ClassroomCell({ classroom, onClick }: ClassroomCellProps) {
  return (
    <div onClick={onClick} className={styles.cell}>
      <span className={styles["cell-name"]}>{classroom.name}</span>
      <span className={styles["cell-code"]}>{classroom.code}</span>
    </div>
  );
}
