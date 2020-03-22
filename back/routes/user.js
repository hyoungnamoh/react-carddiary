const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');

// 내 정보 가져오기
router.get('/', (req, res) => { //api = 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
    if(!req.user){
        return res.status(401).send('로그인이 필요합니다.');
    }
    const user = Object.assign({}, req.user.toJSON()); //db에서 가져오 데이터를 다시 가공하는 경우 toJSON() 해줘야함
    delete user.password;
    return res.json(req.user);
});

// 로그아웃 기능
router.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('logout 성공');
});

// :id 팔로우 정보 가져오기
router.get('/:id/follow', (req, res) => {

});

//:id 팔로우 하기
router.post('/:id/follow', (req, res) => {

});

//:id 팔로우 취소
router.delete('/:id/follow', (req, res) => {

});

//:id 팔로워 취소
router.delete('/:id/follower', (req, res) => {

});

//:id 게시물 모두 가져오기
router.get('/:id/diaries', (req, res) => {

});

module.exports = router;