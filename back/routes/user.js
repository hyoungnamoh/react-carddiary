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

router.patch('/edit', async (req, res, next) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        await db.User.update({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
        },{
            where: { id: req.user.id },
        });
        const user = Object.assign({}, req.user.toJSON());
        delete user.password;
        res.send(user);
    }catch (e) {
        console.error(e);
        next(e);
    }
});


module.exports = router;