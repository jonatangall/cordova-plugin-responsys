const CONSTANTS = {
    PLATFORMS: {
        ios: 'ios',
        android: 'android'
    },

    BUNDLE_IDS: {
        staging: 'com.shipt.groceries-staging',
        androidStaging: 'com.shipt.groceries_staging',
        production: 'com.shipt.groceries',
        SHIPT: {
            staging: 'com.shipt.groceries-staging',
            androidStaging: 'com.shipt.groceries_staging',
            production: 'com.shipt.groceries'
        },
        MEIJER: {
            staging: 'com.shipt.meijerstaging',
            androidStaging: 'com.shipt.meijerstaging',
            production: 'com.shipt.meijer'
        }
    },
    RESPONSYS_CONFIG_DATA: {
        'shipt': {
            'ios': {
                'staging': {
                    'pushio': {
                        'appName': 'Shipt Staging Member',
                        'platformName': 'Shipt Staging Member iOS',
                        'platform_type': 'apns',
                        'apiKey': 'ABEk1DkQso15WNR3r6XIzSmmQ',
                        'apiHost': 'api.pushio.com',
                        'bundleId': 'com.shipt.groceries-staging',
                        'accountToken': 'ABEnI-vhhKg3clQlopUdwGCYI',
                        'conversionUrl': 'http://email.shipt.com/pub/cct',
                        'riAppId': '4000005'
                    }
                },
                'production': {
                    'pushio': {
                        'appName': 'Shipt Production Member',
                        'platformName': 'Shipt Production Member iOS',
                        'platform_type': 'apns',
                        'apiKey': 'ABEnq1Cq7XxFdlCh2tJHAcjFA',
                        'apiHost': 'api.pushio.com',
                        'bundleId': 'com.shipt.groceries',
                        'accountToken': 'ABEnI-vhhKg3clQlopUdwGCYI',
                        'conversionUrl': 'http://email.shipt.com/pub/cct',
                        'riAppId': '8000005'
                    }
                }
            },
            'android': {
                'staging': {
                    'pushio': {
                        'appName': 'Shipt Staging Member',
                        'platformName': 'Shipt Staging Member Android',
                        'platform_type': 'gcm',
                        'apiKey': 'ABEky68S9tvQeYpL0zY6Zq-0Y',
                        'apiHost': 'api.pushio.com',
                        'bundleId': null,
                        'accountToken': 'ABEnI-vhhKg3clQlopUdwGCYI',
                        'conversionUrl': 'http://email.shipt.com/pub/cct',
                        'riAppId': '4000005'
                    },
                    'google': {
                        'projectId': '897704621141'
                    }
                },
                'production': {
                    'pushio': {
                        'appName': 'Shipt Production Member',
                        'platformName': 'Shipt Production Member Android',
                        'platform_type': 'gcm',
                        'apiKey': 'ABEk0aNirYkVQhTa6oSRdVu84',
                        'apiHost': 'api.pushio.com',
                        'bundleId': null,
                        'accountToken': 'ABEnI-vhhKg3clQlopUdwGCYI',
                        'conversionUrl': 'http://email.shipt.com/pub/cct',
                        'riAppId': '8000005'
                    },
                    'google': {
                        'projectId': '897704621141'
                    }
                }
            }
        },
        'meijer': {
            'ios': {
                'staging': {
                    'pushio': {
                        'appName': 'Meijer Staging Member',
                        'platformName': 'Meijer Staging Member iOS',
                        'platform_type': 'apns',
                        'apiKey': 'ABEtNXZ1oKwTxTo46JsCpw9gg',
                        'apiHost': 'api.pushio.com',
                        'bundleId': 'com.shipt.meijerstaging',
                        'accountToken': 'ABEnI-vhhKg3clQlopUdwGCYI',
                        'conversionUrl': 'http://email.shipt.com/pub/cct',
                        'riAppId': '12000005'
                    }
                },
                'production': {
                    'pushio': {
                        'appName': 'Meijer Production Member',
                        'platformName': 'Meijer Production Member iOS',
                        'platform_type': 'apns',
                        'apiKey': 'ABEq4p7gIaDVHmGMRHXZpyqE8',
                        'apiHost': 'api.pushio.com',
                        'bundleId': 'com.shipt.meijer',
                        'accountToken': 'ABEnI-vhhKg3clQlopUdwGCYI',
                        'conversionUrl': 'http://email.shipt.com/pub/cct',
                        'riAppId': '12000025'
                    }
                }
            },
            'android': {
                'staging': {
                    'pushio': {
                        'appName': 'Meijer Staging Member',
                        'platformName': 'Meijer Staging Member Android',
                        'platform_type': 'gcm',
                        'apiKey': 'ABEju-4CGrg9HSfQWZErnwTnk',
                        'apiHost': 'api.pushio.com',
                        'bundleId': null,
                        'accountToken': 'ABEnI-vhhKg3clQlopUdwGCYI',
                        'conversionUrl': 'http://email.shipt.com/pub/cct',
                        'riAppId': '12000005'
                    },
                    'google': {
                        'projectId': '897704621141'
                    }
                },
                'production': {
                    'pushio': {
                        'appName': 'Meijer Production Member',
                        'platformName': 'Meijer Production Member Android',
                        'platform_type': 'gcm',
                        'apiKey': 'ABEp7xSwce1TQ5Y1J49yKHFhE',
                        'apiHost': 'api.pushio.com',
                        'bundleId': null,
                        'accountToken': 'ABEnI-vhhKg3clQlopUdwGCYI',
                        'conversionUrl': 'http://email.shipt.com/pub/cct',
                        'riAppId': '12000025'
                    },
                    'google': {
                        'projectId': '897704621141'
                    }
                }
            }
        }
    }
};

module.exports = CONSTANTS;
