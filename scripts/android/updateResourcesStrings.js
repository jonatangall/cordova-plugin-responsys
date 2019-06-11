// Update pushio key based on app id in strings.xml
let xml2js = require('xml2js');
const pushio = require('../helpers/pushioApiKey');
const gutil = require('gulp-util');
module.exports = function (ctx) {
    if (ctx.opts.platforms.indexOf('android') < 0) {
        return;
    }
    let fs = ctx.requireCordovaModule('fs');
    let path = ctx.requireCordovaModule('path');
    let xml = ctx.requireCordovaModule('cordova-common').xmlHelpers;

    let StringsPath = path.join(ctx.opts.projectRoot, 'platforms/android/res/values/strings.xml');
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

    writeJsonAsXml(StringsPath, readXmlAsJSON(StringsPath));

    function readXmlAsJSON(file) {
        let xmlData;
        let xmlParser;
        let parsedData;
        try {
            xmlData = fs.readFileSync(file);
            xmlParser = new xml2js.Parser();
            xmlParser.parseString(xmlData, function (err, data) {
                if (!err && data) {
                    gutil.log(JSON.stringify(data));
                    let strings = data.resources.string;
                    gutil.log(`resource data ${strings}`);
                    // if the responsys_api_key element doesn't exist add it
                    if (!strings.some(s => s.$.name === 'responsys_api_key')) {
                        strings.push({
                            '_': '',
                            '$': {
                                name: 'responsys_api_key'
                            }
                        });
                    }

                    strings.forEach((string, index) => {
                        if (string.$.name === 'responsys_api_key') {
                            let packageName = doc.getroot().attrib['package'];
                            gutil.log(`packageName from android manifest is ${packageName}`);
                            gutil.log(`set pushio.apikey for ${packageName}`);
                            let pushioApiKey = pushio(packageName, 'android');
                            if (pushioApiKey) {
                                data.resources.string[index]._ = pushioApiKey;
                            } else {
                                throw new Error(`You haven't configured the Responsys config data for ${packageName}.
                                Add your configuration data with in your plugins constants file.`);
                            }
                        }
                    });

                    gutil.log(JSON.stringify(data));
                    parsedData = data;
                }
            });
        } catch (error) {
            throw new Error(`Fail to write file  ${file} - Responsys`);
        } finally {

        }
        return parsedData;
    }

    function writeJsonAsXml(file, content, options) {
        let xmlBuilder = new xml2js.Builder(options);
        let changedXmlData = xmlBuilder.buildObject(content);
        let isSaved = true;
        try {
            fs.writeFileSync(file, changedXmlData);
        } catch (err) {
            isSaved = false;
            throw new Error(`fail to write file ${file} - Responsys`);
        }
        return isSaved;
    }
};
