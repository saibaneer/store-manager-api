require('dotenv').config()
const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000


//middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const start = async() => {
    try {
        app.listen(PORT, console.log(`Server is running on PORT: ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();