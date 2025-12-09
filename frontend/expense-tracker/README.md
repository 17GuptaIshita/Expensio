
Architecture

Frontend

React application (Vite) using Tailwind CSS for UI, Axios for HTTP, Chart.js / Recharts for visualizations.
Frontend is a single-page app that calls a REST API on the backend and uses JWT stored client-side for authenticated routes.

Backend (API)

Node.js + Express.js serving JSON endpoints for authentication and transaction CRUD (income/expense).
MongoDB (Mongoose) as primary datastore for users and transactions.
JWT-based authentication (stateless tokens).
Razorpay integration for payments (currently test mode).

Data flow

Client authenticates -> receives JWT -> includes token in Authorization header for private API endpoints.
Transactions are created/updated/deleted via API; charts are driven from aggregated query results returned by the backend or computed client-side.
Deployment target assumptions
Stateless API instances (JWT means no server-side session store needed for auth), persistent MongoDB (managed service or self-hosted replica set).
