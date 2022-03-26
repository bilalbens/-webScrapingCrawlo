let latestCategoryNumber = 0;

const categories = new Map();

function addCategory(category){
    latestCategoryNumber++;
    categories.set(
        latestCategoryNumber,
        Object.assign(category, {
            categoryNumber: latestCategoryNumber
        }),
    )
}

async function getAllCategories(){
    return  Array.from(categories.values())
}


function clearCategoriesList(){
    return categories.clear()
}




module.exports={
    addCategory,
    getAllCategories,
    clearCategoriesList
}