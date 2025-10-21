import mongoose, {Schema} from mongoose;
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videosSchema = new Schema(
    {
        videoFile: {
            type: String,
            required: true,
        },
         thumbnail: {
            type: String,
            required: true,
        },
         description: {
            type: String,
            required: true,
        },
         duration: {
            type: Number,
            required: true,
        },
         views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.objectId,
            ref: "User"
        }    
    },
    {
        timestamps: true
    }
)

videosSchema.plugin(mongooseAggregatePaginate)

export const Videos = mongoose.model("Videos",videosSchema)