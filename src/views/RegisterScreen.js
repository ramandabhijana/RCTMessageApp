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
import { eachHasValue, showErrorAlert, showInfoAlert } from '../actions/commonActions';
import { AuthContext } from '../../App';

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

const RegisterScreen = () => { 
    const [isLoading, setLoading] = useState(false)
    const { signIn } = React.useContext(AuthContext)

    const onTapRegisterButton = async (name, email, password) => { 
        setLoading(true)
        try { 
            const response = await signUp(name, email, password)
            if (response.data.status == SUCCESS_STATUS_CODE) { 
                const token = response.data.accessToken
                showInfoAlert(
                    'Account Created', 
                    'We have set up a new account for you!', 
                    [{
                        text: "OK",
                        onPress: () => signIn({ token })
                    }],
                )
            }
        } catch (error) {
            showErrorAlert(error)
        } finally { 
            setLoading(false)
        }
    }

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <SafeAreaView edges={['left', 'right', 'bottom']}>
                <Formik 
                    validateOnChange={true}
                    validationSchema={registerValidationSchema}
                    initialValues={{name: '', email: '', password: ''}}
                    onSubmit={values => console.log(values)}
                    >
                    {({handleChange, handleBlur, handleSubmit, values, errors, isValid}) => (
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
                                disabled={!isValid || !eachHasValue(values) || isLoading}
                                onPress={() =>
                                    onTapRegisterButton(values.name, values.email, values.password)
                                }
                                isLoading={isLoading}
                            />
                        </>
                    )}
                </Formik>
            </SafeAreaView>
            
        </KeyboardAwareScrollView>
    )
}

export default RegisterScreen