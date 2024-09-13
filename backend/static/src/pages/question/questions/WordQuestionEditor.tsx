import styles from "./wordquestioneditor.module.css";
import { Question, QuestionType, WordQuestion } from "../../../types";
import SettingsTab from "../../../components/SettingsTab";
import { FaPlus } from "react-icons/fa";

type WordQuestionEditorProps = {
  question: WordQuestion;
  changes: boolean;
  handleChange: (question: WordQuestion) => void;
  handleChangeType: (type: QuestionType) => void;
  handleSave: (question: Question) => void;
  handleDiscard: () => void;
};

export default function WordQuestionEditor({
  question,
  changes,
  handleChange,
  handleChangeType,
  handleSave,
  handleDiscard,
}: WordQuestionEditorProps) {
  function updatePrompt(text: string) {
    handleChange({ ...question, prompt: text });
  }

  function updateAnswer(text: string, atIndex: number) {
    const newAnswers = [...question.answers];
    newAnswers[atIndex] = text;
    handleChange({ ...question, answers: newAnswers });
  }

  function addAnswer() {
    handleChange({ ...question, answers: [...question.answers, ""] });
  }

  return (
    <div className={styles.container}>
      <div className={styles.question}>
        <input
          type="text"
          placeholder="Prompt"
          value={question.prompt}
          onChange={(e) => updatePrompt(e.target.value)}
        />
        <div className={styles.answers}>
          {question.answers.map((answer, index) => (
            <input
              type="text"
              placeholder="Accepted Answer"
              key={index}
              value={answer}
              onChange={(e) => updateAnswer(e.target.value, index)}
            />
          ))}
        </div>
      </div>
      <SettingsTab
        question={question}
        changes={changes}
        handleChangeType={handleChangeType}
        handleSave={handleSave}
        handleDiscard={handleDiscard}
      >
        <div>
          <button onClick={addAnswer}>
            <FaPlus />
            <span>Answer</span>
          </button>
        </div>
      </SettingsTab>
    </div>
  );
}
