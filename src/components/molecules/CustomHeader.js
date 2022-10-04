import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import CustomNavigationBar from "../atoms/CustomNavigationBar";
import CustomStatusBar from "../atoms/CustomStatusBar";

const CustomHeader = (
    {
        title,
        onPressBack,
    }
) => { 
    return (
    <>
        <CustomStatusBar 
            backgroundColor={Colors.accent}
        />
        <CustomNavigationBar
            title={title}
            onPressDismiss={onPressBack}
        />
    </>
    )
}

export default CustomHeader