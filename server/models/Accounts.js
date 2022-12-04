import mongoose from "mongoose";
import Inc from "mongoose-sequence";  
const AutoIncrement = Inc(mongoose);


const AccounstSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    gameName: {
        type: String,
        required: true,
    },
    paymentAmount: {
        type: String,
        required: false,
    },
    currency: {
        type: String,
        required: false,
    },
    payment: {
        type: String,
        required: false,
    },
    paymentData: {
        type: String
    }
}, 
    { timestamps: true},

)
AccounstSchema.plugin(AutoIncrement, {inc_field: 'acc_id'});

export default mongoose.model("Accounts", AccounstSchema)