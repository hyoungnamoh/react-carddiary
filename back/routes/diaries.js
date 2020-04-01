const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', async (req, res, next) => {
});

//유저 다이어리들 가져오기
router.get('/:id', async (req, res, next) => {
    try{
        const diaries = await db.Diary.findAll({
            where: {
                UserId: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0,
            },
            include: [{
                model: db.User,
                attributes: ['id', 'userName'],
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
        });
        res.json(diaries);
    }catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;