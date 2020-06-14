/* eslint-disable no-restricted-globals */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

import { AppThunk, AppDispatch } from '../store';
import { IMember } from '../../types';

interface IAddPoints {
    memberId: string;
    points: number;
    partnerId: string;
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
            const partnerIndex = state.findIndex(
                member => member.id === payload.memberId
            );

            state[partnerIndex].points += payload.points;
            state[partnerIndex].lastTransaction = {
                partnerId: payload.partnerId,
                points: payload.points,
                date: moment().format()
            };
        }
    }
});

export const addMember = (
    id: string,
    name: string,
    description: string
): AppThunk => async (dispatch: AppDispatch) => {
    const newMember: IMember = {
        id,
        name,
        description,
        points: 0
    };

    dispatch(userSlice.actions.addMember(newMember));
};

export const addMemberPoints = (
    memberId: string,
    points: number,
    partnerId: string
): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(
        userSlice.actions.addMemberPoints({ memberId, points, partnerId })
    );
};

export default userSlice.reducer;
