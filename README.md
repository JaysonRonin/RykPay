# Welcome to RykPay app 👋

A secure payment transfer module for a digital banking app, built with React Native (Expo) & TypeScript, integrating biometric authentication for secure transactions.

## Requirements

Payment Transfer Interface

- [x] Ui input recipient, amount, and notes.
- [x] Real-time balance check before transaction.
- [x] Error messages for invalid inputs.

Biometric Authentication

- [x] Face ID / Touch ID / Fingerprint authentication before transaction.
- [x] Fallback to PIN/password for devices without biometrics.

Transaction Processing

- [x] API integration for fund transfers.
- [x] Error handling for network issues, insufficient funds.
- [x] Show confirmation screen after successful transactions.

## 🚀 Tech Stack

- React Native (Expo)
- TypeScript
- Expo Local Authentication (Biometrics)
- Zustand (State Management)
- Axios (API Requests)
- React Navigation (App Navigation)
- Zod (Input Validation)

## Folder structure

```📦 RykPay
 ┣ 📂 src
 ┃ ┣ 📂 app
 ┃ ┣  ┣ 📂 MainApp.tsx
 ┃ ┣ 📂 components
 ┃ ┣  ┣ 📂 ui
 ┃ ┣ 📂 screens
 ┃ ┣ 📂 hooks
 ┃ ┣ 📂 services
 ┃ ┣ 📂 stores
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
    yarn ios / yarn android
   ```

## Video Examples
### Normal behaviour
|    **Android**    |                           **iOS**                           |
| :---------------: | :---------------------------------------------------------: |
| https://github.com/user-attachments/assets/2d40d38b-deee-474d-9057-d19c0eec482a | https://github.com/user-attachments/assets/1c45b559-274f-42de-91f1-b472b752f1f7 |


### HTTP fail behaviour
|    **Android**    |                           **iOS**                           |
| :---------------: | :---------------------------------------------------------: |
| https://github.com/user-attachments/assets/92223e6b-a391-40b5-807d-c2bcf15b9d63 | https://github.com/user-attachments/assets/92d6af7f-38f0-4dee-bd8c-f9d5b14611f9 |

