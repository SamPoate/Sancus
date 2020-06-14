/* eslint-disable no-restricted-globals */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, AppDispatch } from '../store';
import { IAdmin, IUser } from '../../types';

const initialState: IAdmin = {
    users: []
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        updateUserList(state, { payload }: PayloadAction<Array<IUser>>) {
            state.users = [...state.users, ...payload].filter(
                (elem, index, self) => index === self.indexOf(elem)
            );
        }
    }
});

export const updateUserList = (users: Array<IUser>): AppThunk => async (
    dispatch: AppDispatch
) => dispatch(adminSlice.actions.updateUserList(users));

export default adminSlice.reducer;
