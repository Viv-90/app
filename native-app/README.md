### Current state of the WOW app



<table>
  <tr>
    <td><img width="301.5" height="655.5" alt="Simulator Screenshot - iPhone 17 Pro - 2026-06-18 at 02 44 24" src="https://github.com/user-attachments/assets/7a2339fc-8fd0-4583-9ef4-693107d33c08" /></td>
    <td><img width="301.5" height="655.5" alt="Simulator Screenshot - iPhone 17 Pro - 2026-06-18 at 02 44 29" src="https://github.com/user-attachments/assets/f4367ad4-6d85-415e-8587-f0ab0a362774" /></td>
  </tr>

  <tr>
    <td><img width="301.5" height="655.5" alt="Simulator Screenshot - iPhone 17 Pro - 2026-06-18 at 02 44 41" src="https://github.com/user-attachments/assets/41e2d7b9-39bb-422f-b059-554ebdcdc85e" /></td>
    <td><img width="301.5" height="655.5" alt="Simulator Screenshot - iPhone 17 Pro - 2026-06-18 at 02 44 44" src="https://github.com/user-attachments/assets/454b4b00-ba8d-442b-ba57-000720018441" /></td>
  </tr>

  <tr>
    <td><img width="301.5" height="655.5" alt="Simulator Screenshot - iPhone 17 Pro - 2026-06-18 at 02 45 15" src="https://github.com/user-attachments/assets/9d06b15c-d215-45d5-b0a5-5d57799e6529" /></td>
    <td><img width="301.5" height="655.5" alt="Simulator Screenshot - iPhone 17 Pro - 2026-06-18 at 02 44 52" src="https://github.com/user-attachments/assets/9d9316bb-c4e7-4f72-bcfc-d07f8d815c99" /></td>
  </tr>
  
</table>

## Developer Guide & Setup

### Local Installation
1. Install project dependencies:
   ```bash
   npm install
   ```
2. Start the Expo development server:
   ```bash
   npx expo start
   ```

### State Architecture
The application uses a unified global `WalletProvider` (`src/WalletContext.tsx`) context that hosts:
- `balance`: The current reactive wallet balance in USD
- `transactions`: The transaction history ledger
- `deposit() / withdraw() / addTransaction()`: Functions to execute state-changing activities globally

### Roadmap
Looking forward to production app launch


