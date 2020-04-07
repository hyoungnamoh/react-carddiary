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
router.get('/', isLoggedIn, async (req, res) => { //api = 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
    // const user = Object.assign({}, req.user.toJSON()); //db에서 가져오 데이터를 다시 가공하는 경우 toJSON() 해줘야함
    try {
        const user = await db.User.findOne({
            where: {id: req.user.id},
            include: [{
                model: db.ProfileImage,
                as: 'ProfileImage',
                attributes: ['src'],
            },]
        })
        delete user.password;
        return res.json(user);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

// :id 다른사람 정보 가져오기
router.get('/:id', async (req, res, next) => { //남의 정보 가져오기 :id 는 req.params.id 로 가져옴
    try{
        const user = await db.User.findOne({
            where : { id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0},
            include: [{
                model: db.Diary,
                as: 'Diaries',
                attributes: ['id'],
            }, {
                model: db.ProfileImage,
                as: 'ProfileImage',
                attributes: ['src'],
            },],
            attributes: ['id', 'email', 'userName'],
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
        //update into ProfileImage set src='KakaoTalk_20190526_1309312191586235206818.jpg', updataAt=now(), where id=1
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
        // const user = Object.assign({}, req.user.toJSON());
        // const profileImage = await db.ProfileImage.findOne({
        //     where: {UserId: req.user.id}
        // })
        delete user.password;
        res.send(user);
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



module.exports = router;