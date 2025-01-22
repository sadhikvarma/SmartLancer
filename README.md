# SmartLancer

SmartLancer is a platform where individuals can discover exciting projects, collaborate with others, and showcase their work to attract freelance opportunities. Whether you're looking for projects to work on or want to connect with talented people for your own projects, SmartLancer is the ideal place to grow your freelancing career.

## Features

- **Find Projects:** Explore a wide range of projects that match your skills and interests.
- **Collaborate:** Work together with talented professionals from around the world.
- **Showcase Your Work:** Highlight your completed projects to attract freelance clients.
- **Get Approached:** Let clients reach out to you based on your portfolio and expertise.

## Vision

Empowering freelancers and professionals to connect, collaborate, and grow their careers in a seamless and efficient way.

---

Stay tuned for updates as we build this platform to help you achieve freelancing success!


## Prerequisites

Ensure you have the following installed:
- **Node.js** (latest stable version)
- **npm**
- **MongoDB** (local or cloud instance)

---

# Project Setup Instructions

Follow these steps to set up and run the project:

---

## 1. Set Up the Backend

### 1.1. Create a `.env` File
1. Navigate to the `server` folder.
2. Create a file named `.env`.
3. Add the following environment variables to the file:
   
PORT=your_port_number 
MONGODB_URL=your_mongodb_connection_url 
KEY=your_jwt_secret_key
email=your_email_id
passkey=your_email_passkey

Replace `your_port_number`, `your_mongodb_connection_url`, `your_jwt_secret_key`,`your_email_id` and `your_pass_key` with appropriate values.

### 1.2. Start the Backend
1. Open a terminal.
2. Navigate to the `server` directory:
cd server
3. Run 
npm install
4. Run ths command to start the server:
node index.js

## 2. Set Up the Frontend

1. Open new terminal
2. Navigate to `client` folder
3. Run 
npm install
4. Run
npm run dev

## 3. Set Up the Backend for chatbot

1. Open new terminal
2. Navigate to `python-backend/app` folder
3. create a venv and activate it
4. run pip install -r requirements.txt
5. Run uvicorn main:app --host 0.0.0.0 --port 5000