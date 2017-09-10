'use strict';
//=============================================================================
/**
 * Module dependencies
 */
//=============================================================================
const
    express = require('express'),

    createRoleUser = require('../models/roleusersUtils').createRolesUsers,
    updateUserRole = require('../models/roleusersUtils').updateUserRole,
    createRolePerm = require('../models/rolespermissionsUtils').createRolesPerms,
    createRole = require('../models/rolespermissionsUtils').createRole,
    addPermissions = require('../models/rolespermissionsUtils').addPermissions,
    deletePermissions = require('../models/rolespermissionsUtils').deletePermissions,
    deleteRolePerm = require('../models/rolespermissionsUtils').deleteRolePerm,
    updateRolePerm = require('../models/rolespermissionsUtils').updateRolePerm,
    userPermissions = require('../models/relmodelUtils').getUserPermissions,
    isAllowed = require('../models/relmodelUtils').isAllowed,

    getAllRolesPerm = require('../models/rolespermissionsUtils').getAllRolesPerm,
    getAllRoles = require('../models/rolespermissionsUtils').getAllRoles,

    errorMessages = require('../utils/errormessages');

//=============================================================================
/**
 * Router instance
 */
//=============================================================================
const router = express.Router();
//=============================================================================
/**
 * API Routes
 */
//=============================================================================


/*
    /getUserPermissions
    {
        "userid": "59abbdd107e6e90dd0579485"
    }

*/

router.post('/getUserPermissions', (req, res) =>{
 return userPermissions(req.body.userid)
        .then(doc => {
            console.log("Successfully got all info");
            return res.status(200).json(doc);
        })
        .catch(err => {
            console.log('/getuserPermissions err ' + JSON.stringify(err));
            let error = errorMessages.processError(err);
            return res.status(error.code).json(error.msg);
        });

});

/*
/createRoleUser
{
    "userid":"59abbdd107e6e90dd0579485",
    "role":"Jasper"
}
*/
router.post('/createRoleUser', (req, res) => {
    if(!req.body.userid) {
        return res.status(409).json({error: "Please provide user id."});
    }
    else if(!req.body.role) {
        return res.status(409).json({error: "Please provide role."});
    }
    else {
    
        return createRoleUser(req.body, res);
    }
});



/*
/createRolePerm
{
        "role" : "ADMIN",
        "permission": "STORAGE"
}
*/
router.post('/createRolePerm', (req, res) => {
    if(!req.body.role) {
        return res.status(409).json({error: "Please provide role name."});
    }
    else {
        return createRolePerm(req.body, res);
    }
});

/*
/createRole
{
        "role" : "admin"
}
*/


router.post('/createRole', (req, res) => {
    if(!req.body.role) {
        return res.status(409).json({error: "Please provide role name."});
    }
    else {
        return createRole(req.body, res);
    }
});



/*
{
       "role":"Admin",
       "permission":"DOMLIS"
    
}
*/
router.post('/addPermission', (req, res) => {
    if(!req.body.role) {
        return res.status(409).json({error: "Please provide role name."});
    }
     else if(!req.body.permission) {
         return res.status(409).json({error: "Please provide permission."});
     }
    else {
        return addPermissions(req.body, res)
            .then(ok => {
            console.log("Successfully added Permission");
            return res.status(200).json(ok);
        })
        .catch(err => {
            console.log('/addPermission err ' + JSON.stringify(err));
            let error = errorMessages.processError(err);
            return res.status(error.code).json(error.msg);
        });
    }
});

/*
{
       "role":"Admin",
       "permission":"DOMLIS"
    
}
*/
router.delete('/deletePermission', (req, res) => {
    if(!req.body.role) {
        return res.status(409).json({error: "Please provide role name."});
    }
     else if(!req.body.permission) {
         return res.status(409).json({error: "Please provide permission."});
     }else{
        return deletePermissions(req.body)
        .then(ok => {
            console.log("Successfully deleted Permission");
            return res.status(200).json(ok);
        })
        .catch(err => {
            console.log('/deletePermission err ' + JSON.stringify(err));
            let error = errorMessages.processError(err);
            return res.status(error.code).json(error.msg);
        });
     }
    
});


/*
{
       "role":"Admin"
}
*/

router.delete('/deleteRolePerm', (req, res) => {
    return deleteRolePerm(req.body)
        .then(ok => {
            console.log("Successfully deleted Role/Permission");
            return res.status(200).json(ok);
        })
        .catch(err => {
            console.log('/deleteRolePerm err ' + JSON.stringify(err));
            let error = errorMessages.processError(err);
            return res.status(error.code).json(error.msg);
        });
});


/*
{
         "role" : "admin"
}
*/
router.post('/getAllRolesPerm', (req, res) => {
    return getAllRolesPerm(req.body)
        .then(doc => {
            console.log("Successfully got all info");
            return res.status(200).json(doc);
        })
        .catch(err => {
            console.log('/getAllRolesPerm err ' + JSON.stringify(err));
            let error = errorMessages.processError(err);
            return res.status(error.code).json(error.msg);
        });
});



router.get('/getAllRoles', (req, res) => {
    return getAllRoles()
        .then(doc => {
            console.log("Successfully got all info");
            return res.status(200).json(doc);
        })
        .catch(err => {
            console.log('/getAllRoles err ' + JSON.stringify(err));
            let error = errorMessages.processError(err);
            return res.status(error.code).json(error.msg);
        });
});


/* 
/updateRolePerm
{
        "filter" : {
            "role" : "user"
        },
        "update" : {
            "role" : "usertest"
        }
}
*/
router.put('/updateRolePerm', (req, res) => {
    return updateRolePerm(req.body.filter, req.body.update)
        .then(doc => {
            console.log("Successfully updated the Role/Permission");
            return res.status(200).json(doc);
        })
        .catch(err => {
            console.log('/updateRolePerm err ' + JSON.stringify(err));
            let error = errorMessages.processError(err);
            return res.status(error.code).json(error.msg);
        });
});


/* 
/updateUserRole
{
        "filter" : {
            "userId" : "59abbdd107e6e90dd0579485"
        },
        "update" : {
            "role" : "Admin"
        }
}
*/

router.put('/updateUserRole', (req, res) => {
    return updateUserRole(req.body.filter, req.body.update)
        .then(doc => {
            console.log("Successfully updated the User/Role");
            return res.status(200).json(doc);
        })
        .catch(err => {
            console.log('/updateUserRole err ' + JSON.stringify(err));
            let error = errorMessages.processError(err);
            return res.status(error.code).json(error.msg);
        });


   });



/*
/isAllowed
{
            "permfilter" : "gray",
            "UserID":"59abbdd107e6e90dd0579485"
}
*/
router.post('/isAllowed', (req, res) => {
    return isAllowed(req.body.permfilter, req.body.UserID)
        .then(ok => {
            console.log("Successfully the Role has access to the permission");
            return res.status(200).json(ok);
        })
        .catch(err => {
            console.log('/isAllowed err ' + JSON.stringify(err));
            let error = errorMessages.processError(err);
            return res.status(error.code).json(error.msg);
        });
});

//=============================================================================
/**
 * Export Router
 */
//=============================================================================
module.exports = router;
//=============================================================================
