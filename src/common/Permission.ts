import { PermissionsAndroid } from 'react-native';

export async function requestCameraPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA, {
            title: 'Permission',
            message: 'Allow MYIB to take pictures and record video.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: "Don't allow",
            buttonPositive: 'Allow',
        },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
            return true;
        } else {
            console.log('Permission denied');
            return false;
        }
    } catch (err) {
        console.warn(err);
        return false;
    }
}

export async function requestAudioPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
            title: 'Permission',
            message: 'Allow MYIB to record audio.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: "Don't allow",
            buttonPositive: 'Allow',
        },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the RECORD_AUDIO');
            return true;
        } else {
            console.log('Permission denied');
            return false;
        }
    } catch (err) {
        console.warn(err);
        return false;
    }
}

export async function requestStoragePermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES, {
            title: 'Permission',
            message: 'Allow MYIB to select pictures and video.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: "Don't allow",
            buttonPositive: 'Allow',
        },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the storage');
            return true;
        } else {
            console.log('Permission denied');
            return false;
        }
    } catch (err) {
        console.warn(err);
        return false;
    }
}

export async function requestNotificationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION, {
            title: 'Permission',
            message: 'Allow MYIB for notifications.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: "Don't allow",
            buttonPositive: 'Allow',
        },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Notification permission allow');
            return true;
        } else {
            console.log('Notification permission denied');
            return false;
        }
    } catch (err) {
        console.warn(err);
        return false;
    }
}


export async function requestExternalStoragePermission() {
    try {
        let isPermitedWriteExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        const isPermitedReadExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);


        if (!isPermitedWriteExternalStorage) {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
                title: "Storage permission needed",
                message: 'Storage permission needed.',
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Don't allow",
                buttonPositive: "Allow"
            }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Permission granted");
                return true;
            } else {
                // Permission denied
                console.log("Permission denied");
                return false;
            }
        } else if (!isPermitedReadExternalStorage) {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
                title: "Storage permission needed",
                message: 'Storage permission needed.',
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Don't allow",
                buttonPositive: "Allow"
            }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Permission granted");
                return true;
            } else {
                // Permission denied
                console.log("Permission denied");
                return false;
            }
        } else {
            return true;
        }
    } catch (e) {
        console.log(e);
        return false;
    }
}


export async function requestContactPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
            title: 'Contacts Permission',
            message: 'Allow MYIB to access your contacts.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: "Don't allow",
            buttonPositive: 'Allow',
        },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Contact permission granted');
            return true;
        } else {
            console.log('Contact permission denied');
            return false;
        }
    } catch (err) {
        console.warn(err);
        return false;
    }
}