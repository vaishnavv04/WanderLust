# WanderLust

A full-stack vacation rental marketplace inspired by Airbnb. This application allows users to view, create, edit, and review property listings. It features user authentication, image uploads, and interactive maps.

## Features

*   **MVC Architecture**: Built using the Model-View-Controller pattern.
*   **User Authentication**: Secure login and signup using Passport.js.
*   **Listings Management**: Users can create, update, and delete property listings.
*   **Reviews System**: Users can leave reviews and ratings for properties.
*   **Image Storage**: Cloud-based image storage using Cloudinary.
*   **Geocoding & Maps**: Integrated Mapbox for location visualization.
*   **Responsive Design**: Mobile-friendly layout using Bootstrap.
*   **Session Management**: Secure session handling with MongoDB Store.

## Technologies Used

*   **Frontend**: EJS, Bootstrap, CSS, JavaScript
*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB, Mongoose
*   **Authentication**: Passport.js
*   **Services**: Cloudinary (Image Upload), Mapbox (Maps), JOI (Validation)

## Prerequisites

Before you begin, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v14 or higher)
*   [MongoDB](https://www.mongodb.com/) (Local or Atlas)
*   [Git](https://git-scm.com/)

## Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/vaishnavv04/WanderLust.git
    cd WanderLust
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add the following credentials:

    ```env
    # Cloudinary Configuration
    CLOUD_NAME=your_cloud_name
    CLOUD_API_KEY=your_api_key
    CLOUD_API_SECRET=your_api_secret

    # Mapbox Configuration
    MAP_TOKEN=your_mapbox_public_token

    # Database Configuration
    ATLASDB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/wanderlust?retryWrites=true&w=majority
    # OR for local development:
    # MONGODB_URI=mongodb://localhost:27017/wanderlust

    # Session Secret
    SECRET=your_super_secret_key
    ```
    > **Note**: `ATLASDB_URL` is used in production/cloud setup, while `MONGODB_URI` can be used for local DB.

4.  **Initialize Database**
    Populate the database with sample data:
    ```bash
    node init/index.js
    ```

5.  **Run the Application**
    ```bash
    node app.js
    ```
    The server will start on port 8080 (or 3000 if configured).
    Open [http://localhost:8080](http://localhost:8080) in your browser.

## Project Structure

```
WanderLust/
├── controllers/    # Route logic
├── models/         # Mongoose schemas (Listing, User, Review)
├── routes/         # Express routes
├── views/          # EJS templates
├── public/         # Static assets (CSS, JS)
├── init/           # Database seeding scripts
├── utils/          # Error handling utilities
├── app.js          # Entry point
└── ...
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
