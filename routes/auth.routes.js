const {Router} = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const router = Router();
const config  = require('config');


// /api/auth/register
router.post(
    '/register',
    [
        check('email','Wrong email').isEmail(),
        check('password','Min length 6').isLength({min:6})
    ],
    async (req, res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors:errors.array(),
                message:"Wrong registration data"
            })
        }
        const {email, password}  = req.body;
        const candidate = await User.findOne({email:email});
        if (candidate) {
           return res.status(400).json({message:"user already exist"})
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const user = new User({email:email, password:hashPassword});
        await user.save();
        res.status(201).json({message:"User created"})
    }catch (e) {
        res.status(500).json({message: "Something going wrong"})
    }
});
// /api/auth/login
router.post(
    '/login',
    [
        check('email','Wrong email').normalizeEmail().isEmail(),
        check('password','Min length 6').exists().isLength({min:6})
    ],
    async (req, res)=>{
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors:errors.array(),
                    message:"Wrong login data"
                })
            }
            const {email, password}  = req.body;
            const user = await User.findOne({email});
            if (!user){
                return res.status(404).json({message:"User not found"})
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)  {
                return res.status(404).json({message:"Wrong password. Please try again"})
            }
            const token = jwt.sign(
                    {userId:user.id},
                    config.get('jwtSecret'),
                    { expiresIn: '1h' }
                );
            res.json({token, userId:user.id, message:"User login success"})
        }catch (e) {
            res.status(500).json({message: "Something going wrong"})
        }

});

module.exports =  router;