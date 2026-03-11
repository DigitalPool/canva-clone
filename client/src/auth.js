import NextAuth from "next-auth";
import Google from 'next-auth/providers/google'

function getIdTokenExpiryMs(idToken) {
    try {
        const payloadPart = idToken?.split('.')?.[1]
        if (!payloadPart) return null

        const payload = JSON.parse(Buffer.from(payloadPart, 'base64url').toString('utf8'))
        return payload?.exp ? payload.exp * 1000 : null
    } catch {
        return null
    }
}

async function refreshGoogleTokens(token) {
    try {
        const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: process.env.AUTH_GOOGLE_ID,
                client_secret: process.env.AUTH_GOOGLE_SECRET,
                grant_type: 'refresh_token',
                refresh_token: token.refreshToken,
            }),
        })

        const refreshed = await response.json()

        if (!response.ok) {
            throw refreshed
        }

        const idToken = refreshed.id_token || token.idToken || token.id_token || null
        return {
            ...token,
            accessToken: refreshed.access_token || token.accessToken,
            accessTokenExpiresAt: refreshed.expires_in ? Date.now() + refreshed.expires_in * 1000 : token.accessTokenExpiresAt,
            refreshToken: refreshed.refresh_token || token.refreshToken,
            idToken,
            idTokenExpiresAt: getIdTokenExpiryMs(idToken),
            error: undefined,
        }
    } catch (error) {
        console.error('Failed to refresh Google tokens:', error)
        return {
            ...token,
            idToken: null,
            id_token: null,
            idTokenExpiresAt: null,
            error: 'RefreshTokenError',
        }
    }
}

export const { handlers, signIn, signOut, auth} = NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        Google({
            authorization: {
                params: {
                    scope: 'openid email profile',
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        }),
    ],
    callbacks: {
        async jwt({token, account}){
            if (account?.id_token){
                token.idToken = account.id_token
                token.id_token = account.id_token
                token.idTokenExpiresAt = getIdTokenExpiryMs(account.id_token)
                token.accessToken = account.access_token
                token.accessTokenExpiresAt = account.expires_at ? account.expires_at * 1000 : null
                token.refreshToken = account.refresh_token || token.refreshToken
            }

            // Backward compatibility for sessions created before idToken naming fix.
            if (!token.idToken && token.id_token) {
                token.idToken = token.id_token
            }

            // Refresh shortly before expiry to avoid race where request uses stale token.
            const refreshWindowMs = 60 * 1000
            if (token.idTokenExpiresAt && Date.now() < token.idTokenExpiresAt - refreshWindowMs) {
                return token
            }

            if (token.refreshToken) {
                return refreshGoogleTokens(token)
            }

            return {
                ...token,
                idToken: null,
                id_token: null,
                idTokenExpiresAt: null,
                error: 'MissingRefreshToken',
            }
        },
        async session({token, session }){
            const idToken = token.idToken || token.id_token || null
            session.idToken = idToken
            session.id_token = idToken
            session.error = token.error
            return session
        }
    }
})