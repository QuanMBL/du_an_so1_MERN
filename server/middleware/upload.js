import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // thư mục lưu ảnh
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // tên ảnh là thời gian + đuôi
    },
});

export const upload = multer({ storage: storage });
    