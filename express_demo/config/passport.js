/*
 * @Author: vuvivian
 * @Date: 2020-04-06 22:19:55
 * @LastEditTime: 2020-04-06 23:00:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /express_demo/config/passport.js
 */

 const passportJwt = require('passport-jwt');
 const JwtStrategy = passportJwt.Strategy;
 const ExtractJwt = passportJwt.ExtractJwt;
 const mongoose = require('mongoose');
//  const User = mongoose.model('users');
const User = require('../models/User');

 let opts = {};
 opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
 opts.secretOrKey = 'secret';


 module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload,'jwt_payload')
       User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false)
                }
            })
            .catch(err => console.log(err))
   }));
 }