import React from 'react'
// import moment from 'moment'
import "./App.css"



const Card=({product})=> {

    return (    
                <div className="card cardWidth my-3">
                    <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    </div>
                    <ul className="list-group list-group-flush">
                    <li className="list-group-item">Price: {product.price}</li>
                    <li className="list-group-item">brand: {product.brand}</li>
                    <li className="list-group-item">category: {product.category}</li>
                    </ul>
                </div>
    )
}

export default Card
