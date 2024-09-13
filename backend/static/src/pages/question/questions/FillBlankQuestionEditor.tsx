import styles from "./fillblankquestioneditor.module.css";
import { FillBlankQuestion, QuestionType, Question } from "../../../types";
import SettingsTab from "../../../components/SettingsTab";
import { FaPlus } from "react-icons/fa";

type FillBlankQuestionEditorProps = {
  question: FillBlankQuestion;
  changes: boolean;
  handleChange: (question: FillBlankQuestion) => void;
  handleChangeType: (type: QuestionType) => void;
  handleSave: (question: Question) => void;
  handleDiscard: () => void;
};

export default function FillBlankQuestionEditor({
  question,
  changes,
  handleChange,
  handleChangeType,
  handleSave,
  handleDiscard,
}: FillBlankQuestionEditorProps) {
  function updatePrompt(text: string) {
    handleChange({ ...question, prompt: text });
  }

  function addBlank() {
    handleChange({ ...question, choices: [...question.choices, ""] });
  }

  return (
    <div className={styles.container}>
      <div className={styles.question}>
        <div>
          <input type="text" />
          {question.choices.map((choice, index) => (
            <>
              <input
                key={index}
                type="text"
                value={choice}
                onChange={(e) => {}}
              />
              <input
                key={index + 100}
                type="text"
                value={question.prompt}
                onChange={(e) => {}}
              />
            </>
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
          <button onClick={addBlank}>
            <FaPlus />
            <span>Add Blank</span>
          </button>
        </div>
      </SettingsTab>
    </div>
  );
}
