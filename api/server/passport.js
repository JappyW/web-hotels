import UserService from "./services/UserService"
import { util } from "./controllers/ResponseWrapper"
const passport = require("passport")
const JwtStrategy = require("passport-jwt").Strategy
const { ExtractJwt } = require("passport-jwt")
const LocalStrategy = require("passport-local").Strategy
const GooglePlusTokenStrategy = require("passport-google-plus-token")
const config = require("./src/config/config")
const EnumForAuthTypeAndRoles = require("./constants/EnumForAuthTypeAndRoles")
const STATUS = require("./constants/status.code.env.json")
const WRONGCREDENTIALS = "Credentials are wrong"
const EMAIL = "email"
const GOOGLETOKEN = "googleToken"
const AUTHORIZATION = "authorization"
const GOOGLEPASS = "g00GlePaSs"
// JSON WEB TOKENS STRATEGY
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader(AUTHORIZATION),
      secretOrKey: config.production.JWT_SECRET
    },
    async (payload, done) => {
      try {
        const user = await UserService.getUserById(payload.sub)

        if (!user) {
          return done(null, false)
        }

        done(null, user)
      } catch (error) {
        done(error, false)
      }
    }
  )
)

// Google OAuth Strategy
passport.use(
  GOOGLETOKEN,
  new GooglePlusTokenStrategy(
    {
      clientID: config.production.oauth.google.clientID,
      clientSecret: config.production.oauth.google.clientSecret,
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await UserService.getUserByEmail(
          profile.emails[0].value
        )
        if (existingUser) {
          const user = existingUser
          return done(null, user)
        }
        const user = await UserService.createUserRecord({
          email: profile.emails[0].value,
          password: GOOGLEPASS,
          authType: EnumForAuthTypeAndRoles.google,
          role: EnumForAuthTypeAndRoles.USER,
          activated: true,
          banned: false,
          authToken: null,
          imageProfile: ""
        })
        return done(null, user)
      } catch (error) {
        done(error, false, error.message)
      }
    }
  )
)
// LOCAL STRATEGY
passport.use(
  new LocalStrategy(
    {
      usernameField: EMAIL
    },
    async (email, password, done) => {
      try {
        const existingUser = await UserService.getUserByEmail(email)

        if (!existingUser) {
          return done(null, false)
        }

        const isMatch = await UserService.checkPassword(existingUser.password, password)

        if (!isMatch) {
          return done(null, false)
        }

        done(null, existingUser)
      } catch (error) {
        done(error, false)
      }
    }
  )
)
