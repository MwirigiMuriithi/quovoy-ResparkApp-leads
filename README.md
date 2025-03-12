# Lead Management API and Frontend

**Live Demo**

You can view the live application here:

[Lead Management App (Frontend)](<https://leads-quovoy-frontend.vercel.app/>)

(The backend is deployed on Render and is connected to the frontend.)

## Project Setup

### Prerequisites

Make sure you have the following installed:

* **Node.js:** [Download from here](<your-nodejs-download-link>).
* **MongoDB:** Set up a local MongoDB instance or use a cloud service like MongoDB Atlas.

### Clone the Repository
```bash
git clone https://github.com/MwirigiMuriithi/quovoy-ResparkApp-leads
cd quovoy-ResparkApp-leads
```


## Running the Project Locally

### Backend

1.  Navigate to the backend directory:

    ```bash
    cd backend
    ```

2.  ## Install Dependencies

    ```bash
    npm install
    ```   

3.  Set up your MongoDB database: You can either run MongoDB locally or configure your database to use MongoDB Atlas.

4. Create a `.env` file in the root of the backend directory and copy the contents from `.env.example`. Then, add your `MONGO_URI` connection string.

5. You can use the following command to copy the contents of `.env.example` into a new `.env` file:
   ```bash
   cp .env.example .env
   ```

6.  Run the backend:

    ```bash
    npm run dev
    ```

### Frontend

1.  Navigate to the frontend directory:

    ```bash
    cd frontend
    ```
2. ## Install Dependencies

    ```bash
    npm install
    ```  
3.  Run the frontend:

    ```bash
    npm run dev
    ```

4.  Visit `http://localhost:3000` to view the frontend in action. The backend will be available at `http://localhost:5000` (or your configured port).


## Technologies Used

* **Backend:** Node.js, Express, MongoDB (Mongoose).
* **Frontend:** Next.js.
* **Database:** MongoDB.
* **Deployment:** Vercel (Frontend), Render (Backend).
