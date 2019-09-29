Express TypeScript Controller
=============================
![build-status](https://travis-ci.org/Visutr/express-ts-controller.svg?branch=master)

Installation
------------

    $ npm install --save express-ts-controller

What's new in 1.0.0
-------------------
1. Mount middlewares before or after executing the handler.
2. @Authenticate decorator is removed. Use middleware to authenticate your requests.

What's new in 0.2.2
-------------------
Create new instance of controller per request.

What's new in 0.2.1
-------------------
No implementation change, only README was updated.

What's new in 0.2.0
-------------------
1. Add support for `glob` to initialize the controllers.
2. Handle promise rejection and pass the error through `next()`.


Usage
-----

To register controllers, simply pass the reference of each controller to the `initialize` function as follow:

```typescript
    // app.ts
    import * as express from "express";
    ...

    import { initialize } from "express-ts-controller";

    // import your controller from anywhere
    import { SiteController } from "./controllers/SiteController";
    import { GreetingController } from "./controllers/GreetingController";

    // express app initialization
    const app: express.Application = express();
    ...

    initialize(app, [
        SiteController,
        GreetingController
    ]);
```

or

```typescript
    // app.ts
    import * as expres from "express";
    import * as path from "path";

    import { initialize } from "express-ts-controller";

    // express app initialization
    const app: express.Application = express();
    ...

    initialize(app, [
        path.join(__dirname, "./controllers/**/*.{ts,js}"),
    ]);
```

then map request to the controller:

```typescript
    // GreetingController.ts
    import { Controller, Get } from "express-ts-controller";
    import { Request, Response } from "express";

    @Controller("/greeting")
    export class GreetingController {

        @Get("/")
        greet(req: Request, res: Response) {
            const name = req.query["name"] || "World";
            res.render("greet", { name: name });
        }
    }
```

You can use `@Get, @Post, @Patch, @Put, @Delete` to map your request with the corresponding HTTP verbs.

Mounting middlewares
---

Every request decorator (`@Get`, `@Post`, `@Path`, `@Put`, and `@Delete`) comes with options for mounting middlewares:

```typescript
    @Controller("/images")
    export class ImagesController {

        @Post("", {
            beforeAction: [authenticated, uploadImage],
            afterAction: [duplicateImage]
        })
        upload(req: Request, res: Response, next: NextFunction) {
            ...
            next();
        }
    }
```

From the above example, your request will be passed through `authenticated`, `uploadImage`, `ImageController#upload`, then `duplicateImage` sequentially.
