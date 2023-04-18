import axios from "axios";
const url = 'http://localhost:3000/product' ;
const config={
    headers:{
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data',
    }
}
export const createProduct =  (newProduct) =>   axios.post(url+'/add' , newProduct,config);
export const getProductById =  (id) =>   axios.get(url+'/get/'+id);
export const getProducts =  () =>   axios.get(url+'/getAll');
export const searchProduct =  (search) =>   axios.post(url+'/search' , search);
export const updateProduct =  (Product) =>   axios.put(url+'/update',Product,config);
export const deleteProduct =  (id) =>   axios.delete(url+'/delete/'+id);

