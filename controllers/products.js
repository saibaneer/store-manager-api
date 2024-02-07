
const getAllProductsStatic = async (req, res) => {
    res.status(200).send('get all products')
}

const getAllProducts = async (req, res) => {
    res.status(200).send('get all products')
}


// const getProductById = async (req, res) => {
//     res.status(200).send('get product by id')
// }

// const updateProduct = async (req, res) => {
//     res.status(200).send('update product by id')
// }

// const addProduct = async (req, res) => {
//     res.status(200).send('add product')
// }

// const deleteProduct = async (req, res) => {
//     res.status(200).send('delete product')
// }

module.exports = {
    getAllProducts,
    getAllProductsStatic
}