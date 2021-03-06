const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');
// const { use } = require('../routes/userRouter');

const createTokenSendCookie = function(id, req, res){

    const token =  jwt.sign({ id }, 'MY-SECOND-WEB-APP-NOTES-HOSTED-AT-CREATEWEBNOTE@HEROKU')
    res.cookie('jwt', token, { /*
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 *  1000),*/
        httpOnly: true,
        secure: req.secure /*|| req.headers('x-forwarded-proto') === 'https'*/
    });
    return token
}



exports.signUp = async (req, res, next) => {
    try{
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        }
    
        const data = await User.create(user);

        if(!data){
            throw new Error('Something went wrong')
        }

        const token = createTokenSendCookie(data._id, req, res)

        

        res.status(201).json({
            status: 'success',
            token,
            data
        })
        next();
    }catch(err){
        console.log(err)
        
        res.status(401).json({
            status:"fail",
            error: err.stack
        })
    }
    
};

exports.updateUser = async (req, res, next) => {
    try{

        const data = {
            name : req.body.name,
            email : req.body.email
        }

        if(!data){
            throw new Error('Something went wrong')
        }

        const user = await User.findByIdAndUpdate(req.body.id, data ,{new: true, runValidators: true})

        res.status(201).json({
            status: 'success',
            user
        })

        next();

    }catch(err){
        console.log(err)
        
        res.status(401).json({
            status:"fail",
            error: err.stack
        })
    }
    
};

exports.logIn = async (req, res, next) => {
    try{
        const {email, password} = req.body ;

        if(!email || !password){
            throw new Error('Provide email and password')
        }
        
        const user = await User.findOne({email}).select('+password');

        if(!user){
            throw new Error('User does not exist')
        }

        const checkPass = await user.correctPassword(password, user.password)
    
        if(!checkPass){
            throw new Error('Invalid password')
        }

        const token = createTokenSendCookie(user._id, req, res)

        res.status(200).json({
            status: "success",
            token
        })

        next();

    }catch(err){
        if('ValidationError' in err){
            console.log('---------------------------------')
        }
        console.log(err.stack)
        
        res.status(401).json({
            status:"fail",
            error: err
        })
        
    }
    
};

exports.isLoggedIn = async (req, res, next) => {
    if(req.cookies.jwt){
        try{
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, 'MY-SECOND-WEB-APP-NOTES-HOSTED-AT-CREATEWEBNOTE@HEROKU');

            const freshUser = await User.findById(decoded.id);

            if(!freshUser){
                return next();
            }

            res.locals.user = freshUser;
            
        }catch(err){
            return next()
        }
    }

    next()
};

exports.logout = (req, res, next) => {
    
    res
        .cookie('jwt', 'loggedout', {  
            expires: new Date(Date.now() + 5 * 1000),
            httpOnly: true
        })
        .status(200)
        .json({ status: 'success' });

    next()
}