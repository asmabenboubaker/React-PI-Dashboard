import {combineReducers} from "redux";
import productSlice from "./slices/ProductSlice";
import usersSlice from "../features/Users";
import CouponSlice from "./slices/CouponSlice";
const reducers =combineReducers({productSlice,usersSlice,CouponSlice});

export default reducers;
