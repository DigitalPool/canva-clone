const express = require('express');
const cors = require('cors')
const helmet = require('helmet')
const dotenv = require('dotenv')
const proxy = require('express-http-proxy')
const authMiddleware = require('./middleware/auth-middleware');

dotenv.config()

const PORT = process.env.PORT || 5500
const app = express()

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id', 'x-user-email', 'x-user-name'],
}

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//first configure the proxy

const proxyOptions = {
    proxyReqPathResolver: (req) => {
        return req.originalUrl.replace(/^\/v1/, "/api")
    },
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        // Ensure downstream services always receive verified user identity headers.
        if (srcReq.user?.userId) {
            proxyReqOpts.headers['x-user-id'] = srcReq.user.userId
        }
        if (srcReq.user?.email) {
            proxyReqOpts.headers['x-user-email'] = srcReq.user.email
        }
        if (srcReq.user?.name) {
            proxyReqOpts.headers['x-user-name'] = srcReq.user.name
        }
        return proxyReqOpts
    },
    proxyErrorHandler:((err, res, next) => 
        res.status(500).json({
            message: 'internal Server Error',
            error: err.message
        })
    )     
}

const uploadProxyOptions = {
    ...proxyOptions,
    parseReqBody: false,
    proxyReqPathResolver: (req) => {
        return req.originalUrl.replace(/^\/v1\/(?:media|upload)/, "/api/media")
    },
}

//Design Service
app.use('/v1/designs',
    authMiddleware,
    proxy(process.env.DESIGN,{
        ...proxyOptions,
    })
)

// Upload Service
// Support both legacy `/v1/upload/*` and current `/v1/media/*` client paths.
app.use('/v1/media',
    authMiddleware,
    proxy(process.env.UPLOAD, uploadProxyOptions)
)

app.use('/v1/upload',
    authMiddleware,
    proxy(process.env.UPLOAD, uploadProxyOptions)
)

//subscription Service

app.use('/v1/subscription', 
    authMiddleware,
    proxy(process.env.SUBSCRIPTION, {
        ...proxyOptions,
        parseReqBody: true,
    })
)

app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
  console.log(`DESIGN Service is running on port ${process.env.DESIGN}`);
  console.log(`UPLOAD Service is running on port ${process.env.UPLOAD}`);
  console.log(`SUBSCRIPTION Service is running on port ${process.env.SUBSCRIPTION}`)
})
