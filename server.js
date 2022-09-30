const express = require('express');
const ejs = require('ejs');

const app = express();

app.engine('html', ejs);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.json());

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
    next()
});

app.get('/', (req, res) => {
    res.render('index')
});


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})