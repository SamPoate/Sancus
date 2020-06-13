/* eslint-disable no-restricted-globals */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, AppDispatch } from '../store';
import { IMember } from '../../types';

interface IAddPoints {
    memberId: string;
    points: number;
}

const initialState: IMember[] = [
    {
        id: '123-123-123',
        name: 'Fred Johnson',
        description: 'Absolute Legend',
        points: 0
    },
    {
        id: '123-321-321',
        name: 'Luke Evans',
        description: 'Medium Legend',
        points: 0
    }
];

const userSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {
        addMember(state, { payload }: PayloadAction<IMember>) {
            state.push(payload);
        },
        addMemberPoints(state, { payload }: PayloadAction<IAddPoints>) {
            state[
                state.findIndex(member => member.id === payload.memberId)
            ].points += payload.points;
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
        description,
        points: 0
    };

    dispatch(userSlice.actions.addMember(newMember));
};

export const addMemberPoints = (
    memberId: string,
    points: number
): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.addMemberPoints({ memberId, points }));
};

export default userSlice.reducer;
