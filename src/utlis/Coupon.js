import axios from "axios";
const url = 'http://localhost:3000/coupon' ;
const config={
    headers:{
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data',
    }
}
export const addCoupon =  (newCoupon) =>  axios.post(url+'/addCoupon' ,{
    code:newCoupon.code,
    valeur:newCoupon.valeur
},config);
export const getAllCoupon =  () =>   axios.get(url+'/getAllCoupon');
