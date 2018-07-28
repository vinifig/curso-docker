const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Hello, World!'
    });
});

app.listen(PORT, () => {
    console.log(`App started in port ${PORT}`);
});