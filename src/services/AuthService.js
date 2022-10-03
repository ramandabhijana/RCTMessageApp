import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { BASE_URL, DEFAULT_LANG, handleErrorResponse, SUCCESS_STATUS_CODE } from "./NetworkService"

const AUTH_DATA_KEY = 'auth_data'

export const signUp = async (name, email, password) => { 
    const url = BASE_URL.concat('/SignUpCtrl/SignUp')
    const response = await axios.get(url, {
        params: {
            login_id: email,
            password: password,
            nickname: name,
            language: DEFAULT_LANG 
        }
    })
    handleErrorResponse(response)
    await storeAuthData({
        userId: response.data.userId,
        accessToken: response.data.accessToken
    })
    return response
}

export const signIn = async (email, password) => { 
    const url = BASE_URL.concat('/LoginCtrl/Login')
    const response = await axios.get(url, {
        params: { 
            login_id: email,
            password: password,
            language: DEFAULT_LANG
        }
    })
    handleErrorResponse(response)
    await storeAuthData({
        userId: response.data.userId,
        accessToken: response.data.accessToken
    })
    return response.data
}

const storeAuthData = async (authData) => { 
    const value = JSON.stringify(authData)
    await AsyncStorage.setItem(AUTH_DATA_KEY, value)
}

export const checkIsLoggedIn = async () => { 
    const value = await AsyncStorage.getItem(AUTH_DATA_KEY)
    return value != null 
}

export const getAccessToken = async () => { 
    const value = await AsyncStorage.getItem(AUTH_DATA_KEY)
    if (value == null) { 
        return null
    }
    return JSON.parse(value).accessToken
}

export const getUserId = async () => { 
    const value = await AsyncStorage.getItem(AUTH_DATA_KEY)
    if (value == null) { 
        return null
    }
    return JSON.parse(value).userId
} 

export const removeStoredAuthData = async () => { 
    await AsyncStorage.removeItem(AUTH_DATA_KEY)
}