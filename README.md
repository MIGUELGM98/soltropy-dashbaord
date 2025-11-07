# Soltropy Dashboard

Integrated IoT dashboard for monitoring renewable energy systems (solar-thermal, solar-PV, heat pumps).

## 🚀 Features

- **Unified Dashboard**: Consolidated view of all renewable systems
- **Dual Role**: Portal for Homeowners and Technicians
- **Verifiable Reports**: Blockchain integration for ESG reports
- **Real-Time Alerts**: Failure and maintenance notifications
- **Remote Diagnostics**: Tools for technicians

## 🛠️ Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (Icons)
- Marker.io (Feedback)

## 📦 Installation

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env and add your Marker.io key

# Run in development
npm run dev

# Build for production
npm run build

# Preview the build
npm run preview
```

## 🔐 Environment Variables

Create a `.env` file in the project root with the following variables:

```env
VITE_MARKER_IO_KEY=your_marker_io_key_here
```

**Note:** The `.env` file is in `.gitignore` and will not be uploaded to the repository. For production on Render, add this environment variable in the service configuration.

## 🚢 Deployment on Render

### Option 1: Automatic Deployment (Recommended)

1. Create a GitHub repository and push this code
2. Go to [render.com](https://render.com) → "New +" → "Static Site"
3. Connect your GitHub repository
4. Render will automatically detect the configuration
5. Configure:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
   - **Environment Variables:** Add `VITE_MARKER_IO_KEY` with your Marker.io key
6. Click "Create Static Site"

### Option 2: Using render.yaml

1. The `render.yaml` file is already configured
2. Go to Render → "New +" → "Blueprint"
3. Select your repository
4. Render will apply the configuration automatically

## 📁 Project Structure

```
soltropy-dashboard/
├── src/
│   ├── components/
│   │   ├── SoltropyDashboard.tsx  # Main component
│   │   └── MarkerFeedback.tsx     # Marker.io integration
│   ├── App.tsx                    # Root component
│   ├── main.tsx                   # Entry point
│   ├── index.css                  # Global styles (Tailwind)
│   └── vite-env.d.ts              # Environment types
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── .env.example                   # Environment variables template
└── README.md
```

## 🎨 User Roles

### Homeowner
- Overview: General system view
- Trends: Historical analysis and predictions
- Reports: Verifiable ESG reports
- Alerts: Alerts and notifications

### Technician
- Diagnostics: Detailed sensor diagnostics
- Fleet: Monitoring of multiple installations
- Maintenance: Maintenance tools
- Setup: Configuration of new installations

## 📝 Notes

- The project uses Vite for fast development
- Tailwind CSS for utility styles
- TypeScript for type safety
- Optimized for production with static build
- Marker.io integration for user feedback

## 🔗 Links

- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Render Documentation](https://render.com/docs)
- [Marker.io Documentation](https://marker.io/docs)
