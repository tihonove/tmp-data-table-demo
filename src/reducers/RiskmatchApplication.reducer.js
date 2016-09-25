const initialState = {
    loading: true,
    opportunities: null,
 };

export default function riskmatchApplicationReducer(state = initialState, action) {
    if (action.type === 'FinsihUpdateOpportunities') {
        const { opportunities } = action;
        state = {
            ...state,
            loading: false,
            opportunities: opportunities,
        };
    }
    return state;
}
