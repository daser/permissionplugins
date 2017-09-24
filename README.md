# permissionplugins

WHAT: This project is a microservice that manages permissions based on roles.

WHY: A standalone microservice which can be independently scaled to support role based permissions for a larger application.

HOW: The microservice exposes 11 endpoints which provide permission creation and access to an existing user management microservice. These endpoints are RESTful and allow CRUD operations to be performed against the underlying data
resources. The microservice has an entry point vis server.js which is a node.js http server which delegates
request handling to an underlying expressjs app (app.js). This pattern is a common one in the Node
world. The express app is built as a RESTful service and uses middleware like helmet, hpp and nocache to
implement security best practices. It also supports a custom CORS implementation (lines 93-103 of
app.js). The microservice is designed to use environmental variables (via dotenv, see line 4 of app.js), this
practice ensures the security of sensitive information e.g. API Keys etc.
The database connection and lifecycle management is implemented in app.js (lines 52-78), this is
also another common pattern in the Node world. Route handlers are defined in a separate expressjs sub module (routes/routes.js) and bound to the ‘/api/’ path (line 116 in app.js), the pattern employed is to use ‘thin’ route handlers which delegate the actual CRUD operation to helper functions (defined in models/roleusersUtils directory and rolespermissionsUtils). When these helper functions complete their operation, the response object passed to them by the route handler is used to send a response to the request originally intercepted by the handler.
The mongoose data models are defined in models/rolesusers.js for role/user mapping and also the data model for roles/permissions mapping are defined in models/rolespermissions.js.


## Requirements
* NodeJS
* MongoDB

Please note the following:

As is a best practice, i've used environment variables for sensitive information e.g. the database URL. In the app, this is exposed as process.env.DBURL, i've attached a sample for you to work with. Please endure that on your local machine and the production server, the actual file you use is called .env

Example .env file:

PORT=3000 DBURL=mongodb://localhost/mydatabaselink



## Setup
* clone Repository containing the project using `git clone git@github.com:daser/permissionplugins.git`
* cd into the newly created 2FABackend directory
* set up a sendgrid account and update your .env file
* set up mongo database locally or on mlab
* create the .env file with the PORT and mongodb 
* Run `npm install` to install the needed node js packages.

## How to run
Run this command to run the application `NODE_ENV=development node server.js`

## Docomentation



To start this service: NODE_ENV=development node server.js

1. The method createRoleUser places a user into the permission plugin. Assigns role to the user. Below is the request structure:
```
{
    "userid":"59abbdd107e6e90dd0579485",
    "role":"Jasper"
}
```

Route: api/createRoleUser <br />
Method: POST<br />

2. Roles are created using the createRole method. Once this is created permissions can be assigned to these roles using another method. See request Structure below:

```
{
    "role" : "admin"
}
```
Route: api/createRole <br /> 
Method: POST <br />

3. Once roles are created, permissions can be assigned to these roles using the addPermission method. See request structure below 
```
{
    "role":"Admin",
    "permission":"Delete"
    
}
```

Route: api/addPermission <br />
Method: POST <br /> 

4. Permissions can also be removed from roles if there is a need for that using the deletePermission method. See request structure below
```
{
    "role":"Admin",
    "permission":"Delete"
    
}
```

Route: api/deletePermission. 
Method: DELETE. 

5. You might as well want to delete a role, i have made it available through the deleteRolePerm method. See below

```
{
    "role":"Admin"
}
```

Route: api/deleteRolePerm <br />
Method: DELETE <br /> 

6. The method getAllRolesPerm returns all the permissions in a role. See the structure below
```
{
    "role" : "admin"
}
```


Route: api/getAllRolesPerm <br />    
Method: POST <br /> 

7. The method getAllRoles will return all the roles available in the system.

Route: api/getAllRoles <br /> 
Method: GET <br /> 

8. To change the role of a user, the method updateUserRole is just for that. See the structure below 

```
{
    "filter" : {
        "userId" : "59abbdd107e6e90dd0579485"
    },
    "update" : {
        "role" : "Admin"
    }
}
```


Route: api/updateUserRole <br /> 
Method: PUT <br /> 


9. To change a role name, the method updateRolePerm is for that.

```
{
    "filter" : {
        "role" : "user"
    },
    "update" : {
        "role" : "usertest"
    }
}
```


Route: api/updateRolePerm <br /> 
Method: PUT <br /> 

10. If you are interested in viewing a user's role and permissions using just the user id, the method getUserPermissions is for such.

```    
{
    "userid": "59abbdd107e6e90dd0579485"
}
```


Route: api/getUserPermissions <br /> 
Method: POST <br /> 

11. The method isAllowed is used to check if a user is allowed to access a resource given a permission. It returns boolean.
```

{
    "permfilter" : "gray",
    "UserID":"59abbdd107e6e90dd0579485"
}
```

Route: api/isAllowed <br /> 
Method: POST <br /> 


12. If you intend to create a role with a permission at the same time instead of creating a role and then add permission to it later, the method createRolePerm can be used.

```
{
    "role" : "Admin",
    "permission": "Delete"
}
```

Route: api/createRolePerm <br /> 
Method: POST <br /> 



## Contributors
[Daser David](https://github.com/daser)
