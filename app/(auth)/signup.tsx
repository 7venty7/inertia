import { ScrollView, Text, View, Image, ImageSourcePropType, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormField from '@/components/formfield';
import CustomButton from '@/components/custombutton';
import { Link, router } from 'expo-router';
import images from '../../constants/images';

import { supabase } from '@/utils/supabase';
import { useGlobalContext } from '@/context/globalprovider';

const SignUp = () => {
    const { user, setUser, setSession } = useGlobalContext()

    const [form, setForm] = useState({
        email: "",
        password: "",
        confirm: ""
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = async () => {
        setIsSubmitting(true)

        if (form.confirm != form.password) {
            Alert.alert("Error", "Passwords don't match.")
            setIsSubmitting(false)
            return
        }

        if (form.email === "") {
            Alert.alert("Error", "Please fill out email")
            setIsSubmitting(false)
            return
        }

        const {
            data: { session },
            error
        } = await supabase.auth.signUp({
                email: form.email,
                password: form.password
        })

        if (error) {
            Alert.alert(error.message)
        } else {
            setSession(session)
            setUser(session?.user)
            console.log(user?.email)
            router.replace("/setprofile")
        }
        setIsSubmitting(false)
    }

    const confirmError = () => {
        if (form.confirm && form.confirm != form.password) {
            return "Passwords don't match"
        }
    }


    return (
        <SafeAreaView className="bg-primary0 h-full">
            <ScrollView>
                <View className="w-full justify-center h-full px-3 my-6 min-h-[70vh]">
                    <Image source={images.logosmall} resizeMode="contain" />
                    <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign-up to Inertia</Text>
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
                    <FormField 
                        title="Confirm Password" 
                        value={form.confirm} 
                        handleChangeText={(e) => setForm({...form, confirm: e})} 
                        otherStyles="mt-7" 
                        error={confirmError()}
                    />
                    <CustomButton title="Sign Up" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting}/>
                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Already have an account?
                        </Text>
                        <Link href="/signin" className="text-lg font-psemibold text-secondary40">Sign In</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp
