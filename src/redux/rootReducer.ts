import { combineReducers } from '@reduxjs/toolkit';

import users from './slices/userSlice';
import partners from './slices/partnerSlice';

const rootReducer = combineReducers({
    users,
    partners
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
