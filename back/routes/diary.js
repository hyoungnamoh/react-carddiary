const express = require('express');
const router = express.Router();
const db = require('../models');
const multer = require('multer');
const path = require('path');
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

//게시글 작성하기
router.post('/',  upload.none(), async (req, res, next) => {
    try{
        console.log("req.bodyreq.bodyreq.body", req.body);
        let isFavorite = 1;
        let isPublic = 1;
        if(req.body.isFavorite){
            isFavorite = 0;
        }
        if(req.body.isPublic.trim() === "publicDiary"){
            isPublic = 0;
        }
        const newDiary = await db.Diary.create({
            diaryContent: req.body.diaryContent,
            diaryTitle: req.body.diaryTitle,
            isPublic: isPublic,
            isFavorite: isFavorite,
            UserId: req.user.id, //글쓴이(나)
        });
        if(req.body.image){
            if(Array.isArray(req.body.image)){
                const images = await Promise.all(req.body.image.map((image) => {
                    return db.Image.create({ src: image });
                }));
                await newDiary.addImage(images);
            }else{ //한장일 경우
                const image = await db.Image.create({ src: req.body.image });
                await newDiary.addImage(image);
            }
        }
        const fullUser = await db.Diary.findOne({
            where: { id: newDiary.id },
            include: [{
                model: db.User,
            }, {
                model: db.Image,
            }],
        });
        res.json(fullUser);
    }catch (e) {
        console.error(e);
        next(e);
    }
});

//이미지 업로드하기
router.post('/images', upload.array('image'), (req, res) => {
    res.json(req.files.map(v => v.filename));
});

module.exports = router;