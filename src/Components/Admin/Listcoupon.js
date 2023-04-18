import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useEffect } from "react";
export default function  Listecoupon() {
    const [coupon, setCoupon] = useState({code:"", valeur:0});
    const [listCoupons,SetListeCoupon]=useState(null);
    const [openAddFrom,setopenAddFrom]=useState(false);
    useEffect(()=>{
        fetchListeCoupons();

    },[]);
    function fetchListeCoupons(){
      axios.get('http://localhost:3000/coupon/getAllCoupon')
      .then((resultat) => {
        console.log(resultat.data);
        SetListeCoupon(resultat.data);
      }).catch(err=>console.log(err));
    }

    const [err,setErr]=useState(null);
    function handleSubmit(event){
        event.preventDefault();
        console.log(coupon);
        if(coupon.code==""||coupon.valeur=="0"){
            setErr("champ non valid ");
        }else{
            setErr(null);
            axios.post('http://localhost:3000/coupon/addCoupon', { 
              code:coupon.code,
              valeur:coupon.valeur
             })
            .then((data) => {
              alert("Coupon added")
              setCoupon({code:"", valeur:0});
            }).catch(err=>console.log(err));
        
           
            
        }
        
    }
    return (
    <main className="main-content  mt-0">
    <div className="container-fluid py-4">
    {!openAddFrom&&
      <div className="row">
      <div className="col-12">
        <div className="card my-4">
          <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
              <h6 className="text-white text-capitalize ps-3">List Users</h6>
            </div>
          </div>
          <div className="card-body px-0 pb-2">
            <div className="table-responsive p-0">
              <table className="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Code
                    </th>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                      Valeur
                    </th>
                                     </tr>
                </thead>
                <tbody>
                {listCoupons&&
                listCoupons.map((c,key) => 
                  <tr key={key}>
                    <td>
                      <div className="d-flex px-2 py-1">
                        
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="mb-0 text-sm">{c.code}</h6>
                          
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-xs text-secondary mb-0">{c.valeur}</p>
                    </td>
                  </tr>
                )
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <button type="button" class="btn btn-outline-primary btn-sm mb-0" onClick={()=>{setopenAddFrom(true)}}>Add Code coupon</button>

    </div>
    
    }
    {openAddFrom&&

<div class="card card-plain">
<div class="card-header">
 <h4 class="font-weight-bolder">Add Coupon</h4>
</div>
<div class="card-body">
 <form role="form">
 <label class="form-label">Code</label>
 <div class="input-group input-group-outline mb-3">
     
     <input type="text" class="form-control" name="code"
     value={coupon.code}
     onChange={(event) => {
        setCoupon({
            ...coupon,
            [event.target.name]: event.target.value,
          })
     }}
     />
   </div>
   <label class="form-label">valeur</label>
   <div class="input-group input-group-outline mb-3">
    
     <input type="number" class="form-control" name="valeur"
     value={coupon.valeur}
     onChange={(event) => {
        setCoupon({
            ...coupon,
            [event.target.name]: event.target.value,
          })
      }}
     />
   </div>
   {err&&
    <div className="alert alert-danger">
        {err}
    </div>
   }
   <div class="text-center">
     <input type="button" class="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0" onClick={handleSubmit} value="save"/>
   </div>
   
 </form>
 <button type="button" class="btn btn-outline-primary btn-sm mb-0 my-2 col-12" onClick={()=>{setopenAddFrom(false)}}>Show 
  Coupons</button>

</div>

</div>
}

</div>
</main>

    );
}

