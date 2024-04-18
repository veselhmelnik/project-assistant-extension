import { Messages } from "../utils/messages"

// TODO: background script
chrome.runtime.onInstalled.addListener(() => {
  // TODO: on installed function
})

chrome.action.onClicked.addListener(tab => {
  chrome.tabs.sendMessage(tab.id, Messages.TOGGLE_SIDE_PANEL);
})