# DESC

A full stack demo of user auth utilizing MERN stack (MongoDB, Express, React, Node). React Context with Hooks for state management and Passport for user authorization. Validating input with Hapi/Joi.

## IN PROGRESS

Reducer setup

-   validate that exp date has not passed when setting global auth state
-   convert callbacks to actions for reducer to consume
-   add logout functionality (devalidate jwt issued and clear local storage)
-   consider running tests to validate jwt via server route

## NEXT

-   Appropriate error response codes

## COMPLETE

-   DB model config
-   Passport config
-   Passport auth route
-   Context setup
-   Get token client side
-   Store token in local storage
-   Basic client side router
