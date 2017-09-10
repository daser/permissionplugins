'use strict';
//=============================================================================
/**
 * Import sub-modules
 */
//=============================================================================
const
    createRolesPerms = require('./createRolesPerms'),
    deletePermissions = require('./deletePermissions'),
    deleteRolePerm = require('./deleteRolePerm'),
    getAllRolesPerm = require('./getAllRolesPerm'),
    updateRolePerm = require('./updateRolePerm'),
    createRole = require("./createRole"),
    addPermissions = require('./addPermissions'),
    getAllRoles = require('./getAllRoles');
  
//=============================================================================
/**
 * Export module
 */
//=============================================================================
module.exports = {
    createRolesPerms,
    addPermissions,
    deletePermissions,
    deleteRolePerm,
    getAllRolesPerm,
    updateRolePerm,
    createRole,
    getAllRoles
};
//=============================================================================
