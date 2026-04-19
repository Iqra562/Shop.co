function LoadingComponent() {
  return (
    <div className="rounded-2xl shadow overflow-hidden p-6">        
        <div className="animate-pulse flex flex-col gap-4">
            <div className="flex items-center gap-4">
              
                <div className="flex flex-col gap-2 w-full">
                    <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/12"></div>
                </div>
            </div>
        </div>
          <div className="flex justify-end mt-4">
            
          </div>

    </div>
  );
}

export default LoadingComponent;