import styles from "./settingstab.module.css";
import { Question, QuestionType } from "../types";
import TypeSelector from "./TypeSelector";

type SettingsTabProps = {
  children: React.ReactNode;
  question: Question;
  changes: boolean;
  handleChangeType: (type: QuestionType) => void;
  handleDiscard: () => void;
  handleSave: (question: Question) => void;
};

export default function SettingsTab({
  children,
  question,
  changes,
  handleSave,
  handleDiscard,
  handleChangeType,
}: SettingsTabProps) {
  return (
    <div className={styles.settings}>
      <div className={styles.upper}>
        <p className={styles.title}>Settings</p>
        {/* TODO: style component */}
        <TypeSelector
          selected={question.type}
          handleChange={handleChangeType}
        />
        {children}
      </div>
      <div className={styles["change-btns"]}>
        <button
          disabled={!changes}
          onClick={handleDiscard}
          className={styles.discard}
        >
          Discard
        </button>
        <button
          disabled={!changes}
          onClick={handleSave.bind(null, question)}
          className={styles.save}
        >
          Save
        </button>
      </div>
    </div>
  );
}
