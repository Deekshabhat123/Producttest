interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = "Loading..." }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16" data-testid="loading-spinner">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-600 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-cinema-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-300 text-lg">{message}</p>
    </div>
  );
}