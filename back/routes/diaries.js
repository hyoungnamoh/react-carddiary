const express = require('express');
const router = express.Router();
const db = require('../models');

//내 팔로잉 사람들 게시물 전부 가져오기
router.get('/', async (req, res, next) => {
    try{
        const diaries = await db.Diary.findAll({
            include: [{
                model: db.User,
                attributes: ['id', 'userName', 'email'],
                as:'User',
                include:[{
                    model: db.ProfileImage,
                    as:'ProfileImage'
                }]
            },{
                model: db.Image,
            }],
            order: [['createdAt', 'DESC']],
        });
        res.json(diaries);
    }catch (e) {
        console.error(e);
        next(e);
    }
});

//유저 다이어리들 가져오기
router.get('/user/:id', async (req, res, next) => {
    try{
        const diaries = await db.Diary.findAll({
            where: {
                UserId: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0,
            },
            include: [{
                model: db.User,
                attributes: ['id', 'userName', 'email'],
                as:'User',
                include:[{
                    model: db.ProfileImage,
                    as:'ProfileImage'
                }],
            }, {
                model: db.Image,
            },
            //     {
            //     model: db.User,
            //     through: 'Like',
            //     as: 'Likers',
            //     attributes: ['id'],
            // }
            ],
            order: [['createdAt', 'DESC']], //내림차순
        });
        res.json(diaries);
    }catch (e) {
        console.error(e);
        next(e);
    }
});


//즐겨찾기 목록 가져오기
router.get('/favorite', async (req, res, next) => {
    try{
        const favoriteDiaries = await db.Diary.findAll(
            {
                where: {
                    isFavorite: 1,
                    UserId: req.user.id,
                },
            });
        res.json(favoriteDiaries);
    } catch(e){
        console.error(e);
        next(e);
    }
});

module.exports = router;