const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');
const { isLoggedIn } = require('./middleware');


// 내 정보 가져오기
router.get('/', isLoggedIn, (req, res) => { //api = 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
    const user = Object.assign({}, req.user.toJSON()); //db에서 가져오 데이터를 다시 가공하는 경우 toJSON() 해줘야함
    delete user.password;
    console.log('user', user);
    return res.json(req.user);
});

// :id 다른사람 정보 가져오기
router.get('/:id', async (req, res, next) => { //남의 정보 가져오기 :id 는 req.params.id 로 가져옴
    try{
        const user = await db.User.findOne({
            where : { id: parseInt(req.params.id, 10)},
            include: [{
                model: db.Diary,
                as: 'Diary',
                attributes: ['id'],
            }, {
                model: db.User,
                as: 'Followings',
                attributes: ['id'],
            }, {
                model: db.User,
                as: 'Followers',
                attributes: ['id'],
            }],
            attributes: ['id', 'nickname'],
        });
        const jsonUser = user.toJSON();
        jsonUser.Diary = jsonUser.Diary ? jsonUser.Diary.length : 0;
        res.json(jsonUser);
    } catch (e) {
        console.error(e);
        next(e);
    }
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