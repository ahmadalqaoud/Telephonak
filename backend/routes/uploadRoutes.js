import express from 'express';
import path, { extname } from 'path';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js';
import multer from 'multer';
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(
			null,
			`${file.filename}-${Date.now()}${path.extname(file.originalname)}`,
		);
	},
});
const checkFileType = (file, cb) => {
	const fileTypes = /jpg|jpeg|png/;
	const extName = fileTypes.test(
		path.extname(file.originalname).toLocaleLowerCase(),
	);
	const mimetype = fileTypes.test(file.mimetype);

	if (extname && mimetype) {
		return null, true;
	} else {
		cb('images only');
	}
};
const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb);
	},
});

router.post('/', protect, admin, upload.single('image'), (req, res) => {
	res.send(`/${req.file.path}`);
});
export default router;
