# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# React Native core
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.reactexecutor.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }
-keep class com.facebook.react.bridge.** { *; }
-keep class com.facebook.react.modules.** { *; }
-keep class com.facebook.react.views.** { *; }

# React Native reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep class com.swmansion.rnscreens.** { *; }

# Expo modules
-keep class expo.modules.** { *; }
-keep class versioned.host.exp.exponent.** { *; }

# JSI/TurboModules
-keep class com.facebook.jni.** { *; }
-keep class com.facebook.soloader.** { *; }

# Keep JavaScript interface classes
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep native methods
-keepclasseswithmembernames class * {
    native <methods>;
}

# Keep enums
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# Keep Parcelable implementations
-keep class * implements android.os.Parcelable {
    public static final android.os.Parcelable$Creator *;
}

# Keep serializable classes
-keepclassmembers class * implements java.io.Serializable {
    static final long serialVersionUID;
    private static final java.io.ObjectStreamField[] serialPersistentFields;
    private void writeObject(java.io.ObjectOutputStream);
    private void readObject(java.io.ObjectInputStream);
    java.lang.Object writeReplace();
    java.lang.Object readResolve();
}

# OkHttp and networking
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }
-dontwarn okhttp3.**
-dontwarn okio.**

# Fresco image library
-keep class com.facebook.fresco.** { *; }
-keep class com.facebook.imagepipeline.** { *; }
-keep class com.facebook.cache.** { *; }

# Location services
-keep class com.google.android.gms.location.** { *; }
-keep class com.google.android.gms.common.** { *; }

# Camera and media
-keep class androidx.camera.** { *; }
-keep class android.media.** { *; }

# Suppress warnings for missing classes
-dontwarn com.facebook.react.**
-dontwarn java.nio.file.*
-dontwarn org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement

# Add any project specific keep options here:
