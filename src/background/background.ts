import { Messages } from "../utils/messages"
import { setTimeStamp, setToken, setUserInfo } from "../utils/storage"

  chrome.runtime.onInstalled.addListener(() => {
    chrome.identity.getAuthToken({interactive: true}, function (t) {
      setToken(t)
   })
   setUserInfo({
    nickName: '',
    email: ''
  })
  setTimeStamp('')
  })

chrome.action.onClicked.addListener(tab => {
  chrome.tabs.sendMessage(tab.id, Messages.TOGGLE_SIDE_PANEL);
})