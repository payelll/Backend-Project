import mongoose, {Schema} from mongoose;

const likeSchema = new Schema(
    {
       video: {
        type: Schema.Types.ObjectId,
        ref:"Videos"
       },
       likedBy: {
        type: Schema.Types.ObjectId,
        ref:"User"
       },
       tweet: {
        type: Schema.Types.ObjectId,
        ref:"Tweet"
       },
       comment: {
        type: Schema.Types.ObjectId,
        ref:"Comment"
       }
    },
    {
        timestamps: true
    }
)


export const Like = mongoose.model("Like",likeSchema)