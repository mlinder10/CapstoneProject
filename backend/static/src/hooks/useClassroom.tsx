import { useEffect, useState } from "react";

export default function useClassroom() {
  const [classId, setClassId] = useState<string | null>(null);

  useEffect(() => {
    const existingId = localStorage.getItem("classId");
    if (existingId) {
      setClassId(existingId);
    }
  }, []);

  function setClassroomId(id: string) {
    setClassId(id);
    localStorage.setItem("classId", id);
  }

  function resetClassroomId() {
    setClassId(null);
    localStorage.removeItem("classId");
  }

  return { classroomId: classId, setClassroomId, resetClassroomId };
}
