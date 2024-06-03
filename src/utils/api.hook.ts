import { useEffect, useState } from "react"
import { API_KEY, DEV_SPREADSHEET_ID } from "./constants"
import { UserInfo, getToken, getUserInfo } from "./storage"
import { projectInfo } from "./info.hook"
const BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets/'

export type workType = "inProgress" | "readyForQa" | "qaAssigned" | "finished"
type errorType = {
    code: number
    text: string
}

const useApi = () => {
    const [status, setStatus] = useState(null)
    const [classStatus, setClassStatus] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<errorType>(null)
    const [classError, setClassError] = useState<errorType>(null)
    const [token, setToken] = useState('')
    const [userInfo, setUserInfo] = useState<UserInfo>(null);

    useEffect(() => {
        getToken().then((t) => setToken(t))
        getUserInfo().then(info => setUserInfo(info))
    }, [])

    let getInit = {
        method: "GET",
        async: true,
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        contentType: "json",
    };

    async function fetchAllData() {
        return fetch(`${BASE_URL}${DEV_SPREADSHEET_ID}/values/A:Z`, getInit)
            .then(res => res.json())
            .then((res) => { return res.values })
    }

    async function findRawInTable(data, id) {
        for (let key in data) {
            if (data[key][12] && data[key][12].includes(id)) {
                return { data: data[key], rawNumber: ((+key) + 1) }
            }
        }
    }

    async function setDataToTable(info: projectInfo, workType: workType) {
        let data
        let projectArr
        let putData
        setStatus(null)
        setLoading(true)
        setError(null)
        data = await fetchAllData().then(data => { return data })
        if (!data) {
            setError({ code: 0, text: 'Щось пiшло не так' })
            setLoading(false)
            return
        }
        projectArr = await findRawInTable(data, info.id)
        if (!projectArr) {
            setError({ code: 400, text: 'Щось пiшло не так' })
            setLoading(false)
            return
        }
        putData = await putDataToTable(projectArr, info, workType)
        if (putData) {
            setStatus(putData.status === 200 ? 'ok' : 'wrong')
        }
        setLoading(false)
    }

    async function setClassDataToTable(info, workType) {
        setClassError(null)
        setClassStatus(null)
        let raw
        let data
        let putData
        data = await fetchAllClassData().then((data => { return data }))
        for (let i = 3; i < 150; i++) {
            if (data[i][3].length === 10 && data[i - 1][3].length === 0) {
                raw = i;
                break;
            }
        }

        if (workType === 'readyForQa') {
            if (!raw) {
                return setClassError({ code: 10, text: 'Додайте рядки у таблицю CLASS QA' })
            }
            await putNewProjectToClassDataTable(info, raw)
        } else {
            await putProjectToClassDataTable(info, workType)
        }


    }
    async function fetchAllClassData() {
        return fetch(`https://sheets.googleapis.com/v4/spreadsheets/${DEV_SPREADSHEET_ID}/values/classQA!A:Z`, getInit)
            .then(res => res.json())
            .then((res) => { return res.values })
    }

    async function putProjectToClassDataTable(info: projectInfo, workType: workType) {
        let raw = 1;
        let prevArr = [];
        fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${DEV_SPREADSHEET_ID}/values/classQA!A1:Z100`,
            getInit
        )
            .then((res) => res.json())
            .then((res) => res.values)
            .then((res) => {
                for (let key in res) {
                    if (res[key][3] && res[key][3] === info.id) {
                        prevArr = [...res[key]]
                        raw += Number(key)
                    }
                }
                if (prevArr.length === 0) {
                    return setClassError({ code: 30, text: 'ID проєкта вiдсутнiй у таблицi CLASS QA' })
                }
            }).then((res) => {
                switch (workType) {
                  case "qaAssigned":
                    prevArr[6] = "FINAL QA ASSIGNED";
                    prevArr[8] = userInfo.nickName
                    break;
                  case "finished":
                    prevArr[6] = "FINISHED";
                    prevArr[7] = info.qaTime
                    prevArr[9] = "TRUE";
                    break;
                }
                var params = {
                    values: [[...prevArr]],
                  }
                  let putInit = {
                    method: "PUT",
                    async: true,
                    body: JSON.stringify(params),
                    headers: {
                      Authorization: "Bearer " + token,
                      "Content-Type": "application/json",
                    },
                    contentType: "json",
                  }
                  const range = `A${raw}:Z${raw}`;
                  fetch(
                    `https://sheets.googleapis.com/v4/spreadsheets/${DEV_SPREADSHEET_ID}/values/classQA!${range}?valueInputOption=USER_ENTERED&key=${API_KEY}`,
                    putInit
                  )
                  .then((data) => {
                    if (data.status === 200) {
                        setClassStatus('ok')
                    }
                  })
            })

    }

    async function putNewProjectToClassDataTable(info: projectInfo, raw) {
        let currentDate = new Date().toLocaleString("en-GB")
        const range = `A${raw}:Z${raw}`
        var params = {
            values: [[
                currentDate,
                userInfo.nickName,
                userInfo.email,
                info.id,
                info.name,
                `https://operations.insidemaps.com/app/photo-analyzer/?project=${info.id}`,
                "READY FOR FINAL QA",
            ]],
        }
        let putInit = {
            method: "PUT",
            async: true,
            body: JSON.stringify(params),
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            contentType: "json",
        };

        fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${DEV_SPREADSHEET_ID}/values/classQA!${range}?valueInputOption=USER_ENTERED&key=${API_KEY}`,
            putInit
        )
            .then((data) => {
                if (data.status === 200) {
                    setClassStatus('ok')
                }
            })
    }


    function generateDataDependingOfWorkType(workType: workType, dataArr, info: projectInfo, raw: number) {
        let prevArr = [...dataArr]
        let currentDate = new Date()
        let currentTime = currentDate.getHours() +
            ":" +
            (currentDate.getMinutes() < 10
                ? `0${currentDate.getMinutes()}`
                : currentDate.getMinutes())
        switch (workType) {
            case "inProgress":
                prevArr[2] = info.takenTime
                prevArr[8] = info.organization
                prevArr[9] = info.projectPackage
                prevArr[10] = info.floorsNumber
                prevArr[13] = "BUILD"
                prevArr[14] = "2D in progress"
                prevArr[18] = info.timeStamp
                prevArr[20] = userInfo.nickName
                prevArr[22] = userInfo.email
                break;
            case "readyForQa":
                prevArr[14] = "READY fo QA"
                prevArr[19] = currentTime
                prevArr[21] = info.totalTime

                break;
            case "qaAssigned":
                prevArr[14] = "QA Processing"
                prevArr[16] = userInfo.nickName
                break;
            case "finished":
                prevArr[3] = currentTime
                prevArr[4] = `=D${raw}-C${raw}`
                prevArr[14] = "Finished"
                prevArr[16] = userInfo.nickName
                prevArr[17] = info.qaTime
                prevArr[19] = info.timeStamp
                prevArr[21] = info.totalTime
                break;
        }
        return prevArr
    }

    async function putDataToTable(rawInfo, info, workType: workType) {
        const range: string = `A${rawInfo.rawNumber}:Z${rawInfo.rawNumber}`
        let params = {
            values: [[...generateDataDependingOfWorkType(workType, rawInfo.data, info, rawInfo.rawNumber)]]
        }
        let putInit = {
            method: "PUT",
            async: true,
            body: JSON.stringify(params),
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            contentType: "json",
        }
        return fetch(`${BASE_URL}${DEV_SPREADSHEET_ID}/values/${range}?valueInputOption=USER_ENTERED&key=${API_KEY}`, putInit)
            .then((data => { return data }))
    }

    return { loading, status, error, classError, classStatus, setDataToTable, setClassDataToTable }
}

export default useApi