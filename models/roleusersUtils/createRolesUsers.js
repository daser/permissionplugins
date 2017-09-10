'use strict';
//=============================================================================
/**
 * Module dependencies
 */
//=============================================================================
const RoleUser = require('../rolesusers');
//=============================================================================
/**
 * module functionality
 */
//=============================================================================
function createRolesUsers(rec, res) {
    RoleUser.findOne({userId: rec.userid}, (err, user_role) => {
        if(err) {
            console.log(`There was a dBase access error, while trying to create
                this record: %s`, rec.role);
            return res.status(500).json({error: "Something went wrong. Please try again later."});
        }
        else {
            if(user_role) {
                return res.status(409).json({error: "This user already has a role"});
            }
            else {
                const newRoleUser = new RoleUser();
                newRoleUser.userId = rec.userid;
                newRoleUser.role = rec.role;
                newRoleUser.save((err, roleuser) => {
                    if(err) {
                        console.log(`There was a dBase access error, while trying to set up this user to role: %s`, roleuser.role);
                        errorHandler(err);
                        return res.status(500).json({error: "Something went wrong. Please try again later."});
                    }
                    return res.status(200).json(newRoleUser);
                });
            }
        }
    });
}
//=============================================================================
/**
 * Export module
 */
//=============================================================================
module.exports = createRolesUsers;
//=============================================================================
