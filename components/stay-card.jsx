"use client"
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState } from 'react';
import Image from 'next/image';
import { HomeIcon, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const StayCard = ({ stay }) => {
  const [isSaved, setIsSaved] = useState(stay.isWishlisted || false);
  const router = useRouter();

  const handleToggleSave = () => {
    setIsSaved(prev => !prev);
  };

  return (
   <Card
  onClick={() => {
    router.push(`/stays/${stay.id}`);
  }}
  className="cursor-pointer overflow-hidden hover:shadow-lg transition group border border-gray-300"
>

        
      <div className="relative h-44">
        {stay.images && stay.images.length > 0 ? (
          <Image
            src={stay.images[0]}
            alt={stay.location}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <HomeIcon className="h-12 w-12 text-gray-400" />
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 bg-white/90 rounded-full p-1.5 ${
            isSaved
              ? "text-red-500 hover:text-red-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={handleToggleSave}
        >
          <Heart fill={isSaved ? 'red' : 'none'} />
        </Button>
      </div>

      <CardContent className="">
        <div className="flex flex-col">
          <h3 className="text-lg font-bold line-clamp-1">{stay.title}</h3>
          <span className="text-xl font-bold text-blue-600">
            ₹{stay.price.toLocaleString()} for one night
          </span>
        </div>

        <div className="text-gray-600">
          <span>{stay.guests} guests</span>
          <span className="mx-2"></span>
          <span>{stay.bhk}BHK</span>
         
        </div>

       
      </CardContent>
    </Card>
  );
};
