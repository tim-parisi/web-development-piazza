# web-development-piazza
A Backend for a social media network using MongoDB

## Commands:
- GET /posts - retrieves all posts from the database
- GET /posts/postID - retreives the post with postID
#### Authentication Required
- POST /posts - Creates a new post and uploads it to the database
- PUT /posts/postID - edits the post with postID
- DELETE /posts/postID - deletes the post with postID

- POST /register - Registers a new user to the database
- POST /login - Login to the database and receive an auth-token