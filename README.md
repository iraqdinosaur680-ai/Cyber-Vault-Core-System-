# ⚡ Cyber-Vault Core System (نظام الخزنة السيبرانية)

<div align="center">

![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)
![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white)
![Security](https://img.shields.io/badge/Security-Offline--First_CSPRNG-00f0ff)

**A high-security, cyberpunk-themed offline password manager and credentials audit terminal.**  
*نظام آمن وتفاعلي لإدارة وفحص كلمات المرور بتصميم سيبراني متطور ودعم كامل للغتين العربية والإنجليزية.*

</div>

---

## 📑 Table of Contents / جدول المحتويات
- [Overview / نظرة عامة](#-overview--نظرة-عامة)
- [Key Features / الميزات الرئيسية](#-key-features--الميزات-الرئيسية)
- [Security & Cryptography / الأمان والتشفير](#-security--cryptography--الأمان-والتشفير)
- [Interactive Controls / دليل الأزرار والواجهة](#-interactive-controls--دليل-الأزرار-والواجهة)
- [Tech Stack / التقنيات المستخدمة](#-tech-stack--التقنيات-المستخدمة)
- [Getting Started / طريقة التشغيل والتثبيت](#-getting-started--طريقة-التشغيل-والتثبيت)
- [FAQ / الأسئلة الشائعة](#-faq--الأسئلة-الشائعة)
- [License / الترخيص](#-license--الترخيص)

---

## 🌐 Overview / نظرة عامة

### English
**Cyber-Vault Core System** is an offline-first credentials vault built with React 19, TypeScript, and Tailwind CSS v4. Designed with a futuristic cyberpunk HUD aesthetic, it provides users with cryptographic password generation, real-time security diagnostics, duplicate password detection, expiration tracking, and backup export/import—all without transmitting sensitive credentials over external networks.

### العربية
**نظام الخزنة السيبرانية (Cyber-Vault Core System)** هو تطبيق ويب متطور لإدارة كلمات المرور يعمل بنظام محلي بالكامل (**Offline-First**). يتميز بواجهة سيبرانية مستوحاة من شاشات المستقبل (Cyberpunk HUD)، ويوفر فحصاً حياً لدرجة أمان كلمات المرور، وكشف كلمات المرور المكررة، ومولد كلمات مرور مشفر، مع إمكانية تصدير واستيراد البيانات وحمايتها محلياً دون إرسال أي معلومة إلى أي خادم خارجي.

---

## ✨ Key Features / الميزات الرئيسية

- **🔒 Offline-First Architecture**: Zero external network dependency. Data stays locked in browser local storage and memory.
- **⚡ CSPRNG Cryptographic Generator**: Passwords are generated using the Web Cryptography API (`crypto.getRandomValues`), avoiding weak pseudorandom algorithms like `Math.random()`.
- **📊 Interactive Security Health HUD**:
  - Live tally of **Total**, **Strong**, **Weak**, and **Reused** passwords.
  - **Click-to-Filter**: Click on any health stat card (*Strong*, *Weak*, *Reused*) to instantly focus on matching vault entries.
- **🔄 Duplicate & Reuse Detection**: Warns instantly if the same password is utilized across multiple accounts or platforms to protect against credential stuffing attacks.
- **⏳ Expiration & Stale Credential Tracker**: Set expiry reminders (e.g., 30, 60, 90 days) to enforce routine password hygiene.
- **💾 Encrypted Backup & Restore**: Export your vault into a structured JSON backup file and import it anytime.
- **🌍 Bilingual Interface (العربية / English)**: Full Arabic localization and English interface with instant toggle.
- **👁️ Peek & Copy Controls**: One-click clipboard copy with auto-clearing feedback and toggleable password visibility.

---

## 🛡️ Security & Cryptography / الأمان والتشفير

### 1. Cryptographically Secure Pseudo-Random Number Generation (CSPRNG)
Passwords are generated using:
```typescript
const randomValues = new Uint32Array(length);
window.crypto.getRandomValues(randomValues);
```
Unlike standard `Math.random()` which is predictable and unsafe for credentials, `window.crypto.getRandomValues` draws entropy directly from the operating system's cryptographic random pool.

### 2. Password Strength Algorithm & Entropy Evaluation
The security score (0–100%) is computed across multi-factor criteria:
- **Length**: Base points scaled up to 16+ characters.
- **Character Diversity**: Checks for lowercase (`[a-z]`), uppercase (`[A-Z]`), numeric digits (`[0-9]`), and punctuation/symbols (`[!@#$%^&*...]`).
- **Penalties**: Deductions for simple repetitive patterns or dictionary-like structures.
- **Status Classification**:
  - 🟢 **Strong**: Score ≥ 75
  - 🟡 **Moderate**: Score 40–74
  - 🔴 **Weak**: Score < 40

### 3. Local Isolation (Zero-Cloud Leakage)
No credentials, usernames, or notes are uploaded to any server or telemetry endpoint. Your secrets remain strictly within your device's browser sandbox.

---

## 🕹️ Interactive Controls / دليل الأزرار والواجهة

| Control / العنصر | Action / الإجراء | Description / الوصف |
| :--- | :--- | :--- |
| **Master Lock / فتح القفل** | `LOGIN / UNLOCK` | Authenticates access to the vault interface using your master credentials. |
| **Security Health Tiles** | `Click Tile (Strong/Weak/Reused)` | Filters the vault list immediately to display only the selected category. |
| **Generate Password** | `GENERATE / إنشاء رمز` | Generates an entropy-rich password according to length and character settings. |
| **Eye Icon 👁️** | `Show / Hide` | Toggles password masking to prevent shoulder surfing. |
| **Copy Icon 📋** | `Copy to Clipboard` | Copies credentials with instant notification feedback. |
| **Export Vault 💾** | `EXPORT JSON` | Downloads an offline backup file containing your vault entries. |
| **Import Vault 📂** | `IMPORT JSON` | Restores credentials from an existing JSON vault file. |
| **Lang Toggle 🌐** | `EN / العربية` | Toggles the UI language between English and Arabic. |

---

## 💻 Tech Stack / التقنيات المستخدمة

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom cyberpunk CSS design tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://motion.dev/)
- **Storage**: Browser LocalStorage & Web Crypto API

---

## 🚀 Getting Started / طريقة التشغيل والتثبيت

### Prerequisites / المتطلبات
- **Node.js** (v18.0.0 or higher)
- **npm** or **bun** or **yarn**

### Installation & Run / التثبيت والتشغيل

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/cyber-vault-core-system.git
   cd cyber-vault-core-system
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Lint and Typecheck**:
   ```bash
   npm run lint
   ```

---

## ❓ FAQ / الأسئلة الشائعة

### 1. هل يتم إرسال بياناتي أو كلمات مروري إلى أي خادم خارجي؟
**لا.** التطبيق مصمم بالكامل بنظام محلي (Offline-First). جميع الحسابات وكلمات المرور تُحفظ وتُعالج داخل المتصفح فقط على جهازك، دون أي اتصال بخوادم خارجية أو قواعد بيانات سحابية.

### 2. كيف يقوم التطبيق بتوليد كلمات المرور؟
يعتمد التطبيق على خوارزمية التشفير الرسمية في المتصفح `window.crypto.getRandomValues()` (CSPRNG). هذه الطريقة تضمن عشوائية تشفيرية حقيقية غير قابلة للتنبؤ بعكس الدوال التقليدية.

### 3. ما أهمية تنبيه "كلمة مرور مكررة" (Reused)؟
عند استخدام نفس كلمة المرور لأكثر من حساب، فإن اختراق موقع واحد يعرّض باقي حساباتك لنفس الخطر (Credential Stuffing). ينبهك التطبيق فوراً لتمييز هذه الحسابات وتغييرها بكلمات فريدة.

### 4. كيف يمكنني نقل حساباتي إلى جهاز آخر؟
يمكنك استخدام زر **تصدير الخزنة (Export)** لحفظ نسخة احتياطية بصيغة JSON، ثم فتح التطبيق على جهازك الآخر واستخدام **استيراد (Import)** لاسترجاعها بأمان.

---

## 📄 License / الترخيص

Distributed under the **Apache-2.0 License**. See the `LICENSE` file for details.

---

<div align="center">
  <sub>Built with precision for security enthusiasts and cyberpunk fans.</sub>
</div>
