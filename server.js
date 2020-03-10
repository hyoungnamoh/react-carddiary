const fs = require('fs');
const expess = require('express');
const bodyParser = require('body-parser');
const app = expess();
const port = process.env.PORT || 5001;

app.use(bodyParser.json()); //데이터 주고받는 설정(json)
app.use(bodyParser.urlencoded({extended: true}));
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();
const multer = require('multer'); //파일이름이 중복되지 않게 자동으로 이름 바꿈
const upload = multer({dest: './upload'}); //파일 저장위치

app.get('/api/customers', (req, res) => {
    connection.query(
        "select * from customer WHERE ISDELETED=0",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});


app.post('/api/userSignUp', (req, res) => {
    let sql = 'insert into DIARYUSER values(null, ?, ?, ?, ?, 1, now())';
    console.log(req);
    let lastName = req.body.lastName;
    let firstName = req.body.firstName;
    let email = req.body.email;
    let password = req.body.password;
    let params = [lastName, firstName, email, password];

    console.log(lastName);
    console.log(firstName);
    console.log(email);
    console.log(password);
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
            // console.log(err);
            // console.log(rows);
        }
    );
});


app.listen(port, () => console.log(`Listening on port ${port}`));
