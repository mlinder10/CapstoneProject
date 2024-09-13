import styles from "./classroom.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { SERVER } from "../../App";
import Loading from "../../components/Loading";
import Toast from "../../components/Toast";
import CreateSetModal from "../classroom/CreateSetModal";
import { ProblemSet } from "../../types";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import QuestionPage from "../question/Question";

type ClassRoomPageProps = {
  classroomId: string | null;
  clearClassroomId: () => void;
};

export default function ClassRoomPage({
  classroomId,
  clearClassroomId,
}: ClassRoomPageProps) {
  const [sets, setSets] = useState<ProblemSet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSet, setSelectedSet] = useState<ProblemSet | null>(null);
  const [showCreateSetModal, setShowCreateSetModal] = useState(false);

  async function getSets() {
    if (!classroomId) return;

    setLoading(true);
    setError(null);
    try {
      const res = await axios.get<ProblemSet[]>(
        `${SERVER}/sets/${classroomId}`
      );
      setSets(res.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load sets");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSets();
  }, [classroomId]);

  if (!classroomId) return null;

  return (
    <>
      <div className={styles.page}>
        <div className={styles.header}>
          <button onClick={clearClassroomId} className={styles["toolbar-btn"]}>
            <FaChevronLeft />
            <span>Back</span>
          </button>
          <p className={styles.title}>Problem Sets</p>
          <button
            onClick={() => setShowCreateSetModal(true)}
            className={styles["toolbar-btn"]}
          >
            <FaPlus />
            <span>Create Set</span>
          </button>
        </div>
        <ul className={styles.list}>
          <Loading loading={loading} />
          {sets.map((set) => (
            <li
              key={set.id}
              onClick={() => setSelectedSet(set)}
              className={styles["list-item"]}
            >
              <span className={styles["item-name"]}>{set.name}</span>
              <FaChevronRight className={styles["item-arrow"]} />
            </li>
          ))}
        </ul>
      </div>
      <CreateSetModal
        show={showCreateSetModal}
        handleClose={() => setShowCreateSetModal(false)}
        updateSets={(set) => setSets([...sets, set])}
        classroomId={classroomId}
      />
      <Toast message={error} type="error" />
      <QuestionPage
        handleClose={() => setSelectedSet(null)}
        set={selectedSet}
      />
    </>
  );
}
