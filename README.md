# Simple Budget Tracker

A lightweight and intuitive **budget management web application** that helps users track income and expenses, calculate running balances, and visualize their financial activity.  
Built with **HTML, CSS, and JavaScript** and powered by **LocalStorage** for persistent data storage.

👉 **Live Demo:** [Simple Budget Tracker](https://radwa-sdik.github.io/Simple-Budget-Tracker/)

---

## Features

- **User Sign-In** – quick login with just a username (stored locally).  
- **Track Finances** – add transactions as **income** or **expense** with date, description, and amount.  
- **Real-Time Summary** – automatically calculates **total income, total expenses, and current balance**.  
- **Transaction History** – view all transactions in a clean table with running balance.  
- **Transaction Details** – click to view transaction breakdown in a modal (before and after balance).  
- **Delete Transactions** – remove unwanted entries easily.  
- **Persistent Storage** – data is saved per user in **LocalStorage**.  
- **Responsive Design** – works smoothly across desktop and mobile.  

---

## Tech Stack

- **Frontend:** HTML, CSS (custom styling, responsive design)  
- **Logic & Storage:** Vanilla JavaScript, LocalStorage  

---

## Usage

1. **Login** with your name (no password required, stored locally).  
2. You’ll be redirected to the **Dashboard** with your personal budget tracker.  
3. **Add transactions** by entering date, description, amount, and type (Income/Expense).  
4. See your **balance, total income, and total expenses** update in real time.  
5. Use the **transaction table** to:
   - View detailed transaction info  
   - Delete unwanted transactions  
6. Data is stored locally, so refreshing the page will keep your budget history.  

---

## Project Structure
    ```bash
    Simple-Budget-Tracker/
    │── index.html # Login page
    │── dashboard.html # Main budget tracker dashboard
    │── css/
    │ ├── style.css # Styles for login page
    │ └── dashboardStyle.css # Styles for dashboard
    │── js/
    │ ├── script.js # Handles login
    │ └── dashScript.js # Core budget logic (transactions, UI updates, storage)
    │── assets/ # Icons, illustrations
    └── README.md
---

## Future Improvements
- Export/Import transactions (CSV/JSON).  
- Add categories for better expense tracking.  
- Charts/graphs for data visualization.  
- Multi-user login with password authentication.  
