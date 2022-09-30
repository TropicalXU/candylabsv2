const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.render('index.html')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})