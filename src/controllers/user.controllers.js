import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import { uploadCloudinary } from "../utils/cloudinary.js"
import { upload } from "../middlewares/multer.middleware.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const registerUser = asyncHandler (async (req,res) => {
   //get user details from frontend
   //validation- not empty
   //checkif user already exist
   //check fr images, check for avtars
   //upload them in cloudinary
   //create user object - create entry in db
   //remove password and refresh token field from response
   //check for user creation
   //return res

    const {fullName, email, password, username} = req.body
    console.log("email: ", email);

    if(
        [fullName, email, username, password].some((field) => field?.trim()==="")
    ){
        throw new ApiError(400, "All fields are required")
    }

    User.findOne({
        $or: [{ username },{ email }]
    })

    if(existedUser) {
        throw new ApiError(409, "user with email or username already exist")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath) {
        throw new ApiError(400, 'avatar is required')
    }

     const avatar = await uploadCloudinary(avatarLocalPath)
     const coverImage = await uploadCloudinary(coverImageLocalPath)

     if(!avatar) {
        throw new ApiError(400, 'avatar is required')
     }

      const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url|| "",
        email,
        password,
        username: username.toLowerCase()
     })

     const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
     )

     if(!createdUser) {
        throw new ApiError(500, "Something went wrong while rwgistering the user")
     }

     return res.status(201).json(
        new ApiResponse(200, createdUser, "user Registered Successfully")
     )
} )



export {registerUser}