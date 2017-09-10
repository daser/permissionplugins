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
function createRolesPerms(recbody, res) {
    RolePerm.findOne({role: recbody.role.toLowerCase()}, (err, role_perm) => {
        if(err) {
            console.log(`There was a dBase access error, while trying to create
                this record: %s`, role);
            errorHandler(err);
            return res.status(500).json({error: "Something went wrong. Please try again later."});
        }
        else {
            if(role_perm) {
                return res.status(409).json({error: "This role already has permissions"});
            }
            else {
                //var role = ;
                const newRolePerm = new RolePerm();
                newRolePerm.role = recbody.role.toLowerCase();
                //newRolePerm.permissions = recbody.perm;
                newRolePerm.save((err, roleperm) => {
                    if(err) {
                        console.log(`There was a dBase access error, while trying to set up this role: %s`, roleperm.role);
                        errorHandler(err);
                        return res.status(500).json({error: "Something went wrong. Please try again later."});
                    }
                    var promiseSave = RolePerm.update({"role":newRolePerm.role}, {$push: {"permissions" : recbody.permission.toLowerCase()}}).exec();
                    promiseSave.then(function(rec){
                         return res.status(200).json(rec);
                    })
                    .catch(function(err){
                            return res.status(500).json({error:"Something went wrong. Please try again later."});

                    });
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
module.exports = createRolesPerms;
//=============================================================================
