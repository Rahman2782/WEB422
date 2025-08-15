# Car Dealership Inventory App (WEB422 FINAL)

## Project Setup

### Install Frontend Dependencies:
Navigate to the frontend directory and install the required packages using :
```
cd frontend
npm install
```

### Install Backend Dependencies:
Navigate to the backend directory and install the required packages using :
```
cd ../backend #
npm i
```
(assuming you're in 'frontend' )


### Running the Applications
Run both the frontend and backend servers concurrently in separate terminal windows

To start the Backend Server:
Open a terminal and navigate to the backend directory:
```
cd backend
node app.js 
```

The backend will typically be running on http://localhost:3001 - Keep this terminal open.

Start the Frontend Development Server:
Open a new terminal window and go to the frontend directory:
```
cd frontend
npm run dev
```


The frontend should  be running at http://localhost:3000 - Keep this terminal open.

## API Endpoints (Backend)
- Built with Node.js and Express, with the base URL for these endpoints being http://localhost:3001/api/cars. (example)

**GET /api/cars** -> Retrieves a list of all cars in the inventory

**GET /api/cars/:id** -> retrieves a single car by its ID
parameters: :id (integer) - The ID of the car.

**POST /api/cars** -> adds a new car to the inventory
Request Body: JSON object with make, model, year, price, and color.

**PUT /api/cars/:id** -> updates an existing car's details by its ID
Parameters: :id (integer) - The ID of the car to update.

**DELETE /api/cars/:id** -> Deletes a car from the inventory by its ID
Parameters: :id (integer) - The ID of the car to delete.

## Testing E2E with Cypress
- E2E tests simulate user interactions across the app in a real browser environment, interacting with the live backend API

MAKE SURE CYPRESS IS INSTALLED 

Start both the Backend and Frontend Servers: MAKE SURE both the backend API (http://localhost:3001) and the frontend (http://localhost:3000) are running before launching Cypress

Cypress Configuration (cypress.config.js):

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    specPattern: [
      "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", // Default pattern
      "car.cy.js"                           // Your test file in the root
    ],
    baseUrl: "http://localhost:3000", // Ensure your base URL is set correctly
  },
});

### Open the Cypress Test Runner:
Navigate to the solutions's root directory and run:
```
npx cypress open
```

this is gonna open the Cypress UI where you can select and run the E2E tests. The car.cy.js file should now be visible and runnable directly from the root.
![cypress results](image.png)
**4/5 TESTS PASSED SO FAR**