import React from 'react'
// import moment from 'moment'
import "./css/card.css"



const Card=({product})=> {

    return (    
                <div className="card">
                    <p className="card-title">{product.name}</p>

                    <div className="cardBody">
                        <div className="productPhoto">
                            <p>product Photo</p> 
                        </div>

                        <div className="specifications">
                            <ul className="list-group list-group-flush">
                                {
                                product.specifications &&    product.specifications.map( (spec,i)=> (
                                    
                                    <li key={i} className="list-item"> 
                                        <div className="izkVco">{JSON.parse(spec).key}</div>
                                        <div className="dWfJwo">{JSON.parse(spec).value}</div>
                                    </li>
                                ))
                                    
                                }
                            </ul>
                        </div>

                        <div className="specifications">
                            <ul className="list-group list-group-flush">
                                <li className="list-item"> 
                                    <div className="izkVco">Price</div>
                                    <div className="dWfJwo" style={{fontSize:17, fontWeight:'bold'}}>{product.price} £</div>
                                </li>

                                <li className="list-item"> 
                                    <div className="izkVco">Brand</div>
                                    <div className="dWfJwo">{product.brand}</div>
                                </li>

                                <li className="list-item"> 
                                    <div className="izkVco">Delivery</div>
                                    <div className="dWfJwo">{product.delivery}</div>
                                </li>
                                
                                <li className="list-item"> 
                                    <div className="izkVco">Category</div>
                                    <div className="dWfJwo">{product.category}</div>
                                </li>
                                

                            </ul>
                        </div>
                        
                    </div>

                    <div className="link">
                        <div></div>
                        <div></div>
                        <div className="linkdiv" > 
                            <div className="izkVco">Link</div>
                            <div className="dWfJwo">
                                <a href={product.url}> View</a>{}
                            </div>
                        </div>
                    </div>
                    
                </div>
    )
}

export default Card
