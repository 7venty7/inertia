import { ScrollView, Text, View, Image, ImageSourcePropType, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormField from '@/components/formfield';
import CustomButton from '@/components/custombutton';
import { Link, router } from 'expo-router';
import images from '../../constants/images';

import { supabase } from '@/utils/supabase';
import { useGlobalContext } from '@/context/globalprovider';

import * as ImagePicker from "expo-image-picker"
import { TouchableOpacity } from 'react-native';
import { decode } from "base64-arraybuffer"
import ImageManipulator, { ImageManipulatorContext, manipulateAsync, SaveFormat } from "expo-image-manipulator"


const SetProfile = () => {
    const { user, setUser, session, setSession } = useGlobalContext()

    const [form, setForm] = useState({
        username: "",
    })

    const [loadingImage, setLoadingImage] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [image, setImage] = useState('')

    const submit = async () => {
        setIsSubmitting(true)

        if (form.username == "") {
            Alert.alert("Error", "Please enter a username")
            setIsSubmitting(false)
            return
        }

        const info = {
            id: user?.id,
            username: form.username,
            email: user?.email,
        }

        const { data, error, status } = await supabase.from("users").insert(info)

        if (error) {
            Alert.alert(error.message)
        }
        router.replace("/home")
        setIsSubmitting(false)
    }

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
            Alert.alert("Error", "Permission to access gallery was denied")
            return
        }

        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            
            base64: true
        })

        if (!res.canceled) {
            setLoadingImage(true)
            var uri = res.assets[0].uri
            const fileExt = uri.split("/").pop()?.split(".").pop()
            const fileName = "" + user?.id
            var base64 =res.assets[0].base64

            if (res.assets[0].width > 300) {
                const manipResult = await manipulateAsync(
                    uri,
                    [{resize: {height: 300, width: 300}}],
                    {compress: 1, format: SaveFormat.JPEG, base64: true}
                )
                
                base64 = manipResult.base64
                uri = manipResult.uri
            }


            const { data, error } = await supabase.storage.from("avatars").upload(fileName, decode(""+base64), {
                cacheControl: "3600",
                upsert: true,
                contentType: `image/${fileExt}`,
            })

            if (error) {
                Alert.alert(error.message)
                setLoadingImage(false)
                return
            }

            setImage(uri)
            setLoadingImage(false)
        }
    }


    return (
        <SafeAreaView className="bg-primary0 h-full">
            <ScrollView>
                <View className="w-full justify-center h-full px-3 my-6 min-h-[70vh]">
                    <Text className="text-2xl text-white text-semibold mt-10 font-psemibold text-center">Choose a username and avatar</Text>
                    <TouchableOpacity onPress={pickImage} activeOpacity={0.8} className="flex items-center mt-5">
                        {image ? (
                        <Image source={{uri : image}} resizeMode="cover" className="flex-1 rounded-full h-[80px] w-[80px]" />)
                        : (<Image source={images.defaultAvatar} resizeMode="contain" className="flex-1 rounded-full h-[80px] w-[80px]"/>)
                        }
                    </TouchableOpacity>
                    <FormField 
                        title="Username" 
                        value={form.username} 
                        handleChangeText={(e) => setForm({...form, username: e})} 
                        otherStyles="mt-7" 
                    />
                    <CustomButton title="Set Profile" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SetProfile
