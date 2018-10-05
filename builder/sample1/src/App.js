import React from 'react';
import './scss/style.scss';
import test from './test.svg';

class App extends React.Component {
    render() {
        return (
            <div className="container">
                {// 画像を追加
                }
                <img src={test} width="256" height="256" />
                <h1>Hello React! next</h1>
            </div>
        );
    }
}

export default App;