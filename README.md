# Plugin to integrate Oracle Responsys Mobile App Platform Cloud service to enable Push service.

This plugin *integrates* _Oracle Push Services for iOS and Android platforms._

**For Android** it *enables Multidex* by having our MyApplication override attachBaseContext to enable mutlidex [Enable Multidex for Apps with Over 64K Methods](https://developer.android.com/studio/build/multidex.html "Enable Mutlidex for Apps with Over 64K").

## Developer Resources

### iOS - [Step-by-Step iOS Setup Instructions](https://docs.oracle.com/cloud/latest/marketingcs_gs/OMCFB/ios/step-by-step/ "Step-by-Step iOS Setup Instructions")
### Android - [Step-by-Step Android Setup Instructions](https://docs.oracle.com/cloud/latest/marketingcs_gs/OMCFB/android/step-by-step/ "Step-by-Step Android Setup Instructions")
- Last Updated: PushIOManager.aar upgraded to 6.33.2 on May 30 2018

#### Methods available
1. Register user with Push SDK `registerUserID()`
2. Unregister a known user `unregisterUserID()`
3. Retrieve a known user `getUserID`
