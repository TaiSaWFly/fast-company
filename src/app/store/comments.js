import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import { nanoid } from "nanoid";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFalied: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentsCreateSuccess: (state, action) => {
            state.entities = [...state.entities, action.payload];
        },
        commentsCreateFalied: (state, action) => {
            state.error = action.payload;
        },
        commentsRemove: (state, action) => {
            if (action.payload.content === null) {
                state.entities = state.entities.filter(
                    (c) => c._id !== action.payload._id
                );
            }
        },
        commentsRemoveFalied: (state, action) => {
            state.error = action.payload;
        }
    }
});

const { actions, reducer: commentsReducer } = commentsSlice;
const {
    commentsRequested,
    commentsReceved,
    commentsRequestFalied,
    commentsCreateSuccess,
    commentsCreateFalied,
    commentsRemove,
    commentsRemoveFalied
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceved(content));
    } catch (error) {
        dispatch(commentsRequestFalied(error.message));
    }
};

export const createComment =
    ({ data, userId, currentUserId }) =>
    async (dispatch) => {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId
        };

        try {
            const { content } = await commentService.createComment(comment);
            dispatch(commentsCreateSuccess(content));
        } catch (error) {
            dispatch(commentsCreateFalied(error.message));
        }
    };

export const removeComment = (id) => async (dispatch) => {
    try {
        const { content } = await commentService.removeComment(id);
        dispatch(commentsRemove({ content, _id: id }));
    } catch (error) {
        dispatch(commentsRemoveFalied(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
