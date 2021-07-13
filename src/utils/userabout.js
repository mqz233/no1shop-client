import { v4 as uuidv4 } from 'uuid';

// 工具包 返回用户的临时id
// 逻辑：第一次存储在localStorage里，以后从localstorage里取出来
export function getUserTempId() {

    let userTempId = localStorage.getItem("USERTEMPID_KEY")
    if (userTempId === null) {
        userTempId = uuidv4()
        localStorage.setItem("USERTEMPID_KEY", userTempId)
    }
    return userTempId;
}