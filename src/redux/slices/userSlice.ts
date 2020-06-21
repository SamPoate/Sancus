import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, AppDispatch } from '../store';
import { IUser } from '../../types';
import { userList } from '../../fake-database';

const initialState: IUser = userList[0];
// userList[Math.floor(Math.random() * userList.length)];

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser(state: IUser, { payload }: PayloadAction<IUser>) {
            state = payload;
        },
        updateRole(state: IUser, { payload }: PayloadAction<string>) {
            state.role = payload;
        },
        updateUserMemberId(state: IUser, { payload }: PayloadAction<string>) {
            state.memberId = payload;
        },
        updateUserPartnerId(state: IUser, { payload }: PayloadAction<string>) {
            state.partnerId = payload;
        }
    }
});

export const updateRole = (role: string): AppThunk => async (
    dispatch: AppDispatch
) => dispatch(userSlice.actions.updateRole(role));

export const updateUserMemberId = (memberId: string): AppThunk => async (
    dispatch: AppDispatch
) => dispatch(userSlice.actions.updateUserMemberId(memberId));

export const updateUserPartnerId = (partnerId: string): AppThunk => async (
    dispatch: AppDispatch
) => dispatch(userSlice.actions.updateUserPartnerId(partnerId));

export default userSlice.reducer;
