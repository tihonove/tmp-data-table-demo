import React from 'react';

import { connect } from 'react-redux';

function Opportunities({ loading, opportunities }) {
    if (loading) {
        return <div>loading...</div>
    }
    return (
        <div>
            <pre>
                {JSON.stringify(opportunities, null, '  ')}
            </pre>
        </div>
    );
}

export default connect(
    (state) => ({
        loading: state.loading,
        opportunities: state.opportunities,
    })
)(Opportunities);
