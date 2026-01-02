# SafePay AI: AI-Powered Fraud Protection System

SafePay AI is a high-performance, real-time fraud detection dashboard designed for online transactions. It utilizes an **Ensemble Machine Learning Architecture** (simulated via Gemini 3 Flash) to identify suspicious patterns and protect financial ecosystems.

## 🚀 Key Features
- **Real-time Transaction Simulation**: Inject "Normal" or "Fraud" patterns to test system responsiveness.
- **Ensemble ML Analysis**: Integrates three core logic paths:
  - **Isolation Forest**: Detects statistical anomalies (Outliers).
  - **XGBoost**: High-accuracy pattern classification.
  - **LSTM (RNN)**: Temporal sequence analysis for behavioral shifts.
- **Dynamic Analytics**: Real-time risk volatility charts and distribution metrics.
- **Automated Security Reporting**: Generate and download professional PDF audit reports for any flagged transaction.

## 📤 How to Push to a New GitHub Repository
To move this project to a **completely new** GitHub repository without making any changes to the code:

### Method 1: Using the Interface (Easiest)
1. Locate the **GitHub icon** in the top navigation bar (the one shown in your screenshot).
2. Click it and select **"Push to GitHub"**.
3. Authenticate your account and create a **New Repository**.
4. The system will automatically handle the push for you.

### Method 2: Using the Terminal
1. Create a new repository on [GitHub](https://github.com/new) (keep it empty).
2. Open your project terminal and run these commands:
   ```bash
   # 1. Clear any old Git tracking
   rm -rf .git
   
   # 2. Initialize a fresh local repository
   git init
   git add .
   git commit -m "Initial commit: AI Fraud Protection System"
   
   # 3. Set the main branch
   git branch -M main
   
   # 4. Connect to your NEW repository (Replace with your link)
   git remote add origin https://github.com/YOUR_USERNAME/NEW_REPO_NAME.git
   
   # 5. Push the project
   git push -u origin main
   ```

## 🛠️ Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS
- **AI Engine**: Google Gemini API (`gemini-3-flash-preview`)
- **Visualizations**: Recharts (Dynamic Area & Bar Charts)
- **PDF Generation**: jsPDF
- **Icons**: Lucide React

## 🧠 Machine Learning Methodology
The system evaluates transactions across four main vectors:
1. **Behavioral**: Current amount vs. Historical average.
2. **Geospatial**: Current location vs. User home location.
3. **Device Fingerprinting**: Current device ID vs. Registered trusted devices.
4. **Velocity/Sequential**: Transaction type frequency and timing.

## 🛠️ How to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ai-fraud-protection-system.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your Gemini API Key:
   ```env
   API_KEY=your_gemini_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📄 License
This project is licensed under the MIT License.
