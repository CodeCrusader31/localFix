"use client";

import { useState } from "react";
import { Calendar, MapPin, DollarSign, Clock, Check, X } from "lucide-react";

export default function RequestsPage() {
  const [filter, setFilter] = useState("all");
  
  const serviceRequests = [
    {
      id: 1,
      service: "Kitchen Sink Installation",
      client: "Sarah Johnson",
      date: "2023-10-25",
      time: "10:00 AM",
      location: "123 Main St, New York, NY",
      budget: 200,
      description: "Need help installing a new kitchen sink and connecting plumbing.",
      status: "pending",
      urgency: "medium"
    },
    {
      id: 2,
      service: "Bathroom Leak Repair",
      client: "Mike Wilson",
      date: "2023-10-26",
      time: "2:00 PM",
      location: "456 Oak Ave, Brooklyn, NY",
      budget: 150,
      description: "Leaking pipe under bathroom sink needs immediate attention.",
      status: "pending",
      urgency: "high"
    },
    {
      id: 3,
      service: "Water Heater Installation",
      client: "Emily Chen",
      date: "2023-10-27",
      time: "9:00 AM",
      location: "789 Pine St, Queens, NY",
      budget: 350,
      description: "Install new electric water heater in basement.",
      status: "accepted",
      urgency: "low"
    },
    {
      id: 4,
      service: "Drain Cleaning",
      client: "Robert Brown",
      date: "2023-10-24",
      time: "11:00 AM",
      location: "321 Elm St, Bronx, NY",
      budget: 120,
      description: "Kitchen drain is clogged and not draining properly.",
      status: "completed",
      urgency: "medium"
    }
  ];

  const filteredRequests = serviceRequests.filter(request => 
    filter === "all" || request.status === filter
  );

  const handleAccept = (requestId) => {
    // Handle accept logic
    console.log("Accept request:", requestId);
  };

  const handleDecline = (requestId) => {
    // Handle decline logic
    console.log("Decline request:", requestId);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Service Requests</h1>
        <p className="text-gray-600 mt-2">Manage incoming service requests from clients</p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: "all", name: "All Requests", count: serviceRequests.length },
              { id: "pending", name: "Pending", count: serviceRequests.filter(r => r.status === "pending").length },
              { id: "accepted", name: "Accepted", count: serviceRequests.filter(r => r.status === "accepted").length },
              { id: "completed", name: "Completed", count: serviceRequests.filter(r => r.status === "completed").length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  filter === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.name}
                <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{request.service}</h3>
                    <p className="text-gray-600 mt-1">{request.description}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    request.urgency === 'high' ? 'bg-red-100 text-red-800' :
                    request.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {request.urgency} priority
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{request.date} at {request.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{request.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span className="font-semibold text-gray-900">${request.budget}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Client: {request.client}</span>
                </div>
              </div>

              <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col space-y-2">
                {request.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleAccept(request.id)}
                      className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Accept
                    </button>
                    <button
                      onClick={() => handleDecline(request.id)}
                      className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Decline
                    </button>
                  </>
                )}
                {request.status === "accepted" && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    Accepted
                  </span>
                )}
                {request.status === "completed" && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No requests found</div>
          <p className="text-gray-500 mt-2">You're all caught up!</p>
        </div>
      )}
    </div>
  );
}