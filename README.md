# Mentor Me

Mentor Me is a web application that connects students and graduates with professionals in the IT industry for career guidance and mentorship. The application is built using React and Vite.

## Prerequisites

- Node.js
- Yarn (optional)

## Setup

1. Clone the repository: `git clone https://github.com/your-username/mentor-me.git`
2. Install the dependencies: `yarn install` or `npm install`
3. Copy the example environment file and update it with your own configuration: `cp .env.example .env.local`
4. Start the development server: `yarn dev` or `npm run dev`
5. Open `http://localhost:3000` in your web browser.

## Project Structure

```
mentor-me/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── App.jsx
│   ├── index.jsx
│   └── routes.jsx
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── vite.config.js
```

- The `public` folder contains the static files for the application, such as the HTML file and favicon.
- The `src` folder contains the source code for the application.
  - The `components` folder contains the reusable UI components used throughout the application.
  - The `pages` folder contains the top-level pages of the application, such as the home page and mentor search page.
  - The `services` folder contains the API service used to fetch data from the backend.
  - The `styles` folder contains the global styles used throughout the application.
  - `App.jsx` is the main component that renders the application.
  - `index.jsx` is the entry point for the application.
  - `routes.jsx` defines the application routes.
- `.env.example` is an example environment file.
- `.gitignore` specifies the files and folders that should be ignored by Git.
- `package.json` contains the dependencies and scripts for the project.
- `README.md` is this file!
- `vite.config.js` contains the configuration for Vite.

## License

This project is licensed under the [MIT License](LICENSE).