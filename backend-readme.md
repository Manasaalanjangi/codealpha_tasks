
# SocialWeave Backend

This is the backend API for the SocialWeave social media application.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment configuration:**
   - Copy the `.env.example` file to `.env`
   - Modify the values in the `.env` file to match your environment

3. **Database setup:**
   - Make sure you have MongoDB installed and running
   - The default connection string is `mongodb://localhost:27017/socialweave`
   - You can change this in the `.env` file

4. **Start the server:**
   ```bash
   npm start
   ```
   The API will be available at http://localhost:5000

## API Endpoints

### Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/me` - Get current user profile

### Posts

- `POST /api/posts` - Create a new post
- `GET /api/posts` - Get all posts
- `GET /api/posts/timeline` - Get posts for user's timeline
- `GET /api/posts/:id` - Get post by ID
- `DELETE /api/posts/:id` - Delete a post

### Likes

- `PUT /api/likes/post/:id` - Like a post
- `PUT /api/likes/post/:id/unlike` - Unlike a post
- `GET /api/likes/user` - Get posts liked by current user

### Saved Posts

- `POST /api/saved/post/:id` - Save a post
- `DELETE /api/saved/post/:id` - Unsave a post
- `GET /api/saved` - Get all saved posts for current user
- `POST /api/saved/collection` - Create a new collection
- `GET /api/saved/collections` - Get user's collections
- `PUT /api/saved/collection/:collectionId/post/:postId` - Add post to collection

### Friends

- `PUT /api/friends/follow/:id` - Follow a user
- `PUT /api/friends/unfollow/:id` - Unfollow a user
- `GET /api/friends/following` - Get users the current user follows
- `GET /api/friends/followers` - Get users following the current user
- `GET /api/friends/suggestions` - Get friend suggestions for current user

## Frontend Integration

To connect the frontend to this backend:
1. Make sure the backend server is running
2. The frontend should use the API services provided in the `src/services/` directory
3. The base URL for API requests is configured in `src/services/api.ts`

## Authentication Flow

The API uses JWT (JSON Web Tokens) for authentication:
1. On successful login/registration, a token is returned
2. This token should be stored in localStorage
3. The token is automatically added to the headers of subsequent requests
4. Protected routes require a valid token

## Deployment

For production deployment:
1. Set appropriate environment variables
2. Use a process manager like PM2 for Node.js applications
3. Set up proper MongoDB security measures
4. Consider using a reverse proxy like Nginx
