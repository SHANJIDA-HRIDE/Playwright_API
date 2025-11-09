# 🚀 Playwright API Automation Framework (with Allure Reporting)

An advanced **API test automation project** built using **Playwright** + **JavaScript**, designed for testing real-world REST APIs such as [GoRest](https://gorest.co.in/).  
This framework demonstrates clean structure, reusable utilities, and **Allure reporting** integration — capturing every **API request and response automatically** in test reports.

---

## 🌟 Key Features

- ⚙️ **Playwright Test Runner** – lightweight, fast, and parallelized
- 🔐 **.env Support** – securely manage API base URL and access tokens
- 🧩 **Custom API Request Wrapper** – automatically logs and attaches request/response to Allure
- 🧠 **Utility Layer** – reusable functions for headers, authentication, and payload handling
- 📊 **Allure Reports** – beautiful, detailed HTML reports with:
  - Request & response attachments
  - Execution timeline
  - Step logs
  - Pass/fail stats
- 🔁 **CRUD Test Coverage** for GoRest API endpoints (GET, POST, PUT, DELETE)

---

## 🗂️ Project Structure
```bash
📁 playwright-api-automation
│
├── 📁 tests
│ └── AdvancedPlaywright.spec.js # CRUD API tests (GoRest)
│
├── 📁 utils
│ ├── apiRequest.js # Custom global fixture for Allure attachments
│ ├── apiHelper.js # Common API helper functions
│
├── .env # Contains base URL & token (never commit this)
├── package.json
├── playwright.config.js
└── README.md
```


---

## ⚡ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/SHANJIDA-HRIDE/Playwright_API.git
cd playwright-api-automation
```
### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Create .env file in root
```bash
BASE_URL=https://gorest.co.in/public/v2
ACCESS_TOKEN=your_gorest_access_token
```
### 4️⃣ Run the tests
```bash
npx playwright test
```
### 5️⃣ Generate and open Allure report
```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```
### 📊 Allure Report Preview

<img width="1919" height="597" alt="image" src="https://github.com/user-attachments/assets/0c81dbfc-c57a-4609-8782-ad007e9ad684" />
<img width="1917" height="925" alt="Screenshot 2025-11-09 181906" src="https://github.com/user-attachments/assets/98dac736-3abb-4fde-9b9a-0869682273b4" />
<img width="1919" height="597" alt="Screenshot 2025-11-09 181928" src="https://github.com/user-attachments/assets/918738c8-a0a4-4b6f-8436-70cd9c2b3a6a" />

## 🧩 Tech Stack
```bash
| Category          | Tools                   |
| ----------------- | ----------------------- |
| Test Framework    | Playwright              |
| Reporting         | Allure Playwright       |
| Language          | JavaScript (ES Modules) |
| Config Management | dotenv                  |
| API Source        | GoRest (Public API)     |
```

## ✨ Author
### Shanjida Hride
### 🧑‍💻 Software QA Engineer | Playwright | API | Manual & Automation Testing
<h3 align="left">Connect with me:</h3>
<p align="left">
<a href="mailto:shanjidahride1997@gmail.com"><img src="https://img.shields.io/badge/Gmail-lightgrey?style=flat&logo=gmail"/></a>&nbsp;&nbsp;&nbsp;&nbsp;
          <a href="https://www.linkedin.com/in/shanjida-hride-b38222173/"><img src="https://img.shields.io/badge/Linkedin-0077b5?style=flat&logo=linkedin"/></a>&nbsp;&nbsp;&nbsp;&nbsp;
</p>
                                                                            
### ⭐ If you found this useful
#### Give this repo a star ⭐ to support and follow my QA automation journey!


