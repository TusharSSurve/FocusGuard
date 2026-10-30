# 🚫 FocusGuard Chrome Extension (React + Chrome APIs)

FocusGuard is a lightweight and effective **Chrome extension** designed to help you stay focused by **blocking distracting websites** for a chosen amount of time. Built using **React** and **Chrome Extension APIs**, it provides a smooth UI and reliable background functionality to keep procrastination away.

## Demo

https://github.com/user-attachments/assets/86d6c0ad-2d81-421b-9e0a-2823a2f9e73d

---

## ✨ Features

* 🔒 **Block distracting websites** for a specified duration
* ⏳ **Custom timer** to control how long sites stay blocked
* ⚙️ Uses **Chrome Storage API** to save preferences
* 🔧 Built with **React** for a modern and responsive interface
* 🛠️ Uses **Chrome Extension APIs** (background scripts, permissions, tabs, alarms)
* 🚀 Simple, fast, and privacy-friendly (everything stays on your device)

---

## 🧩 How It Works

1. Enter websites you want to block (e.g., *youtube.com*, *instagram.com*).
2. Choose a blocking duration (e.g., 15 min, 1 hour, etc.).
3. FocusGuard activates and prevents you from opening those websites until the timer ends.
4. Once the timer expires, the sites become accessible again.

The extension runs using:

* **React UI** for configuration and interaction
* **Background service worker** using Chrome Extension API to enforce blocking
* **Chrome alarms** to manage timers
* **Chrome storage** for persistent settings

---

## 📦 Tech Stack

* **React** (UI)
* **TypeScript**
* **Chrome Extension Manifest v3**
* **Chrome APIs** (tabs, alarms, storage, declarativeNetRequest or webNavigation)

---

## 📁 Project Structure (example)

```
/public
  ├─ manifest.json
  ├─ icon.png
/src
  ├─ components/
  ├─ lib/
  ├─ types/
  ├─ background.js
  ├─ App.tsx
  ├─ main.tsx
```

---

## 🚀 Installation (Development Mode)

1. Clone the repository:

   ```bash
   git clone https://github.com/TusharSSurve/FocusGuard.git
   cd FocusGuard
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Build the project:

   ```bash
   npm run build
   ```
4. Load the extension in Chrome:

   * Open **chrome://extensions/**
   * Enable **Developer mode**
   * Click **Load unpacked**
   * Select the `build/` folder

---

## 🛡️ Permissions Used

* `tabs` — To detect and block navigation
* `storage` — To store website lists and timer data
* `alarms` — To handle block duration timers
* `declarativeNetRequest` — To block site access

---

## 📄 License

MIT License.

---

Just let me know!
