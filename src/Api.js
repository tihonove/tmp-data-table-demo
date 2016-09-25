const delay = tm => new Promise(r => setTimeout(r, tm));

export default class Api {
    async getOpportunities() {
        await delay(100);
        return new Array(20).fill(0).map((x, i) => ({
                name: 'oooooooooooooooooooooo Name ' + i,
                value: 'oooooooooooooooooooooo Value ' + i,
            }));
    }
}
