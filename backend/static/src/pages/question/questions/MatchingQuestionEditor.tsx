import { FaMinus, FaPlus } from "react-icons/fa";
import SettingsTab from "../../../components/SettingsTab";
import { QuestionType, Question, MatchingQuestion } from "../../../types";
import styles from "./matchingquestioneditor.module.css";
import Base64ImageUploader from "../../../components/Base64ImageUploader";

type MatchingQuestionEditorProps = {
  question: MatchingQuestion;
  changes: boolean;
  handleChange: (question: MatchingQuestion) => void;
  handleChangeType: (type: QuestionType) => void;
  handleSave: (question: Question) => void;
  handleDiscard: () => void;
};

export default function MatchingQuestionEditor({
  question,
  changes,
  handleChange,
  handleChangeType,
  handleSave,
  handleDiscard,
}: MatchingQuestionEditorProps) {
  function addRelation() {
    handleChange({ ...question, relations: [...question.relations, ["", ""]] });
  }

  function updateImage(data: string | null, atIndex: number) {
    const newRelations = [...question.relations];
    newRelations[atIndex][0] = data ?? "";
    handleChange({ ...question, relations: newRelations });
  }

  function updateText(text: string, atIndex: number) {
    const newRelations = [...question.relations];
    newRelations[atIndex][1] = text;
    handleChange({ ...question, relations: newRelations });
  }

  return (
    <div className={styles.container}>
      <div className={styles.question}>
        {question.relations.map((relation, index) => (
          <div key={index} className={styles["relation-container"]}>
            <Base64ImageUploader
              data={relation[0]}
              setData={(data) => updateImage(data, index)}
              width={128}
              height={128}
            />
            <input
              type="text"
              value={relation[1]}
              onChange={(e) => updateText(e.target.value, index)}
            />
          </div>
        ))}
      </div>
      <SettingsTab
        question={question}
        changes={changes}
        handleSave={handleSave}
        handleDiscard={handleDiscard}
        handleChangeType={handleChangeType}
      >
        <div>
          <button onClick={addRelation}>
            <FaPlus />
            <span>Match</span>
          </button>
          <button>
            <FaMinus />
            <span>Match</span>
          </button>
        </div>
      </SettingsTab>
    </div>
  );
}
