import axios from 'axios'
import { getSession } from 'next-auth/react'

// const dotenv = require ('dotenv')
// dotenv.config()

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:5500'

export async function fetchWithAuth(endpoint, options = {}) {
    const session = await getSession()

    if(!session){
        throw new Error("Not authenticated")
    }

    if (session.error === 'RefreshTokenError' || session.error === 'MissingRefreshToken') {
        throw new Error('Session expired. Please sign in again.')
    }

    const idToken = session.idToken || session.id_token
    if (!idToken) {
        throw new Error('Session token missing. Please sign in again.')
    }

    try{
        const response = await axios({
            // url, method, headers, data, params
            url: `${API_URL}${endpoint}`,
            method: options.method || 'GET',
            headers: {
                Authorization: `Bearer ${idToken}`,
                ...options.headers
            },
            data: options.body,
            params: options.params,
        })

        return response.data
    } catch (error) {
        const responseMessage = error?.response?.data?.message || error?.response?.data?.error
        const status = error?.response?.status
        throw new Error(responseMessage ? `Api request failed (${status}): ${responseMessage}` : 'Api request failed')
    }
}