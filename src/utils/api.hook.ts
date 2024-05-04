import { useEffect, useState } from "react"
import { DEV_SPREADSHEET_ID } from "./constants";
import { getToken } from "./storage";
const BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets/'

const useApi = () => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [token, setToken] = useState('')

    useEffect(() => {
        getToken().then((t) => setToken(t))
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

    async function getAllDataFromTable() {
        const url = `${BASE_URL}${DEV_SPREADSHEET_ID}/values/M:M`
        const res = await fetch(url, getInit)
        return res.json().then(data => data.values)
    }

    return { loading }
}

export default useApi