import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from "expo-router"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
    icon: IconProp;
    color: string;
    name: string;
    focused: boolean;
}

const TabIcon = ({ icon, color, name, focused } : Props) => {
    return (
        <View className="items-center justify-center gap-1 w-20 h-20">
            <FontAwesomeIcon icon={icon} color={color} />
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>
                {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
  return (
    <>
        <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#ffaa92",
            tabBarInactiveTintColor: "#8b8b8b",
            tabBarStyle: {
                backgroundColor: "#121212",
                borderTopWidth: 4,
                borderTopColor: "#282828",
                height: 80,
            }
        }}
        >
            <Tabs.Screen
                name="home"
                options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon icon={"fa-solid fa-house" as IconProp} color={color} name="Home" focused={focused} />
                  )
                }}
            />
            <Tabs.Screen
                name="new"
                options={{
                title: "New",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon icon={"fa-solid fa-square-plus" as IconProp} color={color} name="New" focused={focused}/>
                  )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                title: "Profile",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon icon={"fa-solid fa-user" as IconProp} color={color} name="Profile" focused={focused} />
                  )
                }}
            />
        </Tabs>
    </>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})