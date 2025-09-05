# Introduction

This is a backend REST API written in node. It allows you to track your macro/micronutrients. 
I implemented an JWT auth system from scratch for this project, and all the routes related to tracking nutrients are protected.

Here is a breakdown of the routes themselves:
`Auth Routes`
- POST "/api/auth/register"
- POST "/api/auth/login"

Below are protected routes
`Food Routes`
- POST "/api/food-logs"
- GET "/api/food-logs"

- 'Summary Routes'
- GET "/api/summaries"

To run the project:
1. have node 20+
2. clone project and `cd` into it
3. run `npm install`
4. run `npm run dev`
