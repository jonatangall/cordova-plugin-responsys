const CONSTANTS = require('../../constants/constants');
module.exports = function pushioConfigData(packageName, platform) {
    let configData = '';
    switch (packageName) {
        case CONSTANTS.BUNDLE_IDS.SHIPT.production:
            configData = CONSTANTS.RESPONSYS_CONFIG_DATA.shipt[`${platform}`].production;
            break;
        case CONSTANTS.BUNDLE_IDS.SHIPT.staging:
            configData = CONSTANTS.RESPONSYS_CONFIG_DATA.shipt[`${platform}`].staging;
            break;
        case CONSTANTS.BUNDLE_IDS.SHIPT.androidStaging:
            configData = CONSTANTS.RESPONSYS_CONFIG_DATA.shipt[`${platform}`].staging;
            break;
        case CONSTANTS.BUNDLE_IDS.MEIJER.production:
            configData = CONSTANTS.RESPONSYS_CONFIG_DATA.meijer[`${platform}`].production;
            break;
        case CONSTANTS.BUNDLE_IDS.MEIJER.staging:
            configData = CONSTANTS.RESPONSYS_CONFIG_DATA.meijer[`${platform}`].staging;
            break;
    }
    return configData;
};
