# 🌿 GaonConnect  
### Empowering Rural Communities Through Digital Learning

---

## 📖 Project Description

GaonConnect aims to bridge the **rural–digital divide** by providing accessible, practical, and skill-oriented learning content directly on mobile devices.

It is built especially for:

- 🌾 **Farmers**  
- 👩‍🌾 **Women Self-Help Groups**  
- 👨‍🎓 **Rural youth and learners**  
- 🤝 **Community volunteers and trainers**

**The vision is simple:**  
> **Bring learning, awareness, and opportunity to every village — one mobile at a time.**

---

## 🛠️ Android SDK Setup (Windows)

To run this project **without Android Studio**, configure the Android SDK manually.

### 1️⃣ Environment Variable

```bash
ANDROID_HOME = C:\Program Files\Android\Sdk
```
2️⃣ Add these to your Path:
```bash
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\cmdline-tools\latest\bin
```
3️⃣ Verify Installation
```bash
echo %ANDROID_HOME%
adb --version
sdkmanager --version
```
🚀 Getting Started
```bash
Clone the Repository
git clone <repo-url>
cd gaonconnect
```
### Install Dependencies
```bash
npm install
```
### Start Metro Bundler
```bash
npx react-native start
```
### Run on Android Device
```bash
npx react-native run-android
```

>**⚠️Ensure that USB Debugging is enabled on your device.**
