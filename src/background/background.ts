import { Messages } from "../utils/messages"
import { setUserInfo } from "../utils/storage"

chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.onInstalled.addListener(() => {
    setUserInfo({
      nickName: '',
      email: ''
    })
  })
})

chrome.action.onClicked.addListener(tab => {
  chrome.tabs.sendMessage(tab.id, Messages.TOGGLE_SIDE_PANEL);
})