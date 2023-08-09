import { IQuestion, IQuestionId } from "@/types/question";
import { IQuestionCategory } from "@/types/questionCategory";
import { getUserAuthStorage } from "./localStorageLogin";

export function convertToQuestion({
    category,
    correctOption,
    options,
    question,
    description,
}: {
    category: IQuestionCategory;
    question: string;
    options: Array<string>;
    correctOption: string;
    description: string;
}) {
    const newQuestion: IQuestion = {
        category: category,
        question: question,
        description: description,
        options: orderOptions(options, correctOption),
        correct: 0,
        user: getUserAuthStorage()?._id!,
    };

    return newQuestion;
}

export function convertToQuestionwithId({
    id,
    category,
    correctOption,
    options,
    question,
    description,
    user,
}: {
    id: string;
    category: IQuestionCategory;
    question: string;
    options: Array<string>;
    correctOption: string;
    description: string;
    user: string;
}) {
    const newQuestion: IQuestionId = {
        _id: id,
        category: category,
        question: question,
        description: description,
        options: orderOptions(options, correctOption),
        correct: 0,
        user: user,
    };

    return newQuestion;
}

export function orderOptions(options: Array<string>, correct: string) {
    const ordered = [correct];
    const othersOptions = options.filter((opt) => opt !== correct);
    ordered.push(...othersOptions);
    return ordered;
}
