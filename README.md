
# ⚽ Football Player Performance Dashboard

This project **visualizes football player performance data** collected from **IoT sensors** and presents it using **React.js** and **Chart.js** for easy analysis and interpretation.  
It offers **dynamic player cards** with animated **progress charts** to view key performance metrics.

---

## 📋 Table of Contents
- [About](#about)
- [Tech Stack](#tech-stack)
- [Project Flow](#project-flow)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Features](#features)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## 📖 About

**Football Player Performance Dashboard** is an interactive web application that fetches player performance data (e.g., goals, assists, shots) and visually displays it using:
- Dynamic player cards
- Circular progress indicators
- Graphs and charts (coming soon)

This allows coaches, analysts, or fans to quickly monitor a player's match or season performance.

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite/CRA/Next.js)
- **Charts:** Chart.js (for advanced graphs)
- **UI Components:** Material-UI (MUI)
- **CSV Parsing:** PapaParse
- **Styling:** Custom Material-UI Theme + Tailwind CSS (optional)

---

## 🔥 Project Flow

1. **Data Collection:**  
   Sensor devices capture real-time player data like goals, shots, assists, minutes played, etc.

2. **Data Storage:**  
   Sensor output is exported into a **CSV** file (or could later be connected to a live API).

3. **Data Fetching:**  
   - React app fetches the **CSV** file from the public folder.
   - Parses the data using **PapaParse**.

4. **Data Processing:**  
   - Each player’s stats are extracted.
   - Data like `Goals`, `Assists`, `Shots`, `Shots on Goal`, and `Minutes Played` is parsed into numerical form.

5. **Data Visualization:**  
   - Cards are dynamically generated for each player.
   - Circular progress indicators show each metric proportionally.
   - Additional graphs (line charts, bar charts) are created using **Chart.js** (future feature).

6. **Responsive Design:**  
   - Layout adjusts automatically across Desktop, Tablet, and Mobile screens.

---

## 📂 Folder Structure

```bash
/football-dashboard
├── /public
│   └── data.csv   # CSV file containing player data
├── /src
│   ├── /components
│   │   └── PlayerStatus.jsx  # Main component to render player cards
│   ├── App.jsx
│   └── index.js
├── package.json
├── README.md
```

---

## 🏗️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/football-dashboard.git
cd football-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

> This will install React, Material-UI, PapaParse, Chart.js, etc.

### 3. Add Your Data
- Place your `data.csv` inside the `/public` folder.
- Make sure the CSV has headers like: `PLAYER, TEAM, G, ASST, SHOTS, SOG, MIN, AVATAR`.

Example:

| PLAYER     | TEAM       | G | ASST | SHOTS | SOG | MIN | AVATAR        |
|------------|------------|---|------|-------|-----|-----|---------------|
| Lionel Messi | PSG    | 30 | 12   | 90    | 60  | 3400| avatarlink.jpg |

### 4. Run the Application
```bash
npm run dev   # if using Vite
# OR
npm start     # if using Create React App
```

---

## 🧑‍💻 Usage

Once running:

- Visit [http://localhost:3000](http://localhost:3000).
- View dynamic cards with player stats.
- Hover over cards for animation effects.
- Charts will animate to show current stats.

---

## ✨ Features

- 📈 **Visualize** player goals, assists, shots, minutes.
- 🏃 **Smooth animations** using MUI and CSS transitions.
- 📊 **Chart.js graphs** (planned: bar graph of player comparison).
- 🛠️ **Responsive layout** for all devices.
- ⚡ **Fast CSV Parsing** (even for large files).
- 🎨 **Custom Themes** with dark mode style.

---

## 🚀 Future Improvements

- Connect to **live API** for real-time sensor data.
- Add **line charts** to show player performance over time.
- Add **team comparison charts**.
- Implement **filters** (e.g., sort by goals, assists).
- Build **admin panel** to upload new CSV files dynamically.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

# 🔥 Ready to Score Some Goals with Data! 🚀⚽


