const express = require('express');
const router = express.Router();
const multer = require('multer');
const { insertProfilePhoto, hasProfilePhoto, deleteProfilePhoto } = require('../db/requests');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const imgPath = req.file.path;
    const userId = req.auth.id;

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    hasProfilePhoto(userId, (err, hasPhoto, existingImagePath) => {
        if (err) return next(err);
        
        if (hasPhoto) {
            fs.unlink(existingImagePath, (unlinkErr) => {
                if (unlinkErr) {
                    console.log(`Error deleting existing image file: ${unlinkErr}`);
                    return res.status(500).json({ error: 'Error deleting existing image file' });
                }

                deleteProfilePhoto(userId, (deleteErr) => {
                    if (deleteErr) return next(deleteErr);

                    insertProfilePhoto('image', imgPath, userId, (insertErr, result) => {
                        if (insertErr) return next(insertErr);
                        res.sendStatus(200);
                    });
                });
            });
        } else {
            insertProfilePhoto('image', imgPath, userId, (insertErr, result) => {
                if (insertErr) return next(insertErr);
                res.sendStatus(200);
            });
        }
    });
});

module.exports = router;
