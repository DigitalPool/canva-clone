This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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
[text](server/design-service/src/controllers/design-controller.js) 
[text](server/design-service/src/middleware/auth-middleware.js) 
[text](server/design-service/src/models/design.js) 
[text](server/design-service/src/routes/design-routes.js)

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

we have to create this file as explained in the au.th.js guide 
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
*********************************************************************
*********************************************************************
*********************************************************************
*********************************************************************
*********************************************************************
*********************************************************************
*********************************************************************
*********************************************************************



