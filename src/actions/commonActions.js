import { Alert } from "react-native";
import getClient from "../services/getClient";
import React from 'react'

export const ERROR = "ACTION_ERROR";
export const CLEAR_ERROR = "CLEAR_ACTION_ERROR";
import GenericCustomAlert from "../components/molecules/GenericCustomAlertComponents";
import DialogManager, { ScaleAnimation, DialogContent } from 'react-native-dialog-component';
import DialogComponent from "react-native-dialog-component/dist/DialogComponent";



export const getErrorMessage = (err) => {
    if (err.response) {
        const errorData = err.response.data;
        const errorMessage = errorData.error.errors[0].message
        console.log(errorMessage);
        switch (errorMessage) {
            case "Unauthenticated":
                throw Error("Data Anda Belum Terdaftar");
            case "The email has already been taken.":
                throw Error("Email yang anda gunakan telah terdaftar");
            case "The phone has already been taken.":
                throw Error("Nomor Handphone yang anda gunakan telah terdaftar");
            case "Unauthenticated.":
                throw Error("Anda Tidak Memiliki Akses, Silahkan Login Ulang");
            case "Wrong password":
                throw Error("Kata Sandi Lama Salah. Pastikan Kata Sandi Lama Anda Benar");
            case "Password anda salah":
                throw Error("Kata Sandi Anda Salah");
            default:
                throw Error(errorMessage);
        }
    } else if (err.message === "Network Error") {
        throw new Error("Periksa Koneksi Internet Anda");
    } else {
        throw new Error("Terjadi Kesalahan Pada Internal Server")
    }
};

export const showErrorAlert = (message, isDoubleButton, positiveAction, negativeAction, positiveTitle, negativeTitle) => {
    console.log('alert dialog show')
    DialogManager.show({
        animationDuration: 0,
        ScaleAnimation: new ScaleAnimation(),
        width: '80%',
        dialogStyle: { borderRadius: 16, width: '80%' },
        dismissOnTouchOutside: false,
        children: (

                <GenericCustomAlert
                    dialogTitle={message}
                    isDoubleButton={isDoubleButton}
                    onPositivePress={positiveAction}
                    onNegativePress={negativeAction ? negativeAction : () => { DialogManager.dismiss() }}
                    positiveTitle={positiveTitle}
                    negativeTitle={negativeTitle} />
        ),
    }, () => {
        console.log('callback - show');
    });
}

export const clearError = () => {
    return { type: CLEAR_ERROR };
}

