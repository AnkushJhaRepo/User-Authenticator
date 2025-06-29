
export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">User Profile</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <p className="text-slate-600 text-sm font-medium mb-2">User ID</p>
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold shadow-md">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm-2 5V6a2 2 0 114 0v1H8z"
                  clipRule="evenodd"
                />
              </svg>
              {id}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              Edit Profile
            </button>
            <button className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
