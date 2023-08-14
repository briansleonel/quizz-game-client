import { Verified } from "@/libs/enums/filter.enum";
import { loadStateAuthLocalStorage } from "@/libs/state.localStorage";
import { StateFilter } from "@/types/filters";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State extends StateFilter {
    category: string;
    user: string;
    recents: boolean;
}

const initialState: State = {
    category: "all",
    recents: true,
    searchText: "",
    user: loadStateAuthLocalStorage()?._id || "all",
    verified: Verified.ALL,
};

const questionFilterSlice = createSlice({
    initialState,
    name: "questionFilters",
    reducers: {
        changeQuestionSearchText: function (
            state,
            action: PayloadAction<{ searchText: string }>
        ) {
            state.searchText = action.payload.searchText;
        },
        changeQuestionFilterVerified: function (
            state,
            action: PayloadAction<{ verified: string }>
        ) {
            state.verified = action.payload.verified;
        },
        changeQuestionFilterRecent: function (
            state,
            action: PayloadAction<{ recents: boolean }>
        ) {
            state.recents = action.payload.recents;
        },
        changeQuestionFilterUser: function (
            state,
            action: PayloadAction<{ user: string }>
        ) {
            state.user = action.payload.user;
        },
        changeQuestionFilterCategory: function (
            state,
            action: PayloadAction<{ category: string }>
        ) {
            state.category = action.payload.category;
        },
    },
});

export const {
    changeQuestionFilterCategory,
    changeQuestionFilterRecent,
    changeQuestionFilterUser,
    changeQuestionFilterVerified,
    changeQuestionSearchText,
} = questionFilterSlice.actions;

export default questionFilterSlice.reducer;
