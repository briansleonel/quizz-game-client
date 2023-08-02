import { IQuestionCategory } from "./questionCategory";
import { IQuestionOptions } from "./questionOptions";

export interface IQuestion {
    _id: string;
    question: string;
    //options: IQuestionOptions;
    options: Array<string>;
    //correct: string;
    correct: number;
    category: IQuestionCategory;
    user: string;
    verified: boolean;
    description: string;
}
