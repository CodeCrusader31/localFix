import {NextResponse} from 'next/server';

import connectDB from "@/lib/config/db";
import Booking from "@/lib/models/Booking";
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
        const {ProviderId, ServiceType, description, scheduleAt} = body;

        if(!ProviderId || !ServiceType || !scheduleAt){
            return NextResponse.json(
                {message: "ProviderId, ServiceType and scheduleAt are required"},
                {status: 400}
            );
        }

        // Match BookingSchema fields:
        // - providerId (not ProviderId)
        // - serviceType (not ServiceType)
        // - scheduledAt (not scheduleAt)
        const booking = new Booking({
            seekerId: user.id,
            providerId: ProviderId,
            serviceType: ServiceType,
            description,
            scheduledAt: scheduleAt,
        });

        await booking.save();
        return NextResponse.json(
            {message: "Booking created successfully", booking},
            {status: 201}
        );
    }
    catch(error){
        console.error("Error creating booking:", error);
    }
}