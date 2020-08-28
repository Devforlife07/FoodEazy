const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({})
const upload = multer({
    storage: storage,
    limits: {
        files: 100,
        fileSize: 1 * 512 * 1024
    },
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    }
}).single("productImage")
module.exports = upload;