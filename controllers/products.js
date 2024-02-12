const Product = require('../models/product')
const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({}).sort('name')
    res.status(200).json({ resultsCount: products.length, products })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, limit, skip, numericFilters } = req.query;
    const queryObject = {};
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }

    if (company) {
        queryObject.company = company;
    }

    if (name) {
        queryObject.name = { $regex: name, $options: 'i'};

    }

    if(numericFilters){
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte'
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if(options.includes(field)) {
                queryObject[field] = {[operator]: Number(value)};
            }
        })
    }

    let result = Product.find(queryObject);
    if(sort) {
        const sortedList = sort.split(',').join(' ');
        result = result.sort(sortedList);
    } else {
        result = result.sort('createdAt');
    }
    if(fields) {
        const fieldItems = fields.split(',').join(' ');
        result = result.select(fieldItems);
    }
    // if(limit) {
    //     result = result.limit(parseInt(limit));
    // } else {
    //     result = result.limit(10);
    // }
    const products = await result;
    const page = Number(req.query.page) || 1;
    const limitPerPage = Number(req.query.limit) || 10;
    const skipCount = (page - 1) * limitPerPage;

    result = result.skip(skipCount).limit(limitPerPage);
    // if(skip) {
    //     result = result.skip(parseInt(skip));
    // }
    res.status(200).json({noOfProducts: products.length, products});
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