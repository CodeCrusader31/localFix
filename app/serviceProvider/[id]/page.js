// app/serviceProvider/[id]/page.js
export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Jobs */}
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800">Active Jobs</h2>
          <p className="text-gray-600 mt-2">You have 3 ongoing jobs</p>
        </div>

        {/* Earnings */}
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800">Earnings</h2>
          <p className="text-gray-600 mt-2">₹12,000 this month</p>
        </div>

        {/* Reviews */}
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800">Reviews</h2>
          <p className="text-gray-600 mt-2">⭐ 4.5 average rating</p>
        </div>
      </div>

      {/* Recent Requests */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Recent Requests</h2>
        <div className="bg-white shadow rounded-lg p-6">
          <ul className="divide-y divide-gray-200">
            <li className="py-3">
              <p className="font-medium text-gray-800">Fix leaking pipe</p>
              <p className="text-sm text-gray-500">From: Rahul Sharma · Pending</p>
            </li>
            <li className="py-3">
              <p className="font-medium text-gray-800">Install ceiling fan</p>
              <p className="text-sm text-gray-500">From: Anita Verma · Accepted</p>
            </li>
            <li className="py-3">
              <p className="font-medium text-gray-800">Electrical wiring check</p>
              <p className="text-sm text-gray-500">From: Sunil Gupta · Completed</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
