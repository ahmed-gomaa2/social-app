const express = require('express')

const app = express();

const port = process.env.PORT || 5000;

app.get("/api/post", (req, res) => {
    res.send("The proxy is working properly.")
})

app.listen(port, () => {
    console.log(`The app is listening to:${port}`)
})