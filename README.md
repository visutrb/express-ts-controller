Express TypeScript Controller
=============================
![build-status](https://travis-ci.org/Visutr/express-ts-controller.svg?branch=master)

Installation
------------

    $ npm install --save express-ts-controller

Usage
-----

To register controllers, simply pass the reference of each controller to the `initialize` function as follow:

    // app.ts
    import * as express from "express";
    ...
    
    import { initialize } from "express-ts-controller";
    
    // import your controller from anywhere
    import { SiteController } from "./controllers/SiteController";
    import { GreetingController } from "./controllers/GreetingController";
    
    // express app initialization
    const app: express.Express = express();
    ...
    
    initialize(app, [
        SiteController,
        GreetingController
    ]);
    
The `initialize` function make sure that you can access instance variables declared inside your class.
    
Mapping the controller:
    
    // GreetingController.ts
    import { Controller, Get } from "express-ts-controller";
    import { Request, Response } from "express";
    
    @Controller("/greeting")
    export class GreetingController {
    
        @Get("/")
        greet(req: Request, res: Response) {
            let name = req.query["name"] || "World";
            res.render("greet", { name: name });
        }
    }
   
You can use `@Get, @Post, @Patch, @Put, @Delete` to map your request with the corresponding HTTP verbs.

Request Authentication
----------------------

This module is designed to work with `passport.js`, assumed that you declared a middle ware for passport as follow:
 
    import * as passport from "passport";
    import * as passportLocal from "passport-local";
    
    const LocalStrategy = passportLocal.Strategy;
    
    passport.use("local", new LocalStrategy((username, password, done) => {
        ...
    }));
    
you can use the middleware by using `@Authenticate` decorator:

    // AuthenticationController.ts
    import { Controller, Post, Authenticate } from "express-ts-controller";
    import { Request, Response } from "express";
    
    @Controller("/auth")
    export class AuthenticationController {
        
        @Post("/sign_in")
        @Authenticate({ strategies: ["local"] })
        signIn(req: Request, res: Response) {
            let user = req["user"];
            ...
        }
    }
    
Note that the `strategies` parameter is of `Array` type, which means that it is possible to use several strategies.
