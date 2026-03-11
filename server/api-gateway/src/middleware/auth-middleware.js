const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function authMiddleware(req, res, next) {
    // Browsers send unauthenticated OPTIONS preflight requests before actual calls.
    if (req.method === 'OPTIONS') {
        return next()
    }

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({error: "Access denied No Token provided"})
    }
    
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            expectedAudience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()

    //add user info to req.user

    req.user = {
        userId: payload['sub'],
        email: payload['email'],
        name: payload['name']
    }

    //Add this userID to headers for downstream services

    req.headers['x-user-id'] = payload['sub']

    //optional
    req.headers['x-user-email'] = payload['email']
    req.headers['x-user-name'] = payload['name']

    next()
        
    } catch (error) {
        const message = error?.message || 'Token verification failed'
        console.log(`Token verification failed: ${message}`)
        res.status(401).json({
            error: 'Invalid Token',
            message,
        })
    }
}

module.exports = authMiddleware