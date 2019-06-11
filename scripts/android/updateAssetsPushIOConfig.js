const CONSTANTS = require('../../constants/constants');
const pushioConfigData = require('../helpers/pushioConfigData');
const gutil = require('gulp-util');
const checkForFile = require('../helpers/checkForFile');
module.exports = function (ctx) {
    if (ctx.opts.platforms.indexOf('android') < 0) {
        return;
    }

    const fs = ctx.requireCordovaModule('fs');
    const path = ctx.requireCordovaModule('path');
    const xml = ctx.requireCordovaModule('cordova-common').xmlHelpers;
    let platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android');

    let manifestPath = path.join(platformRoot, 'AndroidManifest.xml');;
    if (!fs.existsSync(manifestPath)) {
        // android platform >= 7.1.0
        manifestPath = path.join(platformRoot, 'app', 'src', 'main', 'AndroidManifest.xml');
    }

    const pushIOConfigPath = path.join(platformRoot, 'assets/pushio_config.json');

    let doc = xml.parseElementtreeSync(manifestPath);
    if (doc.getroot().tag !== 'manifest') {
        throw new Error(manifestPath + ' has incorrect root node name (expected "manifest")');
    }

    let packageName = doc.getroot().attrib['package'];
    gutil.log(`packageName from AndroidManifest is ${packageName}`);

    // Add Responsys config data based on AppId
    let configData;
    gutil.log(`Set pushioconfig data for ${CONSTANTS.BUNDLE_IDS.SHIPT.production}`);
    configData = pushioConfigData(packageName, 'android');

    if (configData) {
        checkForFile(pushioConfigData, () => {
            fs.writeFileSync(pushIOConfigPath, JSON.stringify(configData, null, 2));
        });
    } else {
        throw new Error(`You haven't configured the Responsys config data for ${packageName}.
        Add your configuration data with in your plugins constants file.`);
    }
};
