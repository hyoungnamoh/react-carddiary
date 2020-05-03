import React, {useCallback, useState} from "react";
import SearchIcon from "@material-ui/icons/Search";
import {fade, Grid, InputBase, makeStyles} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import {yellow} from "@material-ui/core/colors";
import {useSelector} from "react-redux";
import CardDiary from "./CardDiary";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const minWidth = 500;
const useStyles = makeStyles((theme) => ({
    root:{
        margin:"10%",
    },
    searchWrapper:{
        display:'flex',
        justifyContent:'flex-end',
    },
    search: {
        display:'flex',
        width:'300px',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.25),
        },
        // marginLeft: '80%',
        marginTop: 0,
    },
    searchIcon: {
        padding: theme.spacing(2, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: 0,
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        paddingBottom:0,
        transition: theme.transitions.create('width'),
    },
    starIcon:{
        display:'flex',
        color: yellow[700],
    },
    cardWrapper:{
        marginTop:'3%',
    },
    [`@media (max-width: ${minWidth}px)`]: {
        userPaper:{
            marginTop:'10%',
        },
        cardWrapper:{
            marginTop:'10%',
        },
        search: {
            width:'90%',
        },
        searchWrapper:{
            justifyContent:'center',
        },
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
            <div style={{}}>
                <div className={classes.searchWrapper}>
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
                            value={searchKeyword ? searchKeyword : ''}
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
            </div>
            <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-around', }}>
                {
                    filteredDiaries.map(v => {
                        return (
                            <div className={classes.cardWrapper}>
                                <CardDiary key={v.id} diary={v}/>
                            </div>
                    )})
                }
            </div>
        </>
    );
};

export default UserPageSearchbar;