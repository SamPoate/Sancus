/* eslint-disable no-restricted-globals */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, AppDispatch } from '../store';
import { IUser } from '../../types';

const initialState: IUser = {
    id: '123-123-123',
    role: 'member',
    name: 'Fred Johnson'
};

const userSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {
        updateUser(state, { payload }: PayloadAction<IUser>) {
            state = payload;
        },
        updateRole(state, { payload }: PayloadAction<string>) {
            state.role = payload;
        }
    }
});

export const updateRole = (role: string): AppThunk => async (
    dispatch: AppDispatch
) => {
    dispatch(userSlice.actions.updateRole(role));
};

export default userSlice.reducer;
