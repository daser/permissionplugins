# permissionplugins

PROJECTGOAL: Integration of PERMISSIONS plugin. Review and enhance existing PERMISSIONS plugin to support authorization of the various categories of ‘users’ in the VSsystem.


As much as the origin existing system is built based on structureless schema, i try as possible to enforce schema structures for both RoleUser and RolePermission collections which are required for the permission plugin. The purpose of this modification is so that validations are properly enforced on requests and also to avoid instances of data duplications which might be the case with structureless data.


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



> Finally, may the source codes be with you.