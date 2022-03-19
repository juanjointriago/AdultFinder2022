import React from 'react'
import { Image } from 'react-native';
import { ICON } from '../../data/const';

export const Logo = () => {
    return <Image source={ICON} style={{width: 110, height: 110,marginBottom: 8,}} />
    
}
