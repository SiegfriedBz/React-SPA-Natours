# Natours React SPA

This project is a frontend implementation using Vite and React for a web application.  
Cypress tests have been added to ensure the quality and reliability of the application's features.
It interacts with a backend standalone [API](https://github.com/SiegfriedBz/express_api_ts-natours) written in TypeScript with Node.js and Express.
To ensure seamless functionality, verify that the backend API is up and running

## Cypress
[![Natours](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/a6epfn&style=flat&logo=cypress)](https://cloud.cypress.io/projects/a6epfn/runs)


## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Tests](#running-the-tests)
- [Running the Development Server](#running-the-development-server)
- [Build](#build)
- [Running the Production Server](#running-the-production-server)
- [Live Demo](#live-demo)


## Prerequisites
Before running this project, ensure you have the following accounts set up:

- **Stripe Account**: This is required for payment processing functionalities.  
  The Stripe account configured in this project must match the one used to create the [Natours API](https://github.com/SiegfriedBz/express_api_ts-natours) backend. 
- **Mapbox Account**: This is used for mapping services.

## Installation

To get started with this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo-name/api_ts_zod_fe_react_v2.git
   git@github.com:SiegfriedBz/vite_react_ts-natours.git
   cd vite_react_ts-natours
   ```
   
2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables

Create a .env file in the root directory of the project and add the following environment variables:

    # Admin Email Link
    VITE_ADMIN_LINK_TO=
    
    # Natours API
    VITE_API_PUBLIC_URL=http://localhost:1337  # Public URL for the Natours API
    VITE_API_URL=http://localhost:1337/api/v1  # API URL for the Natours API
    VITE_API_TOURS_PER_PAGE=4  # Number of tours per page for pagination
    
    # Stripe Public Key
    VITE_STRIPE_PUBLIC_KEY=
    
    # Mapbox API Key
    VITE_MAPBOX_API_KEY=
    
    # Cloudinary Images
    VITE_CLOUDINARY_CLOUD_NAME=
    VITE_HERO_BG_IMG_URL=
    VITE_LOGIN_BG_IMG_01_URL=
    VITE_LOGIN_BG_IMG_02_URL=
    VITE_LOGIN_BG_IMG_03_URL=


## Running the Tests

  Run tests with Cypress:
  ```bash
  npm run test
  ```

## Running the Development Server

  Start the development server:
    ```bash
    npm run test
    ```

## Build

  Build the project for production:
  ```bash
  npm run build
  ```

## Running the Production Server
  
  After building the project, you can start the production server using:
  ```bash
  npm run start
  ```

## Live Demo
Visit the live demo of [Spa-Natours](https://spa-natours.vercel.app/) deployed on Vercel.



