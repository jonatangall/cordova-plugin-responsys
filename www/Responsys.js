let exec = require('cordova/exec');

exports.registerUserID = function (arg0, success, error) {
    exec(success, error, 'Responsys', 'registerUserID', [arg0]);
};

exports.unregisterUserID = function (arg0, success, error) {
    exec(success, error, 'Responsys', 'unregisterUserID', [arg0]);
};

exports.getUserID = function (arg0, success, error) {
    exec(success, error, 'Responsys', 'getUserID', [arg0]);
};

exports.registerForAllRemoteNotificationTypes = function (arg0, success, error) {
    exec(success, error, 'Responsys', 'registerForAllRemoteNotificationTypes', [arg0]);
};
