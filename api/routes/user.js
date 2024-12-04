var express = require('express');
const { getUserInfo } = require('../db/requests');
var router = express.Router();
const fs = require('fs');
const mime = require('mime-types');

router.get('/', (req, res, next) => {
    const userId = req.auth.id;
    getUserInfo(userId, (err, user) => {
        if (err) return next(err);

        if (user.image_path === null) {
            delete user.image_path;
            res.status(200).json(user);
        } else {
            fs.readFile(user.image_path, (err, data) => {
                if (err) {
                    console.log(`Error reading image file: ${err}`)
                    return res.status(500).json({ error: 'Error reading image file' });
                }
                const mimeType = mime.lookup(user.image_path);

                const imageBase64 = Buffer.from(data).toString('base64');
                const response = {
                    username: user.username,
                    tasks: user.tasks,
                    image: `data:${mimeType};base64,${imageBase64}`
                }
                res.status(200).json(response);
            });
        }
    });
});

module.exports = router;