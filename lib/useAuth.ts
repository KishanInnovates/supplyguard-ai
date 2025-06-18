import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { supabse } from './supabaseClient'

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Get initial user
        const getUser = async () => {
            try {
                const { data: { user } } = await supabse.auth.getUser()
                setUser(user)
            } catch (error) {
                console.error('Error getting user:', error)
            } finally {
                setLoading(false)
            }
        }

        getUser()

        // Listen for auth changes
        const { data: { subscription } } = supabse.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null)
                setLoading(false)
            }
        )

        return () => subscription.unsubscribe()
    }, [])

    const signOut = async () => {
        try {
            await supabse.auth.signOut()
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    return { user, loading, signOut }
} 