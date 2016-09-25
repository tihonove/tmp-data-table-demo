import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore } from 'redux';
import { reelmRunner } from 'reelm';

import riskmatchApplicationReducer from './reducers/RiskmatchApplication.reducer';
import RiskmatchApplication from './components/RiskmatchApplication';

const store = createStore(
    riskmatchApplicationReducer,
    compose(
        reelmRunner(),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

ReactDom.render(
    <Provider store={store}>
        <RiskmatchApplication />
    </Provider>,
    document.getElementById('content'));
