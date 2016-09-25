import { defineReducer, perform } from 'reelm/fluent';
import { put, call } from 'reelm/effects';

const delay = tm => new Promise(r => setTimeout(r, tm));

class Api {
    async getOpportunities() {
        await delay(1000);
        return [
            {
                name: 'Name 1',
                value: 'Value 1',
            },
            {
                name: 'Name 2',
                value: 'Value 2',
            },
        ];
    }
}

const api = new Api();

export default defineReducer({
    loading: true,
    opportunities: null,
 })
    .on('UpdateOpportunities', perform(function* () {
        yield put({ type: 'BeginUpdateOpportunities' });
        const opportunities = yield call(() => api.getOpportunities());
        yield put({ type: 'FinsihUpdateOpportunities', opportunities: opportunities });
    }))
    .on('FinsihUpdateOpportunities', (state, { opportunities }) => ({
        ...state,
        loading: false,
        opportunities: opportunities,
    }));

