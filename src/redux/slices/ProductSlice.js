import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  * as api from "../../utlis/Product";



export const createProduct = createAsyncThunk(
    "product",
    async (product, thunkAPI) => {
        const response = await api.createProduct(product);
        console.log(response.data)
        return response.data;
    }
);

let initialState = {
    values: [],
    product:null
};
export const ProductSlice = createSlice({
    name: "Product",
    initialState,
    reducers: {
        getProducts: ( state ,action)=> {
            state.values = action.payload
        },
        getProduct: ( state ,action)=> {
            state.product = action.payload
        },
        deleteProduct:(state ,action)=>{
            const payload=action.payload;
            state.values=state.values.filter((product)=>product._id!==payload);
        },
        updateProduct: (state, action) => {
            state.product=action.payload;
        },

    },
    extraReducers: {
        [createProduct.fulfilled]: (state, action) => {
            state.values.push(action.payload);
        },

    },


});

export const {
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
} = ProductSlice.actions;


export const affichage = () => async (dispatch) => {
    try {
        const {data} = await api.getProducts();
        console.log(data);
        dispatch(getProducts(data));
    } catch (error) {
        console.log(error.message);
    }
};

export const searchProduct = (search) => async (dispatch) => {
    try {
        const {data} = await api.searchProduct(search);
        dispatch(getProducts(data));
    } catch (error) {
        console.log(error.message);
    }
};

export const getProductById = (id) => async (dispatch) => {
    try {
        const {data} = await api.getProductById(id);
        console.log(data);
        dispatch(getProduct(data));
    } catch (error) {
        console.log(error.message);
    }
};

export const update = (product) => async (dispatch) => {
    try {
        let f=await api.updateProduct(product);
        dispatch(updateProduct(f.data));
    } catch (error) {
        console.log(error.message);
    }
};

export const DeleteP = (id) => async (dispatch) => {
    try {
        await api.deleteProduct(id);
        dispatch(deleteProduct(id));
    } catch (error) {
        console.log(error.message);
    }
};
export const selectProduct = (state) => state.productSlice.values;
export const selectP = (state) => state.productSlice.product;


export default ProductSlice.reducer;
