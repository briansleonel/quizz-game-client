import { IQuestion } from "@/types/question";
import { IQuestionCategory } from "@/types/questionCategory";

export function convertToObject({
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
}): IQuestion {
    return {
        _id: id,
        category: category,
        question: question,
        description: description,
        options: orderOptions(options, correctOption),
        correct: 0,
        user,
    };
}

export function orderOptions(options: Array<string>, correct: string) {
    const ordered = [correct];
    const othersOptions = options.filter((opt) => opt !== correct);
    ordered.push(...othersOptions);
    return ordered;
}
