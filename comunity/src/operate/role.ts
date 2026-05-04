// role関連の操作

import {
    createRole as dbcreateRole,
    getRoleByIds as dbgetRoleByIds,
    updateRole as dbupdateRole,
    deleteRole as dbdeleteRole,
}from "../contorol/db/role/rolecrud"
import { 
    createRole as discordcreateRole,
    getRoleByIds as discordgetRoleByIds,
    updateRole as discordupdateRole,
    deleteRole as discorddeleteRole
 } from "../contorol/discord/role/role"


// discordの操作

export function createRole() {
    console.log('操作インターフェース')
    dbcreateRole();
    discordcreateRole();
    return 
}

export function getRoleByIds(){
    dbgetRoleByIds();
    discordgetRoleByIds();
    return
}
    

export function updateRole() {
    dbupdateRole()
    discordupdateRole();
    return
}

export function deleteRole() {
    dbdeleteRole()
    discorddeleteRole()
    return
}
