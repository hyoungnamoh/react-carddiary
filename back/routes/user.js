const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const path = require('path');
const passport = require('passport');
const db = require('../models');
const multer = require('multer');
const { isLoggedIn } = require('./middleware');

//업로드 설정
const upload = multer({
    storage: multer.diskStorage({ //저장 옵션 서버쪽 디스크에 저장
        destination(req, file, done){
            done(null, 'uploads'); //어떤 폴더에 저장할지
            //(서버에러, 성공했을때)
        },
        filename(req, file, done){ //파일이름 옵션
            const ext = path.extname(file.originalname); //확장자 추출
            const basename = path.basename(file.originalname, ext);
            done(null, basename + new Date().valueOf() + ext);
        }
    }),
    limits: { fileSize: 20 * 1024 * 1024 }, //파일크기 제한 옵션
});

// 내 정보 가져오기
router.get('/', isLoggedIn, async (req, res) => {
    try {
        const user = await db.User.findOne({
            where: {id: req.user.id},
            include: [{
                model: db.ProfileImage,
                as: 'ProfileImage',
                attributes: ['src'],
            },],
        })
        delete user.password;
        return res.json(user);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

// :id 다른사람 정보 가져오기
router.get('/userPage/:id', async (req, res, next) => { //남의 정보 가져오기 :id 는 req.params.id 로 가져옴
    try{
        const user = await db.User.findOne({
            where : { id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0},
            include: [{
                model: db.Diary,
                as: 'Diaries',
                attributes: ['id', 'diaryTitle', 'diaryContent'],
            }, {
                model: db.ProfileImage,
                as: 'ProfileImage',
                attributes: ['src'],
            },],
            attributes: ['id', 'email', 'userName'],
        });
        const jsonUser = user.toJSON();
        jsonUser.Diary = jsonUser.Diary ? jsonUser.Diary.length : 0;
        return res.json(jsonUser);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

//유저 정보 수정하기
router.patch('/edit', async (req, res, next) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        await db.ProfileImage.update({
           src: req.body.profileImagePath,
        },{
            where: { UserId: req.user.id},
        });

        await db.User.update({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
        },{
            where: { id: req.user.id },
        });
        const user = await db.User.findOne({
            where: {id: req.user.id},
            include:[{
                model: db.ProfileImage,
                as: 'ProfileImage',
                attributes: ['src'],
            }]
        });
        delete user.password;
        return res.send(user);
    }catch (e) {
        console.error(e);
        next(e);
    }
});

//이미지 업로드하기
router.post('/profile', upload.single('image'), (req, res) => { //array(프론트에서 append 한 이름), array = 여러장, single = 한장, fields = 이미지 여러개 올릴 때 이름을 각기 다르게 받을 수 있음, none = 파일을 하나도 안올릴 경우
    //파일이 넘어오는 위치, single 이면 req.file
    res.json(req.file.filename); //파일명 전달
    // console.log(req.file.filename);
});

//:id 팔로우 하기
router.post('/:id/follow', async (req, res, next) => {
    try{
        const user = await db.User.findOne({
            where: {
                id: req.user.id,
            }
        });
        await user.addFollowing(req.params.id);
        const followings = await user.getFollowings({
            attributes: ['id', 'userName', 'email'],
            order: [['userName', 'ASC']], //이름 오름차순으로 정렬
            include:[{
                model: db.ProfileImage,
                as:'ProfileImage'
            }],
        },);
        return res.json(followings);
    }catch (e) {
        console.error(e);
        next(e);
    }
});

//팔로잉 목록 가져오기
router.get('/followingList', async (req, res, next) => {
    try {
        const user = await db.User.findOne({
            where: { id: req.user.id },
        });
        const followings = await user.getFollowings({
            attributes: ['id', 'userName', 'email'],
            order: [['userName', 'ASC']], //이름 오름차순으로 정렬
            include:[{
                model: db.ProfileImage,
                as:'ProfileImage'
            }],
        },);
        res.json(followings);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

//팔로워 목록 가져오기
router.get('/followerList', async (req, res, next) => {
    try {
        const user = await db.User.findOne({
            where: { id: req.user.id },
        });
        const followers = await user.getFollowers({
            attributes: ['id', 'userName', 'email'],
            order: [['userName', 'ASC']], //이름 오름차순으로 정렬
            include:[{
                model: db.ProfileImage,
                as:'ProfileImage'
            }],
        },);
        res.json(followers);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

//팔로우 취소하기
router.delete('/:id/follow', async (req, res, next) => {
    try{
        const user = await db.User.findOne({
            where:{
                id: req.user.id,
            }
        });
        await user.removeFollowings(req.params.id);
        return res.send(req.params.id);
    }catch (e) {
        console.error(e);
        next(e);
    }
});

//유저 정보 전부 가져오기
router.get('/users', async (req, res, next) => {
    try{
        const users = await db.User.findAll({
            attributes: ['id', 'userName', 'email'],
            include:[{
                model: db.ProfileImage,
                as:'ProfileImage'
            }],
        },);
        return res.json(users);
    }catch (e) {
        console.error(e);
        next(e);
    }
});



module.exports = router;