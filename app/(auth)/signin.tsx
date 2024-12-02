import { ScrollView, Text, View, Image, ImageSourcePropType, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormField from '@/components/formfield';
import CustomButton from '@/components/custombutton';
import { Link } from 'expo-router';
import images from '../../constants/images';

import { supabase } from '@/utils/supabase';
import { useGlobalContext } from '@/context/globalprovider';

const SignIn = () => {
    const { user, setUser, session, setSession } = useGlobalContext()
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = async () => {
        setIsSubmitting(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: form.email,
            password: form.password,
        })

        if (error) Alert.alert(error.message);
        setIsSubmitting(false)
    }

    return (
        <SafeAreaView className="bg-primary0 h-full">
            <ScrollView>
                <View className="w-full justify-center h-full px-3 my-6 min-h-[70vh]">
                    <Image source={images.logosmall} resizeMode="contain" />
                    <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign-in to Inertia</Text>
                    <FormField 
                        title="Email" 
                        value={form.email} 
                        handleChangeText={(e) => setForm({...form, email: e})} 
                        otherStyles="mt-7" 
                        keyboardType="email-address"
                    />
                    <FormField 
                        title="Password" 
                        value={form.password} 
                        handleChangeText={(e) => setForm({...form, password: e})} 
                        otherStyles="mt-7" 
                    />
                    <CustomButton title="Sign In" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting}/>
                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Don't have an account?
                        </Text>
                        <Link href="/signup" className="text-lg font-psemibold text-secondary40">Sign Up</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn
