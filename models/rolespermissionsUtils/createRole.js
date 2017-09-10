'use strict';
//=============================================================================
/**
 * Module dependencies
 */
//=============================================================================
const RolePerm = require('../rolespermissions');
//=============================================================================
/**
 * module functionality
 */
//=============================================================================
function createRole(recbody, res) {
    RolePerm.findOne({role: recbody.role.toLowerCase()}, (err, role) => {
        if(err) {
            console.log(`There was a dBase access error, while trying to create
                this record: %s`, role);
            errorHandler(err);
            return res.status(500).json({error: "Something went wrong. Please try again later."});
        }
        else {
            if(role) {
                return res.status(409).json({error: "This role already has permissions"});
            }
            else {
                const newRolePerm = new RolePerm();
                newRolePerm.role = recbody.role.toLowerCase();
                newRolePerm.save((err, rolep) => {
                    console.log("i got here");
                    if(err) {
                        console.log(`There was a dBase access error, while trying to set up this role: %s`, roleperm.role);
                        errorHandler(err);
                        return res.status(500).json({error: "Something went wrong. Please try again later."});
                    }else{
                        return res.status(200).json(rolep);
                    }
                    
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
module.exports = createRole;
//=============================================================================
