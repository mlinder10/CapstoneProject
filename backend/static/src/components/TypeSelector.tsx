import { QuestionType } from "../types";

type TypeSelectorProps = {
  selected: string;
  handleChange: (type: QuestionType) => void;
};

export default function TypeSelector({
  selected,
  handleChange,
}: TypeSelectorProps) {
  return (
    <select
      value={selected}
      onChange={(e) => handleChange(e.target.value as QuestionType)}
    >
      <option value="multiple_choice">Multiple Choice</option>
      <option value="matching">Matching</option>
      <option value="word">Word</option>
      <option value="fill_blank">Fill in the Blank</option>
    </select>
  );
}
