import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import  jwt  from "jsonwebtoken";

export const AuthController = {
    generateAccessToken: (data)=>{
        const accessToken= jwt.sign(
            data,
            process.env.JWT_ACCESS_KEY,
            {expiresIn:"10s"}
            )
        return accessToken
    },

    generateRefreshToken: (data)=>{
        const accessToken= jwt.sign(
            data,
            process.env.JWT_ACCESS_KEY,
            {expiresIn:"7d"}
            )
        return accessToken
    },

    RegisterUser: async (req, res) => {
        try {
            const salt =await bcrypt.genSalt(10);
            const hash =await bcrypt.hash(req.body.password, salt);
            console.log(hash)
            const newUser = await new User({
                username: req.body.username,
                password: hash,
                email: req.body.email
            });
            console.log(newUser)
            const user = await newUser.save();
            console.log("Success")
            res.status(200).json(user)

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }

    },

    LoginUser: async (req, res) => {
        try {
            console.log(req.body.username)
            const user = await User.findOne({username:req.body.username});
            if(!user){
                console.log("Không tìm thấy")
                return res.status(404).json("Sai tên đăng nhập/mật khẩu")
            }
            const auth = await bcrypt.compare(req.body.password,user.password)
            if(auth){
                const data = {
                    id:user.id,
                    role:user.role
                };
                const accessToken = AuthController.generateAccessToken(data);
                const refreshToken = AuthController.generateRefreshToken(data);
                const {password, ...rest} = user._doc;
                res.cookie("token", refreshToken, {
                    httpOnly:true,
                    secure: false,
                    sameSite:"strict"
                })
                return res.status(200).json({
                    ...rest,
                    accessToken,
                    refreshToken
                })
            }
            return res.status(404).json("Sai tên đăng nhập/mật khẩu")

        } catch (error) {
            console.log(error)
            return res.status(500).json("Lỗi đăng nhập")
        }
    },

    RefreshToken:async(req,res)=>{
        try {
            const refreshToken = req.cookies?.token;
            if(!refreshToken){
                return res.status(401).json("Bạn chưa có token")
            }

            jwt.verify(refreshToken,process.env.JWT_ACCESS_KEY,(err,user)=>{
                if(err){
                    console.log("Lỗi:"+err)
                    res.status(500).json(err)
                }
                else{
                    const {iat,exp,...data} = user;
                    const newAccessToken = AuthController.generateAccessToken(data);
                    const newRefreshToken = AuthController.generateRefreshToken(data);
                    res.cookie("token", newRefreshToken, {
                        httpOnly:true,
                        secure: true,
                        sameSite:"strict"
                    })
                    res.status(200).json({accessToken:newAccessToken});
                }
                    
            })

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    
    LoadUsers: async (req, res) => {
        try {
            console.log("Load users")
            const listUser= await User.find();
            res.status(200).json(listUser)
            
        } catch (error) {
            res.status(500).json(error)
        }
    },

    LoginWithAccessToken: async (req, res)=> {
        try {
            const token = req.headers.token;
            if (token) {
                const accessToken = token.split(" ")[1];
                jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                    if (err) {
                        res.status(403).json("Token is not valid");
                    }
                    req.user = user
                })
            } else {
                res.status(401).json("Bạn không có token");
            }
        } catch (error) {
            res.status(500).json("Lỗi xác thực")
        }
    }
}