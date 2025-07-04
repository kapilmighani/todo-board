import express from 'express';

const router = express.Router();

router.post('/Login', Login);
router.post('/Register', Register);