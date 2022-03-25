import React,{ useEffect, useState,useCallback } from "react";
import Spin from "react-cssfx-loading/lib/Spin";
import "./App.css"
import Card from "./Card";


function App(props) {

  const [products, setProduct] = useState([])
  const [loading, setLoading] = useState(true)

  async function httpGetProduct() {
    const response = await fetch('http://localhost:8000');
    return await response.json();
  
  }

  const getProducts = useCallback(async () => {
    const productslist = await httpGetProduct();
    setProduct(productslist);
    setLoading(false)
    console.log(productslist)


  }, []);


  useEffect( () => {
       getProducts();
  }, [getProducts])
  



if(loading){
  return (

    <div className="container">
        {loading && <div style={{display:"flex", justifyContent:"center",height:"100vh",  width:"100%"}} className="p-5 mt-5">   <Spin className="m-5"></Spin>  </div> }
    </div>)
}






  return (
          <div className="container pt-5 ">
              <div className="row pt-5 text-center ">
                  <div className="col-3 boxshadow mx-4 ">
                    categories
                    <ul className="list-group">
                    {products.map((p,i)=>(
                            <li class="list-group-item" key={i}> {p.category}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-8 boxshadow">
                    Products
                    <div className="d-flex flex-wrap justify-content-around">
                      {products.map((p,i)=>(
                            <Card product={p} key={i}></Card>
                      ))}

                    </div>
                  </div>
              </div>
          </div>)

    //   <div className="container">
    //     <div className="row">
    //         <div className="col-3">
    //           categories
    //         </div>
    //         <div className="col-8">
    //             <div className="d-flex justify-content-evenly">
    //                 <div className="card" style="width: 18rem;">
    //                       <div className="card-body">
    //                         <h5 className="card-title">Card title</h5>
    //                       </div>
    //                       <ul className="list-group list-group-flush">
    //                         <li className="list-group-item">Price: </li>
    //                         <li className="list-group-item">brand: </li>
    //                         <li className="list-group-item">delivery: </li>
    //                       </ul>
    //                       <div className="card-body">
    //                         {/* <a href="" className="card-link">View</a> */}
    //                       </div>
    //                 </div>

    //             </div>
    //         </div>
            
    //     </div>
    // </div>
    
  
}

export default App;
