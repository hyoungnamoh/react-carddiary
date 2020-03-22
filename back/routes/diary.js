const express = require('express');
const router = express.Router();
const db = require('../models');

//게시글 작성하기
router.post('/', async (req, res, next) => {
});
//게시글 이미지 가져오기
router.post('/image', (req, res) => {

});

module.exports = router;