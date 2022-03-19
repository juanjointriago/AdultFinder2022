import React from "react";
import {TouchableOpacity, View} from "react-native";
import { Badge } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { iconButton } from "../interfaces/UIInterfaces";
import { globalColors } from "../styles/Color";
import { globalStyles } from "../styles/GlobalStyles";

/**
 *
 * @param: interface iconButton data
 * @returns: Icon button component
 * @description: button contains icon and badge (not required)
 * @author: JJIV
 * @version: 0.0.0.1
 */

export const IconButton = ({iconName, size = 24, color = globalColors.neutral, onPress, withBadge = true}:iconButton) => {
    return(
        <TouchableOpacity onPress={onPress}>
            <Icon name={iconName} size={size} color={color} solid/>
            {
                withBadge?
                    <Badge style={globalStyles.defaultBadgeStyle}/>
                    :null
            }
        </TouchableOpacity>
    );
}
