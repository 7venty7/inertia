import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { text } from '@fortawesome/fontawesome-svg-core';

interface buttonProps {
    title: string;
    handlePress(): void;
    containerStyles?: string;
    textStyles?: string;
    isLoading: boolean;
}
const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading } : buttonProps) => {
    return (
        <TouchableOpacity 
            disabled={isLoading} 
            activeOpacity={0.7} 
            onPress={handlePress} 
            className={`${containerStyles} ${isLoading ? 'opacity-50' : ''} bg-secondary0 rounded-xl min-h-[62px] justify-center items-center`}>
            <Text className={`text-primary0 font-psemibold text-lg ${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({})
