const express = require('express');
const redisFactory = require('redis');

const app = express();
const redisClient = redisFactory.createClient();

const PORT = process.env.PORT || 8080;

const ROUTES = {
    BASE: '/',
    EXAMPLE: '/example'
}

const redis = {
    get (key, defaultValue) {
        return new Promise ((resolve, reject) => {
            redisClient.get(key, (err, reply) => {
                if (err) {
                    return reject(err);
                }
                if (reply) {
                    console.log(`Redis: GET ${key} = ${reply}`)
                    return resolve(reply)
                }
                resolve(defaultValue);
            })
        })
    },
    set (key, value) {
        redisClient.set(key, value);
    }
}


app.get(ROUTES.BASE, (req, res, next) => {
    redis.get(ROUTES.BASE, '0')
        .then((countString)=>{
            let countAccess = parseInt(countString) + 1;
            redis.set(ROUTES.BASE, countAccess.toString());
            res.status(200).json({
                countAccess,
                message: 'Hello, World!'
            });
        })
});

app.get(ROUTES.EXAMPLE, (req, res, next) => {
    redis.get(ROUTES.EXAMPLE, '0')
        .then((countString)=>{
            let countAccess = parseInt(countString) + 1;
            redis.set(ROUTES.EXAMPLE, countAccess.toString());
            res.status(200).json({
                countAccess,
                message: 'EXAMPLE ROUTE!'
            });
        })
});

app.listen(PORT, () => {
    console.log(`App started in port ${PORT}`);
});