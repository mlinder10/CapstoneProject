import { v4 } from "uuid";

export type Classroom = {
  id: string;
  name: string;
  code: string;
};

export type ProblemSet = {
  id: string;
  name: string;
  classroomId: string;
};

export type QuestionType =
  | "multiple_choice"
  | "matching"
  | "word"
  | "fill_blank";

export function questionTypeFormatted(type: QuestionType) {
  switch (type) {
    case "multiple_choice":
      return "Multiple Choice";
    case "matching":
      return "Matching";
    case "word":
      return "Word";
    case "fill_blank":
      return "Fill Blank";
  }
}

export type Question =
  | MultipleChoiceQuestion
  | MatchingQuestion
  | WordQuestion
  | FillBlankQuestion;

export type MultipleChoiceQuestion = {
  id: string;
  problemSetId: string;
  type: QuestionType;
  image?: string;
  text?: string;
  answer: string;
  choices: string[];
};

export const defaultMultipleChoiceQuestion = (
  setId: string
): MultipleChoiceQuestion => {
  return {
    id: v4(),
    problemSetId: setId,
    type: "multiple_choice",
    image: undefined,
    text: undefined,
    answer: "",
    choices: [],
  };
};

export type MatchingQuestion = {
  id: string;
  problemSetId: string;
  type: QuestionType;
  relations: [string, string][];
};

export const defaultMatchingQuestion = (setId: string): MatchingQuestion => {
  return {
    id: v4(),
    problemSetId: setId,
    type: "matching",
    relations: [["", ""]],
  };
};

export type WordQuestion = {
  id: string;
  problemSetId: string;
  type: QuestionType;
  prompt: string;
  answers: string[];
};

export const defaultWordQuestion = (setId: string): WordQuestion => {
  return {
    id: v4(),
    problemSetId: setId,
    type: "word",
    prompt: "",
    answers: [""],
  };
};

export type FillBlankQuestion = {
  id: string;
  problemSetId: string;
  type: QuestionType;
  prompt: string;
  blankIndices: number[];
  choices: string[];
};

export const defaultFillBlankQuestion = (setId: string): FillBlankQuestion => {
  return {
    id: v4(),
    problemSetId: setId,
    type: "fill_blank",
    prompt: "",
    blankIndices: [],
    choices: [],
  };
};
