import styles from "./multiplechoicequestions.module.css";
import { useState } from "react";
import Base64ImageUploader from "../../../components/Base64ImageUploader";
import { MultipleChoiceQuestion, Question, QuestionType } from "../../../types";
import { FaImage, FaMinus, FaPlus } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import SettingsTab from "../../../components/SettingsTab";

type MultipleChoiceQuestionEditorProps = {
  question: MultipleChoiceQuestion;
  changes: boolean;
  handleChange: (question: MultipleChoiceQuestion) => void;
  handleChangeType: (type: QuestionType) => void;
  handleSave: (question: Question) => void;
  handleDiscard: () => void;
};

export default function MultipleChoiceQuestionEditor({
  question,
  changes,
  handleChange,
  handleChangeType,
  handleSave,
  handleDiscard,
}: MultipleChoiceQuestionEditorProps) {
  const [questionType, setQuestionType] = useState<"image" | "text">("image");

  function updateImage(data: string | null) {
    handleChange({ ...question, image: data ?? undefined });
  }

  function updateText(text: string) {
    handleChange({ ...question, text });
  }

  function updateAnswer(text: string) {
    handleChange({ ...question, answer: text });
  }

  function updateChoice(text: string, atIndex: number) {
    const newChoices = [...question.choices];
    newChoices[atIndex] = text;
    handleChange({ ...question, choices: newChoices });
  }

  function addChoice() {
    handleChange({ ...question, choices: [...question.choices, ""] });
  }

  function removeChoice() {
    const newChoices = [...question.choices];
    newChoices.pop();
    handleChange({ ...question, choices: newChoices });
  }

  return (
    <div className={styles.container}>
      <div className={styles.question}>
        <div>
          {questionType === "image" && (
            <Base64ImageUploader
              data={question.image ?? null}
              setData={updateImage}
            />
          )}
          {questionType === "text" && (
            <input
              placeholder="Question Prompt"
              type="text"
              value={question.text}
              onChange={(e) => updateText(e.target.value)}
            />
          )}
        </div>
        <div className={styles.choices}>
          <input
            type="text"
            placeholder="Answer"
            value={question.answer}
            onChange={(e) => updateAnswer(e.target.value)}
          />
          {question.choices.map((choice, index) => (
            <div>
              <input
                type="text"
                value={choice}
                key={index}
                placeholder={`Choice ${index + 1}`}
                onChange={(e) => updateChoice(e.target.value, index)}
              />
            </div>
          ))}
        </div>
      </div>
      <SettingsTab
        question={question}
        changes={changes}
        handleSave={handleSave}
        handleDiscard={handleDiscard}
        handleChangeType={handleChangeType}
      >
        <div className={styles["type-btns"]}>
          <button onClick={setQuestionType.bind(null, "image")}>
            <FaImage />
            <span>Image</span>
          </button>
          <button onClick={setQuestionType.bind(null, "text")}>
            <FaPencil />
            <span>Text</span>
          </button>
        </div>
        <div className={styles["choice-btns"]}>
          <button onClick={addChoice} disabled={question.choices.length === 3}>
            <FaPlus />
            <span>Choice</span>
          </button>
          <button
            onClick={removeChoice}
            disabled={question.choices.length === 0}
          >
            <FaMinus />
            <span>Choice</span>
          </button>
        </div>
      </SettingsTab>
    </div>
  );
}
