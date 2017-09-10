'use strict';
//=============================================================================
/**
 * Module dependencies
 */
//=============================================================================
const 
        RolePerm = require('../rolespermissions'),
        Promise = require('bluebird'),
        _ = require('lodash'),
        error_codes = require('../../utils/errormessages').error_codes;

//=============================================================================
/**
 * module functionality
 */
//=============================================================================
function addPermissions(recbody) {
    return RolePerm.find({"role":recbody.role.toLowerCase()})
        .exec()
        .then(result => {
            if (!_.isEmpty(result)) {
                return result
            } else {
              console.log("Error role does not exist " + JSON.stringify(rolefilter));
                return Promise.reject(error_codes.ResourceNotExist);
            }
        }).then(doc => {
            var found = false;
            _.forEach(doc[0].permissions, (result) => {
                if (result == recbody.permission.toLowerCase()) {
                    found = true;
                    return false;
                }
            });
            if (found) {
                console.log("Error permission does not exist ");
                return Promise.reject(error_codes.DuplicateResource);
            }else {

                return RolePerm.updateOne({"role": doc[0].role}, {$push: {"permissions" : recbody.permission.toLowerCase()}}).exec()
                    .then(result => {
                        if (result.ok != 1) {
                            console.log("Error cannot construct the value or object described by the input");
                            return Promise.reject(error_codes.BadRequest);
                        }
                        else if (result.nModified >= 0) {
                            return result;
                        }
                        else {
                            console.log("Error cannot add the permission " + JSON.stringify(result));
                            return Promise.reject(error_codes.UnknownError)
                        }
                    }).catch(err => {
                        return Promise.reject(err);
                    });

            }

        }).catch(err => {
            return Promise.reject(err);
        })



};
//=============================================================================
/**
 * Export module
 */
//=============================================================================
module.exports = addPermissions;
//=============================================================================
