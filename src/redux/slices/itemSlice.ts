/* eslint-disable no-restricted-globals */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, AppDispatch } from '../store';
import { IItem } from '../../types';
import { items } from '../../fake-database';

const initialState: IItem[] = items;

const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        addItem(state, { payload }: PayloadAction<IItem>) {
            state.push(payload);
        },
        updateItem(state, { payload }: PayloadAction<IItem>) {
            state[state.findIndex(item => item.id === payload.id)] = payload;
        }
    }
});

export const addItem = (newItem: IItem): AppThunk => async (
    dispatch: AppDispatch
) => dispatch(itemSlice.actions.addItem(newItem));

export const updateItem = (item: IItem): AppThunk => async (
    dispatch: AppDispatch
) => dispatch(itemSlice.actions.updateItem(item));

export default itemSlice.reducer;
