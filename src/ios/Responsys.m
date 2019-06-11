/********* Responsys.m Cordova Plugin Implementation *******/

#import <Cordova/CDV.h>
#import "AppDelegate+ResponsysNotification.h"

@interface Responsys : CDVPlugin {
  // Member variables go here.
}

- (void)registerUserID:(CDVInvokedUrlCommand*)command;
- (void)unregisterUserID:(CDVInvokedUrlCommand*)command;
- (void)getUserID:(CDVInvokedUrlCommand*)command;
@end

@implementation Responsys

- (void)registerUserID:(CDVInvokedUrlCommand*)command
{
    NSString* userID = [command.arguments objectAtIndex:0];

    if (userID != nil && [userID length] > 0) {
        [[PushIOManager sharedInstance] registerUserID:userID];
    }
}

- (void)unregisterUserID:(CDVInvokedUrlCommand*)command
{
     [[PushIOManager sharedInstance] registerUserID:nil];
}

- (void)getUserID:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    NSString *userID = [[PushIOManager sharedInstance] getUserID];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:userID];

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)registerForAllRemoteNotificationTypes:(CDVInvokedUrlCommand*)command
{
    // Requests a device token from Apple
    [[PushIOManager sharedInstance] registerForAllRemoteNotificationTypes:^(NSError *error, NSString *deviceToken)
     {
         if (nil == error) {
             CDVPluginResult* pluginResult = nil;

             NSError *regTrackError = nil;
             [[PushIOManager sharedInstance] registerApp:&regTrackError completionHandler:^(NSError *regAppError, NSString *response)
              {
                  if (nil == regAppError){
                      NSLog(@"Application registered successfully!");
                  }else{
                      NSLog(@"Unable to register application, reason: %@", regAppError.description);
                  }
              }];
             if (nil == regTrackError) {
                 NSLog(@"Registration locally stored successfully.");
             }else{
                 NSLog(@"Unable to store registration, reason: %@", regTrackError.description);
             }

             // return deviceToken
             pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:deviceToken];
             [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
         }
     }];
}

@end
