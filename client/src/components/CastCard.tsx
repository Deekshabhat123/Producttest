import { CastMember } from '../types/movie';
import { getImageUrl } from '../services/tmdbApi';

interface CastCardProps {
  castMember: CastMember;
}

export default function CastCard({ castMember }: CastCardProps) {
  return (
    <div className="cast-card text-center" data-testid={`cast-card-${castMember.id}`}>
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={getImageUrl(castMember.profile_path, 'w185')} 
          alt={castMember.name}
          className="w-full h-32 sm:h-40 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/185x278/1e293b/ffffff?text=No+Photo';
          }}
          data-testid={`cast-photo-${castMember.id}`}
        />
      </div>
      
      <div className="p-3">
        <h4 
          className="font-semibold text-white text-sm mb-1 line-clamp-1" 
          data-testid={`cast-name-${castMember.id}`}
        >
          {castMember.name}
        </h4>
        <p 
          className="text-gray-400 text-xs line-clamp-2"
          data-testid={`cast-character-${castMember.id}`}
        >
          {castMember.character}
        </p>
      </div>
    </div>
  );
}