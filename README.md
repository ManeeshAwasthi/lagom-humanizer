# Lagom Humanizer

> *Just the right amount of human.*

An AI-powered text humanizer that transforms AI-generated writing into natural, human-sounding prose. Supports academic and general writing with three intensity modes.

## Features

- **Three humanization modes** — Light, Medium, Aggressive
- **Live AI detection score** — heuristic-based, runs in the browser
- **Gemini Flash** as primary AI (free tier) with **HuggingFace Mistral** fallback
- **Word limit control** — process up to 1000 words per request
- **Score comparison** — see original vs. humanized AI detection score
- Dark, editorial UI with smooth micro-interactions

## Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/Aradhya648/lagom-humanizer.git
   cd lagom-humanizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and fill in your API keys.

4. **Get your free API keys**
   - **Gemini API key** (primary): https://aistudio.google.com/app/apikey
   - **HuggingFace API key** (fallback): https://huggingface.co/settings/tokens

5. **Run the dev server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Google Gemini API key (free tier at Google AI Studio) |
| `HUGGINGFACE_API_KEY` | HuggingFace Inference API token (optional but recommended) |

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Google Gemini Flash** (primary AI)
- **HuggingFace Mistral-7B** (fallback AI)

## Deployment

Deployed at [thelagom.vercel.app](https://thelagom.vercel.app)

To deploy your own:
```bash
npx vercel --prod
```

---

*Lagom · Built for writers, not robots*
