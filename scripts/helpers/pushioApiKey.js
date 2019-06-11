const CONSTANTS = require('../../constants/constants');
module.exports = function pushioApiKey(packageName, platform) {
    let pushioApiKey = '';
    switch (packageName) {
        // SHIPT production
        case CONSTANTS.BUNDLE_IDS.SHIPT.production:
            pushioApiKey = `${CONSTANTS.RESPONSYS_CONFIG_DATA.shipt[`${platform}`].production.pushio.apiKey}`;
            break;
        // SHIPT staging
        case CONSTANTS.BUNDLE_IDS.SHIPT.staging:
            pushioApiKey = `${CONSTANTS.RESPONSYS_CONFIG_DATA.shipt[`${platform}`].staging.pushio.apiKey}`;
            break;
        // SHIPT android staging
        case CONSTANTS.BUNDLE_IDS.SHIPT.androidStaging:
            pushioApiKey = `${CONSTANTS.RESPONSYS_CONFIG_DATA.shipt[`${platform}`].staging.pushio.apiKey}`;
            break;
        // MEIJER production
        case CONSTANTS.BUNDLE_IDS.MEIJER.production:
            pushioApiKey = `${CONSTANTS.RESPONSYS_CONFIG_DATA.meijer[`${platform}`].production.pushio.apiKey}`;
            break;
        // MEIJER staging
        case CONSTANTS.BUNDLE_IDS.MEIJER.staging:
            pushioApiKey = `${CONSTANTS.RESPONSYS_CONFIG_DATA.meijer[`${platform}`].staging.pushio.apiKey}`;
            break;
    }

    return pushioApiKey;
};
