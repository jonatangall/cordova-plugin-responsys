package responsys;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.pushio.manager.PushIOManager;

import org.apache.cordova.BuildConfig;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import android.content.Context;

/**
 * This class echoes a string called from JavaScript.
 */
public class Responsys extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        Context context = this.cordova.getActivity().getApplicationContext();
        boolean useLocation = false;
        PushIOManager.getInstance(context).registerApp(useLocation);

        if (action.equals("registerUserID")) {
            String emailId = args.getString(0);
            this.registerUserID(emailId, callbackContext);
            return true;
        } else if (action.equals("unregisterUserID")) {
            this.unregisterUserID(callbackContext);
            return true;
        } else if (action.equals("getRegisteredUserID")) {
            this.getRegisteredUserID(callbackContext);
            return true;
        }
        return false;
    }

    private void registerUserID(String emailId, CallbackContext callbackContext) {
        PushIOManager.getInstance(this.cordova.getActivity().getApplicationContext()).registerUserId(emailId); // Registers a "known user"
    }

    private void unregisterUserID(CallbackContext callbackContext) {
        // Note: the method name of android is `unregisterUserId` but for iOS it is `unregisterUserID`
        PushIOManager.getInstance(this.cordova.getActivity().getApplicationContext()).unregisterUserId(); //  Removes the value from the USER_IDENTIFIER_ field in the App Channel List record
    }

    private void getRegisteredUserID(CallbackContext callbackContext) {
        // Note: the method name of android is `getRegisteredUserId` but for iOS it is `getRegisteredUserID`
        PushIOManager.getInstance(this.cordova.getActivity().getApplicationContext()).getRegisteredUserId(); // Retrieves the registered userID of a "known user"
    }
}
