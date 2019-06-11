// Update pushio_config json data with in resources dir based on app id
const projectName = require('../../../../scripts/projectName.js')();
const pushioConfigData = require('../helpers/pushioConfigData');
module.exports = function (ctx) {
    if (ctx.opts.platforms.indexOf('ios') < 0) {
        return;
    }

    const fs = ctx.requireCordovaModule('fs');
    const path = ctx.requireCordovaModule('path');

    const platformRoot = path.join(ctx.opts.projectRoot, 'platforms/ios');
    const pushIOConfigPath = path.join(platformRoot, `${projectName}/Resources/pushio_config.json`);

    const plistDestinationPath = path.join(platformRoot, `${projectName}/${projectName}-Info.plist`);

    const plist = require('plist');

    const obj = plist.parse(fs.readFileSync(plistDestinationPath, 'utf8'));

    // Add Responsys config data based on AppId
    let configData;
    configData = pushioConfigData(obj.CFBundleIdentifier, 'ios');

    fs.writeFileSync(pushIOConfigPath, JSON.stringify(configData, null, 2));
};
