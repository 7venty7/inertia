import { supabase } from "@/utils/supabase";
import { Session, User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext<{
    session: Session | null | undefined, 
    setSession: (session: Session | null | undefined) => void,
    user: User | null | undefined, 
    setUser: (user: User | null | undefined) => void,
    signOut: () => void
}>({session: null, setSession: (session: Session | null | undefined) => {}, user: null, setUser: (user: User | null | undefined) => {}, signOut: () => {}})

export const GlobalProvider = ({ children } : any) => {
    const [user, setUser] = useState<User | null | undefined>()
    const [session, setSession] = useState<Session | null | undefined>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const setData = async () => {
            const { data: {session}, error } = await supabase.auth.getSession();
            if (error) throw error
            setSession(session)
            setUser(session?.user)
            setLoading(false)
        }

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setUser(session?.user)
            setLoading(false)
        })

        setData()

        return () => {
            listener?.subscription.unsubscribe();
        }
    }, [])

    const value = {
        session,
        setSession,
        user,
        setUser,
        signOut: () => supabase.auth.signOut()
    }

    return (
        <GlobalContext.Provider value={value}>
            {!loading && children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)
