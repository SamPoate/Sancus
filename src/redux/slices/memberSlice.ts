/* eslint-disable no-restricted-globals */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, AppDispatch } from '../store';
import { IMember } from '../../types';

const initialState: IMember[] = [
    {
        id: '123-123-123',
        name: 'Fred Johnson',
        description: 'Absolute Legend'
    },
    {
        id: '123-321-321',
        name: 'Luke Evans',
        description: 'Medium Legend'
    }
];

const userSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {
        addMember(state, { payload }: PayloadAction<IMember>) {
            state.push(payload);
        }
    }
});

export const addMember = (
    name: string,
    description: string
): AppThunk => async (dispatch: AppDispatch) => {
    const newMember: IMember = {
        id: Math.random().toString(36).substr(2, 9), // https://gist.github.com/gordonbrander/2230317,
        name,
        description
    };

    dispatch(userSlice.actions.addMember(newMember));
};

export default userSlice.reducer;
