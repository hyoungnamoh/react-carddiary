/*
INIT: ensure Babel/Eslint/Flow is configured for ES Class Fields & Static Properties
JSX USAGE: <Iframe src='http://web.site' onLoad={myOnloadFunction}/>
*/
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

class Iframe extends Component {


    componentDidMount () {
        let iframe = ReactDOM.findDOMNode(this.refs.iframe)
        iframe.addEventListener('load', this.props.onLoad);
    }

    render () {
        const iframeStyle = {
            width: '100%',
            height: '100%',
            border: '0',
            position: 'absolute',
        }

        return (
            <iframe
                ref="iframe"
                {...this.props}
                frameBorder={'0'}
                width={'100%'}
                height={'100%'}
                style={iframeStyle}
            />
        )
    }

}

export default Iframe