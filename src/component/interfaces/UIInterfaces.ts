export interface iconButton {
    iconName: string,
    size?: number,
    color?: string,
    onPress?: () => void,
    withBadge?: boolean
}
export interface textHeader {
    text: string,
    type: 'h1' | 'h2' | 'h3',
    textColor?: string
}
export interface header {
    title?: string | null,
    isBackButton?: boolean,
    isRightButton?: boolean,
    typeRightButton?: 'notification' | null,
    typeLeftButton?: 'back' | null,
}
export interface homeMenuCard {
    onPress?: () => void | undefined,
    backgroundColor?: string,
    iconInside?: boolean,
    iconSrc?: string,
    iconPadding?: string,
    imageSrc?: string,
    descriptionText?: string,
    textSize?: number,
}

