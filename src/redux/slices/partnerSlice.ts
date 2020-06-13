/* eslint-disable no-restricted-globals */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, AppDispatch } from '../store';
import { IPartner } from '../../types';

interface IAddItem {
    id: string;
    partnerId: string;
}

interface IAddPoints {
    partnerId: string;
    points: number;
}

const initialState: IPartner[] = [
    {
        id: '111-222-333',
        name: 'Apple Moments',
        partnerLevel: 'platinum',
        logo: 'img/am-logo.png',
        itemsInStock: ['312cddcc22s'],
        totalPointsAllocated: 5
    },
    {
        id: '222-222-333',
        name: 'Letter Office',
        partnerLevel: 'gold',
        logo: 'img/po-logo.png',
        itemsInStock: ['123aba11', '12efaba11', '123aba1111'],
        totalPointsAllocated: 10
    }
];

const partnerSlice = createSlice({
    name: 'partners',
    initialState,
    reducers: {
        addPartner(state, { payload }: PayloadAction<IPartner>) {
            state.push(payload);
        },
        updatePartner(state, { payload }: PayloadAction<IPartner>) {
            state = state.reduce((stateArray, partner) => {
                if (partner.id === payload.id) {
                    if (payload.name) {
                        partner.name = payload.name;
                    }

                    if (payload.totalPointsAllocated) {
                        partner.totalPointsAllocated =
                            payload.totalPointsAllocated;
                    }
                }

                return stateArray;
            }, []);
        },
        addPartnerItem(state, { payload }: PayloadAction<IAddItem>) {
            state[
                state.findIndex(partner => partner.id === payload.partnerId)
            ].itemsInStock.push(payload.id);
        },
        addPartnerPoints(state, { payload }: PayloadAction<IAddPoints>) {
            state[
                state.findIndex(member => member.id === payload.partnerId)
            ].totalPointsAllocated += payload.points;
        },
        destroyPartner(state, { payload }: PayloadAction<string>) {
            state = state.filter(partner => partner.id === payload);
        }
    }
});

export const addPartner = (
    name: string,
    logo: string,
    partnerLevel: string = 'basic'
): AppThunk => async (dispatch: AppDispatch) => {
    const newPartner: IPartner = {
        id: Math.random().toString(36).substr(2, 9), // https://gist.github.com/gordonbrander/2230317,
        name,
        partnerLevel,
        logo,
        itemsInStock: [],
        totalPointsAllocated: 0
    };

    dispatch(partnerSlice.actions.addPartner(newPartner));
};

export const updatePartner = (partner: IPartner): AppThunk => async (
    dispatch: AppDispatch
) => dispatch(partnerSlice.actions.updatePartner(partner));

export const addPartnerItem = (
    id: string,
    partnerId: string
): AppThunk => async (dispatch: AppDispatch) =>
    dispatch(partnerSlice.actions.addPartnerItem({ id, partnerId }));

export const addPartnerPoints = (
    partnerId: string,
    points: number
): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(partnerSlice.actions.addPartnerPoints({ partnerId, points }));
};

export const destroyPartner = (id: string): AppThunk => async (
    dispatch: AppDispatch
) => dispatch(partnerSlice.actions.destroyPartner(id));

export default partnerSlice.reducer;
