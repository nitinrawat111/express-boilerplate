import express from 'express';
import ApiResponse from '../../../utils/ApiResponse.js';

const router = express.Router();
router.get("/", (req, res, next) => {
    res.json(new ApiResponse(200, "Hello World"));
});

export default router;