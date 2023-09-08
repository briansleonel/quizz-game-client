import { IQuestionId } from "@/types/question";
import { IQuestionCategory } from "@/types/questionCategory";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IConfigState {
    category: IQuestionCategory;
    limit: number;
}

interface State extends IConfigState {
    questions: Array<IQuestionId>;
    currentQuestion?: IQuestionId;
    index: number;
    hasNext: boolean;
}

const initialState: State = {
    category: { _id: "", name: "" },
    limit: 0,
    questions: [],
    currentQuestion: undefined,
    index: -1,
    hasNext: false,
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        gameSetConfig: function (state, action: PayloadAction<IConfigState>) {
            state.category = action.payload.category;
            state.limit = action.payload.limit;
        },
        gameStart: function (
            state,
            action: PayloadAction<{ questions: Array<IQuestionId> }>
        ) {
            state.questions = action.payload.questions;
            state.index = 0;
            state.currentQuestion = state.questions[state.index];
            state.hasNext = state.questions.length - 1 > state.index;
        },
        gameNextQuestion: function (state) {
            state.index += 1;
            state.currentQuestion = state.questions[state.index];
            state.hasNext = state.questions.length - 1 > state.index;
        },
        gameResetQuiz: function (state) {
            state.category = { _id: "", name: "" };
            state.limit = 0;
            state.questions = [];
            state.currentQuestion = undefined;
            state.index = -1;
            state.hasNext = false;
        },
    },
});

export const { gameSetConfig, gameStart, gameNextQuestion, gameResetQuiz } =
    gameSlice.actions;

export default gameSlice.reducer;
