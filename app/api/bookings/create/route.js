import {NextResponse} from 'next/server';

import connectDB from "@/lib/config/db";
import Booking from "@/lib/models/Booking";
import User from "@/lib/models/User";
import {getUserFromCookies, getUserFromRequest} from "@/lib/utils/auth";

export async function POST(req){
    try{
        await connectDB();
        
        // Read token securely from cookies or fallback to headers
        let user = await getUserFromCookies();
        if (!user) {
            console.log("No user found in cookies, trying headers...");
            user = getUserFromRequest(req);
        }

        if(!user){
            return NextResponse.json({
                message: "Authentication required"},
                {status: 401}
            );
        }

        const body = await req.json();
        const providerId = body.providerId || body.ProviderId;
        const serviceType = body.serviceType || body.ServiceType;
        const scheduledAt = body.scheduledAt || body.scheduleAt;
        const {description} = body;

        if(!providerId || !serviceType || !scheduledAt){
            return NextResponse.json(
                {message: "providerId, serviceType and scheduledAt are required"},
                {status: 400}
            );
        }

        if (user.role !== "serviceNeeder") {
            return NextResponse.json(
                {message: "Only service needers can create bookings"},
                {status: 403}
            );
        }

        const provider = await User.findOne({
            _id: providerId,
            role: "serviceProvider",
        }).select("_id");

        if (!provider) {
            return NextResponse.json(
                {message: "Service provider not found"},
                {status: 404}
            );
        }

        const booking = new Booking({
            seekerId: user.id,
            providerId,
            serviceType,
            description,
            scheduledAt,
        });

        await booking.save();
        await booking.populate([
            { path: "seekerId", select: "fullName phone email address city state" },
            { path: "providerId", select: "fullName phone email city state serviceCategory" },
        ]);

        return NextResponse.json(
            {message: "Booking created successfully", booking},
            {status: 201}
        );
    }
    catch(error){
        console.error("Error creating booking:", error);
        return NextResponse.json(
            {message: "Failed to create booking"},
            {status: 500}
        );
    }
}
