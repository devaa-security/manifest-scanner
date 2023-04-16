import { BaseJavaCstVisitorWithDefaults } from "java-parser";
import ManifestPlugin from "../ManifestPlugin";
import { Severity, searchKeywordInFile } from "../util";
import { getJavaFiles } from "../../utils/fileutils";
const { parse } = require("java-parser");
import * as fs from "fs";

export default class ExportedComponentRule extends ManifestPlugin {
  BAD_EXPORTED_TAGS = [
    "activity",
    "activity-alias",
    "service",
    "receiver",
    "provider",
  ];

  COMPONENT_ENTRIES = {
    activity: ["onCreate", "onStart"],
    "activity-alias": ["onCreate", "onStart"],
    receiver: ["onReceive"],
    service: ["onCreate", "onBind", "onStartCommand", "onHandleIntent"],
    provider: ["onReceive"],
  };

  EXTRAS_METHOD_NAMES = [
    "getExtras",
    "getStringExtra",
    "getIntExtra",
    "getIntArrayExtra",
    "getFloatExtra",
    "getFloatArrayExtra",
    "getDoubleExtra",
    "getDoubleArrayExtra",
    "getCharExtra",
    "getCharArrayExtra",
    "getByteExtra",
    "getByteArrayExtra",
    "getBundleExtra",
    "getBooleanExtra",
    "getBooleanArrayExtra",
    "getCharSequenceArrayExtra",
    "getCharSequenceArrayListExtra",
    "getCharSequenceExtra",
    "getIntegerArrayListExtra",
    "getLongArrayExtra",
    "getLongExtra",
    "getParcelableArrayExtra",
    "getParcelableArrayListExtra",
    "getParcelableExtra",
    "getSerializableExtra",
    "getShortArrayExtra",
    "getShortExtra",
    "getStringArrayExtra",
    "getStringArrayListExtra",
    "getString",
    "getInt",
  ];

  PROTECTED_BROADCASTS = [
    "android.intent.action.SCREEN_OFF",
    "android.intent.action.SCREEN_ON",
    "android.intent.action.USER_PRESENT",
    "android.intent.action.TIME_TICK",
    "android.intent.action.TIMEZONE_CHANGED",
    "android.intent.action.BOOT_COMPLETED",
    "android.intent.action.PACKAGE_INSTALL",
    "android.intent.action.PACKAGE_ADDED",
    "android.intent.action.PACKAGE_REPLACED",
    "android.intent.action.MY_PACKAGE_REPLACED",
    "android.intent.action.PACKAGE_REMOVED",
    "android.intent.action.PACKAGE_FULLY_REMOVED",
    "android.intent.action.PACKAGE_CHANGED",
    "android.intent.action.PACKAGE_RESTARTED",
    "android.intent.action.PACKAGE_DATA_CLEARED",
    "android.intent.action.PACKAGE_FIRST_LAUNCH",
    "android.intent.action.PACKAGE_NEEDS_VERIFICATION",
    "android.intent.action.PACKAGE_VERIFIED",
    "android.intent.action.UID_REMOVED",
    "android.intent.action.QUERY_PACKAGE_RESTART",
    "android.intent.action.CONFIGURATION_CHANGED",
    "android.intent.action.LOCALE_CHANGED",
    "android.intent.action.BATTERY_CHANGED",
    "android.intent.action.BATTERY_LOW",
    "android.intent.action.BATTERY_OKAY",
    "android.intent.action.ACTION_POWER_CONNECTED",
    "android.intent.action.ACTION_POWER_DISCONNECTED",
    "android.intent.action.ACTION_SHUTDOWN",
    "android.intent.action.DEVICE_STORAGE_LOW",
    "android.intent.action.DEVICE_STORAGE_OK",
    "android.intent.action.DEVICE_STORAGE_FULL",
    "android.intent.action.DEVICE_STORAGE_NOT_FULL",
    "android.intent.action.NEW_OUTGOING_CALL",
    "android.intent.action.REBOOT",
    "android.intent.action.DOCK_EVENT",
    "android.intent.action.MASTER_CLEAR_NOTIFICATION",
    "android.intent.action.USER_ADDED",
    "android.intent.action.USER_REMOVED",
    "android.intent.action.USER_STOPPED",
    "android.intent.action.USER_BACKGROUND",
    "android.intent.action.USER_FOREGROUND",
    "android.intent.action.USER_SWITCHED",
    "android.app.action.ENTER_CAR_MODE",
    "android.app.action.EXIT_CAR_MODE",
    "android.app.action.ENTER_DESK_MODE",
    "android.app.action.EXIT_DESK_MODE",
    "android.appwidget.action.APPWIDGET_UPDATE_OPTIONS",
    "android.appwidget.action.APPWIDGET_DELETED",
    "android.appwidget.action.APPWIDGET_DISABLED",
    "android.appwidget.action.APPWIDGET_ENABLED",
    "android.backup.intent.RUN",
    "android.backup.intent.CLEAR",
    "android.backup.intent.INIT",
    "android.bluetooth.adapter.action.STATE_CHANGED",
    "android.bluetooth.adapter.action.SCAN_MODE_CHANGED",
    "android.bluetooth.adapter.action.DISCOVERY_STARTED",
    "android.bluetooth.adapter.action.DISCOVERY_FINISHED",
    "android.bluetooth.adapter.action.LOCAL_NAME_CHANGED",
    "android.bluetooth.adapter.action.CONNECTION_STATE_CHANGED",
    "android.bluetooth.device.action.FOUND",
    "android.bluetooth.device.action.DISAPPEARED",
    "android.bluetooth.device.action.CLASS_CHANGED",
    "android.bluetooth.device.action.ACL_CONNECTED",
    "android.bluetooth.device.action.ACL_DISCONNECT_REQUESTED",
    "android.bluetooth.device.action.ACL_DISCONNECTED",
    "android.bluetooth.device.action.NAME_CHANGED",
    "android.bluetooth.device.action.BOND_STATE_CHANGED",
    "android.bluetooth.device.action.NAME_FAILED",
    "android.bluetooth.device.action.PAIRING_REQUEST",
    "android.bluetooth.device.action.PAIRING_CANCEL",
    "android.bluetooth.device.action.CONNECTION_ACCESS_REPLY",
    "android.bluetooth.headset.profile.action.CONNECTION_STATE_CHANGED",
    "android.bluetooth.headset.profile.action.AUDIO_STATE_CHANGED",
    "android.bluetooth.headset.action.VENDOR_SPECIFIC_HEADSET_EVENT",
    "android.bluetooth.a2dp.profile.action.CONNECTION_STATE_CHANGED",
    "android.bluetooth.a2dp.profile.action.PLAYING_STATE_CHANGED",
    "android.bluetooth.input.profile.action.CONNECTION_STATE_CHANGED",
    "android.bluetooth.pan.profile.action.CONNECTION_STATE_CHANGED",
    "android.hardware.display.action.WIFI_DISPLAY_STATUS_CHANGED",
    "android.hardware.usb.action.USB_STATE",
    "android.hardware.usb.action.USB_ACCESSORY_ATTACHED",
    "android.hardware.usb.action.USB_ACCESSORY_ATTACHED",
    "android.hardware.usb.action.USB_DEVICE_ATTACHED",
    "android.hardware.usb.action.USB_DEVICE_DETACHED",
    "android.intent.action.HEADSET_PLUG",
    "android.intent.action.ANALOG_AUDIO_DOCK_PLUG",
    "android.intent.action.DIGITAL_AUDIO_DOCK_PLUG",
    "android.intent.action.HDMI_AUDIO_PLUG",
    "android.intent.action.USB_AUDIO_ACCESSORY_PLUG",
    "android.intent.action.USB_AUDIO_DEVICE_PLUG",
    "android.net.conn.CONNECTIVITY_CHANGE",
    "android.net.conn.CONNECTIVITY_CHANGE_IMMEDIATE",
    "android.net.conn.DATA_ACTIVITY_CHANGE",
    "android.net.conn.BACKGROUND_DATA_SETTING_CHANGED",
    "android.net.conn.CAPTIVE_PORTAL_TEST_COMPLETED",
    "android.nfc.action.LLCP_LINK_STATE_CHANGED",
    "com.android.nfc_extras.action.RF_FIELD_ON_DETECTED",
    "com.android.nfc_extras.action.RF_FIELD_OFF_DETECTED",
    "com.android.nfc_extras.action.AID_SELECTED",
    "android.nfc.action.TRANSACTION_DETECTED",
    "android.intent.action.CLEAR_DNS_CACHE",
    "android.intent.action.PROXY_CHANGE",
    "android.os.UpdateLock.UPDATE_LOCK_CHANGED",
    "android.intent.action.DREAMING_STARTED",
    "android.intent.action.DREAMING_STOPPED",
    "android.intent.action.ANY_DATA_STATE",
    "com.android.server.WifiManager.action.START_SCAN",
    "com.android.server.WifiManager.action.DELAYED_DRIVER_STOP",
    "android.net.wifi.WIFI_STATE_CHANGED",
    "android.net.wifi.WIFI_AP_STATE_CHANGED",
    "android.net.wifi.WIFI_SCAN_AVAILABLE",
    "android.net.wifi.SCAN_RESULTS",
    "android.net.wifi.RSSI_CHANGED",
    "android.net.wifi.STATE_CHANGE",
    "android.net.wifi.LINK_CONFIGURATION_CHANGED",
    "android.net.wifi.CONFIGURED_NETWORKS_CHANGE",
    "android.net.wifi.supplicant.CONNECTION_CHANGE",
    "android.net.wifi.supplicant.STATE_CHANGE",
    "android.net.wifi.p2p.STATE_CHANGED",
    "android.net.wifi.p2p.DISCOVERY_STATE_CHANGE",
    "android.net.wifi.p2p.THIS_DEVICE_CHANGED",
    "android.net.wifi.p2p.PEERS_CHANGED",
    "android.net.wifi.p2p.CONNECTION_STATE_CHANGE",
    "android.net.wifi.p2p.PERSISTENT_GROUPS_CHANGED",
    "android.net.conn.TETHER_STATE_CHANGED",
    "android.net.conn.INET_CONDITION_ACTION",
    "android.intent.action.EXTERNAL_APPLICATIONS_AVAILABLE",
    "android.intent.action.EXTERNAL_APPLICATIONS_UNAVAILABLE",
    "android.intent.action.AIRPLANE_MODE",
    "android.intent.action.ADVANCED_SETTINGS",
    "android.intent.action.BUGREPORT_FINISHED",
    "android.intent.action.ACTION_IDLE_MAINTENANCE_START",
    "android.intent.action.ACTION_IDLE_MAINTENANCE_END",
    "android.intent.action.SERVICE_STATE",
    "android.intent.action.RADIO_TECHNOLOGY",
    "android.intent.action.EMERGENCY_CALLBACK_MODE_CHANGED",
    "android.intent.action.SIG_STR",
    "android.intent.action.ANY_DATA_STATE",
    "android.intent.action.DATA_CONNECTION_FAILED",
    "android.intent.action.SIM_STATE_CHANGED",
    "android.intent.action.NETWORK_SET_TIME",
    "android.intent.action.NETWORK_SET_TIMEZONE",
    "android.intent.action.ACTION_SHOW_NOTICE_ECM_BLOCK_OTHERS",
    "android.intent.action.ACTION_MDN_STATE_CHANGED",
    "android.provider.Telephony.SPN_STRINGS_UPDATED",
    "android.provider.Telephony.SIM_FULL",
    "com.android.internal.telephony.data-restart-trysetup",
    "com.android.internal.telephony.data-stall",
  ];

  EXPORTED_AND_PERMISSION_TAG = `The {tag} {tag_name} tag is exported and protected by a permission,
but the permission can be obtained by malicious apps installed
prior to this one. More info:
https://github.com/commonsguy/cwac-security/blob/master/PERMS.md.
Failing to protect {tag} tags could leave them vulnerable to attack 
by malicious apps. The {tag} tags should be reviewed for 
vulnerabilities, such as injection and information leakage.`;

  EXPORTED_IN_PROTECTED = `The {tag} {tag_name} is exported, but the associated Intents can only be sent 
by SYSTEM level apps. They could still potentially be vulnerable,
if the Intent carries data that is tainted (2nd order injection)`;

  EXPORTED = `The {tag} {tag_name} is exported, but not protected by any permissions. Failing to protect
{tag} tags could leave them vulnerable to attack by malicious apps. The
{tag} tags should be reviewed for vulnerabilities, such as injection and information leakage.`;

  EXPORTED_TAGS_ISSUE_NAME = "Exported tags";

  constructor() {
    super("Manifest", Severity.VULNERABILITY, "Exported components:");
  }

  run(): void {
    console.log("✅ Running Exported Component Rule");
    // Parse Android Manifest for exported components
    // filter noise permission usage
    // filter noise exported=false
    // Parse Android:name value and Start finding Implementation
    // using JavaParser / KotlinParser and build AST
    // find lifecycle method implementation first
    // find for method invocation of Intent accepting APIs
    // Mark these classes as vulnerable

    this.BAD_EXPORTED_TAGS.forEach((exported_tag) => {
      let tags =
        ManifestPlugin.manifestXMLObject.manifest.application[0][exported_tag];
      if (tags) {
        tags.forEach((tag: any) => {
          this.checkManifestIssue(exported_tag, tag);
        });
      }
    });

    // write a code to traverse directory recursively and get all java files
    const directoryPath =
      "C:\\Users\\Shiva\\AndroidStudioProjects\\DEVAAVulnerableApp";
    let javaFiles = [];
    javaFiles = getJavaFiles(directoryPath);
    // console.log(javaFiles)

    javaFiles.forEach((javaFile) => {
      // read file using fs
      // const file = fs.readFileSync(javaFile, "utf8");
      // // console.log(file);
      // const cst = parse(file);
      // //  console.log(cst);
      // const methodcollector = new MethodCollector();
      // // The CST result from the previous code snippet
      // methodcollector.visit(cst);
      // methodcollector.customResult.forEach((arrowOffset) => {
      //   console.log(arrowOffset);
      // });
    });
  }

  checkManifestIssue(exported_tag: string, tag: any): void {
    const isExported = tag.$["android:exported"];
    const hasIntentFilter = tag["intent-filter"];
    const permission = tag.$["android:permission"];
    const name = tag.$["android:name"];
    const tag_info = TAG_INFO[exported_tag];
    const isProvider = exported_tag == "provider";

    if (isExported == "false") {
      return;
    }

    if ((isExported && isExported != "false") || isProvider) {
      if (
        (isProvider && ManifestPlugin.minSdk > 16) ||
        ManifestPlugin.targetSdk > 16
      ) {
        return;
      }

      if (permission && ManifestPlugin.minSdk < 20) {
        const result = searchKeywordInFile(
          ManifestPlugin.manifestPath,
          exported_tag
        );

        this.issues.push({
          category: "Manifest",
          severity: Severity.INFO,
          description: this.EXPORTED_AND_PERMISSION_TAG,
          file: ManifestPlugin.manifestPath,
          line: result?.line,
          column: result?.column,
        });
      } else if (isExported && !hasIntentFilter) {
        const result = searchKeywordInFile(
          ManifestPlugin.manifestPath,
          exported_tag
        );

        this.issues.push({
          category: "Manifest",
          severity: Severity.WARNING,
          description: this.EXPORTED,
          file: ManifestPlugin.manifestPath,
          line: result?.line,
          column: result?.column,
        });
      }

      if (hasIntentFilter) {
        hasIntentFilter.forEach((intentFilter: any) => {
          const actions = intentFilter["action"];
          if (actions) {
            actions.forEach((action: any) => {
              const actionName = action.$["android:name"];

              const result = searchKeywordInFile(
                ManifestPlugin.manifestPath,
                actionName
              );

              if (this.PROTECTED_BROADCASTS.includes(actionName)) {
                this.issues.push({
                  category: "Manifest",
                  severity: Severity.INFO,
                  description: this.EXPORTED_IN_PROTECTED,
                  file: ManifestPlugin.manifestPath,
                  line: result?.line,
                  column: result?.column,
                });
              } else if (permission && ManifestPlugin.minSdk < 20) {
                this.issues.push({
                  category: "Manifest",
                  severity: Severity.INFO,
                  description: this.EXPORTED_AND_PERMISSION_TAG,
                  file: ManifestPlugin.manifestPath,
                  line: result?.line,
                  column: result?.column,
                });
              } else {
                this.issues.push({
                  category: "Manifest",
                  severity: Severity.WARNING,
                  description: this.EXPORTED,
                  file: ManifestPlugin.manifestPath,
                  line: result?.line,
                  column: result?.column,
                });
              }
            });
          }
        });
      }
    }
  }
}

class Receiver {
  id = 1;
  type = "receiver";
  parent = "exportedReceivers";
}

class Provider {
  id = 2;
  type = "provider";
  parent = "exportedContentProviders";
}

class Activity {
  id = 3;
  type = "activity";
  parent = "exportedActivities";
}

class Broadcast {
  id = 4;
  type = "broadcast";
  parent = "exportedBroadcasts";
}

class Service {
  id = 5;
  parent = "exportedServices";
  type = "service";
}

const TAG_INFO: any = {
  receiver: Receiver,
  provider: Provider,
  activity: Activity,
  "activity-alias": Activity,
  service: Service,
};

class MethodCollector extends BaseJavaCstVisitorWithDefaults {
  customResult: any[];
  constructor() {
    super();
    this.customResult = [];
    this.validateVisitor();
  }

  // methodDeclarator - method declaration
  // method

  // This method override gives you actual method declaration like onCreate, onClick, onCreateOptionsMenu
  methodDeclarator(ctx: any) {
    //console.log(ctx.Identifier[0].image);
    this.customResult.push(ctx.Identifier[0].image);
  }

  // this method resembles method invocation call
  // methodInvocationSuffix(ctx: any) {
  //   console.log(ctx)
  // }

  // this method gets you the method invoker argument list
  // argumentList(ctx: any) {
  //   console.log(ctx.expression);
  // }

  // importDeclaration(ctx: any) {
  //   console.log(ctx.packageOrTypeName[0].children.Identifier);
  // }
}
