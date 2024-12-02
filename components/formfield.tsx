import { View, Text, TextInput, TouchableOpacity, KeyboardTypeOptions } from 'react-native'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface FormProps {
    title: string;
    value: string;
    placeholder?: string;
    handleChangeText(e: any): void;
    otherStyles?: string;
    keyboardType?: KeyboardTypeOptions;
    error?: string;
}

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, keyboardType, error }: FormProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const [focus, setFocus] = useState(false)

    const border = () => {
        if (error) {
            return "border-red-500"
        } else if (focus) {
            return "border-secondary0"
        } else {
            return "border-black-200"
        }
    }

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
            <View className={`w-full border-2 ${border()} h-16 px-4 bg-primary20 rounded-2xl  items-center flex-row`}>
                <TextInput 
                    className="flex-1 text-white font-psemibold text-base" 
                    value={value} 
                    placeholder={placeholder} 
                    placeholderTextColor="8b8b8b" 
                    onChangeText={handleChangeText}
                    secureTextEntry={(title === "Password" || title == "Confirm Password") && !showPassword}
                    keyboardType={keyboardType}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                />

                {(title === "Password" || title == "Confirm Password") && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="flex-2">
                        <View className="w-6 h-6">
                            <FontAwesomeIcon icon={!showPassword ? "fa-solid fa-eye-slash" as IconProp : "fa-solid fa-eye" as IconProp} color="#717171" />
                        </View>
                    </TouchableOpacity>
                )}
            </View>
            {(error) && (<Text className="text-base text-red-500 font-pmedium">{error}</Text>)}
        </View>
    )
}

export default FormField
