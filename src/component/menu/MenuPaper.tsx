import React, { useState } from 'react'
import { View } from 'react-native';
import { Button, Menu, Divider, Provider, Appbar, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { navInterface } from '../../data/interface';


export const MenuPaper = ({navigation}:navInterface) => {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);
    return (
        <View>
            <Appbar.Header >
                <Appbar.BackAction onPress={()=>navigation.goBack()}/>
                <Appbar.Content title='Bienvenido' subtitle='realiza el proceso de localización'/>
                <Appbar.Action icon={'magnify'} onPress={()=> console.log('Presionaste buscar')}/>
                <Appbar.Action icon='dots-vertical' onPress={()=>console.log('PResionaste menu')}/>
            </Appbar.Header>
            <View>
            </View>
            {/* <Menu visible onDismiss={closeMenu} anchor={<Button onPress={openMenu}><Icon name='bars'/></Button>}>

            </Menu> */}
        </View>
    )
}
