# DESC

A full stack demo of user auth utilizing MERN stack (MongoDB, Express, React, Node). React Context with Hooks for state management and Passport for user authorization. Validating input with Hapi/Joi.

## IN PROGRESS

Reducer setup

-   Handle error for login
-   Add register reducer
-   Finish validate reducer
-   Verify token callback converted to reducer action
-   consider running tests to validate jwt via server route

## NEXT

-   Clean up redirects on login
-   Clean up redirects on logout
-   Clean up redirects on validate token
-   Clean up payload from server side
-   What to do when token on client side is invalid?
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
