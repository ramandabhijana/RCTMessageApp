import React from "react";
import { View, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomStatusBar = (
    {
      backgroundColor,
      barStyle = "light-content",
    }
) => { 
     const insets = useSafeAreaInsets()
     return (
       <View style={{ height: insets.top, backgroundColor }}>
          <StatusBar
            animated={false}
            backgroundColor={backgroundColor}
            barStyle={barStyle} />
       </View>
     );
}

export default CustomStatusBar