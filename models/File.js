const keys = require('../keys.js');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
const multer = require('multer')


const conn = mongoose.createConnection(keys.MongoDBUser);

let gfs = {grid: undefined};

conn.once('open', () => {
    gfs.grid = Grid(conn.db, mongoose.mongo);
    gfs.grid.collection('files');
})

const storage = new GridFsStorage({
    url: keys.MongoDBUser,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if(err) {
                    console.log(err);
                    return reject(err);
                }

                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'files'
                };
                resolve(fileInfo)
            })
        })
    }
})

module.exports = {
    upload: multer({storage}),
    gfs
}