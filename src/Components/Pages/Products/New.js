import { useState } from "react";
import { useDispatch } from "react-redux";
import {createProduct} from "../../../redux/slices/ProductSlice";
import { Link } from 'react-router-dom';

function New() {
    const [product, setProduct] = useState({name:"", desc:"", categories:"Aliments", price:0});
    const dispatch = useDispatch();

    const AddProduct = ()=>{
        if(product.name==="" && product.desc==="" && product.img===null && product.price===0){
            alert("Invalid forum!")
        }
        else{
            dispatch(createProduct(product));
            setProduct({name:"", desc:"", categories:"Aliments", img:null, price:0});
            alert("Product added")
        }
    };
    return (
        <main className="main-content  mt-0">
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-12">
                        <div className="card my-4">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                    <h6 className="text-white text-capitalize ps-3">Add new product</h6>
                                </div>
                            </div>
                            <div className="card-body px-0 pb-2">
                                <div >
                                    <label className="form-label">Product name</label>
                                    <div className="input-group input-group-outline mb-3">

                                        <input type="text" className="form-control"
                                               value={product.name}
                                               onChange={(event) => {
                                                   setProduct({...product, name:event.target.value});
                                               }}
                                        />
                                    </div>
                                    <label className="form-label">Description</label>
                                    <div className="input-group input-group-outline mb-3">

                                        <textarea type="text" className="form-control"
                                               value={product.desc}
                                               onChange={(event) => {
                                                   setProduct({...product, desc:event.target.value});
                                               }}
                                        />
                                    </div>
                                    <label className="form-label">Category</label>
                                    <div className="input-group input-group-outline mb-3">

                                        <select type="text" className="form-control"
                                               onChange={(event) => {
                                                   setProduct({...product, categories:event.target.value});
                                               }}
                                        >
                                            <option value="Aliments">Aliments</option>
                                            <option value="Accessoires">Accessoires</option>
                                            <option value="Jouets">Jouets</option>
                                        </select>
                                    </div>
                                    <label className="form-label">Price</label>
                                    <div className="input-group input-group-outline mb-3">

                                        <input type="number" className="form-control"
                                               value={product.price}
                                               onChange={(event) => {
                                                   setProduct({...product, price:event.target.value});
                                               }}
                                        />
                                    </div>
                                    <label className="form-label">Image</label>
                                    <div className="input-group input-group-outline mb-3">

                                        <input type="file" className="form-control"
                                               onChange={(event) => {
                                                   setProduct({...product,img:event.target.files[0]});
                                               }}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" onClick={AddProduct} className="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0">
                                            Add product
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Link to={"/products"}><button type="button" class="btn btn-outline-primary btn-sm mb-0" >All products</button></Link>

            </div>
        </main>
    );
}

export default New;
