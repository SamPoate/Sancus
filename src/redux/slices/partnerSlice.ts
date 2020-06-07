/* eslint-disable no-restricted-globals */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, AppDispatch } from '../store';
import { IPartner } from '../../types';

export interface IAddItem {
    id: string;
    partnerId: string;
}

const initialState: IPartner[] = [
    {
        id: Math.random().toString(36).substr(2, 9),
        name: 'Apple Moments',
        partnerLevel: 'platinum',
        logo: 'img/am-logo.png',
        currentDiscountedItems: ['312cddcc22s'],
        totalDiscountsUsed: 4
    },
    {
        id: Math.random().toString(36).substr(2, 9),
        name: 'Letter Office',
        partnerLevel: 'gold',
        logo: 'img/po-logo.png',
        users: ['123-123-123'],
        currentDiscountedItems: ['123aba11'],
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
                    if (payload.name) {
                        partner.name = payload.name;
                    }

                    if (payload.totalDiscountsUsed) {
                        partner.totalDiscountsUsed = payload.totalDiscountsUsed;
                    }
                }

                return stateArray;
            }, []);
        },
        incrementPartnerTotalDiscounts(
            state,
            { payload }: PayloadAction<string>
        ) {
            state[
                state.findIndex(partner => partner.id === payload)
            ].totalDiscountsUsed += 1;
        },
        addPartnerItem(state, { payload }: PayloadAction<IAddItem>) {
            state[
                state.findIndex(partner => partner.id === payload.partnerId)
            ].currentDiscountedItems.push(payload.id);
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
        currentDiscountedItems: [],
        totalDiscountsUsed: 0
    };

    dispatch(partnerSlice.actions.addPartner(newPartner));
};

export const updatePartner = (partner: IPartner): AppThunk => async (
    dispatch: AppDispatch
) => dispatch(partnerSlice.actions.updatePartner(partner));

export const incrementPartnerTotalDiscounts = (
    partnerId: string
): AppThunk => async (dispatch: AppDispatch) =>
    dispatch(partnerSlice.actions.incrementPartnerTotalDiscounts(partnerId));

export const addPartnerItem = (
    id: string,
    partnerId: string
): AppThunk => async (dispatch: AppDispatch) =>
    dispatch(partnerSlice.actions.addPartnerItem({ id, partnerId }));

export const destroyPartner = (id: string): AppThunk => async (
    dispatch: AppDispatch
) => dispatch(partnerSlice.actions.destroyPartner(id));

export default partnerSlice.reducer;
