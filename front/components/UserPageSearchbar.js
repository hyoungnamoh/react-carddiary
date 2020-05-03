import React, {useCallback, useState} from "react";
import SearchIcon from "@material-ui/icons/Search";
import {fade, Grid, InputBase, makeStyles} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import {yellow} from "@material-ui/core/colors";
import {useSelector} from "react-redux";
import CardDiary from "./CardDiary";


const useStyles = makeStyles((theme) => ({
    root:{
        margin:"10%",
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.25),
        },
        // marginLeft: '80%',
        marginTop: 0,
        // width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        paddingBottom:0,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    starIcon:{
        color: yellow[700],
    },
}));
const UserPageSearchbar = () => {
    const classes = useStyles();
    const {loginUser, isEditing, personalUser, followingList, isLoggingOut} = useSelector(state => state.user);
    const {loginUserCardDiaries, isFavoriteCard, hasMoreDiary} = useSelector(state => state.diary);
    const [searchKeyword, setSearchKeyword] = useState('');

    //즐겨찾기한 글만 보기
    const [onFilteredSearching, setOnFilteredSearching] = useState(false);
    const onClickFavoriteSearch = () => {
        setOnFilteredSearching(!onFilteredSearching);
    };


    //검색 기능
    const onChangeSearchKeyword = (e) => {
        setSearchKeyword(e.target.value);
    }
    const filteredDiaries = useCallback(loginUserCardDiaries.filter((v) => { //data 를 받아 객체안에 name이라는 속성에 searchKeyword가 있으면
        if(onFilteredSearching){
            return v.isFavorite && (v.diaryTitle.indexOf(searchKeyword) > -1 || v.diaryContent.indexOf(searchKeyword) > -1); //즐겨찾기만 보기
        }
        return v.diaryTitle.indexOf(searchKeyword) > -1 || v.diaryContent.indexOf(searchKeyword) > -1; //모든 글에서 보기
    }), [onFilteredSearching, loginUserCardDiaries, searchKeyword,]);
    return (
        <>
            <div style={{marginLeft:'70%', marginTop: -30, marginBottom:'3%'}}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchKeyword ? searchKeyword : ' '}
                        onChange={onChangeSearchKeyword}
                    />
                    <IconButton aria-label="share" onClick={onClickFavoriteSearch}>
                        {
                            onFilteredSearching
                                ? <StarRoundedIcon fontSize="large" color="inherit" className={classes.starIcon}/>
                                : <StarBorderRoundedIcon fontSize="large" color="inherit"
                                                         className={classes.starIcon}/>

                        }
                    </IconButton>
                </div>
            </div>
            <div style={{display:'flex'}}/>
            {
                filteredDiaries.map(v => {
                    return (
                        <CardDiary key={v.id} diary={v}/>
                    )})
            }
        </>
    );
};

export default UserPageSearchbar;