# EJS-JSSDK API 能力矩阵（离线镜像，提取自 epoint-mrc-mcp@0.1.0 源码）
> 图例：Auth=需授权；Sys=系统API；Android/iOS=平台支持；Card=卡片容器可用

## audio（5 个方法）

| 方法 | Auth | Sys | Android | iOS | Card |
|---|---|---|---|---|---|
| startRecord | ✓ |  | ✓ | ✓ | ✓ |
| stopRecord | ✓ |  | ✓ | ✓ | ✓ |
| cancelRecord | ✓ |  | ✓ | ✓ | ✓ |
| startPlay | ✓ |  | ✓ | ✓ | ✓ |
| stopPlay | ✓ |  | ✓ | ✓ | ✓ |

## auth（6 个方法）

| 方法 | Auth | Sys | Android | iOS | Card |
|---|---|---|---|---|---|
| getToken | ✓ | ✓ | ✓ | ✓ | ✓ |
| refreshToken | ✓ | ✓ | ✓ | ✓ | ✓ |
| getUserInfo | ✓ | ✓ | ✓ | ✓ | ✓ |
| getAuthCode | ✓ |  | ✓ | ✓ | ✓ |
| getUserAuthCode | ✓ |  | ✓ | ✓ | ✓ |
| logoutUserWithAlert | ✓ | ✓ | ✓ | ✓ | ✓ |

## device（23 个方法）

| 方法 | Auth | Sys | Android | iOS | Card |
|---|---|---|---|---|---|
| setOrientation |  |  | ✓ | ✓ |  |
| setZoomControl |  |  | ✓ |  | ✓ |
| setBounce |  |  |  | ✓ | ✓ |
| getDeviceId |  |  | ✓ | ✓ | ✓ |
| getMacAddress |  |  | ✓ |  | ✓ |
| getScreenInfo |  |  | ✓ | ✓ | ✓ |
| getVendorInfo |  |  | ✓ | ✓ | ✓ |
| callPhone | ✓ |  | ✓ | ✓ | ✓ |
| sendMsg | ✓ |  | ✓ | ✓ | ✓ |
| closeInputKeyboard |  |  | ✓ | ✓ | ✓ |
| isTablet |  |  | ✓ | ✓ | ✓ |
| sendTo | ✓ |  | ✓ | ✓ | ✓ |
| getNetWorkInfo |  |  | ✓ | ✓ | ✓ |
| beep | ✓ |  | ✓ | ✓ | ✓ |
| vibrate | ✓ |  | ✓ | ✓ | ✓ |
| shakeEnable |  |  | ✓ | ✓ | ✓ |
| shakeDisable |  |  | ✓ | ✓ | ✓ |
| checkPermissions |  |  | ✓ | ✓ | ✓ |
| requestPermissions | ✓ |  | ✓ | ✓ | ✓ |
| goAppSetting | ✓ |  | ✓ | ✓ | ✓ |
| setEnableShot |  |  | ✓ |  | ✓ |
| getDeviceInfo |  |  | ✓ | ✓ | ✓ |
| isHasVirtualPosApp |  |  | ✓ |  | ✓ |

## event（7 个方法）

| 方法 | Auth | Sys | Android | iOS | Card |
|---|---|---|---|---|---|
| registerEvent |  |  | ✓ | ✓ | ✓ |
| unRegisterEvent |  |  | ✓ | ✓ | ✓ |
| isRegisterEvent |  |  | ✓ | ✓ | ✓ |
| on |  |  | ✓ | ✓ | ✓ |
| once |  |  | ✓ | ✓ | ✓ |
| emit |  |  | ✓ | ✓ | ✓ |
| off |  |  | ✓ | ✓ | ✓ |

## io（9 个方法）

| 方法 | Auth | Sys | Android | iOS | Card |
|---|---|---|---|---|---|
| downloadFile | ✓ |  | ✓ | ✓ | ✓ |
| selectFile | ✓ |  | ✓ | ✓ | ✓ |
| openFile |  |  | ✓ | ✓ | ✓ |
| deleteFile | ✓ |  | ✓ | ✓ | ✓ |
| renameFile | ✓ |  | ✓ | ✓ | ✓ |
| copyFile | ✓ |  | ✓ | ✓ | ✓ |
| getFileSize |  |  | ✓ | ✓ | ✓ |
| screenShot | ✓ |  | ✓ | ✓ | ✓ |
| report |  |  | ✓ | ✓ | ✓ |

## navigator（17 个方法）

| 方法 | Auth | Sys | Android | iOS | Card |
|---|---|---|---|---|---|
| hide |  |  | ✓ | ✓ |  |
| show |  |  | ✓ | ✓ |  |
| hideBackBtn |  |  | ✓ | ✓ |  |
| hookSysBack |  |  | ✓ |  |  |
| hookBackBtn |  |  | ✓ | ✓ |  |
| setTitle |  |  | ✓ | ✓ |  |
| setMultiTitle |  |  | ✓ | ✓ |  |
| setRightBtn |  |  | ✓ | ✓ |  |
| setLeftBtn |  |  | ✓ | ✓ |  |
| showSearchBar |  |  | ✓ | ✓ |  |
| hideSearchBar |  |  | ✓ | ✓ |  |
| setSearchWord |  |  | ✓ | ✓ |  |
| getSearchWord |  |  | ✓ | ✓ |  |
| showStatusBar |  |  | ✓ | ✓ |  |
| hideStatusBar |  |  | ✓ | ✓ |  |
| setSearchBar |  |  | ✓ | ✓ |  |
| setRightMenu |  |  | ✓ | ✓ |  |

## page（6 个方法）

| 方法 | Auth | Sys | Android | iOS | Card |
|---|---|---|---|---|---|
| open |  |  | ✓ | ✓ | ✓ |
| openLocal | ✓ | ✓ | ✓ | ✓ | ✓ |
| close |  |  | ✓ | ✓ |  |
| reload |  |  | ✓ | ✓ | ✓ |
| showError |  |  | ✓ | ✓ | ✓ |
| replace |  |  | ✓ | ✓ | ✓ |

## runtime（18 个方法）

| 方法 | Auth | Sys | Android | iOS | Card |
|---|---|---|---|---|---|
| getAppKey | ✓ | ✓ | ✓ | ✓ | ✓ |
| getPlatformUrl | ✓ | ✓ | ✓ | ✓ | ✓ |
| launchApp |  |  | ✓ | ✓ | ✓ |
| getAppVersion |  |  | ✓ | ✓ | ✓ |
| getEjsVersion |  |  | ✓ | ✓ | ✓ |
| getPluginVersion |  |  | ✓ | ✓ | ✓ |
| getGeolocation | ✓ |  | ✓ | ✓ | ✓ |
| clearCache |  |  | ✓ | ✓ | ✓ |
| clipboard |  |  | ✓ | ✓ | ✓ |
| openUrl |  |  | ✓ | ✓ | ✓ |
| logPanel |  |  | ✓ | ✓ | ✓ |
| isApplicationExist | ✓ |  | ✓ | ✓ | ✓ |
| openSetting | ✓ |  | ✓ | ✓ | ✓ |
| securityType | ✓ | ✓ | ✓ | ✓ | ✓ |
| platform | ✓ | ✓ | ✓ | ✓ | ✓ |
| canIUse |  |  | ✓ | ✓ | ✓ |
| startLocationUpdate |  |  | ✓ | ✓ | ✓ |
| stopLocationUpdate |  |  | ✓ | ✓ | ✓ |

## storage（10 个方法）

| 方法 | Auth | Sys | Android | iOS | Card |
|---|---|---|---|---|---|
| getBusinessRestUrl | ✓ |  | ✓ | ✓ | ✓ |
| getItem | ✓ |  | ✓ | ✓ | ✓ |
| setItem | ✓ |  | ✓ | ✓ | ✓ |
| removeItem | ✓ |  | ✓ | ✓ | ✓ |
| getPlatformPrivateParam |  |  | ✓ | ✓ | ✓ |
| getShareItem | ✓ |  | ✓ | ✓ | ✓ |
| setShareItem | ✓ |  | ✓ | ✓ | ✓ |
| removeShareItem |  |  | ✓ | ✓ | ✓ |
| getPlatformShareParam |  |  | ✓ | ✓ | ✓ |
| getPlatformParam |  |  | ✓ | ✓ | ✓ |

## stream（2 个方法）

| 方法 | Auth | Sys | Android | iOS | Card |
|---|---|---|---|---|---|
| fetch | ✓ |  | ✓ | ✓ | ✓ |
| uploadMultipartFile | ✓ |  | ✓ | ✓ | ✓ |

## ui（16 个方法）

| 方法 | Auth | Sys | Android | iOS | Card |
|---|---|---|---|---|---|
| toast |  |  | ✓ | ✓ | ✓ |
| closeWaiting |  |  | ✓ | ✓ | ✓ |
| showWaiting |  |  | ✓ | ✓ | ✓ |
| showDebugDialog |  |  | ✓ | ✓ | ✓ |
| confirm |  |  | ✓ | ✓ | ✓ |
| alert |  |  | ✓ | ✓ | ✓ |
| prompt |  |  | ✓ | ✓ | ✓ |
| select |  |  | ✓ | ✓ | ✓ |
| pickDate |  |  | ✓ | ✓ | ✓ |
| pickMonth |  |  | ✓ | ✓ | ✓ |
| pickTime |  |  | ✓ | ✓ | ✓ |
| pickDateTime |  |  | ✓ | ✓ | ✓ |
| actionSheet |  |  | ✓ | ✓ | ✓ |
| popPicker |  |  | ✓ | ✓ | ✓ |
| popWindow |  |  | ✓ | ✓ |  |
| toastAndEvent |  |  | ✓ | ✓ | ✓ |

## util（14 个方法）

| 方法 | Auth | Sys | Android | iOS | Card |
|---|---|---|---|---|---|
| scan |  |  | ✓ | ✓ | ✓ |
| createQRCode |  |  | ✓ | ✓ | ✓ |
| recognizeQRCode |  |  | ✓ | ✓ | ✓ |
| playVideo |  |  | ✓ | ✓ | ✓ |
| recordVideo | ✓ |  | ✓ | ✓ | ✓ |
| goSearch | ✓ |  | ✓ | ✓ | ✓ |
| getPreviewUrl | ✓ |  | ✓ | ✓ | ✓ |
| selectImage | ✓ |  | ✓ | ✓ | ✓ |
| selectVideo | ✓ |  | ✓ | ✓ | ✓ |
| prevImage |  |  | ✓ | ✓ | ✓ |
| cameraImage | ✓ |  | ✓ | ✓ | ✓ |
| encrypt | ✓ |  | ✓ | ✓ | ✓ |
| decrypt | ✓ |  | ✓ | ✓ | ✓ |
| invokePluginApi | ✓ |  | ✓ | ✓ | ✓ |

## contact（2 个方法）

| 方法 | Auth | Sys | Android | iOS | Card |
|---|---|---|---|---|---|
| select | ✓ |  | ✓ | ✓ | ✓ |
| choose | ✓ |  | ✓ | ✓ | ✓ |

## basicCard（3 个方法）

| 方法 | Auth | Sys | Android | iOS | Card |
|---|---|---|---|---|---|
| showBigCardEntrance | ✓ |  | ✓ | ✓ | ✓ |
| setBigCardTitle | ✓ |  | ✓ | ✓ | ✓ |
| setCardHeight | ✓ |  | ✓ | ✓ | ✓ |

## miniH5（10 个方法）

| 方法 | Auth | Sys | Android | iOS | Card |
|---|---|---|---|---|---|
| navigateTo |  |  | ✓ | ✓ | ✓ |
| navigateBack |  |  | ✓ | ✓ | ✓ |
| close |  |  | ✓ | ✓ |  |
| onNavigateBack |  |  | ✓ | ✓ |  |
| setNavigationBarColor |  |  | ✓ | ✓ |  |
| setNavigationBarTitle |  |  | ✓ | ✓ |  |
| getEpointCodeInfo |  |  | ✓ | ✓ | ✓ |
| checkForUpdate |  |  | ✓ | ✓ |  |
| applyUpdate |  |  | ✓ | ✓ |  |
| applyCard |  |  | ✓ | ✓ |  |
