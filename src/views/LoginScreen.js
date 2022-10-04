import React from 'react';
import { View, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { INPUTS_TO_BTN_SPACING } from "../constants/Numbers";
import Keys from '../constants/Keys';
import translate from "../locales/translate";
import PrimaryButton from '../components/atoms/PrimaryButton';
import TextInputField from '../components/atoms/TextInputField';
import styles from '../constants/Styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import * as yup from 'yup'
import { AuthContext } from '../../App';
import { signIn as login }  from '../services/AuthService';
import { SUCCESS_STATUS_CODE } from '../services/NetworkService';
import { showAlert } from '../actions/commonActions';
import { Formik } from 'formik';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import CustomHeader from '../components/molecules/CustomHeader';
import DialogManager from 'react-native-dialog-component/';

const signInValidationSchema = yup.object().shape({
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

const LoginScreen = ({ navigation }) => { 
    const [isLoading, setLoading] = useState(false)
    const [submitCount, setSubmitCount] = useState(0)

    const { signIn } = React.useContext(AuthContext)
    const componentMounted = useRef(true)
    
    const onTapSignInButton = async (values) => { 
        setLoading(true)
        try { 
            const responseData = await login(values.email, values.password)
            if (responseData.status == SUCCESS_STATUS_CODE) { 
                const token = responseData.accessToken
                signIn({ token })
            }
        } catch (error) { 
            showAlert(error.message, false, () => {
                onDismissErrorAlert()
            }, false, 'Dismiss')
        } finally { 
            if (componentMounted.current) { 
                setLoading(false)
            }
        }
    }

    const onDismissErrorAlert = () => {
        DialogManager.dismiss()
        setLoading(false)
    }

    useEffect(() => {
        componentMounted.current = false
    }, []);

    return (
        <>
        <CustomHeader 
        title={translate(Keys.login)}
        onPressBack={() => navigation.goBack()}
        />
        <KeyboardAwareScrollView style={styles.container}>
                <SafeAreaView edges={['left', 'right', 'bottom']}>
                    <Formik
                        validateOnChange={submitCount > 0}
                        
                        validationSchema={signInValidationSchema}
                        initialValues={{email: '', password: ''}}
                        >
                        {({handleChange, handleBlur, validateForm, values, errors, isValid}) => (
                            <>
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
                                    title={translate(Keys.login)}
                                    disabled={!isValid || isLoading}
                                    onPress={() => {
                                        setSubmitCount(currentSubmitCount => {
                                            if (currentSubmitCount == 0) { 
                                                validateForm()
                                            }
                                            return currentSubmitCount + 1
                                        })
                                        
                                        onTapSignInButton(values)
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

export default LoginScreen