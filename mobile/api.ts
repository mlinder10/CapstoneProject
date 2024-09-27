import axios from "axios";

async function fetchClassrooms() {
  try {
    const res = await axios.get("http://127.0.0.1:5000/classrooms");
    console.log(res.data);
  } catch (error: any) {
    console.error(error);
  }
}

async function fetchSets(classroomId: string) {
  try {
    const res = await axios.get(`http://127.0.0.1:5000/sets/${classroomId}`);
    console.log(res.data);
  } catch (error: any) {
    console.error(error);
  }
}

async function fetchQuestions(setId: string) {
  try {
    const res = await axios.get(`http://127.0.0.1:5000/questions/${setId}`);
    console.log(res.data);
  } catch (error: any) {
    console.error(error);
  }
}
