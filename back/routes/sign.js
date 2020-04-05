const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');

// 이메일 중복검사
router.post('/emailCheck', async (req, res, next) => {
    console.log("emailCheck");
    try {
        const exEmail = await db.User.findOne({
            where: { //조회
                email: req.body.email,
            },
        });
        return exEmail ? res.send(true) : res.send(false);
    }catch (e) {
        console.error(e);
        return next(e);
    }
});

// 회원가입하기
router.post('/signUp', async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);//salt 가 커질수록 해킹 위험은 낮아지지만 암호화하는데 시간이 오래걸림 10~13 사이로 ㄱㄱ

        //DB에 생성 저장
        const newUser = await db.User.create({
            userName: req.body.userName, //body 쓰려면 index.js 에 json, urlencoded 추가해야함
            email: req.body.email,
            password: hashedPassword,
        });
        return res.status(200).json(newUser);
    }catch (e) {
        console.error(e);
        //에러처리 후에 next로 넘겨야함
        return next(e); //알아서 프론트에 에러가 났다고 알려줌
    }
});

// 로그인 기능
router.post('/signIn', (req, res, next) => {//(Strategy 명
    passport.authenticate('local', (err, user, info) => { //info = done 에 세번째 인자(로직상 에러)
        //서버 에러가 있을 경우
        if(err){
            console.error(err);
            next(err);
        }
        //로직상 에러가 있을 경우
        if(info){
            return res.status(401).send(info.reason);
        }
        //에러가 없을 경우
        return req.login(user, async (loginErr) => {
            console.log("Diaries.emailDiaries.emailDiaries.emailDiaries.emailDiaries.emailDiaries.emailDiaries.email",user.id);
            try {//login 중 에러
                if (loginErr) {
                    return next(loginErr);
                }
                const fullUser = await db.User.findOne({
                    where: { id: user.id}, //여기엔 로그인할 때 사용한 email 이 아니라 id 식별값을 넣어줘야함
                    include: [{
                        model: db.Diary,
                        as: 'Diaries',
                        attributes: ['id'], //id만 보냄, 비밀번호 등 다른정보는 보내지 않음, 여기엔 로그인할 때 사용한 email 이 아니라 id 식별값을 넣어줘야함
                    },
                    ],
                    attributes: ['userName', 'id', 'email'], //비밀번호 제외하고 보냄
                });
                return res.json(fullUser);
            } catch (e) {
                next(e);
            }
        });
    })(req, res, next);
});

// 로그아웃 기능
router.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('logout 성공');
});

module.exports = router;