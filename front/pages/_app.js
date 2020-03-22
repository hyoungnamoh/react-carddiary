import React, {useEffect} from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import AppLayout from '../components/AppLayout';
import axios from "axios";
import reducer from "../reducers";
import withRedux from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, compose, createStore} from 'redux';
import rootSaga from '../sagas';

const CardDiary = ({Component, store}) => {
    //공용으로 사용할 axios base url
    axios.defaults.baseURL = 'http://localhost:3603/api';

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }, [])

    return (
        <Provider store={store}>
            <Head>
                <title>CardDiary</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
            </Head>
            <AppLayout>
                <Component/>
            </AppLayout>
        </Provider>
    );
};

CardDiary.propTypes = {
    Component: PropTypes.elementType,
};

const configureStore = (initialState, options) => {
    //사가 미들웨어 생성
    const sagaMiddleware = createSagaMiddleware();
    //redux에 사가미들웨어를 연결
    const middlewares = [sagaMiddleware]; //store에서 action state reducer 과정 사이에서 과정을 변경하거나 기능을 추가, 변경할 수 있음
    //redux의 기능을 향상시킴
    const enhancer = process.env.NODE_ENV === 'production' //실제 서비스면
        ? compose(applyMiddleware(...middlewares),)
        : compose(applyMiddleware(...middlewares),
            //확장 프로그램을 깔게되면 window.__REDUX_DEVTOOLS_EXTENSION__() 생김, 기존 미들웨어들에 사용할 미들웨어를 추가해서 합성
            //배포할 땐 빼야함, 데이터가 어떻게 돌아가는지 전부 노출됨
            !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
        );
    const store = createStore(reducer, initialState, enhancer); //
    //미들웨어에 root사가 연결
    sagaMiddleware.run(rootSaga);
    return store;
}
export default withRedux(configureStore)(CardDiary);