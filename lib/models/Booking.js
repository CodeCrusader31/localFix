import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
    {
        seekerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required: true,
        },

        providerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required: true,
        },

        serviceType: {
            type: String,
            required: true,
        },

        description:{
            type: String,

        },

        scheduledAt: {
            type: Date,
            required: true,
        },

        status: {
            type: String,
            enum: [
                "PENDING",
                "ACCEPTED",
                "REJECTED",
                "IN_PROGRESS",
                "COMPLETED",
                "CANCELLED",
            ],
            default: "PENDING",
        },

        paymentStatus: {
            type: String,
            enum: ["PENDING", "PAID", "FAILED"],
            default: "PENDING",
        },
    },
    { timestamps: true}
);

export default mongoose.models.Booking ||
    mongoose.model('Booking', BookingSchema);