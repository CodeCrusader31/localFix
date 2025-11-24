"use client";

import { useState } from "react";
import { Star, MapPin, Calendar, CheckCircle, MessageCircle, Settings, DollarSign, Users, Clock } from "lucide-react";
import Link from "next/link";

export default function ServiceProviderDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    totalJobs: 42,
    completedJobs: 38,
    pendingRequests: 5,
    earnings: 2450,
    rating: 4.8,
    responseTime: "1-2 hours"
  });
  
  const [recentJobs, setRecentJobs] = useState([
    { id: 1, title: "Plumbing Repair", client: "John Smith", date: "2023-10-15", status: "Completed", amount: 120 },
    { id: 2, title: "Electrical Wiring", client: "Sarah Johnson", date: "2023-10-18", status: "In Progress", amount: 200 },
    { id: 3, title: "AC Installation", client: "Mike Williams", date: "2023-10-20", status: "Scheduled", amount: 350 },
    { id: 4, title: "Appliance Repair", client: "Emma Davis", date: "2023-10-22", status: "Pending", amount: 90 },
  ]);
  
  const [serviceRequests, setServiceRequests] = useState([
    { id: 101, service: "Carpentry Work", client: "Robert Brown", date: "2023-10-23", budget: 150 },
    { id: 102, service: "Painting Service", client: "Lisa Wilson", date: "2023-10-24", budget: 300 },
    { id: 103, service: "Furniture Assembly", client: "David Miller", date: "2023-10-25", budget: 80 },
  ]);

  const quickActions = [
    { icon: Users, label: "View Requests", href: "/serviceProvider/request", color: "blue" },
    { icon: DollarSign, label: "Earnings", href: "/serviceProvider/earning", color: "green" },
    { icon: MessageCircle, label: "Messages", href: "/serviceProvider/messages", color: "purple" },
    { icon: Settings, label: "Profile", href: "/serviceProvider/profile", color: "gray" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header Section */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">JD</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-700 font-medium">{stats.rating}</span>
                    </div>
                    <span className="mx-2 text-gray-400">•</span>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="ml-1">New York, NY</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <Link 
                  href="/serviceProvider/profile"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Link>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="mt-6 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: "overview", name: "Overview" },
                  { id: "services", name: "My Services" },
                  { id: "requests", name: "Service Requests" },
                  { id: "schedule", name: "Schedule" },
                  { id: "earnings", name: "Earnings" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center space-x-3"
            >
              <div className={`p-2 rounded-lg bg-${action.color}-100`}>
                <action.icon className={`h-6 w-6 text-${action.color}-600`} />
              </div>
              <span className="font-medium text-gray-900">{action.label}</span>
            </Link>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Jobs</dt>
                    <dd className="text-lg font-semibold text-gray-900">{stats.totalJobs}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Completed</dt>
                    <dd className="text-lg font-semibold text-gray-900">{stats.completedJobs}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending Requests</dt>
                    <dd className="text-lg font-semibold text-gray-900">{stats.pendingRequests}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                  <span className="text-lg font-bold text-purple-600">$</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Earnings</dt>
                    <dd className="text-lg font-semibold text-gray-900">${stats.earnings}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Jobs */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Jobs</h3>
                <Link href="/serviceProvider/request" className="text-sm text-blue-600 hover:text-blue-500">
                  View all
                </Link>
              </div>
              <div className="divide-y divide-gray-200">
                {recentJobs.map((job) => (
                  <div key={job.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-md font-medium text-gray-900">{job.title}</h4>
                        <p className="mt-1 text-sm text-gray-500">Client: {job.client}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          job.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          job.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          job.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {job.status}
                        </span>
                        <span className="mt-1 text-sm font-medium text-gray-900">${job.amount}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-sm text-gray-500">{job.date}</span>
                      <button className="text-sm text-blue-600 hover:text-blue-500 flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Service Requests */}
          <div>
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Service Requests</h3>
                <Link href="/serviceProvider/request" className="text-sm text-blue-600 hover:text-blue-500">
                  View all
                </Link>
              </div>
              <div className="divide-y divide-gray-200">
                {serviceRequests.map((request) => (
                  <div key={request.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-md font-medium text-gray-900">{request.service}</h4>
                        <p className="mt-1 text-sm text-gray-500">Client: {request.client}</p>
                      </div>
                      <span className="text-sm font-medium text-gray-900">${request.budget}</span>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-sm text-gray-500">{request.date}</span>
                      <div className="flex space-x-2">
                        <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                          Accept
                        </button>
                        <button className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition-colors">
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Schedule */}
            <div className="bg-white shadow rounded-lg mt-8">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Today's Schedule</h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">AC Installation</p>
                      <p className="text-sm text-gray-500">Mike Williams</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">10:00 AM</p>
                      <p className="text-xs text-gray-500">2 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Appliance Repair</p>
                      <p className="text-sm text-gray-500">Emma Davis</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">2:00 PM</p>
                      <p className="text-xs text-gray-500">1 hour</p>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 text-center text-sm text-blue-600 hover:text-blue-500 py-2">
                  View Full Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}