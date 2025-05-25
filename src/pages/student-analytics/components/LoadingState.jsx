import React from "react";

const LoadingState = ({ type = "metrics" }) => {
  if (type === "metrics") {
    return (
      <div className="animate-pulse">
        {/* Metrics Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-border p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-gray-200 h-12 w-12 rounded-lg"></div>
                <div className="bg-gray-200 h-6 w-16 rounded"></div>
              </div>
              <div className="bg-gray-200 h-4 w-24 rounded mb-2"></div>
              <div className="bg-gray-200 h-8 w-20 rounded"></div>
            </div>
          ))}
        </div>

        {/* Chart Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border border-border p-4 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="bg-gray-200 h-6 w-40 rounded"></div>
            <div className="bg-gray-200 h-8 w-48 rounded mt-2 sm:mt-0"></div>
          </div>
          <div className="h-80 bg-gray-100 rounded animate-pulse"></div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border border-border p-4">
          <div className="bg-gray-200 h-6 w-40 rounded mb-4"></div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-surface">
                <tr>
                  {[...Array(4)].map((_, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 text-left"
                    >
                      <div className="bg-gray-200 h-4 w-24 rounded"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-border">
                {[...Array(5)].map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
                        <div className="ml-4">
                          <div className="bg-gray-200 h-4 w-32 rounded"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="bg-gray-200 h-4 w-24 rounded"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 max-w-[100px]"></div>
                        <div className="bg-gray-200 h-4 w-8 rounded"></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="bg-gray-200 h-4 w-20 rounded"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingState;