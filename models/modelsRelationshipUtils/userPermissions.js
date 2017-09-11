'use strict';
//=============================================================================
/**
 * Module dependencies
 */
//=============================================================================

const 
        RolePerm = require('../rolespermissions'),
	    RoleUser = require('../rolesusers'),
    	Promise = require('bluebird'),
        _ = require('lodash'),
        ObjectId = require('mongoose').Types.ObjectId,
        Id = require('../../utils/ValidObjectid'),
        error_codes = require('../../utils/errormessages').error_codes;



function getUserPermissions(userid) {
     if (_.isEmpty(userid) || !Id.isValid(userid)) {
        console.log("Either userid parameter is not passed or userid is not in the right format")
        return Promise.reject(error_codes.MissingOrInvalid);
    }
    return RoleUser.findOne({"userId":ObjectId(userid)})
        .exec()
        .then(result => {
            if (!_.isEmpty(result)) {
                return result;
            }
            else {
                console.log("Error input doesn't exist " + JSON.stringify(userid));
                return Promise.reject(error_codes.ResourceNotExist);
            }
        })
        .then(data => {
                    return RolePerm.findOne({"role":data.role.toLowerCase()})
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

        })
        .catch(err => {
            return Promise.reject(err);
        });
    
};
//=============================================================================
/**
 * Export module
 */
//=============================================================================
module.exports = getUserPermissions;
//=============================================================================
