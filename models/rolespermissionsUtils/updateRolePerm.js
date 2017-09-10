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

//=============================================================================
/**
 * module functionality
 */
//=============================================================================





function updateRolePerm(filter, update){
    if (_.isEmpty(filter) || _.isEmpty(update)) {
        console.log("Error there are missing or wrong fields");
        return Promise.reject(error_codes.MissingFields);
    }

    let updateQuery = {};
    updateQuery["$set"] = update;

    return RolePerm.update(filter, updateQuery)
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
};

module.exports = updateRolePerm;

