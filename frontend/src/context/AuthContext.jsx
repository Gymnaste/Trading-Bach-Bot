/**
 * AuthContext.jsx — Contexte global d'authentification Supabase.
 * Tolérant à l'absence de credentials : affiche l'AuthPage avec un avertissement.
 */
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    const loadProfile = async (userId) => {
        if (!supabase) return
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single()
            if (error) throw error
            setProfile(data)
        } catch {
            setProfile({ id: userId, balance: 10000, username: '' })
        }
    }

    useEffect(() => {
        if (!isSupabaseConfigured || !supabase) {
            // Pas de Supabase configuré : on affiche l'auth page avec warning
            setLoading(false)
            return
        }

        supabase.auth.getSession().then(({ data: { session } }) => {
            const currentUser = session?.user ?? null
            setUser(currentUser)
            if (currentUser) loadProfile(currentUser.id)
            setLoading(false)
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            const currentUser = session?.user ?? null
            setUser(currentUser)
            if (currentUser) {
                loadProfile(currentUser.id)
            } else {
                setProfile(null)
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    const signIn = async (email, password) => {
        if (!supabase) return { error: { message: 'Supabase non configuré. Remplissez le fichier .env frontend.' } }
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        return { data, error }
    }

    const signUp = async (email, password, username = '') => {
        if (!supabase) return { error: { message: 'Supabase non configuré. Remplissez le fichier .env frontend.' } }
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (!error && data.user) {
            await supabase.from('profiles').upsert({
                id: data.user.id,
                username: username || email.split('@')[0],
                balance: 10000
            })
        }
        return { data, error }
    }

    const signOut = async () => {
        if (!supabase) return
        await supabase.auth.signOut()
    }

    const value = {
        user, profile, loading,
        signIn, signUp, signOut, loadProfile,
        isConfigured: isSupabaseConfigured
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
    return ctx
}
