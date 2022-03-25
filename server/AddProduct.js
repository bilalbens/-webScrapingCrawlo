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


module.exports={
    addNewProduct,
    getAllProducts
}