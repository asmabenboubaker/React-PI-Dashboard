import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  {addCoupon,getAllCoupon} from "../../utlis/Coupon";



export const createCoupon = createAsyncThunk(
    "coupon",
    async (coupon, thunkAPI) => {
        console.log(coupon);
        
        addCoupon(coupon).then((data)=>{
            return data.data;
        }).catch((err)=>
        console.log(err))
    }
);

let initialState = {
    values: [],
    product:null
};
export const CouponSlice = createSlice({
    name: "Coupon",
    initialState,
    reducers: {
        getCoupons: ( state ,action)=> {
            state.values = action.payload
        },
       

    },
    extraReducers: {
        [createCoupon.fulfilled]: (state, action) => {
            state.values.push(action.payload);
        },

    },


});

export const {
    getCoupons,
   
} = CouponSlice.actions;


export const affichage = () => async (dispatch) => {
    try {
        const {data} = await getAllCoupon();
        console.log(data);
        dispatch(getCoupons(data));
    } catch (error) {
        console.log(error.message);
    }
};

export const selectProduct = (state) => state.couponSlice.values;
export const selectP = (state) => state.couponSlice.coupon;


export default CouponSlice.reducer;
