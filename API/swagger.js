import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv'
dotenv.config()

const swagger = swaggerAutogen()

const doc = {
    info: {
        "version": "",                // by default: "1.0.0"
        "title": "Backend",                  // by default: "REST API"
        "description": "Documentation"             // by default: ""
    },
    host: process.env.SWWAGER_HOST,                         // by default: "localhost:3000"
    basePath: "/",                     // by default: "/"
    schemes: ["http","https"],                      // by default: ['http']
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [                           // by default: empty Array
        {
            "name": "User",               // Tag name
            "description": "Endpoints"         // Tag description
        },
        // { ... }
    ],
    securityDefinitions: {
        JWT: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: "",
        }
    },         // by default: empty object
    definitions: {
        UserLogin: {
            email: "jhon@example.com",
            password: "**********"
        },
        UserRegister: {
            username: "JohnDoe",
            email: "jhon@example.com",
            password: "**********"
            // { $ref: "#/definitions/myObject" }
        }
    }                  // by default: empty object
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./app.js']

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */


swagger(outputFile, endpointsFiles, doc)