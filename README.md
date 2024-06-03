# Fullstack Blog Application: React, MongoDB, Express, Node.js

![Broe Code Thumbnail](https://github.com/devopsdbroe/broe-code/blob/main/broecode.png)

This is a repository for the Fullstack React Blog Application using the MERN stack. It features a comprehensive platform for creating, publishing, and managing blog posts.

Key Features:

- 📝 Create, edit, and delete blog posts through a user-friendly interface.
- 🔒 User authentication with JWT for secure access.
- 💾 Data is stored persistently in MongoDB.
- 📊 Admin Dashboard for managing posts, users, and settings.
- 🔍 Full-text search capabilities to easily navigate through posts.
- 🌐 Fully responsive design for an optimal experience on both desktop and mobile devices.
- 🎨 Light and Dark Mode Themes.
- 🗃️ Backend logic handled by Express.js for robust API services.
- 🏠 Dynamic homepage featuring latest and trending posts.
- 📡 Extensive APIs to interface with the frontend.
- 🔄 Uses Redux for efficient state management across the React application.

### Prerequisites

**Node version 18.17 or later**

### Cloning the repository

```shell
git clone https://github.com/devopsdbroe/broe-code.git
```

### Install packages

**Make sure to run this from both `/broe-code` and `/broe-code/client`**

```shell
npm i
```

### Setup 2 .env files

```js
// Located at the root level
MONGO=
JWT_SECRET=
```

```js
// Located inside of "client" folder
VITE_FIREBASE_API_KEY=
```

### Setup MongoDB

Step 1: Sign Up or Log In to MongoDB Atlas and create a New Project

- Go to the MongoDB Atlas website and sign up or log in.
- After logging in, click the dropdown menu in the top left and select "New Project".
- Choose a name for your project and click "Next".
- The next page should be where you can give yourself and other members access. Once complete, click "Create Project".

Step 2: Crate a New Deployment

- On the Overview page, click the "Create" button.
- Select "M0" to create a new deployment for free
- Choose a cloud provider and a region that is closest to your users to minimize latency. For my project, I stuck with AWS
- Click on the "Create Deployment" button under your chosen configuration.

Step 3: Create a Database User

- Navigate to the "Database Access" section under the "Security" menu.
- Click "Add New Database User".
- Choose a username and a password. Remember these credentials as you'll need them to connect your Node.js application to MongoDB.
- Assign the user the "Read and Write to any Database" role.
- Click "Add User".

Step 4: Whitelist Your IP Address

- Go to the "Network Access" section under the "Security" menu.
- Click "Add IP Address".
- You can choose to allow access from anywhere or add your current IP address. For development, you can start with your current IP but remember to secure your database before going into production.
- Click "Confirm".

Step 5: Connect to Your Cluster

- Once your cluster is ready, click on "Connect" button.
- Choose "Drivers" under "Connect your application".
- Select Node.js in the "Driver" dropdown and choose the version compatible with your application.
- Copy the connection string and add to the MONGO variable. Since it's in an .env file, I hardcoded the password in the connection string.
- The MONGO_URL variable is used in the index.js file inside of the API folder to connect to the DB

### Generate JWT Secret Key

Run the following in a terminal and add the generated value to JWT_SECRET

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Get Firebase API Key and Configure OAuth Authentication

Step 1: Set Up Firebase in Your Application

- Go to the Firebase Console.
- Click on "Add project", and follow the instructions to create a new Firebase project.

Step 2: Register Your App

- In the Firebase console, open your project.
- Click on the "Web" icon (</>) to register your app.
- Follow the steps, enter your app's nickname, and register the app.

Step 3: Get API Key and add to .env file

- After registering your app, you'll be provided with a script snippet to add Firebase to your web app. You'll only need to copy the apiKey value and add it to VITE_FIREBASE_API_KEY

Step 4: Enable OAuth Providers

- In the Firebase Console, go to the "Authentication" section and select the "Sign-in method" tab.
- Enable the providers you want to use (Google, Facebook, etc.) by clicking on them and filling in the required fields such as app ID and secret. For my app, I only used Google authentication.

## Start the Server and Application

You can start the node server using `npm run dev` from the `broe-code` folder

Start a development instance of the app using `npm run dev` from `broe-code\client`
