import { combineReducers } from '@reduxjs/toolkit';

import user from './slices/userSlice';
import members from './slices/memberSlice';
import partners from './slices/partnerSlice';
import items from './slices/itemSlice';
import admin from './slices/adminSlice';

const rootReducer = combineReducers({
    user,
    members,
    partners,
    items,
    admin
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
