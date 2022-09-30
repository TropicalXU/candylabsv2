const express = require('express');
const ejs = require('ejs');

const app = express();

app.set('views', __dirname + '/views');
app.engine('html', ejs);

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
    next()
});

app.get('/', (req, res) => {
    res.render('index.html')
});

app.get('/contact', (req, res) => {
    res.render('contact.html')
});


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})