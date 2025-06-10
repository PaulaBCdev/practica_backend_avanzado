import session from 'express-session'
import MongoStore from 'connect-mongo'

const INACTIVITY_EXPIRATION_2_DAYS = 1000 * 60 * 60 * 24 * 2

export const middleware = session({ 
    name: 'nodeapp-session',
    secret: 'KxxSU=b-Q+[yBL-YR&N7?tW3',
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: INACTIVITY_EXPIRATION_2_DAYS },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/nodepop'
    }) 
})

export function useSessionInViews(req, res, next) {
    res.locals.session = req.session
    next()
}

export function guard(req, res, next) {
    if (!req.session.userId) {
        res.redirect(`/login?redir=${req.url}`)
        return
    }
    next()
}