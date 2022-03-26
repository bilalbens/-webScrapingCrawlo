let latestProductNumber = 0;

const products = new Map();



function addNewProduct(product){
    latestProductNumber++;
    products.set(
        latestProductNumber,
        Object.assign(product, {
            productNumber: latestProductNumber
        }),
    )
}

async function getAllProducts(){
    return  Array.from(products.values())
}


function clearProductsList(){
    return products.clear()
}



module.exports={
    addNewProduct,
    getAllProducts,
    clearProductsList
}