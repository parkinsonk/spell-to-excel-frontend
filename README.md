# Spell to Excel Frontend

## Description

This repository hosts the mobile frontend of the Spell to Excel app. Developed using React Native, this app offers an engaging and interactive way to improve spelling skills on mobile devices designed for students between 1st and 4th grade.

## Built With

[React Native](https://reactnative.dev/) - The web framework used

[Expo](https://expo.dev/) - Platform for universal React applications. Lets you see changes live as you make them on a mobile device.

## Getting Started

Before starting, ensure you have the following installed:
Node.js and npm: Download and install them from [Node.js Website](https://nodejs.org/en)

### Installation
1. Install Expo CLI:

`npm install -g expo-cli`

2. Clone Repository

3. Navigate to project directory
   
`cd spell-to-excel-frontend`

5. Install dependencies
   
`npm install`

6. Run the app

`npm start`


### Starting the app

After setting up the project and installing dependencies, running npm start in your project directory starts the Expo development server.

**Using the Expo Go app**: Once you have started your app using npm start, you will see a QR code. You can scan the QR code displayed using the Expo Go app on your iOS or Android device. This will open your project on your device. The Expo Go app needs to be installed on your mobile device from the App Store or Google Play Store.

## Repository Guidelines

Please use a branch when working on code. After a certain feature has been tested, then send a pull request to the main branch to merge to main. The main branch should only include tested and working code.

## Folder Structure

The `src` folder is the main directory for the source code of our React application. It is organized into several subdirectories, each with a specific purpose:

`assets` This folder contains all the static files like images, fonts, and any other assets required by the project. These are the non-code files that your project depends on. We also have subfolders in this folder that conatin all the assets for a particular view. For example, the "Welcome View" folder contains all of the assets that correspond to the welcome screen.

`components` Here you'll find the reusable components of the React application. Each component is typically a self-contained module that can be easily integrated throughout the application. This might include UI elements like buttons, input fields, and others.

`navigation` This directory manages the navigation/routing of the application. If you're using libraries like React Navigation for handling the navigation in a React Native app, their configurations and stack navigators will be defined here.

`services` Contains code that communicates with external services or APIs. This can include functions for HTTP requests, handling API endpoints, and other services that are integrated with the backend.

`utils` This folder is for utility scripts and helper functions that can be used across different components and features of the app. These might include date formatting functions, validators, or any custom utility functions.

`views` This directory holds the different screens or pages of the application. In a React Native app, for example, each screen corresponding to a single view would be found here. 

When the app is started, it first calls the App.js file. This then calls the AppNavigator.js file. The App Navigator then directs you to which screen to view.

## Google drive documents:

This [Google Drive Link](https://docs.google.com/document/d/1cv3wYupLLT9KxdokIB3fSvf2wyYhqmvJCdNE5L3y39Q/edit?usp=sharing) currently contains the below:

- System Block Diagram (Work in Progress) - A diagram showing the connections between the front-end and backend.
- Database ERD (Work in Progress) - An Entity Relationship Diagram that outlines the setup of the database.
- Paid Subscriptions - Just a location to keep track of subscriptions used for Spell to Excel.
