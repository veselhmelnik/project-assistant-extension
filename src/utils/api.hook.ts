import { useEffect, useState } from "react"
import { API_KEY, DEV_SPREADSHEET_ID } from "./constants"
import { UserInfo, getToken, getUserInfo } from "./storage"
import { projectInfo } from "./info.hook"
const BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets/'

type workType = "inProgress" | "readyForQa" | "qaAssigned" | "finished"
type errorType = {
    code: number
    text: string
}

const useApi = () => {
    const [data, setData] = useState({})
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<errorType>(null)
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

    function getAllDataFromTable() {
        return new Promise((resolve, reject) => {
            fetch(`${BASE_URL}${DEV_SPREADSHEET_ID}/values/M:M`, getInit)
                .then((res) => res.json())
                .then((res) => {
                    if (res.error) {
                        reject(new Error(res.error.code))
                    }
                    resolve(res.values)
                })
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
                // prevArr[18] = localStorage.getItem("timeStamp")
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
                prevArr[16] = localStorage.getItem("userName")
                break;
            case "finished":
                prevArr[3] = currentTime
                prevArr[4] = `=D${raw}-C${raw}`
                prevArr[14] = "Finished"
                prevArr[16] = localStorage.getItem("userName")
                prevArr[17] = info.qaTime
                prevArr[19] = localStorage.getItem("timeStamp")
                prevArr[21] = info.totalTime
                break;
        }
        return prevArr
    }

    function findRawInTable(data: Object, id: string) {
        let raw: number
        return new Promise((resolve, reject) => {
            for (let key in data) {
                if (data[key][0] && data[key][0].includes(id)) {
                    raw = +key
                    raw++
                }
            }
            const range: string = `A${raw}:Z${raw}`
            fetch(`${BASE_URL}${DEV_SPREADSHEET_ID}/values/realProgress!${range}`, getInit)
                .then((res) => res.json())
                .then((res) => {
                    if (res.error && res.error.code === 400) {
                        reject(new Error(res.error.code))
                    }
                    resolve({ rawArray: res.values[0], rawNumber: raw })
                })
        })
    }

    function putDataToTable(rawInfo, info) {
        const range: string = `A${rawInfo.rawNumber}:Z${rawInfo.rawNumber}`
        let params = {
            values: [[...generateDataDependingOfWorkType("inProgress", rawInfo.rawArray, info, rawInfo.rawNumber)]]
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
        return new Promise((resolve, reject) => {
            fetch(`${BASE_URL}${DEV_SPREADSHEET_ID}/values/${range}?valueInputOption=USER_ENTERED&key=${API_KEY}`, putInit)
                .then((data => {
                    if (data.status === 200) {
                        resolve(data)
                    }
                    reject(new Error('error'))
                }))
        })
    }

    function setDataToTable(info: projectInfo) {
        setLoading(true)
        setSuccess(false)

        getAllDataFromTable()
            .then((data) => {
                return findRawInTable(data, info.id)
                    .then((raw) => {
                        putDataToTable(raw, info)
                    })
            })
            .catch(error => console.log(error))
    }

    return { loading, success, error, setDataToTable }
}

export default useApi