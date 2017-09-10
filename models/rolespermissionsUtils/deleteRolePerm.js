'use strict';
//=============================================================================
/**
 * Module dependencies
 */
//=============================================================================
const RolePerm = require('../rolespermissions'),
    Promise = require('bluebird'),
        _ = require('lodash'),
            error_codes = require('../../utils/errormessages').error_codes;




function deleteRolePerm(recbody){
    if (_.isEmpty(recbody.role)){
        log.error("Error there are missing or wrong fields");
        return Promise.reject(error_codes.MissingFields);
    }

   

    return RolePerm.remove({"role":recbody.role.toLowerCase()})
        .then(result => {
            result = JSON.parse(result);
            if (result.n == 0) {
                console.log("Error cannot find any resource in the db");
                return Promise.reject(error_codes.ResourceNotExist);
            }
            else if (result.n > 0) {
                return result;
            }
            else if (result.ok !== 1) {
                console.log("Error cannot delete the value or object described by the input");
                return Promise.reject(error_codes.BadRequest);
            }
            else {
                console.log("Error cannot delete the resource " + JSON.stringify(result));
                return Promise.reject(error_codes.UnknownError)
            }
        });
};



//=============================================================================
/**
 * Export module
 */
//=============================================================================
module.exports = deleteRolePerm;
//=============================================================================
