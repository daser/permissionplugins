'use strict';
//=============================================================================
/**
 * Module dependencies
 */
//=============================================================================
const 
            RoleUser = require('../rolesusers'),
            _ = require('lodash'),
            Id = require('../../utils/ValidObjectid'),
            error_codes = require('../../utils/errormessages').error_codes;
//=============================================================================
/**
 * module functionality
 */
//=============================================================================
function updateUserRole(filter, update) {
    if (_.isEmpty(filter) || _.isEmpty(update) || _.isEmpty(filter.userId) || _.isEmpty(update.role) || !Id.isValid(filter.userId)) {
        console.log("Error there are missing or wrong fields");
        return Promise.reject(error_codes.BadRequest);
    }

    let updateQuery = {};
    updateQuery["$set"] = update;

    return RoleUser.update(filter, updateQuery)
        .then(result => {
            if (result.ok != 1) {
                console.log("Error cannot construct the value or object described by the input");
                return Promise.reject(error_codes.BadRequest);
            }
            else if (result.nModified >= 0) {
                return result;
            }
            else {
                console.log("Error cannot update the resource " + JSON.stringify(result));
                return Promise.reject(error_codes.UnknownError)
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });

}
//=============================================================================
/**
 * Export module
 */
//=============================================================================
module.exports = updateUserRole;
//=============================================================================
