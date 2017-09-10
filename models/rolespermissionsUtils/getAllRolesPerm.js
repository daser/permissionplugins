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
function getAllRolesPerm(recbody) {
    if (_.isEmpty(recbody.role)) {
        console.log("Error there are missing or wrong fields");
        return Promise.reject(error_codes.MissingFields);
    }
    return RolePerm.find({"role":recbody.role.toLowerCase()})
        .exec()
        .then(result => {
            if (!_.isEmpty(result)) {
                return result;
            }
            else {
                console.log("Error input doesn't exist " + JSON.stringify(rec.body.role));
                return Promise.reject(error_codes.ResourceNotExist);
            }
        });
};
//=============================================================================
/**
 * Export module
 */
//=============================================================================
module.exports = getAllRolesPerm;
//=============================================================================
