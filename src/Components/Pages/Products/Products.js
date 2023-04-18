import { useState ,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {affichage, DeleteP, selectProduct} from "../../../redux/slices/ProductSlice";
import { Link } from 'react-router-dom';

function ListUsers() {
    const dispatch = useDispatch();
    const products = useSelector(selectProduct);

    useEffect(() => {
        dispatch(affichage())
    }, [dispatch]);

    const Delete =(id)=>{
        dispatch(DeleteP(id))
    }
    return (
        <main className="main-content  mt-0">
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-12">
                        <div className="card my-4">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                    <h6 className="text-white text-capitalize ps-3">List products</h6>
                                </div>
                            </div>
                            <div className="card-body px-0 pb-2">
                                <div className="table-responsive p-0">
                                    <table className="table align-items-center mb-0">
                                        <thead>
                                        <tr>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                Name
                                            </th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                Description
                                            </th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                Categories
                                            </th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                Price
                                            </th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                Image
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {products.map((p,i) => (
                                            <tr>
                                                <td><p className="text-xs text-secondary mb-0">{(p!==null)?p.name:''}</p></td>
                                                <td><p className="text-xs text-secondary mb-0">{(p!==null)?p.desc:''}</p></td>
                                                <td><p className="text-xs text-secondary mb-0">{(p!==null)?p.categories:''}</p></td>
                                                <td><p className="text-xs text-secondary mb-0">{(p!==null)?p.price:''} TND</p></td>
                                                <td><img src={(p!==null)?p.img:''}  width="200" height="200"/></td>
                                                <td><Link to={(p!==null)?'update/'+p._id:''}><i className="fa fa-refresh"/></Link></td>
                                                <td><a href="javascript:void(0)" onClick={()=>Delete(p._id)} ><i className="fa fa-trash"/></a></td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Link to={"/products/new"}><button type="button" class="btn btn-outline-primary btn-sm mb-0" >Add Product</button></Link>

            </div>
        </main>
    );
}

export default ListUsers;
