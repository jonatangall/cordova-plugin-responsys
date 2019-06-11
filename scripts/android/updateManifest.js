// Add android:name attribute to Application tag in Manifest file
module.exports = function (ctx) {
    if (ctx.opts.platforms.indexOf('android') < 0) {
        return;
    }
    let fs = ctx.requireCordovaModule('fs');
    let path = ctx.requireCordovaModule('path');
    let xml = ctx.requireCordovaModule('cordova-common').xmlHelpers;

    
    let platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android');
    let manifestPath = path.join(platformRoot, 'AndroidManifest.xml');;
    if (!fs.existsSync(manifestPath)) {
        // android platform >= 7.1.0
        manifestPath = path.join(platformRoot, 'app', 'src', 'main', 'AndroidManifest.xml');
    }
    let doc = xml.parseElementtreeSync(manifestPath);
    if (doc.getroot().tag !== 'manifest') {
        throw new Error(manifestPath + ' has incorrect root node name (expected "manifest")');
    }

    doc.getroot().find('./application').attrib['android:name'] = 'responsys.MyApplication';

    // write the manifest file
    fs.writeFileSync(manifestPath, doc.write({indent: 4}), 'utf-8');
};
