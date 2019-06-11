#import "AppDelegate+ResponsysNotification.h"
#import <objc/runtime.h>

@implementation AppDelegate (ResponsysNotification)

- (id) getCommandInstance:(NSString*)className
{
    return [self.viewController getCommandInstance:className];
}

// its dangerous to override a method from within a category.
// Instead we will use method swizzling. we set this up in the load call.
+ (void)load
{
    Method original, swizzled;

    original = class_getInstanceMethod(self, @selector(init));
    swizzled = class_getInstanceMethod(self, @selector(swizzled_init));
    method_exchangeImplementations(original, swizzled);
}

- (AppDelegate *)swizzled_init
{
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(finishLaunching:)
                                                 name:@"UIApplicationDidFinishLaunchingNotification" object:nil];

    // This actually calls the original init method over in AppDelegate. Equivilent to calling super
    // on an overrided method, this is not recursive, although it appears that way. neat huh?
    return [self swizzled_init];
}

// Read pushio_config data
- (NSDictionary *)JSONFromFile
{
    NSString *path = [[NSBundle mainBundle] pathForResource:@"pushio_config" ofType:@"json"];
    NSData *data = [NSData dataWithContentsOfFile:path];
    return [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:nil];
}

- (void)finishLaunching:(NSNotification *)notification
{
    [UNUserNotificationCenter currentNotificationCenter].delegate= self;
    NSString *apiKey = nil;
    NSString *accountToken = nil;

    NSDictionary *dict = [self JSONFromFile];
    NSArray *pushio = [dict objectForKey:@"pushio"];

    // Set apiKey, accountToken from JSON data
    for (NSString *key in pushio) {
        if ([key isEqualToString:@"apiKey"]) {
            apiKey = [pushio valueForKey:key];
        } else if ([key isEqualToString:@"accountToken"]) {
            accountToken = [pushio valueForKey:key];
        }
    }

    #ifdef DEBUG
        [[PushIOManager sharedInstance] setLoggingEnabled:YES];
        [[PushIOManager sharedInstance] setLogLevel:PIOLogLevelVerbose];
         //PIOLogLevelWarn or PIOLogLevelError
         [PushIOManager sharedInstance].configType = PIOConfigTypeDebug; //load pushio_config_debug.json
    #else
        [[PushIOManager sharedInstance] setLoggingEnabled:NO];
        // [[PushIOManager sharedInstance] setLogLevel:PIOLogLevelVerbose];
        [PushIOManager sharedInstance].configType = PIOConfigTypeRelease;//load pushio_config.json

    #endif

    NSError *error = nil;
    [[PushIOManager sharedInstance] configureWithAPIKey:apiKey accountToken:accountToken error:&error];
    if(nil == error)
    {
        NSLog(@"SDK configured successfully.");
    }
    else
    {
        NSLog(@"Unable to configure SDK, reason: %@", error.description);
    }

    //  iOS 10+ UserNotifications
    [PushIOManager sharedInstance].notificationPresentationOptions = UNNotificationPresentationOptionAlert|UNNotificationPresentationOptionSound|UNNotificationPresentationOptionBadge;
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:
    (NSData *)deviceToken
{
    [[PushIOManager sharedInstance]  didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
    [[PushIOManager sharedInstance]  didFailToRegisterForRemoteNotificationsWithError:error];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
{
    [[PushIOManager sharedInstance] didReceiveRemoteNotification:userInfo];

    NSDictionary *payload = [userInfo objectForKey:@"aps"];
    NSString *alertMessage = [payload objectForKey:@"alert"];
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:nil message:alertMessage delegate:self cancelButtonTitle:@"OK" otherButtonTitles:nil];

    [alertView show];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
    [[PushIOManager sharedInstance] didReceiveRemoteNotification:userInfo fetchCompletionResult:UIBackgroundFetchResultNewData fetchCompletionHandler:completionHandler];
}

//iOS 10
-(void) userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:
(UNNotificationResponse *)response withCompletionHandler:(void(^)())completionHandler
{
    [[PushIOManager sharedInstance] userNotificationCenter:center didReceiveNotificationResponse:response
withCompletionHandler:completionHandler];
}

-(void) userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:
(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
    [[PushIOManager sharedInstance] userNotificationCenter:center willPresentNotification:notification
withCompletionHandler:completionHandler];
}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
//- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    BOOL handled = NO;
    // ...
    if ([[PushIOManager sharedInstance] openURL:url sourceApplication:nil annotation:nil]) {
        handled = YES;
    }
    return handled;
}

@end
