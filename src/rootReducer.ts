// rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import contactsReducer from "./slices/contactSlice";
import membersReducer from "./slices/memberSlice";

const rootReducer = combineReducers({
	contacts: contactsReducer,
	members: membersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
