import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export default function Pagination({ currentPage, totalPages, onPageChange, loading = false }: PaginationProps) {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center space-x-4" data-testid="pagination">
      <button
        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === 1 || loading}
        onClick={() => onPageChange(currentPage - 1)}
        data-testid="pagination-previous"
      >
        <ChevronLeft className="w-4 h-4 mr-2 inline" />
        Previous
      </button>

      <div className="flex space-x-2">
        {visiblePages.map((page, index) => (
          typeof page === 'number' ? (
            <button
              key={page}
              className={`px-3 py-1 rounded transition-colors ${
                page === currentPage 
                  ? 'bg-cinema-blue text-white' 
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
              onClick={() => onPageChange(page)}
              disabled={loading}
              data-testid={`pagination-page-${page}`}
            >
              {page}
            </button>
          ) : (
            <span key={`dots-${index}`} className="px-3 py-1 text-gray-400">
              {page}
            </span>
          )
        ))}
      </div>

      <button
        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === totalPages || loading}
        onClick={() => onPageChange(currentPage + 1)}
        data-testid="pagination-next"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-2 inline" />
      </button>
    </div>
  );
}