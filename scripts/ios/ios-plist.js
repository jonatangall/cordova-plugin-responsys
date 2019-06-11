// Update pushio apikey with in ios-plist file based on app id
const projectName = require('../../../../scripts/projectName.js')();
const pushioApiKey = require('../helpers/pushioApiKey');

module.exports = function (ctx) {
    if (ctx.opts.platforms.indexOf('ios') < 0) {
        return;
    }

    const fs = ctx.requireCordovaModule('fs');
    const path = ctx.requireCordovaModule('path');

    const platformRoot = path.join(ctx.opts.projectRoot, 'platforms/ios');

    const plistDestinationPath = path.join(platformRoot, `${projectName}/${projectName}-Info.plist`);

    const plist = require('plist');

    const obj = plist.parse(fs.readFileSync(plistDestinationPath, 'utf8'));

    // Add Responsys keys based on AppId
    if (obj.hasOwnProperty('CFBundleIdentifier')) {
        // console.log(obj.CFBundleIdentifier);

        obj.CFBundleURLTypes.forEach((entry, index) => {
            if (entry.CFBundleURLName === 'push') {
                // Note: Add pio prefix for apiKey i.e., pio-apiKey
                obj.CFBundleURLTypes[index].CFBundleURLSchemes[0] =
                `pio-${pushioApiKey(obj.CFBundleIdentifier, 'ios')}`;
            }
        });
    }
    fs.writeFileSync(plistDestinationPath, plist.build(obj), 'utf8');
};
