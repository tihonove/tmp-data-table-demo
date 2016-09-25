import { defineReducer, perform } from 'reelm/fluent';
import { put, call } from 'reelm/effects';

const delay = tm => new Promise(r => setTimeout(r, tm));

class Api {
    async getOpportunities() {
        await delay(100);
        return new Array(20).fill(0).map((x, i) => ({
                name: 'oooooooooooooooooooooo Name ' + i,
                value: 'oooooooooooooooooooooo Value ' + i,
            }));
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

