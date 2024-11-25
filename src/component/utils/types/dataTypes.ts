// Questions Interfaces
interface FilteredQuestionType {
  id: number;
  title: string;
  slug: string;
}

export interface QuestionType {
  id: number;
  icon: string;
  title: string;
  filtered_questions: FilteredQuestionType[];
}

// QuestionDetail Interfaces
export interface QuestionDetailType {
  id: number;
  title: string;
  slug: string;
  description: any;
}

// Project Interfaces
interface Picture {
  large: string;
  medium: string;
  original: string;
  small: string;
  thumbnail: string;
}

export interface Project {
  id: number;
  name: string;
  picture: Picture;
  slug: string;
}
