import { IQuestion } from "@/types/question";
import { IQuestionCategory } from "@/types/questionCategory";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IConfigState {
    category: IQuestionCategory;
    limit: number;
}

interface State extends IConfigState {
    questions: Array<IQuestion>;
    currentQuestion?: IQuestion;
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
        gameSetConfig: (state, action: PayloadAction<IConfigState>) => {
            state.category = action.payload.category;
            state.limit = action.payload.limit;
        },
    },
});

export const { gameSetConfig } = gameSlice.actions;

export default gameSlice.reducer;
