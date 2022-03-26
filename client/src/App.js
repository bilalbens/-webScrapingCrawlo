import React,{ useEffect, useState,useCallback } from "react";
import Spin from "react-cssfx-loading/lib/Spin";
import "./css/App.css"
import Card from "./Card";


function App(props) {


  //states
  const [products, setProduct] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)



  //fetch data from d server
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

  }, []);



  //useEffect
  useEffect( () => {
        getProducts();
  }, [getProducts])
    


  //loading
  const loadingFunction = () => {
    if(loading){
      return (

        <div className="container">
            {loading && <div style={{display:"flex", justifyContent:"center",height:"100vh",  width:"100%"}} className="p-5 mt-5">   
                            <Spin className="m-5"></Spin>  
                        </div> }
        </div>)
    }
  }





  return (
          <div className="container  " style={{margin:"auto", padding:"0px"}}>
              <div className="row pt-5 text-center ">
                  <div className="col-3  ">
                        <h3 className="boxshadow" style={{textAlign:"left", padding:"25px"}}>Categories</h3>
                        
                        {loadingFunction()}
                        <ul className="list-group boxshadow py-2">
                            {categories.map((category,i)=>(
                                    <li class="list-group-item " key={i}> {category.name}</li>
                              ))}
                        </ul>
                  </div>
                  <div className="col-9 ">
                        
                        <h3 className="boxshadow" style={{textAlign:"left", padding:"25px"}}> Products</h3>

                        {loadingFunction()}
                        
                        <div className="d-flex flex-wrap justify-content-around boxshadow">
                          {products.map((p,i)=>(
                                <Card product={p} key={i}></Card>
                          ))}
                        </div>
                  </div>
              </div>
          </div>)

  
    
  
}

export default App;
