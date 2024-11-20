# User Notification Preferences API

This project is a serverless API for managing user notification preferences and sending notifications.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and update the MongoDB URI
4. Run the development server: `npm run start:dev`

## Deployment

This project is configured for serverless deployment on Vercel.

1. Install Vercel CLI: `npm i -g vercel`
2. Login to Vercel: `vercel login`
3. Deploy the project: `vercel`

## API Documentation

### User Preferences

- `POST /api/preferences`: Create user preferences
- `GET /api/preferences/:userId`: Get user preferences
- `PATCH /api/preferences/:userId`: Update user preferences
- `DELETE /api/preferences/:userId`: Delete user preferences

### Notifications

- `POST /api/notifications/send`: Send a notification
- `GET /api/notifications/:userId/logs`: Get notification logs for a user
- `GET /api/notifications/stats`: Get notification statistics

For detailed request and response formats, please refer to the API implementation in the controllers.

## Testing

Run tests: `npm run test`

## Environment Variables

- `MONGODB_URI`: MongoDB connection string


![Screenshot (479)](https://github.com/user-attachments/assets/e4d436c1-c8d2-4aa1-86ed-16469408d5a7)
