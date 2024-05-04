import { DEV_SPREADSHEET_ID } from "./constants";
import { getToken } from "./storage";

export function setInfoToSpreadSheet() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${DEV_SPREADSHEET_ID}/values/M:M`
    getToken().then((t) => {
        let getInit = {
            method: "GET",
            async: true,
            headers: {
              Authorization: "Bearer " + t,
              "Content-Type": "application/json",
            },
            contentType: "json",
          };
          return fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${DEV_SPREADSHEET_ID}/values/M:M`,
            getInit
          )
          .then((res) => res.json())
    })
}