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

export function getUserInfo(): Promise<UserInfo> {
    return new Promise((resolve) => {
        chrome.storage.local.get(['info'], (res) => {
            resolve(res.info)
     })
    })
}