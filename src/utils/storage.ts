export interface UserInfo {
    nickName: string
    email: string
}

export function setUserInfo(info: UserInfo): Promise<void> {
    return new Promise((resolve) => {
        chrome.storage.local.set({info}, () => {
            resolve()
        })
    })
}

export function setToken(token: string): Promise<void> {
    return new Promise((resolve) => {
        chrome.storage.local.set({token}, () => {
            resolve()
        })
    })
}

export function setTimeStamp(timeStamp: string): Promise<void> {
    return new Promise((resolve) => {
        chrome.storage.local.set({timeStamp}, () => {
            resolve()
        })
    })
}

export function getTimeStamp(): Promise<string> {
    return new Promise((resolve) => {
        chrome.storage.local.get(['timeStamp'], (res) => {
            resolve(res.timeStamp)
     })
    })
}

export function getToken(): Promise<string> {
    return new Promise((resolve) => {
        chrome.storage.local.get(['token'], (res) => {
            resolve(res.token)
     })
    })
}

export function getUserInfo(): Promise<UserInfo> {
    return new Promise((resolve) => {
        chrome.storage.local.get(['info'], (res) => {
            resolve(res.info)
     })
    })
}