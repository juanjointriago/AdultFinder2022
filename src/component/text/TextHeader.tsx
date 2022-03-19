import React from "react";
import { Text } from "react-native";
import { textHeader } from "../interfaces/UIInterfaces";
import { globalColors } from "../styles/Color";
import { globalStyles } from "../styles/GlobalStyles";


export const TextHeader = ({text, type, textColor = globalColors.primary}:textHeader )=> {

    const getTextStyle = () => {
        switch (type) {
            case "h1":
                return globalStyles.title;
            case "h2":
                return globalStyles.h2;
            case "h3":
                return globalStyles.h3;
        }
    }

    return(
        <Text style={[getTextStyle(), {color: textColor}]}>{text}</Text>
    );
}
