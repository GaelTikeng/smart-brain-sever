const User = require("../models/user");
const passportJwt = require("passport-jwt");
const passport = require("passport");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;

passport.use(
  new StrategyJwt({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
    secretOrKey: process.env.MY_SECRET_KEY,
  }, async (jwtPayLoad, done) => {
    try {
      const user = await User.findOne({ where: { id: jwtPayLoad.id } });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
  )
);
