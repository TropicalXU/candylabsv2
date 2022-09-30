const express = require('express');
const ejs = require('ejs');
const app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
    res.render('index.html')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})