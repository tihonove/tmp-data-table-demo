import React from 'react';

import { BrowserRouter, Match } from 'react-router';

import Layout from './Layout';
import Intermediaries from './Intermediaries/Intermediaries';

export default function RiskmatchApplication() {
    return (
        <BrowserRouter>
            <Layout>
                <Match
                    pattern='/Intermediaries'
                    component={Intermediaries}
                 />
            </Layout>
        </BrowserRouter>
    );
}
