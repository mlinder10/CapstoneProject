import { useEffect, useState } from "react";
import styles from "./question.module.css";
import {
  defaultFillBlankQuestion,
  defaultMatchingQuestion,
  defaultMultipleChoiceQuestion,
  defaultWordQuestion,
  FillBlankQuestion,
  MatchingQuestion,
  MultipleChoiceQuestion,
  ProblemSet,
  Question,
  QuestionType,
  WordQuestion,
} from "../../types";
import { FaChevronLeft, FaPlus } from "react-icons/fa";
import axios from "axios";
import { SERVER } from "../../App";
import Toast from "../../components/Toast";
import Loading from "../../components/Loading";
import MultipleChoiceQuestionEditor from "./questions/MultipleChoiceQuestion";
import MatchingQuestionEditor from "./questions/MatchingQuestionEditor";
import WordQuestionEditor from "./questions/WordQuestionEditor";
import FillBlankQuestionEditor from "./questions/FillBlankQuestionEditor";

type QuestionPageProps = {
  handleClose: () => void;
  set: ProblemSet | null;
};

export default function QuestionPage({ handleClose, set }: QuestionPageProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [origQuestion, setOrigQuestion] = useState<Question | null>(null);
  const [changes, setChanges] = useState<boolean>(false);

  async function fetchQuestions() {
    if (set === null) return;

    setLoading(true);
    setError(null);
    setQuestions([]);
    try {
      const res = await axios.get<Question[]>(`${SERVER}/questions/${set.id}`);
      setQuestions(res.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load questions");
    } finally {
      setLoading(false);
    }
  }

  function handleCreate() {
    if (set === null) return;
    const newQuestion = defaultMultipleChoiceQuestion(set.id);
    setQuestion(newQuestion);
    setOrigQuestion(newQuestion);
  }

  function handleSelect(q: Question) {
    if (changes) {
      alert("Question not saved");
      return;
    }
    setQuestion(q);
    setOrigQuestion(q);
  }

  function handleChangeType(type: QuestionType) {
    if (!question || !set) return;
    let newQuestion = null;
    switch (type) {
      case "multiple_choice":
        newQuestion = defaultMultipleChoiceQuestion(set.id);
        break;
      case "matching":
        newQuestion = defaultMatchingQuestion(set.id);
        break;
      case "word":
        newQuestion = defaultWordQuestion(set.id);
        break;
      case "fill_blank":
        newQuestion = defaultFillBlankQuestion(set.id);
        break;
    }
    if (!newQuestion) return;
    setQuestion(newQuestion);
    setChanges(true);
    // setOrigQuestion(newQuestion);
  }

  function handleChangeValues(question: Question) {
    setChanges(true);
    setQuestion(question);
  }

  async function handleSave(question: Question) {
    if (set === null) return;

    // TODO: validate input

    try {
      const res = await axios.post<Question>(
        `${SERVER}/questions/${set.id}/${question.type}`,
        question
      );
      setQuestions([...questions, res.data]);
      setQuestion(res.data);
      setChanges(false);
    } catch (error) {
      console.error(error);
      setError("Failed to save question");
    }
  }

  function handleDiscard() {
    setQuestion(origQuestion);
    setChanges(false);
  }

  useEffect(() => {
    fetchQuestions();
  }, [set?.id]);

  if (set === null) return null;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button onClick={handleClose} className={styles["toolbar-btn"]}>
          <FaChevronLeft />
          <span>{set.name}</span>
        </button>
        <p className={styles.title}>Question Editor</p>
        <button className={styles["toolbar-btn"]} onClick={handleCreate}>
          <FaPlus />
          <span>Create Question</span>
        </button>
      </header>
      <div className={styles.body}>
        <div className={styles.list}>
          {questions.map((q, index) => (
            <div
              className={`${styles["list-item"]} ${
                q.id === question?.id ? styles.selected : ""
              }`}
              key={q.id}
              onClick={handleSelect.bind(null, q)}
            >
              Question {index + 1}
            </div>
          ))}
          <Loading loading={loading} />
        </div>
        <div className={styles["question-container"]}>
          <QuestionEditor
            question={question}
            changes={changes}
            handleChange={handleChangeValues}
            handleChangeType={handleChangeType}
            handleSave={handleSave}
            handleDiscard={handleDiscard}
          />
        </div>
      </div>
      <Toast message={error} type="error" />
    </div>
  );
}

type QuestionEditorProps = {
  question: Question | null;
  changes: boolean;
  handleChange: (question: Question) => void;
  handleChangeType: (type: QuestionType) => void;
  handleSave: (question: Question) => void;
  handleDiscard: () => void;
};

function QuestionEditor({
  question,
  changes,
  handleChange,
  handleChangeType,
  handleSave,
  handleDiscard,
}: QuestionEditorProps) {
  if (!question) {
    return <div>No Selected Question</div>;
  }

  switch (question.type) {
    case "multiple_choice":
      return (
        <MultipleChoiceQuestionEditor
          question={question as MultipleChoiceQuestion}
          changes={changes}
          handleChange={handleChange}
          handleChangeType={handleChangeType}
          handleSave={handleSave}
          handleDiscard={handleDiscard}
        />
      );
    case "matching":
      return (
        <MatchingQuestionEditor
          question={question as MatchingQuestion}
          changes={changes}
          handleChange={handleChange}
          handleChangeType={handleChangeType}
          handleSave={handleSave}
          handleDiscard={handleDiscard}
        />
      );
    case "word":
      return (
        <WordQuestionEditor
          question={question as WordQuestion}
          changes={changes}
          handleChange={handleChange}
          handleChangeType={handleChangeType}
          handleSave={handleSave}
          handleDiscard={handleDiscard}
        />
      );
    case "fill_blank":
      return (
        <FillBlankQuestionEditor
          question={question as FillBlankQuestion}
          changes={changes}
          handleChange={handleChange}
          handleChangeType={handleChangeType}
          handleSave={handleSave}
          handleDiscard={handleDiscard}
        />
      );
    default:
      return <p>Question type {question.type} not supported</p>;
  }
}
