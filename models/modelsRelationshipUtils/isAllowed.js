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



function isAllowed(permfilter, UserID) {
     if (_.isEmpty(UserID) || _.isEmpty(permfilter) || !Id.isValid(UserID)) {
        console.log("Either userid parameter is not passed or userid is not in the right format")
        return Promise.reject(error_codes.MissingOrInvalid);
    }
    return RoleUser.findOne({"userId":ObjectId(UserID)})
        .exec()
        .then(result => {
            if (!_.isEmpty(result)) {
                return result;
            }
            else {
                console.log("Error input doesn't exist " + JSON.stringify(UserID));
                return Promise.reject(error_codes.ResourceNotExist);
            }
        })
        .then(data => {
        			return RolePerm.findOne({"role": data.role.toLowerCase()})
                	.exec();
        })
        .then(doc => {
        			if (!_.isEmpty(doc)) {
                		var found = false;
               			 _.forEach(doc.permissions, (newresult) => {
                    	if (newresult == permfilter) {
                        	found = true;
                        	return false;
                    	}
                		});

                		if (found) {
                    		return true;
                		} else {
                    		return false;
                		}
           			}
           			else {
                		console.log("Error permission does not exist ");
                		return Promise.reject(error_codes.ResourceNotExist);
           			}

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
module.exports = isAllowed;
//=============================================================================
