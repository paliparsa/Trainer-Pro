# Morabi Pro (مربی پرو)

Morabi Pro is a comprehensive, smart planning application designed to help students and professionals manage their study schedules and achieve their goals through a data-driven approach, gamification, and focus tools.

## 🚀 Key Features

- **Smart Scheduling**: Automatically generates a daily study plan based on your start date, subjects, and deadlines. It dynamically rebalances if you miss targets.
- **Gamification System**: Earn XP, level up, and unlock badges (like "Night Owl" or "On Fire") as you complete tasks.
- **Integrated Pomodoro Timer**: Stay focused with a built-in timer featuring ambient sounds (Rain, Cafe, Lofi) and haptic feedback.
- **Social League & Competition**: Compete on global or friend-only leaderboards. Send live "energy" (cheers) to friends while they study.
- **Progress Analytics**: Visual charts for weekly performance and roadmap calendars to track your journey.
- **Brain Dump**: A dedicated space to quickly record distracting thoughts so you can return to focusing.
- **PWA Ready**: Install the app on your mobile device for a native-like experience.
- **Cloud Sync**: Powered by Firebase to keep your data synced across all your devices.
- **Customizable UI**: Dark mode support and a flexible theme system with preset or custom colors.

## 🛠 Tech Stack

- **Frontend**: [React](https://reactjs.org/) (via CDN)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend/Database**: [Firebase](https://firebase.google.com/) (Authentication & Firestore)
- **Animations**: Custom CSS & Tailwind transitions
- **Libraries**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

## 📦 Getting Started

### Prerequisites

Since this project uses CDNs for React and Tailwind, you don't need a complex build environment. However, you will need:

- A modern web browser.
- (Optional) A local web server for better PWA and Firebase functionality.

### Running Locally

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Open `index.html` in your browser.

Alternatively, use a local server like `live-server` or `python -m http.server`:
```bash
npx live-server
```

## 📱 Mobile Installation (PWA)

- **Android/Chrome**: Tap the "Install" prompt or select "Add to Home Screen" from the menu.
- **iOS/Safari**: Tap the "Share" icon and select "Add to Home Screen".

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
