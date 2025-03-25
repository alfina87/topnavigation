# AI-Powered UX & Conversion Insights Platform

This project is an AI-powered platform designed to provide UX and conversion insights. It consists of a **frontend** (React + Tailwind) and a **backend** (Node.js) working together to deliver AI-generated insights via email.

## Features

- A simple landing page with an email input.
- Integration with OpenAI to generate structured UX insights.
- Professional email formatting for delivering insights.
- Deployment on Vercel or Firebase.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- A valid OpenAI API key.

## Installation

### Backend

1. Navigate to the `cx-conv-be` directory.
2. Create a `.env` file with the following variables:

   ```env
   PORT=8080
   MAIL_APP_PASSWORD=
   ADMIN_EMAIL=
   LOG_LEVEL=
   OPEN_AI_KEY=
   ```

   - `MAIL_APP_PASSWORD`: A generated app password from Google for the mail sender.
   - `ADMIN_EMAIL`: The email from which letters are sent.
   - `LOG_LEVEL`: May be empty.
   - `OPEN_AI_KEY`: Your OpenAI API key.

3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```

### Frontend

1. Navigate to the `cx-conv-fe` directory.
2. Create a `.env` file with the following variable:
   ```env
   VITE_API_URL=http://localhost:8080/api
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Deployment

Deploy the project on [Vercel](https://vercel.com/) or [Firebase](https://firebase.google.com/).

## Test Task Description

1. Create a simple landing page (React + Tailwind) with an email input.
2. Connect to OpenAI and send a structured prompt for UX insights.
3. Send AI-generated insights via email (formatted professionally if possible).
4. Deploy the project on Vercel or Firebase and commit it to GitHub.

## Project Structure

- `cx-conv-be`: Backend service for handling API requests and sending emails.
- `cx-conv-fe`: Frontend application for user interaction.

## License

This project is for educational and testing purposes only.
