import axios from "axios"

export const BASE_URL = 'https://terraresta.com/app/api'
export const SUCCESS_STATUS_CODE = 1
export const NO_ERROR_STATUS_CODE = 0
export const DEFAULT_LANG = 'en'

export const handleErrorResponse = (response) => { 
    if (response.data.error.errorCode != NO_ERROR_STATUS_CODE) { 
        const error = new Error(response.data.error.errorMessage)
        error.name = response.data.error.errorTitle
        throw error
    }
}