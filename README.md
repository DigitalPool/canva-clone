This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Docker Setup (All Services)

This repository now includes:

- A root [docker-compose.yml](docker-compose.yml) that runs:
  - client (Next.js)
  - api-gateway
  - design-service
  - upload-service
  - subscription-service
  - mongo
- A root [Makefile](Makefile) with shortcuts for common Docker commands.

### 1) Configure Environment

Copy `.env.example` values into a new `.env` file at the project root and fill in required values:

- `GOOGLE_CLIENT_ID`
- `AUTH_SECRET`
- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`
- Optional Cloudinary variables for upload service.

### 2) Build and Start

```bash
make up-build
```

### 3) Common Commands

```bash
make up
make down
make logs
make ps
make clean
```

### 4) Service Endpoints

- Client: http://localhost:3000
- API Gateway: http://localhost:5500
- Design Service: http://localhost:5001
- Upload Service: http://localhost:5002
- Subscription Service: http://localhost:5003
- MongoDB: mongodb://root:rootpassword@localhost:27017/admin

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


Client
npx shadcn@latest add button input dialog label select slider switch tabs
npm i axios fabric file-saver jspdf lodash uuid zustand next-auth@beta

backend - 

api gateway -
npm i cors dotenv express-http-proxy express google-auth-library helmet jsonwebtoken nodemon

upload service -
npm i cloudinary cors doten express helmet jsonwebtoken mongoose nodemon multer

design and subscription service -
npm i cors dotenv express helmet jsonwebtoken mongoose nodemon

design service extra - 
npm i axios



Next, go to Auth.js
https://authjs.dev/getting-started/installation?framework=Next.js
and complete the setting up

So copy, 

```bash
npx auth secret
```
and run it in the client side

it says
```bash
Created /Users/****/****/******/client/.env.local with `AUTH_SECRET`.
```

###

Next, create src/server.js in each of the microservices

Also in all the src folders, create
[text](src/controllers/design-controller.js) 
[text](src/middleware/auth-middleware.js) 
[text](src/models/design.js) 
[text](src/routes/design-routes.js)

except the api-gateway
in it, create a folder
src/middleware/auth-middleware.js

###
Now go the the client, and create folder 
/fabric - This is where you will add the the utils for fabricjs
/store - where we will show the store
/services - where we will enter the apis
/providers - 


###

Now go to App.js, then go to page.js and remove everything from there because we want it fresh.
The return a simple <div>HomePage<div>

```js
export default function Home() {
  return (
    <div> HomePage </div>
  );
}
```

###

Go to client/app/, and create folder named editor.
This is where we are going to do lots of things.

It is going to be a dynamic page.
so add a [slug] folder to it and create a **page.js** in it

```js
'use client';

export default function EditorPage() {
    return (
        <div>EditorPage</div>
    );
}
```

###

also create app/login/

```js
export default function Login() {
    return (
        <div>Login Page</div>
    );
}
```

###

From here we should start creating the login page.
We are using **Auth.js** which is from **Google**.

How this works is that, in the login or authentication pages, a client sends a token which is then passed to the api-gateway. The Api Gateway then uses ***google-auth-library*** in the ***auth-middleware.js*** to verify the token, then passes the logged-in user's Id to the downstream services, they then processes other resources for the logged in user.

So we have to create the credentials for this AuthJS in Google Console.

Go to
https://console.cloud.google.com
Create a new project
Click on APis & Services
Credentials
+ Create Credentials = OAuth client ID
Configure Consent screen
Get Started
--- Give App Name and email
--- External
--- email
--- Agree and Continue

Go to create OAuth Client

Application Tyoe - Web application
Name: e.g Canva Clone


Start your project frontend, and copy the address of the front end

Authorized JavaScriop origins = https://localhost:3000 (or what your front end is listening on)

For ***Redirect URL***

Go to Auth.js -> Providers -> Google -> 
copy  https://example.com/api/auth/callback/google

so, it will be
https://localhost:3000/api/auth/callback/google

Then click on ***Create***
Now copy your credentials

AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

Now, create the structure for your loginPage.

The login page, remember, is a page.js located at src/app/login. In Next.js, every new folder is a route, and the main loading of the routte is the page.js in it. It can then have other resources in the folder, but the page.js is the mail route that is loaded as the route.

[login](client/src/app/login/page.js)

Most importantly, the login page uses a login-card.js component. which yu=ou will design and houses the Google OAuth functionality
[login-card](client/src/components/login/login-card.js)

In this card you import 
```js
import { LogIn } from "lucide-react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
```

Lucide React gives you instant, ready-to-use icons, which you can add and then customize using className styled classes.
The signIn is coming from next-auth and gives you the functionality to integrate google signIn into your app
[signIn from next-auth/react](node_modules/next-auth/src/react.tsx)

But now, that we have it and designed, it is still not functional, beacuse someone can just edit the url and add /editor/1 (which is a dynamic url) and aceess it.

So we need to protect that route in a middleware, by completing the AuthJS.

So go to and create client/src/auth.js file.
[auth.js](client/src/auth.js)
follow this guide: https://authjs.dev/getting-started/providers/google
then https://authjs.dev/getting-started/authentication/oauth

So after setting up our auth.js middleware

we have to create this file as explained in the auth.js guide 
then https://authjs.dev/getting-started/authentication/oauth

```fs
./app/api/auth/[...nextauth]/route.ts
```

and then paste the code give to us in the guide

```js
import { handlers } from "@/auth"
export const { GET, POST } = handlers
```

then add the **signIn** to the logIn.js component

```js
import { signIn } from "next-auth/react";

//and add the onClick function

onClick={() => signIn("google", { callbackUrl: "/" })}

```
Once, this is done the continue with google button should be working.

*********************************************************************

We also need to wrap all the component inside the auth provider, so we need to provided a session provider, to make session data available anywhere.

https://authjs.dev/reference/nextjs/react#sessionprovider

This should be done as root component.

```js
'use client'

import { SessionProvider } from "next-auth/react"

function NextAuthProvider({children}) {
  return (
    <SessionProvider> { children } </SessionProvider>
  );
}

export default NextAuthProvider;

```
This children will now be all the components that we want wrapped around the Session Provider

So now in the **layout.js**, instead of just having the { children }, we now replace it with 

```js
<NextAuthProvider>{children}</NextAuthProvider>
```

*********************************************************************

At this stage, the authentication is working, but the user is still abel to access other pages by just editing the broser url.

So we have to protect all the other routes using a middleware,

So what will happen is that, when the user is not logged in, they cannot go to other pages, and when they are logged in they cannot access the login page anymore.

```bash
touch src/middleware.js
```

```js
//we import auth from .auth
import { auth } from "./auth"


// and then design a default auth export, that takes a request parameter. This request has the 
// the url the user is trying to access from, and the next url they want to go from here.
// It also has information whether the user here is authenticated or not through the !!req.auth

export default auth((req) => {
  // first we check is the 
  const isLoginPage = req.nextUrl.pathname.startsWith('/login')

  // check if user is an authenticated user
  const isAuthUser = !!req.auth

  if(isLoginPage){
    if(isAuthUser){
      return Response.redirect(new URL('/', req.url))
    }
    return null
  }

  if (!isAuthUser){
    return Response.redirect(new URL('/login', req.url))
  }
})

//new create a config which will merge all the routes

export const config = {
  matcher : [
    '/',
    '/editor/:path*',
    '/login'
    //later if needed we will add other routes here
  ]
}

```

******************************************************************************
<!-- ********************************************************************* -->
<!-- ********************************************************************* -->
<!-- ********************************************************************* -->

# ✅ **1. What is the significance of `req.url`?**

`req.url` is the **full URL of the incoming request**.

Example
If the request is

```
https://myapp.com/login?ref=google
```

Then:

* `req.url` = `"https://myapp.com/login?ref=google"`
* `req.nextUrl.pathname` = `"/login"`
* `req.nextUrl.searchParams` = `"ref=google"`

The key thing
`req.url` includes the **domain**, the **path**, and the **query parameters**

Now when you do

```js
new URL('/login', req.url)
```

Here is the meaning

* first argument is the target path `/login`
* second argument (`req.url`) is the **base URL**

This allows Next.js to build a correct absolute redirect URL.

Example

```js
new URL('/login', 'https://myapp.com/dashboard')
```

becomes

```
https://myapp.com/login
```

So the second argument tells the server

“Use this as the base URL when constructing the final redirect link”

If you remove `req.url`, Next.js would not know which domain to redirect to.

.

# ⭐ Summary

`req.url` ensures that redirects use the correct domain and protocol.

.

# ✅ **2. What is `matcher`? What does it do?**

`matcher` tells Next.js middleware **which routes this middleware should run on**.

Without matcher
middleware runs on every route including images, CSS, icons, and static files
That slows down everything

So matcher is used to **limit the middleware only to specific routes**

Example from your code

```js
export const config = {
  matcher: [
    '/',
    '/editor/:path*',
    '/login'
  ]
}
```

This means

### ✔ Middleware runs on:

* `/`
* `/editor/*`
  example
  `/editor/file`
  `/editor/settings/theme`
  `/editor/a/b/c/d`
* `/login`

### ❌ Middleware does NOT run on:

* `/favicon.ico`
* `/api/*`
* `/public/*`
* `/static/*`
* images
* fonts
* other pages not listed

This makes your authentication check faster
and prevents breaking static assets

.

# ⭐ Why matcher is important

Without matcher
your middleware would run on:

* every file
* every image
* every API request
* every static asset
* all routes

This breaks things like CSS, icons, images
and slows the whole app

Matcher keeps authentication middleware **focused only on pages that need protection**

<!-- ********************************************************************* -->
<!-- ********************************************************************* -->
<!-- ********************************************************************* -->
*********************************************************************

Now, we will connect all the endpoints of the microservices with the main server, we start by creating an environmental variable file into each of the services

```bash
touch api-gateway/.env subscription-service/.env design-service/.env upload-service/.env
```

So we have do dedlare in the api gateway env file we declare which services we will be running and what port will each of them be running on

```.env
  PORT=5500
  DESIGN=http://localhost:5001
  UPLOAD=http://localhost:5002
  SUBSCRIPTION=http://localhost:5003
```

Now, we go to all the services .env, and put their ports there

```design-service/.env
PORT=5001
```

like that, for the rest as well

*********************************************************************

Now lets connect the ports, we go our services server.js and start the implementation

```js
const express = require('express');
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT || 5001
const mongoURL = process.env.mongoURL
const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//database connection
mongoose.connect(mongoURL)
.then(()=> console.log('connected to MongoDb'))
.catch((error) => console.log(`Error connecting to MongoDb: ${error}`))

//server connection
async function startServer() {
    try {
        app.listen(PORT, () =>{
            console.log(`Design service started on port ${PORT}`)
        })
    } catch (error) {
        console.log('error starting server: ', error)
        process.exit(1)
    }
}

startServer()

```

*********************************************************************
```js

3️⃣ Why do we use these two lines?
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

They are body parsers. They allow Express to read data sent from the client.

Without them, req.body will be undefined.

📦 express.json()

This parses JSON request bodies.

Example request from frontend:

axios.post('/design', {
  title: "Poster",
  color: "blue"
})

Server receives:

Content-Type: application/json

With express.json():

req.body = {
  title: "Poster",
  color: "blue"
}

Without it:

req.body = undefined
📦 express.urlencoded()

This parses form submissions (application/x-www-form-urlencoded).

Example from HTML form:

<form method="POST">
  <input name="title">
</form>

Data sent looks like:

title=Poster&color=blue

express.urlencoded() converts that into:

req.body = {
  title: "Poster",
  color: "blue"
}
What does extended: true mean?
extended: true

Allows nested objects.

Example:

user[name]=Azeez
user[age]=30

Becomes:

req.body = {
  user: {
    name: "Azeez",
    age: 30
  }
}

Most modern apps keep this as true.
```

*********************************************************************
Now, we also put our mongodb URL/URI in the .env of other services
and copy the design of the serveer and paste it in the server.js file of the other services.
The only differecne is the ports

*********************************************************************

Now we go to the API gateway server.js and create it. We create it as a proxy 


*********************************************************************


Next create an auth-Middleware which will tackle/validate our token, and will pass the user_id through the API gateway to other services also. When that is done, then we will do the homepage UI. It is important that we do not do the editor or backend functionality first, and we start with the homepage UI.

So in the middleware folder in the API gateway, we will verify that GoogleIdToken coming from the frontend.
It is not extremely mandatory to verify again here, because google OAuth already verifies in the front end, we can just create a client ID and pass it downstream. But, most times, we cannot always trust the data coming from the frontend. It might not be secure. Somehow, because the tokens are stored in the cookies and the cookies can be manipulated.
 
So we are doing two layers of validation


now, add your google Client ID to your API Gateway env file

```js

// 1️⃣ Import Google Authentication Library
const {OAuth2Client} = require('google-auth-library');

// This library allows your backend to verify Google Sign-In tokens.

// When users log in with Google on the frontend, Google returns an ID token (JWT).

// Example token flow:

// Frontend → Google Login
// Google → returns ID token
// Frontend → sends token to backend
// Backend → verifies token with google-auth-library
// 2️⃣ Create Google OAuth Client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// This creates a Google authentication verifier.

// It uses your Google OAuth Client ID, which identifies your application.

// Example .env:

GOOGLE_CLIENT_ID=1234567890-abcdef.apps.googleusercontent.com

// This ensures the token was issued for your app, not another one.

3️⃣ Define the Middleware Function
async function authMiddleware(req, res, next)

// If not fixed, authentication will break.

// 4️⃣ Extract Authorization Header
const authHeader = req.headers['authorization']

// This reads the Authorization header sent by the client.

// Example request:

// Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6...
// 5️⃣ Extract the Token
const token = authHeader && authHeader.split(' ')[1]

// Explanation:

// Authorization header format:

// Bearer TOKEN_HERE

// Split it:

["Bearer", "TOKEN_HERE"]

// So [1] extracts the actual token.

// Example result:

// token = eyJhbGciOiJSUzI1NiIs...
// 6️⃣ Reject Requests Without a Token
if(!token){
    return res.status(401).json({
        error: "Access denied No Token provided"
    })
}

// If the client does not send a token, the request is rejected.
// HTTP response:
// 401 Unauthorized
// This prevents unauthenticated users from accessing protected routes.

// 7️⃣ Verify the Google Token
const ticket = await client.verifyIdToken({
    idToken: token,
    expectedAudience: process.env.GOOGLE_CLIENT_ID
})

// Google verifies that:

// 1️⃣ the token is real
// 2️⃣ it was issued by Google
// 3️⃣ it belongs to your application

// If verification fails → an error is thrown.

// 8️⃣ Extract User Information
const payload = ticket.getPayload()

// Payload contains user data from Google.

// Example payload:

{
  sub: "1092837465",
  email: "user@gmail.com",
  name: "John Doe",
  picture: "...",
  iat: 123456,
  exp: 123456
}
// 9️⃣ Attach User Data to the Request
req.user = {
    userId: payload['sub'],
    email: payload['email'],
    name: payload['name']
}

// This adds user data to the request.

// Later in your service:

req.user.userId
req.user.email
req.user.name

// This is useful for business logic.

// Example:

// Create design for this user
// Get designs belonging to this user
🔟 Add Headers for Downstream Services
req.headers['x-user-id'] = payload['sub']
req.headers['x-user-email'] = payload['email']
req.headers['x-user-name'] = payload['name']

// Since the API Gateway forwards requests to microservices, those services need the user identity.

// Instead of verifying the token again in every service, the gateway adds headers.

// Example request forwarded to a service:

GET /api/designs
x-user-id: 1092837465
x-user-email: user@gmail.com
x-user-name: John Doe

// This allows microservices to know who the user is.

// 1️⃣1️⃣ Continue the Request
next()

// This tells Express:

// Authentication successful → continue processing request

// So the request goes to the proxy and reaches the microservice.

// 1️⃣2️⃣ Handle Token Verification Errors
catch (error) {
    console.log(`Token verification failed: ${error}`)
    res.status(401).json({error: "Invalid Token"})
}

// If the token is:

// expired
// tampered with
// issued for another app
// Then verification fails.

// Response:

401 Unauthorized
1️⃣3️⃣ Export the Middleware
module.exports = authMiddleware

// This allows the gateway server to import it:

// const authMiddleware = require("./middleware/auth-middleware");
```
*********************************************************************
With this, the basic structure of the authorization is done,  now we can go to the indivudual services and validate

```js
const authenticatedRequest = (req, res, next) =>{
    const userId = req.headers['x-user-id']
    if(!userId){
        return res.status(401).json({
            error: "Access denied! Please login to continue"
        })
    }

    //always pass as an object
    req.user = {userId}

    next()
}

module.exports = authenticatedRequest

```
We use this same login in all the services individual middleware
With this we have setup the basic setup of our authorization

*********************************************************************

Lets start creating our components
We will first create an header, sidebar,nagger component 

We can now go to our app/page.js and create the basic structure

We create components and import them to the app/page.js to make our home page UI great.
*********************************************************************

Now we will start working on the end points connecting the different services with the frontend

We go to our design-service/src/models/design.js

```js
const mongoose = require ('mongoose')

// now create the Design Schema which will store design in the database; mongoose. 
// we can expand this based on whatever schema we want to add in our design types later

const DesignSchema = new mongoose.Schema({
  userId: String,
  name: String,
  canvasData: String,
  width: Number,
  height: Number,
  category: String,
  createdAt: {
    type: Date,
    default: Date.now()
  }
  updatedAt: {
    type: Date,
    default: Date.now()
  }
})

// Now we can now create a model

const Design = mongoose.models.Design || mongoose.model('Design', DesignSchema)

module.exports = DesignSchema
```

***************************************************************************


1️⃣ What a Mongoose Schema Is
const DesignSchema = new mongoose.Schema({...})

A schema defines the structure of documents stored in MongoDB.

Think of it like a blueprint for the data.

Example document stored in MongoDB:
```js
{
  "userId": "123",
  "name": "Poster Design",
  "canvasData": "...",
  "width": 800,
  "height": 600,
  "category": "social-media",
  "createdAt": "2025-03-08",
  "updatedAt": "2025-03-08"
}
```
The schema defines:

field names
data types
default values

2️⃣ Schema ≠ Database Table

You asked:
Does it create a table in MongoDB?
Not exactly.
MongoDB does not use tables.
Instead it uses:
SQL	MongoDB
Database	Database
Table	Collection
Row	Document

So this schema will correspond to a collection called:

designs

Mongoose automatically pluralizes model names.

3️⃣ What mongoose.model() Does
mongoose.model('Design', DesignSchema)

This creates a model.
A model is what you use to interact with the database.
Example:

```js
Design.find()
Design.create()
Design.deleteOne()
```

So the flow is:

Schema → Model → Database operations
4️⃣ What mongoose.models.Design Means

Now let’s examine this line:

```js
const Design = mongoose.models.Design || mongoose.model('Design', DesignSchema)
```

This checks if the model already exists.
Why this matters

In development environments (especially Next.js or hot reload), files may reload multiple times.
If you run:

```js
mongoose.model('Design', DesignSchema)
```

twice, Mongoose throws an error:
OverwriteModelError: Cannot overwrite `Design` model once compiled

To avoid this, developers use:

```js
mongoose.models.Design
```

This checks if the model has already been created.

Logic breakdown

```js
const Design = mongoose.models.Design || mongoose.model('Design', DesignSchema)
```

means:

IF model already exists
    use existing model
ELSE
    create a new model
5️⃣ Where mongoose.models Comes From

This comes from Mongoose's internal model registry.
Mongoose keeps track of all models in:

mongoose.models
Example:

```js
console.log(mongoose.models)
```

Output:

```js
{
  Design: Model,
  User: Model
}
```

So mongoose.models.Design simply checks if the model is already registered.

8️⃣ How This Model Will Be Used

Example usage:

```js
const Design = require('./models/design')

// Create a design:

await Design.create({
  userId: "123",
  name: "Poster",
  width: 800,
  height: 600
})
```

Find designs:

const designs = await Design.find({ userId: "123" })
9️⃣ What Gets Stored in MongoDB

MongoDB will create a collection:

designs

And store documents like:
```js
{
 "_id": "...",
 "userId": "123",
 "name": "Poster",
 "width": 800,
 "height": 600,
 "createdAt": "2025-03-08"
}

```
***************************************************************************

after creating the schema in the model file, we cna now create the controllers

```js
const Design = require('../models/design')

//we will create controllers for
//getUserDesigns
//getUserDesignsById
//saveDesign
//deleteDesign

exports.getUserDesigns = async (req, res) => {
  try {
    //get the user Id
    //get all the designs of this user, then sort by updatedAt
    //retuen res.status 200, success as true
  } catch (e){
    console.log(e)
    //res.status...
  }
}

exports.getUserDesignsbyId = async (req, res) => {
  try {
    //get the user Id
    //get the id of the particular Design being requested for
    //find the particular design requested by user, using findone
    //if not desig present retuen 404 status
    //return res.status 200, success as true if the design is found
  } catch (e){
    console.log(e)
    //res.status...
  }
}

exports.saveDesign = async (req, res) => {
  try {
    //get the user Id, 
    // get from req the design data = design Id, name canvasData, width, height, category, 
    //if each data was sent, then update that design with the data sent
    //also save the time design was updated
    // const updatedDesign = await design.save()
    //return res.status 200, success as true with data: updatedDesign

    //Now in the scenarie where the design is not present, we create a new design
    //cosnst saveDesign = await newDesign.save(), and we return it
    // return res.status 200, success as true with data: newDesign

  } catch (e){
    console.log(e)
    //res.status...
  }
}

exports.deleteDesign = async (req, res) => {
  try {
    //get the user Id, 
    // get from req the design data = design Id, name canvasData, width, height, category, 
    // const design = await Design.findOne({_id: designId, userID})
    // if deisng is not found or no permission, return error 404

    //if design found and can delete, Design.deleteOne({id: designId})
    // return res.status 200, success as true with message: deleted successfully

  } catch (e){
    console.log(e)
    //res.status...
  }
}

```
***************************************************************************

Now that the controllers are done, next thing is to create the routes for these controllers

require express
require designControllers which we designed earlier
require authenticatedRequests from authMiddleware, to authenticate these requests
also require Router

```js
const router = express.Router()
router.use(authenticatedRequets)
```

Remember that the authenticatedRequests will reject the user, if their id is not authenticated for the request or resources they are trying to access. And if it is authenticated, it calls the next method to tell the router to procees to the next things in the Routes file.

```js
//now we register all the routes
router.get("/", designController.getUserDesigns)
router.get("/:id", designController.getUserDesignsById)
router.get("/", designController.saveDesign)
router.get("/:id", designController.deleteDesign)

module.exports = router

```
***************************************************************************
Finally what er have to do now is to import the design routes into the server.js file of Design services

```js
const express = require('express');
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
//add it here
const designRoutes = require (./rotes/designRoutes)

//then ask the app to use it down

dotenv.config()

const PORT = process.env.PORT || 5001
const mongoURL = process.env.mongoURL
const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//the ask the app to use it
app.use('/api/designs', designRoutes)
//so now then we are going to call or send a design we are going to call with API and it will redirect to our routes

//database connection
mongoose.connect(mongoURL)
.then(()=> console.log('connected to MongoDb'))
.catch((error) => console.log(`Error connecting to MongoDb: ${error}`))

//server connection
async function startServer() {
    try {
        app.listen(PORT, () =>{
            console.log(`DESIGN service started on port ${PORT}`)
        })
    } catch (error) {
        console.log('error starting server: ', error)
        process.exit(1)
    }
}

startServer()

```

***************************************************************************

With this, the back end for the design route is donw. We will now create the services edpoints that will call these apis from the frontend

in our client/src/services, we create a file called base-services. This base services will be the point where other services will coagulate to before going to the API gateway in the backend.

In there we declare the API_URL it is going to.

```js
const API_URL = process.env.API_URL || 'http://localhost:5500'
```

This API_URL we will already have put in our env.local.

The we will fetch the requested API with authentication

```js
export async function fetchWithAuth(endpoint, options = {}){
  const session = await getSession()
  if(!session) {
    //if there is no session, or session cookie, then we will throw error that the user is not authenticated
    throw new  Error ('Not authenticated')
  }
  try{
      //we use axios as it is what allows our frontend to communicate with our backend
      const response = await axios({
        // we will send it as the API_URL/method which we will be passing as we need request
        // this url will be the first arginemt when we are fetching with this axios function
        url: `${API_URL}${endpoint}`,
        // we will pass the options for every call we are trying to make
        method : options.method || 'GET',
        // we must pass the headers with the authorization, very important
        headers : {
          Authorization : `Bearer ${session.idToken}`
          ...options.headers
        },
        // then we have to create the data
        data : options.body,
        params : options.params
      })

      // then we return the response.data
      return response.data

  } catch(error) {
    // here is where you catch error on the system
    throw new Error('Api request failed')
  }
}
```
 
***************************************************************************

Now create a new file in this folder called design-service.js to design the endpoints for our design services

```js
import {fetchWithAuth} from out base-service

export async function getUserDesigns(){
  return fetchWithAuth('/v1/designs', {
    //or you can skip the method becasue if not stated it will use GET by default 
    method: 'GET'
  })
}

// for the get by id
export async function getUserDesigns(designId){
  return fetchWithAuth(`/v1/designs/${designId}`)
}

// for saveDesign

export async function saveDesign(designData, designId = null){
  return fetchWithAuth(`/v1/designs`, {
    method: 'POST',
    body: {
      ...designData,
      designId
    }
  })
}

export async function deleteDesign(designId){
  return fetchWithAuth(`/v1/designs/${designId}`, {
    method: 'DELETE'
  })
}

```
***************************************************************************

Now we go to the editor pages. The editor page is where you will see the 
canvas having all the details of that particular design that you have draw. 
We will be getting this canvas we will be getting from fabric.js

in our editor folder, lets create the main editor.js
How do we do this, we create folders for the different parts
editor/index.js
editor/header/index.js
editor/sidear/index.js
editor/canvas/index.js

in /header/index.js

```js
"use cilent"

function Header() {
  return (
  <div> Editor Header</div>
  )
}
export default Header;

```

create same for all the other index.js int he sidebar and canvas folders

the main editor will now also have an index.js file, that imports all these parts
editor/index.js

```js

"use client";
import Canvas from "./canvas";
import Header from "./header";
import Sidebar from "./sidebar";

function MainEditor() {
return <div className="flex flex-col h-screen overflow-hidden">
  <Header/>
  <div className="flex flex-1 overflow-hidden">
    <Sidebar/>
    <div className="flex-1 flex flex-col overflow-hidden relative">
      <main className="fleX-1 overflow-hidden bg-[#f0f0f0] flex items-center" >
        <Canvas/>
      </main>
    </div>
  </div>
</div>
}
```
***************************************************************************

now we go to the folder 

app/editor/page/editor/[slug]/page.js

and we return out mainEditor

```js
"use cilent"

import MainEditor from "@/components/editor"

export default function EditorPage() {
  return (
  <MainEditor>
  )
}

```

***************************************************************************
***************************************************************************
***************************************************************************
***************************************************************************


So lets create store.js in our store folder

```js

import {create } from "zuztand"

export const useEditorStore = create((set,get) => ({
  //in zuztand you declare the state and assign it to something at first
  canvas: null
  setCanvas: (canvas) => {
    //zuztand uses set, to update the state of a variable, and used get to get the current state
    set({caanvas});
    if(canvas){
      //so in out setCanvas function, we want to first check if there is a canvas in the editor, 
      // then we will center it. We will create and  import this centerCanvas from fabric/fabric-utils.js
      centerCanvas(canvas)
    }
  }
}))
```
***************************************************************************

fabric/fabric-utils.js

```js
import (canvas) from "./store/store.js"

// we get the canvas intoo the centerCanvas here

export const centerCanvas = (canvas) =>{

  if(!canvas) return

}
```
***************************************************************************

Now lets design the canvas. In the canvas, we want to render the canvas data or desigh data of that particular design


```js

"use client";
import Canvas from "./canvas";
import Header from "./header";
import Sidebar from "./sidebar";

function MainEditor() {

//we have to get the param for this design. params is basically the details that comes after the main slug in the address bar after

const params = useParams()
const router = useRouter()
const designId = params?.slug

//sets loading to true if there is a designId, i.e if there is no designId it will not need to load
const [isLoading, setIsLoading] = useState(!!designId)
const [loadAttempted, setloadAttempted] = useState(false)
const [error, setError] = useState(null)

// now we get the canvas from the useEditorStore

const {canvas} = useEditorStore()

return <div className="flex flex-col h-screen overflow-hidden">
  <Header/>
  <div className="flex flex-1 overflow-hidden">
    <Sidebar/>
    <div className="flex-1 flex flex-col overflow-hidden relative">
      <main className="fleX-1 overflow-hidden bg-[#f0f0f0] flex items-center" >
        <Canvas/>
      </main>
    </div>
  </div>
</div>
}
```

lets go back to our store index.js to set the designId because we need it here

***************************************************************************

So lets create index.js in our store folder

```js

import {create } from "zuztand"

export const useEditorStore = create((set,get) => ({
  //in zuztand you declare the state and assign it to something at first
  canvas: null
  setCanvas: (canvas) => {
    //zuztand uses set, to update the state of a variable, and used get to get the current state
    set({caanvas});
    if(canvas){
      //so in out setCanvas function, we want to first check if there is a canvas in the editor, 
      // then we will center it. We will create and  import this centerCanvas from fabric/fabric-utils.js
      centerCanvas(canvas)
    }
  }

  designId : null
  setDesignId : (id) => set({designId : id})

}))
```
***************************************************************************

now set design Id in the MainEditor
***************************************************************************


```js

"use client";
import Canvas from "./canvas";
import Header from "./header";
import Sidebar from "./sidebar";

function MainEditor() {
  const params = useParams()
  const router = useRouter()
  const designId = params?.slug

  const [isLoading, setIsLoading] = useState(!!designId)
  const [loadAttempted, setloadAttempted] = useState(false)
  const [error, setError] = useState(null)

  // set the design Id
  const {canvas, setDesignId, resetStore} = useEditorStore()

  //add UseEffect so all these methods can take effect

  useEffect(() => {
    //reset the store
    resetStore()

    //set the design id if it is present
    if(designId) setDesignId(designId)

    //we can also do a clean up

    return() => {
      resetStore()
    }
  })

  //

  //anytime the designId changes we have to setLoadAttempted to false and error to null
  useEffect(() => {
    setLoadAttempted(false)
    setError(null)
  }, [designId]) //it is based on the changing od designId

  //it is possible that the Design is loaded and the canvas is not ready from the canvas

  useEffect(() => {
    if (isLoading && !canvas && designId){
      const timer = setTimeout (() => {
        if(isLoading){
          console.log('Canvas init timeout')
          setIsLoading(false)
        }
      }, 5000)
      return ()=>clearTimeout(timer)
    }
  }, [isLoading, canvas, designId])

  //Now if canvas is now available we log that it is available
  useEffect(() => {
   if(canvas){
    console.log('Canvas is now available in editor')
   }
  }, [canvas]) //it is based on the changing of canvas


  // Now here we have to load the design and render it

 

  return <div className="flex flex-col h-screen overflow-hidden">
    <Header/>
    <div className="flex flex-1 overflow-hidden">
      <Sidebar/>
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <main className="fleX-1 overflow-hidden bg-[#f0f0f0] flex items-center" >
          <Canvas/>
        </main>
      </div>
    </div>
</div>
}
```
Now, lets go to our Fabic utils file and create our utils

***************************************************************************

Now we need some utilities from the fabric-utils.js, all these we can find some help on Fabric JS website, 
https://fabricjs.com/docs

We will first create the initializeFabric function

```js
// this utility will help us initilize fabric, but receiving the canvas element and the container containing it
export const initializeFabric = async (canvasEl, containerEl) => {

  //then we use a try and catch block so we can catch any error that happened

  try {
    //now we will be inserting an instance of "Canvas" from fabricJs into our canvas element.

  } catch (e) {
    console.error("failed to load fabric", e)
    return null
  }

}
```
***************************************************************************
In Fabric.js, the new fabric.Canvas() constructor takes two main arguments to initialize a new interactive canvas instance: 
element (Required): The HTML <canvas> element itself, or the id string of the <canvas> element (e.g., 'c' or 'canvasId').
options (Optional): An object containing configuration properties for the canvas (e.g., width, height, backgroundColor, isDrawingMode). 

Example
```js
var canvas = new fabric.Canvas('canvasId', {
  backgroundColor: 'blue',
  width: 500,
  height: 500,
  selection: true
});
```
Key                                 Options
backgroundColor / backgroundImage:  Sets the canvas background.
selection:                          Boolean, enables/disables object selection.
isDrawingMode:                      Boolean, activates free-drawing mode.
renderOnAddRemove:                  Boolean, controls automatic re-rendering.
containerClass:                     Sets a class name for the wrapper element. 

If you do not need interactivity (event handling), you can use new fabric.StaticCanvas('id', options) with the same parameters for better performance. 

***************************************************************************

```js
// this utility will help us initilize fabric, but receiving the canvas element and the container containing it
export const initializeFabric = async (canvasEl, containerEl) => {

  //then we use a try and catch block so we can catch any error that happened

  try {
    //now we will be inserting an instance of "Canvas" from fabricJs into our canvas element.
    const {Canvas, PencilBrush} = await import ("fabric")

    const canvas = new Canvas(canvasEl, {
      preserveObjectStacking: true,
      isDrawingMode: false,
      renderOnAddRemove: true,
    })

    //LEt us also intialize our pencil brush

    const brush = new PencilBrush(canvas)
    brush.color = "#000000";
    brush.width = 5;
    canvas.freeDrawingBrush = brush;

    //now we can return this canvas
    return canva

  } catch (e) {
    console.error("failed to load fabric", e)
    return null
  }

}
```


***************************************************************************

Now we can call this utility in the canvas component itself
go to components/editor/canvas/index.js

```js
export default function canvas (){

  //firstly we decalre all the things we need and set them to null reference

  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const fabricCanvasRef = useRef(null)

  // we need one more ref that will allow us to know if we hae initiialized our canvas or not
  const initAttemptedRef = useRef(false)

  const {setCanvas} = useEditorStore

  // now we take a useEffect
  // the first thing we will do is to cleanup the canvas

  useEffect(() =>{
    //cleanUp the canvas
    
    const cleanUpCanvas = () => {
      // check if there is a current fabric where we are, so we cna dispose it

      if (fabricCanvasRef.current){
        try{
          fabricCanvasRef.current.dispose()
        } error(e){
          console.error('error disposing Canvas', e)
        }

        fabricCanvas.Ref.current = null

        // remember to set the canvas to null also
        setCanvas(null)
      }
    }

    //call the clean up function
    cleanUpCanvas()
    //reseet the init flah
    initAttemptedRef.current = false
  
    //Now we init out new canvas

    const initCanvas = async() => {
      if(typeof window === undefined || !canvasRef.current || initAttempted.current){
        return
    }

    initAttempted.current = true

    try{
      // the fabric/design itself has its own canvas
      const fabricCanvas = await initializeFabric(canvasRef.current, canvasContainerRef.current)

      if(!fabricCanvas){
        console.error('failed to initializa fabric.js canvas')

        return
      }

      //otherwise, it means that the initialization worked
      fabricCanvasRef.current = fabricCanvas
      setCanvas(fabricCanvas)

      console.log('Canvas init is done and set in store')

      //TODO: apply custom styles for the controls
      //TODO: set up event listeniers
    } catch (e) {
      console.error('failed to init canvas, e ')
    }

    const timer = setTimeout(() => {
      initcanvas();
    }, 50);

    return () => {
      clearTimeout(timer);
      cleanUpCanvas();
    };

  }, [])


  return (
    <div
      className="relative w-full h-[600px] overflow-auto"
      ref={canvasContainerRef}
    >
      <canvas ref={canvasRef} />
    </div>
  );
  
}

```
***************************************************************************

Now, conplete the center canvas in the utils

```js
export const centerCanvas = (canvas) => {
  if (!canvas || !canvas.wrapperEl) return;

  const canvasWrapper = canvas.wrapperEl;

  canvasWrapper.style.width = `${canvas.width}px`;
  canvasWrapper.style.height = `${canvas.height}px`;

  canvasWrapper.style.position = "absolute";
  canvasWrapper.style.top = "50%";
  canvasWrapper.style.left = "50%";
  canvasWrapper.style.transform = "translate(-50%, -50%)";
};
```
***************************************************************************
Now Let us load the canvas in the Main Editor. 

```js

"use client";
import Canvas from "./canvas";
import Header from "./header";
import Sidebar from "./sidebar";

function MainEditor() {
  const params = useParams()
  const router = useRouter()
  const designId = params?.slug

  const [isLoading, setIsLoading] = useState(!!designId)
  const [loadAttempted, setloadAttempted] = useState(false)
  const [error, setError] = useState(null)

  // set the design Id
  const {canvas, setDesignId, resetStore} = useEditorStore()

  //add UseEffect so all these methods can take effect

  useEffect(() => {
    //reset the store
    resetStore()

    //set the design id if it is present
    if(designId) setDesignId(designId)

    //we can also do a clean up

    return() => {
      resetStore()
    }
  })

  //

  //anytime the designId changes we have to setLoadAttempted to false and error to null
  useEffect(() => {
    setLoadAttempted(false)
    setError(null)
  }, [designId]) //it is based on the changing od designId

  //it is possible that the Design is loaded and the canvas is not ready from the canvas

  useEffect(() => {
    if (isLoading && !canvas && designId){
      const timer = setTimeout (() => {
        if(isLoading){
          console.log('Canvas init timeout')
          setIsLoading(false)
        }
      }, 5000)
      return ()=>clearTimeout(timer)
    }
  }, [isLoading, canvas, designId])

  //Now if canvas is now available we log that it is available
  useEffect(() => {
   if(canvas){
    console.log('Canvas is now available in editor')
   }
  }, [canvas]) //it is based on the changing of canvas


  // Now here we have to load the design and render it
  const loadDesign = useCallback(async () => {
    //if the canvas is not present, and we already tried we will return
    if(!canvas || !designId || loadAttempted) return

    try {
      //otherwier we should try to load
      setIsLoading(true)
      //then load attemoted will be true
      setLoadAttempted(true)
      const response = await getUserDesignById(designId)
      console.log(response)
      //at this point, if you check the console, you will see your design data

    } catch (e) {
      //log and set wrror and set isloading false
      console.error("Failed to load design", e);
      setError("failed to load design");
      setIsLoading(false);
    }
  }, [canvas, designId, loadAttempted, setDesignId]); //all what we need

  //we can then take a useEffect to load things when they are ready
  useEffect(() => {
    //if esignIg and canvas are available, and we habent tried to load, we laod the design
    if (designId && canvas && !loadAttempted) {
      loadDesign();
    } else if (!designId) {
      //otherwise, if designId is not present, we redirect the user to the homepage
      router.replace("/");
    }
  }, [canvas, designId, loadDesign, loadAttempted, router]); // all what we need

 

  return <div className="flex flex-col h-screen overflow-hidden">
    <Header/>
    <div className="flex flex-1 overflow-hidden">
      <Sidebar/>
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <main className="fleX-1 overflow-hidden bg-[#f0f0f0] flex items-center" >
          <Canvas/>
        </main>
      </div>
    </div>
</div>
}
```


### at this point, if you check the console, you will see your design data

```bash
data 
canvasData : null
category : "youtube_thumbnail"
createdAt : "2026-03-07T12:36:46.460Z"
height : 7465
name : "Untitled Design - Youtube Thumbnail"
updatedAt : "2026-03-07T12:36:46.460Z"
userId : "108003755833105714734"
width : 825
__v : 0
_id : "69ac1c09ae6babc72ac694ad"
[[Prototype]] : 
  Object message : "Design downloaded successfully "
  success : true  

```

### Lets proceed below

***************************************************************************



```js

"use client";
import Canvas from "./canvas";
import Header from "./header";
import Sidebar from "./sidebar";

function MainEditor() {
  const params = useParams()
  const router = useRouter()
  const designId = params?.slug

  const [isLoading, setIsLoading] = useState(!!designId)
  const [loadAttempted, setloadAttempted] = useState(false)
  const [error, setError] = useState(null)

  // set the design Id
  const {canvas, setDesignId, resetStore} = useEditorStore()

  //add UseEffect so all these methods can take effect

  useEffect(() => {
    //reset the store
    resetStore()

    //set the design id if it is present
    if(designId) setDesignId(designId)

    //we can also do a clean up

    return() => {
      resetStore()
    }
  })

  //

  //anytime the designId changes we have to setLoadAttempted to false and error to null
  useEffect(() => {
    setLoadAttempted(false)
    setError(null)
  }, [designId]) //it is based on the changing od designId

  //it is possible that the Design is loaded and the canvas is not ready from the canvas

  useEffect(() => {
    if (isLoading && !canvas && designId){
      const timer = setTimeout (() => {
        if(isLoading){
          console.log('Canvas init timeout')
          setIsLoading(false)
        }
      }, 5000)
      return ()=>clearTimeout(timer)
    }
  }, [isLoading, canvas, designId])

  //Now if canvas is now available we log that it is available
  useEffect(() => {
   if(canvas){
    console.log('Canvas is now available in editor')
   }
  }, [canvas]) //it is based on the changing of canvas


  // Now here we have to load the design and render it
  const loadDesign = useCallback(async () => {
    //if the canvas is not present, and we already tried we will return
    if(!canvas || !designId || loadAttempted) return

    try {
      //otherwier we should try to load
      setIsLoading(true)
      //then load attemoted will be true
      setLoadAttempted(true)
      const response = await getUserDesignById(designId)
      console.log(response)
      //at this point, if you check the console, you will see your design data
      // data 
      // canvasData : null
      // category : "youtube_thumbnail"
      // createdAt : "2026-03-07T12:36:46.460Z"
      // height : 7465
      // name : "Untitled Design - Youtube Thumbnail"
      // updatedAt : "2026-03-07T12:36:46.460Z"
      // userId : "108003755833105714734"
      // width : 825
      // __v : 0
      // _id : "69ac1c09ae6babc72ac694ad"
      // [[Prototype]] : 
      //   Object message : "Design downloaded successfully "
      //   success : true  

      // Now we should assign the designData to the design

      const design = response.data
      //data is coming from the console, you can see that everything we logged is called data

      if (design) {
        //TODO: update name
        // setName(design.name);

        //set the design ID just incase we need it after getting the data
        setDesignId(designId);

        try {
          //if there is a canvasData, like if we have saved some design, show it
          //otherwise say there is no data
          if (design.canvasData) {
            //first clear the canvas to cleanUp if there is any left data lingering somewhere
            canvas.clear();
            //if there is width and height fromt he canvaData, then set the dimensions
            //canvas.setDimensions is coming from fabric.js
            if (design.width && design.height) {
              canvas.setDimensions({
                width: design.width,
                height: design.height,
              });
            }
            //then parse the canvasData, but it has to be a JSON if it is a string, 
            // because in the fabric.js needs ca to be JSON to load all the objects in the design
            const canvasData =
              typeof design.canvasData === "string"
                ? JSON.parse(design.canvasData)
                : design.canvasData;

            // if there are objects on the canvas, we check
            const hasObjects =
              canvasData.objects && canvasData.objects.length > 0;

            //set the background details
            if (canvasData.background) {
              canvas.backgroundColor = canvasData.background;
            } else {
              canvas.backgroundColor = "#ffffff";
            }

            //if no present object, return, render now and true
            if (!hasObjects) {
              canvas.renderAll();
              return true;
            }

            //otherwise, means it has objects, then loadfromJSON the canvasData
            //then after that requestRenderAll
            canvas
              .loadFromJSON(design.canvasData)
              .then((canvas) => canvas.requestRenderAll());
          } else {
            //else, we say there is no data, so we juts show a blank canvas
            console.log("no canvas data");
            //first clear the canvas for any remnant data that might be lingering somewhere
            canvas.clear();
            //set the width, based on the width saved in the databas
            canvas.setWidth(design.width);
            //set the height, based on the height saved in the databas
            canvas.setHeight(design.height);
            //set the background color, based on the background color saved in the databas
            canvas.backgroundColor = "#ffffff";
            //then call renderAll, coming from fabric.js, which we will be callign everytime we want to rerender data or update what we have on the canvas
            canvas.renderAll();
          }
        } catch (e) {
          //otherwise say there is error loading data
          console.error(("Error loading canvas", e));
          setError("Error loading canvas");
        } finally {
          setIsLoading(false);
        }
      }

    } catch (e) {
      //log and set wrror and set isloading false
      console.error("Failed to load design", e);
      setError("failed to load design");
      setIsLoading(false);
    }
  }, [canvas, designId, loadAttempted, setDesignId]); //all what we need

  //we can then take a useEffect to load things when they are ready
  useEffect(() => {
    //if esignIg and canvas are available, and we habent tried to load, we laod the design
    if (designId && canvas && !loadAttempted) {
      loadDesign();
    } else if (!designId) {
      //otherwise, if designId is not present, we redirect the user to the homepage
      router.replace("/");
    }
  }, [canvas, designId, loadDesign, loadAttempted, router]); // all what we need

 

  return <div className="flex flex-col h-screen overflow-hidden">
    <Header/>
    <div className="flex flex-1 overflow-hidden">
      <Sidebar/>
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <main className="fleX-1 overflow-hidden bg-[#f0f0f0] flex items-center" >
          <Canvas/>
        </main>
      </div>
    </div>
</div>
}

```
at this stage, you must have been able to see a canvas rendered. Check it!!!

***************************************************************************

Now we will design css that we will be using in the app/global.css

***************************************************************************

Now its time to start workin on the fabric.js features of the editor

We first design the header component of the editor

***************************************************************************

go to store and add new flag for is editing

```js
import { create } from "zustand"
import { centerCanvas } from "@/fabric/fabric-utils"

export const useEditorStore = create((set,get) => ({
  canvas: null,
  setCanvas: (canvas) => {
    set({canvas});
    if(canvas){
      centerCanvas(canvas)
    }
  },
  designId : null,
  setDesignId : (id) => set({designId : id}),

  // ********************************************************

  isEditing : true,
  setisEditing : (flag) => set({isEditing : flag}),
  // ********************************************************

  resetStore : () => {
    set({
      canvas: null,
      designId : null
      // setIsEditing to true when you reset store
      isEditing: true
     })
  }
}))
```

***************************************************************************

Now le's get the name of the editing design

we will get the setName method from the store

```js

  // get the setName from the useEditorStore
  const {canvas, setDesignId, resetStore, setName} = useEditorStore()

  ....
setName(design.name)
```

***************************************************************************
We want to start creating different shapes in the element panel

We first need to create some utility methods

we create a new file fabric/shapes/shape-definitions.js

```js
export const shapeDefinitions = {
  rectangle: {
    type: "rect",
    label: "Rectangle",
    defaultProps: {
      width: 100,
      height: 60,
      fill: "#000000",
    },
    thumbnail: (fabric, canvas) => {
      const { Rect } = fabric;
      const rect = new Rect({
        left: 15,
        top: 35,
        width: 70,
        height: 35,
        fill: "#000000",
      });
      canvas.add(rect);
    },
  }
}
```
***************************************************************************

To store all the images, we will use Cloudinary and we will use stability AI for AI

For the images, we go into

uploads-service/src/models/media.js and we put our code for the databse there

```js
const mongoose = require("mongoose");

//these are the schemas for the media which will be created and all it needs
const mediaSchema = new mongoose.Schema({
  userId: String,
  name: String,
  cloudinaryId: String,
  url: String,
  mimeType: String,
  size: Number,
  width: Number,
  height: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Media = mongoose.models.Media || mongoose.model("Media", mediaSchema);
module.exports = Media;

```
***************************************************************************

10:11:36
***************************************************************************
***************************************************************************
***************************************************************************
***************************************************************************
***************************************************************************
***************************************************************************
***************************************************************************
***************************************************************************
***************************************************************************
***************************************************************************
***************************************************************************
***************************************************************************
***************************************************************************
***************************************************************************






# CORS Preflight Failure Investigation and Fix

## Overview

While attempting to access the API Gateway from the frontend, the browser returned the following error:

```
Access to XMLHttpRequest at 'http://localhost:5000/v1/designs'
from origin 'http://localhost:3000'
has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

This error indicated that Cross-Origin Resource Sharing (CORS) was not being handled correctly for requests from the frontend (`localhost:3000`) to the backend gateway.

---

## Architecture Context

**Frontend:**
- `http://localhost:3000`
- Next.js application

**API Gateway:**
- `http://localhost:5000`
- Express server

**Microservices:**
- Design service
- Upload service
- Subscription service

**Requests follow this flow:**

```
Browser → API Gateway (/v1/*) → Proxied to internal services (/api/*)
```

---

## Symptoms Observed

- Browser blocked requests due to missing CORS headers.
- Network tab showed a failing OPTIONS preflight request.
- Gateway returned an error before reaching the proxied services.
- Unexpected server response headers indicated the gateway was not actually responding.

---

## Investigation Process

### Step 1 — Check CORS Configuration

Initial gateway code already contained:

```js
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
```

This suggested that CORS was globally enabled, so the failure was likely occurring before CORS middleware executed or after another middleware blocked the request.

### Step 2 — Inspect Middleware Order

The gateway included an authentication middleware:

```
authMiddleware
```

All routes were protected with:

```js
app.use('/v1/designs', authMiddleware, proxy(...))
```

When the browser performs a cross-origin request, it first sends a preflight request:

```
OPTIONS /v1/designs
```

This request does not include authentication headers. However, the authentication middleware rejected requests without a token.

This meant:

```
OPTIONS request
↓
authMiddleware
↓
Token missing
↓
401 response
↓
CORS headers never returned
↓
Browser blocks request
```

Therefore, preflight requests were being blocked by authentication.

---

## Root Cause #1

Authentication middleware was blocking browser preflight OPTIONS requests.

### Fix #1 — Allow Preflight Requests

Authentication middleware was modified to bypass preflight requests:

```js
if (req.method === 'OPTIONS') {
  return next();
}
```

This allows the request to pass through so CORS headers can be returned.

---

## Root Cause #2 — Port Collision

While debugging the gateway, another unexpected issue appeared.

Running:

```bash
lsof -i :5000
```

revealed:

```
ControlCenter (AirTunes)
```

This means macOS was already using port 5000. As a result:

```
Frontend → localhost:5000
↓
Not hitting API Gateway
↓
Apple service responding
↓
Incorrect headers
↓
CORS failure
```

The browser was contacting the wrong process.

### Fix #2 — Move API Gateway to a Free Port

A free port was located: `5500`

Confirmed with:

```bash
lsof -nP -iTCP:5500 -sTCP:LISTEN
```

The gateway `.env` file was updated:

```
PORT=5500
```

---

## Root Cause #3 — Environment Variable Not Exposed to Browser

The frontend used:

```js
process.env.API_URL
```

However, Next.js does not expose environment variables to the browser unless prefixed with `NEXT_PUBLIC_`. Therefore `process.env.API_URL` was `undefined` in the browser.

### Fix #3 — Use Browser-Safe Environment Variables

Updated frontend configuration:

```
NEXT_PUBLIC_API_URL=http://localhost:5500
```

and used:

```js
process.env.NEXT_PUBLIC_API_URL
```

in client code.

---

## Root Cause #4 — Express 5 Preflight Handling

An attempt to add global preflight handling used:

```js
app.options('*', ...)
```

However, Express 5 no longer supports this wildcard route syntax, causing a routing error.

### Fix #4 — Express 5 Compatible Preflight Route

Replaced with a regex route:

```js
app.options(/.*/, cors(corsOptions))
```

This ensures all preflight requests receive proper CORS headers.

---

## Final Fix Summary

### Authentication Middleware

Allow preflight requests:

```js
if (req.method === 'OPTIONS') {
  return next();
}
```

### Gateway CORS Configuration

Centralized CORS options:

```js
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
```

### API Gateway Port

Updated `.env`:

```
PORT=5500
```

### Frontend Environment Variable

Updated `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5500
```

---

## Validation Performed

### Confirm Port Conflict

```bash
lsof -i :5000
```

Output showed macOS service `ControlCenter`.

### Confirm Gateway Port Availability

```bash
lsof -nP -iTCP:5500 -sTCP:LISTEN
```

Port confirmed free.

### Preflight Test

```bash
curl -X OPTIONS http://localhost:5500/v1/designs
```

Response:

```
204 No Content
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Credentials: true
```

This confirms the browser can now complete the preflight successfully.

---

## Final Result

After the fixes:

```
Browser → localhost:3000
↓
API Gateway → localhost:5500
↓
CORS preflight succeeds
↓
Authenticated request forwarded
↓
Microservice receives request
```

The frontend is now able to communicate with the API gateway without CORS errors.

---

## Lessons Learned

- Authentication middleware must allow OPTIONS requests.
- Port conflicts can silently redirect requests to the wrong service.
- Next.js environment variables must use `NEXT_PUBLIC_` for browser access.
- Express 5 has breaking changes in route handling.
- Preflight requests must always return CORS headers before authentication logic executes.





****************************************************************************

Good question. `!!designId` is a common **JavaScript trick to convert a value into a boolean (`true` or `false`)**.

Let’s break it down clearly.

---

# 1️⃣ What `!` means in JavaScript

`!` means **NOT**.

It flips a value to its opposite boolean.

Example:

```js
!true   → false
!false  → true
```

But it also converts **non-boolean values** into boolean first.

Example:

```js
!0        → true
!"hello"  → false
!null     → true
```

---

# 2️⃣ What `!!` does

Using `!!` converts **any value into a true boolean**.

Example:

```js
!!"hello"   → true
!!123       → true
!!null      → false
!!undefined → false
!!""        → false
```

So:

```js
!!value
```

means:

> Convert `value` to `true` or `false`.

---

# 3️⃣ Applying it to your code

```js
const designId = params?.slug
const [isLoading, setIsLoading] = useState(!!designId)
```

`designId` could be:

```
undefined
null
"123"
```

`!!designId` converts it to a boolean.

---

### Case 1: Editing an existing design

URL:

```
/editor/abc123
```

Then:

```js
designId = "abc123"
```

Result:

```js
!!designId → true
```

So:

```js
isLoading = true
```

Because the app will **load an existing design**.

---

### Case 2: Creating a new design

URL:

```
/editor
```

Then:

```js
designId = undefined
```

Result:

```js
!!designId → false
```

So:

```js
isLoading = false
```

Because there is **no design to fetch**.

---

# 4️⃣ Why developers use this

It’s a shorthand for:

```js
const [isLoading, setIsLoading] = useState(
  designId ? true : false
)
```

But shorter.

---

# 5️⃣ Common places you’ll see `!!`

Convert values to boolean:

```js
const isLoggedIn = !!user
const hasToken = !!token
const isEditing = !!designId
```

---

# 6️⃣ Quick mental rule

```js
!!value
```

means:

> "Does this value exist?"

---

# 7️⃣ Example in your editor

If a designId exists:

```
editor.com/design/123
```

The app loads that design from the backend.

If not:

```
editor.com/design
```

It opens a **blank canvas**.

---

✅ **Final answer**

`!!designId` converts `designId` into a boolean:

```
true  → if designId exists
false → if designId is null/undefined
```



****************************************************************************
****************************************************************************
****************************************************************************


# Google OAuth Redirect URI Issue and Fix

## Problem

Google sign-in was failing with this error:

Error 400: invalid_request
You can't sign in to this app because it doesn't comply with Google's OAuth 2.0 policy.
Request details:
redirect_uri=http://0.0.0.0:3000/api/auth/callback/google

The issue was that the application was generating the Google OAuth callback URL using:

http://0.0.0.0:3000/api/auth/callback/google

instead of:

http://localhost:3000/api/auth/callback/google

Google does not accept `0.0.0.0` as a valid OAuth redirect URI. It accepts `localhost` for local development, but not `0.0.0.0`.

## Why It Happened

The app was running in Docker, and the host was being inferred incorrectly during authentication.

In local containerized development:

* `0.0.0.0` is commonly used as a **bind address**
* but it should **not** be used as the public OAuth callback host

Auth.js / NextAuth was resolving the app URL to `0.0.0.0:3000`, which caused Google OAuth to reject the request.

## Fix

The issue was fixed by explicitly defining the correct canonical auth URL in the client environment file.

Add these variables to:

```text
client/.env.local
```

```env
NEXTAUTH_URL='http://localhost:3000'
AUTH_URL='http://localhost:3000'
AUTH_TRUST_HOST=true
```

---

## What These Variables Do

### `NEXTAUTH_URL='http://localhost:3000'`

Tells NextAuth the correct base URL of the application in local development.

### `AUTH_URL='http://localhost:3000'`

Tells Auth.js the canonical application URL to use when generating callback and auth-related URLs.

### `AUTH_TRUST_HOST=true`

Allows Auth.js to trust the incoming host headers correctly, which is especially important when running behind Docker, proxies, or reverse proxies.

---

## Google Cloud Console Configuration

In the Google OAuth client settings, the correct redirect URI must also be registered:

```text
http://localhost:3000/api/auth/callback/google
```

Do **not** use:

```text
http://0.0.0.0:3000/api/auth/callback/google
```

because Google will reject it.

---

## Result

After adding:

```env
NEXTAUTH_URL='http://localhost:3000'
AUTH_URL='http://localhost:3000'
AUTH_TRUST_HOST=true
```

and ensuring the Google OAuth redirect URI matched `localhost`, Google sign-in worked correctly.

---

## Summary

### Cause

Auth.js / NextAuth generated the OAuth callback URL with `0.0.0.0` instead of `localhost`.

### Effect

Google rejected the OAuth request with `Error 400: invalid_request`.

### Solution

Explicitly set the auth base URL and trust host settings in `client/.env.local`:

```env
NEXTAUTH_URL='http://localhost:3000'
AUTH_URL='http://localhost:3000'
AUTH_TRUST_HOST=true
```

and register the correct redirect URI in Google Cloud Console:

```text
http://localhost:3000/api/auth/callback/google
```




******************************************************************

# What I Learned: Docker, MongoDB Atlas & Mongoose

## 1. Connecting Docker Services to MongoDB Atlas

Docker containers have full outbound internet access by default, so connecting to Atlas works just like any other external service. The two requirements are:

- A valid `mongodb+srv://` connection string in your `.env` file
- Your public IP whitelisted in **Atlas → Security → Network Access**

```dotenv
mongoURL=mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/mydb?retryWrites=true&w=majority
```

---

## 2. Docker Inter-Container Networking

Containers **cannot use `localhost`** to talk to each other. Inside a container, `localhost` refers to that container itself — not other services.

Use the **Docker Compose service name** as the hostname instead:

```
# ❌ Wrong - api-gateway trying to reach design-service
DESIGN_SERVICE_URL=http://localhost:5001

# ✅ Correct - uses Docker's internal DNS
DESIGN_SERVICE_URL=http://design-service:5001
```

Docker Compose automatically creates an internal DNS so every service is reachable by its name as defined in `docker-compose.yml`.

```
Browser → localhost:5500 (api-gateway)
               ↓
        design-service:5001  ✅
        NOT localhost:5001   ❌
```

---

## 3. MongoDB Default Database: `test`

When no database name is specified in the connection URI, MongoDB **silently defaults to a database called `test`**.

```
mongodb+srv://user:pass@cluster.mongodb.net/          → uses "test"
mongodb+srv://user:pass@cluster.mongodb.net/myapp     → uses "myapp"
```

This means data from multiple projects can end up mixed together in the `test` database if no name is specified. Always be explicit:

```dotenv
# ❌ No database name - goes to "test"
mongoURL=mongodb+srv://user:pass@cluster0.mongodb.net/

# ✅ Explicit database name
mongoURL=mongodb+srv://user:pass@cluster0.mongodb.net/design-service
```

> **Note:** The name `test` is a leftover convention from old MongoDB shell defaults. It was never intended for production data.

---

## 4. How Mongoose Names Collections Automatically

Mongoose maps your model name to a collection name automatically:

1. Takes the model name (e.g. `'Design'`)
2. Lowercases it → `design`
3. Pluralizes it → `designs`
4. Creates that collection in whichever database you're connected to

```javascript
mongoose.model('Design', designSchema)      // → designs collection
mongoose.model('User', userSchema)          // → users collection
mongoose.model('Order', orderSchema)        // → orders collection
```

You don't need to manually create collections — Mongoose does it on first write.

---

## 5. Why Old Designs Disappeared After Switching to Docker

| Stage | Connection String | Database Used | Where Data Went |
|---|---|---|---|
| Local dev (no Docker) | `.../` (no DB name) | `test` | `test.designs` |
| Docker (fixed URI) | `.../design-service` | `design-service` | `design-service.designs` |

The data wasn't lost — it was in a different database. Fixing the URI to match where the data lives restores it.

---

## Key Takeaways

- Always specify a **database name** in your MongoDB URI
- Docker services talk to each other using **service names**, not `localhost`
- MongoDB's `test` database is a catch-all default — avoid relying on it
- Mongoose **auto-creates collections** from your model name (lowercased + pluralized)
- Your Docker setup with explicit database names per service is **best practice**