#!/usr/bin/env node

const LTS_URL = 'https://nodejs.org/dist/index.json';
const COLOR_RESET = '\x1b[0m';

const GREEN = '\x1b[32m';
const BLUE = '\x1b[34m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[38;2;241;194;50m';

const MIN_MAJOR_DIF = 2;
const MAX_MAJOR_DIF = 3;

(async () => {
    try {
        const res = await fetch(LTS_URL);
        const data = await res.json();

        const latestLTS = data.find(v => v.lts !== false)?.version.replace('v', '');
        const latestCurrent = data.find(v => v.lts === false)?.version.replace('v', '');

        const current = process.version.replace('v', '');
        const currentMajor = Number(current.split('.')[0]);
        const currentLtsMajor = Number(latestLTS.split('.')[0]);
        const diff = currentLtsMajor - currentMajor;

        let currentColor = GREEN;

        if (diff >= MIN_MAJOR_DIF && diff < MAX_MAJOR_DIF) currentColor = BLUE;
        else if (diff >= MAX_MAJOR_DIF) currentColor = RED;

        const line =
            `Node versions → ` +
            `Using: ${currentColor}${current}${COLOR_RESET} | ` +
            `Latest LTS: ${BLUE}${latestLTS}${COLOR_RESET} | ` +
            `Latest Release: ${GREEN}${latestCurrent}${COLOR_RESET}`;

        console.log(line);
        if (diff >= MAX_MAJOR_DIF) console.log(`${YELLOW}⚠️  Warning: Your Node.js version is outdated. Please upgrade to a newer version.${COLOR_RESET}`);

    } catch (err) {
        console.error('Error for getting node versions:', err);
    }
})();