import React,{ useEffect, useState,useCallback } from "react";
import Spin from "react-cssfx-loading/lib/Spin";
import "./App.css"
import Card from "./Card";


function App(props) {

  const [products, setProduct] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  async function httpGetProduct() {
    const response = await fetch('http://localhost:8000');
    return await response.json();
  
  }

  const getProducts = useCallback(async () => {
    //response from backend
    const response = await httpGetProduct();

    //products
    setProduct(response.products);
    //categories
    setCategories(response.categories);
    setLoading(false)
    console.log(response.products)
    console.log(response.categories)


  }, []);


  useEffect( () => {
       getProducts();
  }, [getProducts])
  

let product = {
  name:'Portátil - Asus VivoBook 14 K413EA-EB695, 14" Full…ntel® Core™ i5-1135G7, 16 GB, 512 GB, FDOS, Negro ntel® Core™ i5-1135G7, 16 GB, 512 GB, FDOS, Negro',
  url: 'https://www.mediamarkt.es/es/product/_portatil-asu…tm-i5-1135g7-16-gb-512-gb-fdos-negro-1529410.html',
  price: '699', 
  brand: 'Asus', 
  category: 'Portátiles de 14" a 16.9" '
}

let product2 = {
  name:'Portátil - Asus VivoBook 14 K413EA-EB695, 14" Full…ntel® Core™ i5-1135G7, 16 GB, 512 GB, FDOS, Negro',
  url: 'https://www.mediamarkt.es/es/product/_portatil-asu…tm-i5-1135g7-16-gb-512-gb-fdos-negro-1529410.html',
  price: '699', 
  brand: 'Asus', 
  category: 'Portátiles de 14" a 16.9" ',
  specifications: [
    {
    key:"processeur",
    value:"intel"
  },
  {
    key:"processeur",
    value:"intel"
  }
]
}

if(loading){
  return (

    <div className="container">
        {loading && <div style={{display:"flex", justifyContent:"center",height:"100vh",  width:"100%"}} className="p-5 mt-5">   <Spin className="m-5"></Spin>  </div> }
    </div>)
}






  return (
          <div className="container  " style={{margin:"auto", padding:"0px"}}>
              <div className="row pt-5 text-center ">
                  <div className="col-3  ">
                    <h3 className="boxshadow" style={{textAlign:"left", padding:"25px"}}>Categories</h3>
                    
                    <ul className="list-group boxshadow py-2">
                        {categories.map((category,i)=>(
                                <li class="list-group-item " key={i}> {category.name}</li>
                          ))}
                    </ul>
                  </div>
                  <div className="col-9 ">
                    
                    <h3 className="boxshadow" style={{textAlign:"left", padding:"25px"}}> Products</h3>

                    <div className="d-flex flex-wrap justify-content-around boxshadow">
                      {products.map((p,i)=>(
                             <Card product={p} key={i}></Card>
                      ))}
                     {/* <Card product={product} key={1}></Card>
                     <Card product={product2} key={2}></Card> */}
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
