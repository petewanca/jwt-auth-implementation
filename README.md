# DESC

A full stack demo of user auth utilizing MERN stack (MongoDB, Express, React, Node). React Context with Hooks for state management and Passport for user authorization. Validating input with Hapi/Joi.

## IN PROGRESS

Reducer setup

-   Add more error messages if token expires versus if its compromised
-   consider running tests to validate jwt via server route

## NEXT

-   Add option to extend user session with refresh token
-   Appropriate error response codes

## COMPLETE

-   DB model config
-   Passport config
-   Passport auth route
-   Context setup
-   Get token client side
-   Store token in local storage
-   Basic client side router
-   Fix redirect at app level
-   Logout action for reducer
-   Clean up redirects on login
-   Clean up redirects on logout
-   Clean up payload from server side
-   Clean up redirects on validate token
-   What to do when token on client side is invalid?
