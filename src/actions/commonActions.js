import { Alert } from "react-native";

export const ERROR = "ACTION_ERROR";
export const CLEAR_ERROR = "CLEAR_ACTION_ERROR";

export const eachHasValue = (object) => { 
    return Object.values(object).every(value => !!value)
}

const showAlert = (title, message, actions) =>
    Alert.alert(
        title,
        message, 
        actions
    )

export const showInfoAlert = (title, message, actions) => showAlert(title, message, actions)

export const showErrorAlert = (error) => showAlert(
    error.name,
    error.message,
    [{
        text: "Dismiss",
        onPress: () => console.log('Dismiss pressed'),
    }]
)
