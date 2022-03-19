import React, { useState } from 'react'
import { View } from 'react-native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';


export const MenuPaper = () => {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);
    return (
        <View>
            <Menu visible onDismiss={closeMenu} anchor={<Button onPress={openMenu}><Icon name='bars'/></Button>}>

            </Menu>
        </View>
    )
}
