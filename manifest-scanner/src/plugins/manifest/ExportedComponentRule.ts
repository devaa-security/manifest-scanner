import { BaseJavaCstVisitorWithDefaults } from "java-parser";
import { ManifestPlugin } from "../ManifestPlugin";
import { Severity, getRelativePath, searchKeywordInFile } from "../util";
import path from "node:path";
import { execFileSync } from "node:child_process";
const { execFile } = require("child_process");

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

    for (const exported_tag of this.BAD_EXPORTED_TAGS) {
      const tags =
        ManifestPlugin.manifestXMLObject.manifest.application[0][exported_tag];
      if (tags) {
        tags.forEach((tag: any) => {
          this.checkManifestIssue(exported_tag, tag);
        });
      }
    }

    // // check if enableAST flag is set
    // if (ManifestPlugin.isASTEnabled) {
    //   const resourceDir = path.resolve(path.join(__dirname, "..", "..", "resource"))

    //   const javaPath = 'java';
    //   const jarPath = path.join(resourceDir, 'android-project-parser-1.0-SNAPSHOT-shaded.jar');
    //   const className = 'MainActivity';

    //   const args = [
    //     '-jar',
    //     jarPath,
    //     'find-methods-declaration-invocations-arguments',
    //     ManifestPlugin.androidProjectDirectory,
    //     className
    //   ];

    //   execFile(javaPath, args, (error: Error | null, stdout: string, stderr: string) => {
    //     if (error) {
    //       console.error(`exec error: ${error}`);
    //     } else {
    //       const methodResults = JSON.parse(stdout)
    //       console.log(methodResults[0].methodInvocations[6].methodName)
    //     }
    //   });

    // }
  }

  checkManifestIssue(exported_tag: string, tag: any): void {
    const isExported = tag.$["android:exported"];
    const hasIntentFilter = tag["intent-filter"];
    const permission = tag.$["android:permission"];
    const name = tag.$["android:name"];
    const tag_info = TAG_INFO[exported_tag];
    const isProvider = exported_tag === "provider";
    let methodResults = [];
    let argumentVal: string[] = [];

    if (isExported === "false") {
      return;
    }

    if (ManifestPlugin.isASTEnabled) {
      const resourceDir = path.resolve(
        path.join(__dirname, "..", "..", "resource")
      );

      const javaPath = "java";
      const jarPath = path.join(
        resourceDir,
        "android-project-parser-1.1-SNAPSHOT-shaded.jar"
      );
      const lastDotIndex = name.lastIndexOf(".");
      const className = name.slice(Math.max(0, lastDotIndex + 1));

      const args = [
        "-jar",
        jarPath,
        "find-methods-declaration-invocations-arguments",
        ManifestPlugin.androidProjectDirectory,
        className,
      ];

      const result = execFileSync(javaPath, args);

      if (result) {
        methodResults = JSON.parse(result.toString());
        if (!methodResults.errorMessage && methodResults.length > 0) {
          const declaredMethods = methodResults;
          declaredMethods.forEach(
            (declaredMethod: { methodInvocations: any[] }) => {
              if (declaredMethod.methodInvocations.length > 0) {
                declaredMethod.methodInvocations.forEach(
                  (methodInvocation: { methodName: string; arguments: [] }) => {
                    if (
                      this.EXTRAS_METHOD_NAMES.includes(
                        methodInvocation.methodName
                      )
                    ) {
                      argumentVal = argumentVal.concat(
                        methodInvocation.arguments
                      );
                    }
                  }
                );
              }
            }
          );
        }
      }
    }

    if ((isExported && isExported !== "false") || isProvider) {
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

        let description = this.EXPORTED_AND_PERMISSION_TAG;
        description = description.replaceAll("{tag}", exported_tag);
        description = description.replace("{tag_name}", name);

        this.issues.push({
          category: "Manifest",
          severity: Severity.INFO,
          name: "Exported Components Check",
          description: description,
          file: getRelativePath(
            ManifestPlugin.androidProjectDirectory,
            ManifestPlugin.manifestPath
          ),
          exploit: {
            exported_enum: name,
            tag_name: exported_tag,
            arguments: argumentVal,
          },
          line: result?.line,
          start_column: result?.start_column,
          end_column: result?.end_column,
        });
      } else if (isExported && !hasIntentFilter) {
        const result = searchKeywordInFile(
          ManifestPlugin.manifestPath,
          exported_tag
        );

        let description = this.EXPORTED;
        description = description.replaceAll("{tag}", exported_tag);
        description = description.replace("{tag_name}", name);

        this.issues.push({
          category: "Manifest",
          severity: Severity.WARNING,
          name: "Exported Components Check",
          description: description,
          file: getRelativePath(
            ManifestPlugin.androidProjectDirectory,
            ManifestPlugin.manifestPath
          ),
          exploit: {
            exported_enum: name,
            tag_name: exported_tag,
            package_name: ManifestPlugin.packageName,
            arguments: argumentVal,
          },
          line: result?.line,
          start_column: result?.start_column,
          end_column: result?.end_column,
        });
      }

      if (hasIntentFilter) {
        hasIntentFilter.forEach((intentFilter: any) => {
          const actions = intentFilter.action;
          if (actions) {
            actions.forEach((action: any) => {
              const actionName = action.$["android:name"];

              const result = searchKeywordInFile(
                ManifestPlugin.manifestPath,
                actionName
              );

              if (this.PROTECTED_BROADCASTS.includes(actionName)) {
                let description = this.EXPORTED_IN_PROTECTED;
                description = description.replaceAll("{tag}", exported_tag);
                description = description.replace("{tag_name}", name);

                this.issues.push({
                  category: "Manifest",
                  severity: Severity.INFO,
                  description: description,
                  name: "Exported Components Check",
                  file: getRelativePath(
                    ManifestPlugin.androidProjectDirectory,
                    ManifestPlugin.manifestPath
                  ),
                  exploit: {
                    exported_enum: name,
                    tag_name: exported_tag,
                    package_name: ManifestPlugin.packageName,
                    arguments: argumentVal,
                  },
                  line: result?.line,
                  start_column: result?.start_column,
                  end_column: result?.end_column,
                });
              } else if (permission && ManifestPlugin.minSdk < 20) {
                let description = this.EXPORTED_AND_PERMISSION_TAG;
                description = description.replaceAll("{tag}", exported_tag);
                description = description.replace("{tag_name}", name);

                this.issues.push({
                  category: "Manifest",
                  severity: Severity.INFO,
                  description: description,
                  name: "Exported Components Check",
                  file: getRelativePath(
                    ManifestPlugin.androidProjectDirectory,
                    ManifestPlugin.manifestPath
                  ),
                  exploit: {
                    exported_enum: name,
                    tag_name: exported_tag,
                    package_name: ManifestPlugin.packageName,
                    arguments: argumentVal,
                  },
                  line: result?.line,
                  start_column: result?.start_column,
                  end_column: result?.end_column,
                });
              } else {
                let description = this.EXPORTED;
                description = description.replaceAll("{tag}", exported_tag);
                description = description.replace("{tag_name}", name);

                this.issues.push({
                  category: "Manifest",
                  severity: Severity.WARNING,
                  description: description,
                  file: getRelativePath(
                    ManifestPlugin.androidProjectDirectory,
                    ManifestPlugin.manifestPath
                  ),
                  exploit: {
                    exported_enum: name,
                    tag_name: exported_tag,
                    package_name: ManifestPlugin.packageName,
                    arguments: argumentVal,
                  },
                  name: "Exported Components Check",
                  line: result?.line,
                  start_column: result?.start_column,
                  end_column: result?.end_column,
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
