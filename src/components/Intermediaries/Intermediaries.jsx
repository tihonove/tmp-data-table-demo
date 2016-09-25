import React from 'react';

import { connect } from 'react-redux';

import { Miss, Match, Link } from 'react-router';

import Opportunities from './Opportunities';
import lifecycle from '../../utils/route-lifecycle';
import Api from '../../Api';

const api = new Api();

function Intermediaries({ pathname, onUpdateOpportunities }) {
    return (
        <div>
            Intermediaries: <Link to={`${pathname}/opportunities`}>opportunities</Link>
            <Match pattern={`${pathname}/opportunities`} component={lifecycle(Opportunities, onUpdateOpportunities)} />
            <Miss component={() => (
                <div>
                    Select!
                </div>
            )} />
        </div>
    );
}

export default connect(
    (state, props) => ({
        ...props,
    }),
    dispatch => ({
        onUpdateOpportunities: async () => {
            dispatch({ type: 'BeginUpdateOpportunities' });
            const opportunities = await api.getOpportunities();
            dispatch({ type: 'FinsihUpdateOpportunities', opportunities: opportunities });
        },
    })
)(Intermediaries);
