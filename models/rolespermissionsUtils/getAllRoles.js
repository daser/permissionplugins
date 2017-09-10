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
function getAllRoles() {
    return RolePerm.find({},{'role':1, '_id':0})
        .exec()
        .then(result => {
            if (!_.isEmpty(result)) {
                return result;
            }
            else {
                console.log("No record found");
                return Promise.reject(error_codes.NoRecord);
            }
        });
};
//=============================================================================
/**
 * Export module
 */
//=============================================================================
module.exports = getAllRoles;
//=============================================================================
