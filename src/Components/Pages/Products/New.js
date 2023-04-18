import { useState } from "react";
import { useDispatch } from "react-redux";
import {createProduct} from "../../../redux/slices/ProductSlice";
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';


function New() {
    const [product, setProduct] = useState({
        name: "",
        desc: "",
        categories: "Aliments",
        price: 0
      });
      const [formError, setFormError] = useState({
        name: false,
        desc: false,
        price: false
      });
      const dispatch = useDispatch();
      const history = createBrowserHistory();

      const validateForm = () => {
        let errors = {
          name: false,
          desc: false,
          price: false
        };
        if (product.name.trim() === "") {
          errors.name = true;
        }
        if (product.desc.trim() === "") {
          errors.desc = true;
        }
        if (product.price <= 0) {
          errors.price = true;
        }
        setFormError(errors);
        return !errors.name && !errors.desc && !errors.price;
      };

      const AddProduct = () => {
        if (product.name === "" || product.desc === "" || product.price === 0) {
          setFormError({
            name: product.name === "" ? true : false,
            desc: product.desc === "" ? true : false,
            categories: product.categories === "" ? true : false,
            price: product.price === 0 ? true : false
          });
        }
        else {
          dispatch(createProduct(product));
          setProduct({ name: "", desc: "", categories: "Aliments", price: 0 });
          history.push('/products');
          window.location.reload();
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

                                    <input type="text" className={`form-control ${formError.name ? "is-invalid" : ""}`}
                      value={product.name}
                      onChange={(event) => {
                        setProduct({ ...product, name: event.target.value });
                        setFormError({ ...formError, name: false });
                      }}
                    />
                    {formError.name && <div className="invalid-feedback">This field is required.</div>}
                                    </div>



                                    <label className="form-label">Description</label>
                                    <div className="input-group input-group-outline mb-3">

                                    <textarea type="text" className={`form-control ${formError.desc ? "is-invalid" : ""}`}
                      value={product.desc}
                      onChange={(event) => {
                        setProduct({ ...product, desc: event.target.value });
                        setFormError({ ...formError, desc: false });
                      }}
                    />
                    {formError.desc && <div className="invalid-feedback">This field is required.</div>}
                  </div>



                                    <label className="form-label">Category</label>
                                    <div className="input-group input-group-outline mb-3">

                                        <select type="text" className={`form-control ${formError.categories ? "is-invalid" : ""}`}
                      onChange={(event) => {
                        setProduct({ ...product, categories: event.target.value });
                        setFormError({ ...formError, categories: false });
                      }}
                    >
                                            <option value="Aliments">Aliments</option>
                                            <option value="Accessoires">Accessoires</option>
                                            <option value="Jouets">Jouets</option>
                                        </select>
                                    </div>
                                    <label className="form-label">Price</label>
                                    <div className="input-group input-group-outline mb-3">

                                    <input type="text" className={`form-control ${formError.price ? "is-invalid" : ""}`}
                      value={product.price}
                      onChange={(event) => {
                        setProduct({ ...product, price: event.target.value });
                        setFormError({ ...formError, price: false });
                      }}
                    />
                    {formError.price && <div className="invalid-feedback">This field is required.</div>}
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

                {/* <Link to={"/products"}><button type="button" class="btn btn-outline-primary btn-sm mb-0" >All products</button></Link> */}

            </div>
        </main>
    );
}

export default New;
