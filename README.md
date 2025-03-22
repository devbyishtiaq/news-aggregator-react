# News Aggregator

A React TypeScript application that aggregates news from multiple sources including NewsAPI, The Guardian, and The New York Times.

## Features

- Fetch news articles from multiple sources
- Filter news by category
- Infinite scrolling for a seamless browsing experience
- Responsive design for all devices
- Docker containerization for easy deployment

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Docker
- NewsAPI, Guardian API, and NYT API

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Docker (for containerization)
- API keys for NewsAPI, Guardian API, and NYT API

## Getting Started

### Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/devbyishtiaq/news-aggregator-react.git
   cd news-aggregator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your API keys:

   ```
   VITE_NEWS_API_KEY=your_news_api_key_here
   VITE_GUARDIAN_API_KEY=your_guardian_api_key_here
   VITE_NYT_API_KEY=your_nyt_api_key_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Docker Deployment

1. Build the Docker image:

   ```bash
   docker build -t news-aggregator .
   ```

2. Run the Docker container:

   ```bash
   docker run -p 80:80 news-aggregator
   ```

   Or use docker-compose:

   ```bash
   docker-compose up
   ```

3. Open your browser and navigate to `http://localhost`

## Project Structure

```
news-aggregator/
├── src/
│   ├── api/                  # API integration
\│   │   ├── hooks/            # Custom hooks for data fetching
│   ├── components/           # Reusable components
│   │   ├── common/           # Common UI components
│   │   ├── layouts/           # Layout components
│   │   └── features/         # Feature-specific components
│   ├── context/              # React context for global state
│   ├── hooks/                # Custom hooks
│   ├── pages/                # Page components
│   ├── services/             # Service Functions
│   ├── utils/                # Utility functions
│   ├── App.tsx               # Main App component
│   ├── main.tsx              # Entry point
│   └── vite-env.d.ts         # Vite type declarations
├── public/                   # Static assets
├── .dockerignore
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── index.html
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```

## API Sources

- [NewsAPI](https://newsapi.org/)
- [The Guardian API](https://open-platform.theguardian.com/)
- [New York Times API](https://developer.nytimes.com/)
