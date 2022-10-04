import React, { useState } from 'react';
import { View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/atoms/PrimaryButton';
import TextInputField from '../components/atoms/TextInputField';
import Keys from '../constants/Keys';
import { INPUTS_TO_BTN_SPACING } from '../constants/Numbers';
import styles from '../constants/Styles';
import translate from "../locales/translate";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { signUp } from '../services/AuthService';
import { Formik } from 'formik';
import * as yup from 'yup'
import { SUCCESS_STATUS_CODE } from '../services/NetworkService';
import { showAlert } from '../actions/commonActions';
import { AuthContext } from '../../App';
import CustomHeader from '../components/molecules/CustomHeader';
import DialogManager from 'react-native-dialog-component';

const registerValidationSchema = yup.object().shape({
    name: yup
        .string()
        .required('Name is required')
        .max(50, ({ max }) => `Max characters for name is ${max}`),
    email: yup
        .string()
        .email('Invalid email')
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(4, ({ min }) => `Password must be at least ${min} characters`)
        .max(10, ({ max }) => `Password must not be more than ${max} characters`)
})

const RegisterScreen = ({ navigation }) => { 
    const [isLoading, setLoading] = useState(false)
    const [submitCount, setSubmitCount] = useState(0)
    const { signIn } = React.useContext(AuthContext)

    const onTapRegisterButton = async (name, email, password) => { 
        setLoading(true)
        try { 
            const response = await signUp(name, email, password)
            if (response.data.status == SUCCESS_STATUS_CODE) { 
                const token = response.data.accessToken
                showAlert('Account Created', false, () => {
                    DialogManager.dismiss()
                    signIn({ token })
                }, false, null, null)
            }
        } catch (error) {
            showAlert(error.message, false, () => { finishLoading() }, false, 'Dismiss')
        } 
    }

    const finishLoading = () => {
        DialogManager.dismiss() 
        setLoading(false)
    }

    return (
        <>
        <CustomHeader
            title={translate(Keys.register)}
            onPressBack={() => navigation.goBack()}
        />
        <KeyboardAwareScrollView style={styles.container}>
            <SafeAreaView edges={['left', 'right', 'bottom']}>
                <Formik 
                    validateOnChange={submitCount > 0}
                    validationSchema={registerValidationSchema}
                    initialValues={{name: '', email: '', password: ''}}
                    onSubmit={values => console.log(values)}
                    >
                    {({handleChange, handleBlur, validateForm, values, errors, isValid}) => (
                        <>
                            <TextInputField 
                                label={translate(Keys.userName)}
                                placeholder={translate(Keys.userName)}
                                keyboardType='default'
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                errorMessage={errors.name}
                            />
                            <TextInputField
                                label={translate(Keys.email)}
                                placeholder={translate(Keys.email)}
                                keyboardType='email-address'
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                errorMessage={errors.email}
                            />
                            <TextInputField
                                label={translate(Keys.password)}
                                placeholder={translate(Keys.password)}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={true}
                                errorMessage={errors.password}
                            />
                            <View style={{marginBottom: INPUTS_TO_BTN_SPACING}}/>
                            <PrimaryButton 
                                title={translate(Keys.register)}
                                disabled={!isValid || isLoading}
                                onPress={() => { 
                                    setSubmitCount(currentSubmitCount => { 
                                        if (currentSubmitCount == 0) { 
                                            validateForm()
                                        }
                                        return currentSubmitCount + 1
                                    })
                                    onTapRegisterButton(values.name, values.email, values.password)
                                }}
                                isLoading={isLoading}
                            />
                        </>
                    )}
                </Formik>
            </SafeAreaView>
            
        </KeyboardAwareScrollView>
        </>
    )
}

export default RegisterScreen