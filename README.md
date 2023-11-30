# Wild Trails Farm

## Some Useful Commands
- `npx expo start`
- `eas build --platform ios`
- `eas build --platform android`

## Environment Notes
Use Java 11
- `brew install openjdk@11`
- `sudo ln -sfn /opt/homebrew/opt/openjdk@11/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-11.jdk`

## Native Debugging
iOS
- `npx expo prebuild -p ios`
- `xed ios`

Android
- `npx expo prebuild -p android`
- `open -a "/Applications/Android Studio.app" ./android`
