/* eslint-disable no-restricted-globals */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, AppDispatch } from '../store';
import { IPartner } from '../../types';

const initialState: IPartner[] = [
    {
        id: Math.random().toString(36).substr(2, 9),
        name: 'Apple Moments',
        logo: 'img/am-logo.png',
        totalDiscountsUsed: 4
    },
    {
        id: Math.random().toString(36).substr(2, 9),
        name: 'Letter Office',
        logo: 'img/po-logo.png',
        totalDiscountsUsed: 1
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
                    partner.name = payload.name;
                    partner.totalDiscountsUsed = payload.totalDiscountsUsed;
                }

                return stateArray;
            }, []);
        },
        destroyPartner(state, { payload }: PayloadAction<string>) {
            state = state.filter(partner => partner.id === payload);
        }
    }
});

export const addPartner = (name: string, logo: string): AppThunk => async (
    dispatch: AppDispatch
) => {
    const newPartner: IPartner = {
        id: Math.random().toString(36).substr(2, 9), // https://gist.github.com/gordonbrander/2230317,
        name,
        logo
    };

    dispatch(partnerSlice.actions.addPartner(newPartner));
};

export const updatePartner = (
    id: string,
    name: string,
    totalDiscountsUsed: number
): AppThunk => async (dispatch: AppDispatch) => {
    const updatedPartner: IPartner = {
        id,
        name,
        totalDiscountsUsed
    };

    dispatch(partnerSlice.actions.updatePartner(updatedPartner));
};

export const destroyPartner = (id: string): AppThunk => async (
    dispatch: AppDispatch
) => {
    dispatch(partnerSlice.actions.destroyPartner(id));
};

export default partnerSlice.reducer;
