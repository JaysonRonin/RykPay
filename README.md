# Welcome to RykPay app 👋

A secure payment transfer module for a digital banking app, built with React Native (Expo) & TypeScript, integrating biometric authentication for secure transactions.

## Requirements
Payment Transfer Interface
- [ ] Ui input recipient, amount, and notes.
- [ ] Real-time balance check before transaction.
- [ ] Error messages for invalid inputs.

Biometric Authentication
- [ ] Face ID / Touch ID / Fingerprint authentication before transaction.
- [ ] Fallback to PIN/password for devices without biometrics.

Transaction Processing
- [ ] API integration for fund transfers.
- [ ] Error handling for network issues, insufficient funds.
- [ ] Show confirmation screen after successful transactions.

## 🚀 Tech Stack
- React Native (Expo)
- TypeScript
- Expo Local Authentication (Biometrics)
- Zustand (State Management)
- React Query (API Caching)
- Axios (API Requests)
- React Navigation (App Navigation)

## Folder structure
```📦 RykPay  
 ┣ 📂 src  
 ┃ ┣ 📂 app  
 ┃ ┣  ┣ 📂 index.tsx
 ┃ ┣ 📂 components  
 ┃ ┣ 📂 screens  
 ┃ ┣ 📂 hooks  
 ┃ ┣ 📂 api  
 ┃ ┣ 📂 store  
 ┃ ┣ 📂 utils  
 ┣ 📜 package.json  
 ┣ 📜 README.md
 ```


## Get started

1. Install dependencies

   ```bash
   yarn
   ```

2. Start the app

   ```bash
    yarn start
   ```
