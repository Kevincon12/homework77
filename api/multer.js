const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

const storage = multer.diskStorage({
    destination: async (_req, _file, cb) => {
        const dir = path.join(__dirname, 'public/images');
        await fs.promises.mkdir(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, randomUUID() + ext);
    },
});

const upload = multer({ storage });

module.exports = { upload };