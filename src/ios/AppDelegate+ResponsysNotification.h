#import "AppDelegate.h"
//Import PushIOManager
#import <PushIOManager/PushIOManager.h>

//iOS 10:
#import <UserNotifications/UserNotifications.h>
//Implement UserNotifications delegate to receive the notification callbacks in iOS 10.
@interface AppDelegate (ResponsysNotification) <UIApplicationDelegate,UNUserNotificationCenterDelegate>
@end
