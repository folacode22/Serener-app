# serener
Serener is a relaxation centre located in Abeokuta, Ogun State. It is known for
selling expensive drinks and confectionery. Create an API endpoint for the
following cases
Users:

### package use
npm install (package)
npm i

Dependencies
- express: this act as the framework
- mongoose: 
- morgan:request logger
- dotenv: this is use to secure our secret key
- bcrypt: this is use to hash our password
- jsonwebtoken:

Devdependencies npm i -D
- nodemon



### config
in the config folder, this is where db.js file, which is where i require mongoose which is a MongoDB(database) object modeling tool designed to work in asynchronous environment.

### models
In the models folder, this is where a create my schema for the User  and the item.
 file,
 /serener/models/user_model.js.
 in this data user_model contain the  model schema of register(writen in camelCase) which consist of :
 firstName,lastName,age,email,phoneNumber,password
 and role(this consist of admin and user)
file,
 /serener/models/items_model.js.
 in this data item_model contain the model schema of items which categorize in two:
 - drinks: which consist of 'hennessy','divaVodka','johnnieWalker','brandy','smirnoff','blackLabel'. 
 - confectionary:which consist of 'candyPatisserie','nutsCake','creamCake'.
 which are listed with the help of **enum**


### controller
In the controller folder, where function to get the requested data form the models.
there to two file, in the controller which is the
- /controller/user_controller.js
- /controller/item_controller.js

##### user_controller.js
this is the  controller file  which perform our request function which are:
- userSignIn
- userLogIn
- allItem
- allUserByEmail
- switchAdmin

##### item_controller.js
this is the  controller file  which perform our request function which are:
- addItem
- allItem

### middleware
middleware folder this where the Auth.js file is placed, which i require the jsonwebtoken for authorization which allow a login user who as been authenticated to have aacess in web app

### router
this is where the  request from collector is been imoprted to the routes,in which it is been routing with express in Node.express has a framework has an object corresponds to HTTP with a request method like GET,POST,PUT,DELETE etc. And also importing the Auth.js
- model/item_routes
router.post('/create', AdminAuth , addItem);

router.get('/all',Auth, allItem);

- model/item_routes
router.post('/signup',userSignUp);

router.post('/login',userLogIn);

router.get('/alluser', AdminAuth, allUser);

router.get('/user/:email',AdminAuth, findUserByEmail);

router.put('/admin/:id',switchAdmin);


### index.js
index.js file handles the website startup,routing and other functions of the application and require other functions like modules,morgan,dotenv





Testing api
postman

publish test
https://documenter.getpostman.com/view/22408266/VUxLwom9



blog:
https://dev.to/folacode22/handling-exception-in-nodejs-express-4kdo

