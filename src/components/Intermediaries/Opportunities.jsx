// @flow
import React from 'react';

import { connect } from 'react-redux';

import OpportunitiesTable from './OpportunitiesTable';

import classnames from 'classnames/bind';
import styles from './CollpaseContainer.less';
const cn = classnames.bind(styles);

class CollpaseContainer extends React.Component {
    state = {
        collapsed: false,
    };

    render() {
        const { title, children } = this.props;
        const { collapsed } = this.state;

        return (
            <div className={cn('collpase-container', { collapsed: collapsed })}>
                <div className={cn('title')} onClick={() => this.setState({ collapsed: !collapsed })}>
                    {title}
                </div>
                <div className={cn('content')}>
                    <div className={cn('content-container')}>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

function Opportunities({ loading, opportunities }) {
    if (loading) {
        return <div>loading...</div>;
    }
    return (
        <div>
            <CollpaseContainer title='opportunities'>
                <OpportunitiesTable opportunities={opportunities} />
            </CollpaseContainer>
        </div>
    );
}

export default connect(
    state => ({
        loading: state.loading,
        opportunities: state.opportunities,
    })
)(Opportunities);
