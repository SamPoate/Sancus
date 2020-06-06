/* eslint-disable no-restricted-globals */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, AppDispatch } from '../store';
import { IUser } from '../../types';

const initialState: IUser[] = [
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
    name: 'users',
    initialState,
    reducers: {
        //CRUD
        addUser(state, { payload }: PayloadAction<IUser>) {
            state.push(payload);
        }
    }
});

export const addUser = (name: string, description: string): AppThunk => async (
    dispatch: AppDispatch
) => {
    const newUser: IUser = {
        id: Math.random().toString(36).substr(2, 9), // https://gist.github.com/gordonbrander/2230317,
        name,
        description
    };

    dispatch(userSlice.actions.addUser(newUser));
};

export default userSlice.reducer;
