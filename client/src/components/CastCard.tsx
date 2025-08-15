import { CastMember } from '@/types/movie';
import { getImageUrl } from '@/services/tmdbApi';

interface CastCardProps {
  castMember: CastMember;
}

export default function CastCard({ castMember }: CastCardProps) {
  return (
    <div className="text-center" data-testid={`cast-card-${castMember.id}`}>
      <img 
        src={getImageUrl(castMember.profile_path, 'w200')} 
        alt={castMember.name}
        className="w-full h-32 object-cover rounded-lg shadow-lg mb-3"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://via.placeholder.com/200x200/1e293b/ffffff?text=No+Photo';
        }}
      />
      <h4 className="font-semibold text-sm" data-testid={`cast-name-${castMember.id}`}>
        {castMember.name}
      </h4>
      <p className="text-gray-400 text-xs" data-testid={`cast-character-${castMember.id}`}>
        {castMember.character}
      </p>
    </div>
  );
}
