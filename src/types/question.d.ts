import { IQuestionOptions } from "./questionOptions";

export interface IQuestion {
    _id: string;
    question: string;
    options: IQuestionOptions;
    correct: string;
    category: string;
    user: string;
    verified: boolean;
    description: string;
}
