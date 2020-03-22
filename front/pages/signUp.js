import React, {useState, useRef} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {post} from "axios";
import Alert from 'sweetalert2';

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUp = () => {
    const classes = useStyles();
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isLastNameValid, setIsLastNameValid] = useState(true);
    const [isFirstNameValid, setIsFirstNameValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [pass, setPass] = useState(false);

    const lastNameRef = useRef('');

    const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const nameRegex = /^[가-힣]{1,4}$/;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;


    const switchingCheck = (e) => {
        setIsChecked(e.target.checked);
    }

    const checkLastName = () => {
        setIsLastNameValid(nameRegex.test(lastName));
        console.log(isLastNameValid);
    }

    const checkFirstName = () => {
        setIsFirstNameValid(nameRegex.test(firstName));
    }

    const checkEmail = () => {
        setIsEmailValid(emailRegex.test(email));
    }

    const checkPassword = () => {
        let num = password.search(/[0-9]/g);
        let eng = password.search(/[a-z]/ig);
        let spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
        let length = true;
        let space = true;
        let pass = false;
        console.log(password.length);
        if(password.length < 8 || password.length > 20){
            length = false;
        }
        if(password.search(/\s/) != -1){
            space = false;
        }
        if(num > 0 && eng > 0 && spe > 0 ){
            pass = true;
        }
        console.log(pass,length,space);
        if(pass && length && space){
            setIsPasswordValid(true);
        } else{
            setIsPasswordValid(false);
        }
    }

    //서버에 회원가입 요청
    const userSignUp = () => {
        const url = '/api/userSignUp';
        console.log(lastName);
        let params = {
            lastName: lastName,
            firstName: firstName,
            email: email,
            password: password
        }
        return post(url, params);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(isPasswordValid);

        if(firstName === "" || lastName === "" || !isLastNameValid || !isFirstNameValid){
            Alert.fire({
                icon: 'error',
                title: '가입 실패',
                text: '이름을 확인해주세요!',
            })
            return;
        }
        if(email === "" || !isEmailValid){
            Alert.fire({
                icon: 'error',
                title: '가입 실패',
                text: '이메일을 입력해주세요!',
            })
            return;
        }
        if(password === "" || !isPasswordValid){
            Alert.fire({
                icon: 'error',
                title: '가입 실패',
                text: '비밀번호를 입력해주세요!',
            })
            return;
        }
        userSignUp()
            .then((response) => {
                console.log('userSignUp');
            });
    }



    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="name"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={firstName}
                                onChange={(e) => {setFirstName(e.target.value)}}
                                error={!isFirstNameValid}
                                onBlur={checkFirstName}
                                helperText={!isFirstNameValid ? "이름을 입력해주세요." : ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} ref={lastNameRef}>
                            <TextField
                                type="text"
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"

                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                value={lastName}
                                onChange={(e) => {setLastName(e.target.value)}}
                                error={!isLastNameValid}
                                onBlur={checkLastName}
                                helperText={!isLastNameValid ? "이름을 입력해주세요." : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                error={!isEmailValid}
                                value={email}
                                onChange={(e) => {setEmail(e.target.value)}}
                                onBlur={checkEmail}
                                helperText={!isEmailValid ? "올바르지 않은 이메일 형식입니다." : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={!isPasswordValid}
                                onBlur={checkPassword}
                                onChange={(e) => {setPassword(e.target.value)}}
                                value={password}
                                helperText={!isPasswordValid ? "특수문자 영문 숫자 혼용 8~20자리를 입력해주세요" : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox color="primary" checked={isChecked} onChange={switchingCheck}/>}
                                // onChange={(e) => {return e.target.checked == false ? setIsChecked(true) : setIsChecked(false)}}
                                label="이벤트 등 프로모션 알림 메일 및 수신(선택)"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleFormSubmit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default SignUp;