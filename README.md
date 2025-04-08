# Vizualtyics

A powerful CSV analytics platform that processes data files and extracts meaningful insights through visualization and analysis.

## Project Overview

Vizualtyics is a full-stack web application that allows users to upload CSV files, analyze the data, and generate visual representations to extract insights. The platform offers various analytical tools and services to help users make data-driven decisions.

## Features

- **CSV File Upload**: Secure file upload system for CSV data
- **Data Analysis**: Advanced analytics to extract patterns and insights
- **Data Visualization**: Interactive charts and graphs for better understanding
- **Report Generation**: Create and export detailed reports
- **User-friendly Interface**: Intuitive UI for seamless interaction

## Tech Stack

### Frontend
- Next.js
- React
- CSS Modules
- Custom components (Navbar, Footer, CSV Visualizer)

### Backend
- Node.js
- Express.js
- File system operations for CSV processing
- Custom controllers and services for data analysis

## Project Structure

```
├── frontend (.next)
│   ├── .vercel
│   ├── app
│   │   ├── about
│   │   │   └── page.jsx
│   │   ├── analysis
│   │   │   └── page.jsx
│   │   ├── pricing
│   │   │   └── page.jsx
│   │   ├── upload
│   │   │   └── page.jsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.jsx
│   │   └── page.jsx
│   ├── components
│   │   ├── CSVVisualizer.jsx
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   ├── node_modules
│   ├── public
│   ├── .gitignore
│   ├── eslint.config.mjs
│   ├── jsconfig.json
│   ├── next-env.d.ts
│   ├── next.config.mjs
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.mjs
│   └── README.md
│
├── backend
│   ├── .vercel
│   ├── controllers
│   │   └── fileController.js
│   ├── models
│   │   └── file.js
│   ├── node_modules
│   ├── public
│   │   ├── reports
│   │   └── uploads
│   ├── reports
│   ├── Routes
│   │   └── fileRouter.js
│   ├── services
│   │   └── analysis.js
│   ├── uploads
│   ├── .env
│   ├── .gitignore
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/vizualtyics.git
cd vizualtyics
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Set up environment variables
   - Create a `.env` file in the backend directory based on the example provided

5. Start the development servers

For backend:
```bash
cd backend
npm run dev
```

For frontend:
```bash
cd frontend
npm run dev
```

6. Access the application at `http://localhost:3000`

## Usage

1. Navigate to the upload page
2. Select and upload a CSV file
3. Choose analysis options
4. View generated insights and visualizations
5. Generate and download reports as needed

## API Endpoints

- `POST /api/files/upload` - Upload a CSV file
- `GET /api/files/:id` - Get file information
- `POST /api/analysis/:fileId` - Analyze a specific file
- `GET /api/reports/:fileId` - Get generated reports

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Chart.js](https://www.chartjs.org/) - Used for data visualization
- [Papa Parse](https://www.papaparse.com/) - CSV parsing library
- [Tailwind CSS](https://tailwindcss.com/) - For styling components
