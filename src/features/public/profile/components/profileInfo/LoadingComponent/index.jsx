function LoadingComponent() {
  return (
    <div className="rounded-2xl shadow overflow-hidden p-4">        
        <div className="animate-pulse flex items-center gap-4">
            <div                        
            className="w-14 h-14 p-5 rounded-full bg-gray-300 text-white
                    flex items-center justify-center text-xl font-bold uppercase"   
            >
            </div>
            <div className="flex flex-col gap-2 w-full">
                <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
        </div>
    </div>
  );
}

export default LoadingComponent;