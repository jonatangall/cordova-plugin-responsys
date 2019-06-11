package responsys;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.os.Bundle;
import org.apache.cordova.*;
import com.pushio.manager.PIOApplication;
import android.app.Application;
import android.content.Context;
import android.os.Bundle;
import org.apache.cordova.*;
import android.support.multidex.MultiDex;

public class MyApplication extends PIOApplication
{
    public static final String TAG = "MyApplication extends PIOApplication";

    @Override
    public void onCreate()
    {
        // Log.d(TAG, "onCreate()");
        // DO SOME STUFF
        super.onCreate();
    }

    @Override
    public void onActivityResumed(Activity activity) {
        super.onActivityResumed(activity);
    }

    // Note: This is to Enable Multidex for Apps with Over 64K Methods - https://developer.android.com/studio/build/multidex.html.
    // What was there before ? - We used plugin https://github.com/podtrackers/cordova-multidex to enable Multidex.
    // What was the reason for change ? The plugin edits the manifest file to set android:name in the <application> tag as follows android:name="android.support.multidex.MultiDexApplication"
    // What's is wrong with that - It would conflict with Responsys app lifecycle events - "For the SDK to correctly receive app lifecycle events (and therefore display the In-App messages and Rich Push messages), you must extend the PIOApplication class in your own Application class. If you currently do not have an Application class, you must implement it as described in the Android docs while extending the PIOApplication class:" [https://docs.oracle.com/cloud/latest/marketingcs_gs/OMCFB/android/in-app-msg/](https://docs.oracle.com/cloud/latest/marketingcs_gs/OMCFB/android/in-app-msg/)

    @Override
    protected void attachBaseContext(Context base) {
     super.attachBaseContext(base);
     MultiDex.install(this);
    }
}
