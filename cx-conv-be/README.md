# AI-Powered UX & Conversion Insights Platform

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

### Installation
1. Create a `.env` file in the project's base directory and add the following:
   ```env
   PORT=8080
   MAIL_APP_PASSWORD=
   ADMIN_EMAIL=
   LOG_LEVEL=
   OPEN_AI_KEY=
   ```
   **⚠️ Important:** Never expose your `OPEN_AI_KEY` in a public repository.

    - `MAIL_APP_PASSWORD`: A generated app password from Google for the mail sender.
    - `ADMIN_EMAIL`: The email from which letters are sent.
    - `LOG_LEVEL`: May be empty.

2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   npm run dev