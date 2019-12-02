const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: 'gQJ1CNellT4qbC4qkRmY4TSVQxprk9AqRYbuqS6e',
    accessKeyId: 'AKIAILPCXDAZRHTFXBZA',
    region: 'eu-central-1'
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
    }
};

const upload = multer({
    fileFilter: fileFilter,
    storage: multerS3({
        s3: s3,
        bucket: 'cora-images',
        acl: "public-read",
        metadata: function (req, file, cb) {
            cb(null, {fieldName: "image"});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        }
    })
});

module.exports = upload;