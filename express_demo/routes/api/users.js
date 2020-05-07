/*
 * @Author: vuvivian
 * @Date: 2020-04-06 18:22:53
 * @LastEditTime: 2020-04-06 23:02:58
 * @LastEditors: Please set LastEditors
 * @Description: 新建登陆和注册接口
 * @FilePath: /express_demo/routes/api/users.js
 */

const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/login', (req, res) => {
    const  {email, password} = req.body;
    // 查询email是否存在， 如果存在校验密码, 不存在的话return
    User.findOne({email})
        .then(user => {
            if(!user) {
                return res.status(401).json({email: "该用户不存在"})
            } else{
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            // jwt.sign("规则","加密名字","过期时间","箭头函数")
                            const rule = {id: user.id, name:user.name};
                            jwt.sign(rule,"secret",{expiresIn: 3600},(err, token) =>{
                                if (err) throw err;
                                return res.json({
                                    success: true,
                                    token: "Bearer " + token
                                })
                            })
                        } else {
                            return res.status(400).json({password: "密码错误"})
                        }
                    })
            }
        })
});

router.post('/register', (req, res) => {
    console.log(req.body);
    // 查询数据库中是否拥有邮箱
    User.findOne({email: req.body.email})
        .then((user) => {
            if(user){
                return res.status(400).json({email: "邮箱已被注册"});
            } else {
                const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
                let newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    password: req.body.password,
                    avatar,
                });
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, function(err, hash) {
                        // Store hash in your password DB.
                        if (err) throw err;

                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))

                    });
                });
            }
        })
});

router.get('/current',passport.authenticate("jwt", {session: false}), (req, res) => {
   res.json({
       id:req.user.id,
       name: req.user.name,
       email: req.user.email
   });
})

module.exports = router;