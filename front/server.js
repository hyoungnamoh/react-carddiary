const express = require('express');
const morgan = require('morgan');
const next = require('next');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const dev = process.env.NODE_ENV !== 'develoment'; //개발모드
const prod = process.env.NODE_ENV === 'production'; //배포모드

//express와 next 연결
const app = next({ dev }); //true
const handle = app.getRequestHandler();

dotenv.config();

app.prepare().then(() => {
   const server = express(); //next

   server.use(morgan('dev'));
   server.use(express.json());
   server.use(express.urlencoded({extended:true}));
   server.use(cookieParser(process.env.COOKIE_SECRET)) //백엔드와 똑같이 설정 해줘야 함, 서버가 두갠데 쿠키 시크릿이 달라지면 서로의 쿠키를 해독 못함
   server.use(expressSession({
       resave: false,
       saveUninitialized: false,
       secret: '',
       cookie: {
           hasOwnProperty: true,
           secure: false,
       },
    }));

   //유저별 모든 다이어리 가져오기
   //  server.get('/diaries/:id', (req, res) => {
   //      console.log('유저별 모든 다이어리 가져오기');
   //      return app.render(req, res, '/diaries', {id: req.params.id});
   //  });
    //다이어리 상세보기
    server.get('/diary/:id', (req, res) => {
        console.log('다이어리 상세보기', req.params);
        return app.render(req, res, '/cardDiaryDetails', {id: req.params.id});
    });
    //유저 별 마이페이지
    server.get('/user/:id', (req, res) => {
        console.log('유저 별 마이페이지', req.params);
        return app.render(req, res, '/user', {id: req.params.id});
    });
    //* 모든 get 요청 처리
   server.get('*', (req, res) => {
       return handle(req, res);
   });


   server.listen(3642, () => {
       console.log('next+express running on port 3642')
   })
});