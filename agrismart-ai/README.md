# AgriSmart AI – Intelligent Irrigation Advisory System

AI-Powered Irrigation Advisory System for Smart Sugarcane Farming.
This is a modern SaaS platform that provides AI-powered irrigation recommendations for sugarcane farmers using simulated Weather APIs, GIS mapping, and historical data.

## Features
- **AI Irrigation Engine**: Recommendations based on crop age, soil type, and weather forecast.
- **GIS Farm Mapping**: Interactive satellite maps using Leaflet.
- **Yield Prediction & Crop Health**: Growth tracking and fertigation recommendations.
- **AI Chatbot**: Intelligent assistant for farming queries.

## Tech Stack
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4 & shadcn/ui
- Framer Motion
- Recharts & React-Leaflet
- MongoDB & Mongoose

## Setup

1. Install dependencies
\`\`\`bash
npm install
\`\`\`

2. Copy `.env.example` to `.env.local`
\`\`\`bash
cp .env.example .env.local
\`\`\`

3. Run the development server
\`\`\`bash
npm run dev
\`\`\`

## Deployment to Vercel
This project is designed to be deployed instantly on Vercel. 
1. Push your code to GitHub.
2. Import the project in Vercel.
3. Add the `MONGODB_URI` environment variable if you plan to use real database endpoints.
4. Deploy!
