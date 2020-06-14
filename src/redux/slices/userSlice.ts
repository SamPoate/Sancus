/* eslint-disable no-restricted-globals */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, AppDispatch } from '../store';
import { IUser } from '../../types';

const initialState: IUser = {
    id: 'user_123-333',
    role: 'member',
    name: 'Abraham',
    joinDate: '06-11-1860',
    memberId: '123-123-123',
    partnerId: '222-222-333'
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser(state, { payload }: PayloadAction<IUser>) {
            state = payload;
        },
        updateRole(state, { payload }: PayloadAction<string>) {
            state.role = payload;
        },
        updateUserMemberId(state, { payload }: PayloadAction<string>) {
            state.memberId = payload;
        }
    }
});

export const updateRole = (role: string): AppThunk => async (
    dispatch: AppDispatch
) => dispatch(userSlice.actions.updateRole(role));

export const updateUserMemberId = (memberId: string): AppThunk => async (
    dispatch: AppDispatch
) => dispatch(userSlice.actions.updateUserMemberId(memberId));

export default userSlice.reducer;
