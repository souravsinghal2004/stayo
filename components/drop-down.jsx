// components/CityDropdown.jsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const cities = [
  {
    name: "Goa",
    description: "Beaches & Nightlife",
    color: "text-yellow-600",
  },
  {
    name: "Jaipur",
    description: "The Pink City & Hawa Mahal",
    color: "text-pink-600",
  },
  {
    name: "Manali",
    description: "Snow & Adventure",
    color: "text-blue-600",
  },
  {
    name: "Shimla",
    description: "Hill Station Charm",
    color: "text-green-600",
  },
  {
    name: "Darjeeling",
    description: "Tea Gardens & Toy Train",
    color: "text-emerald-600",
  },
  {
    name: "Sikkim",
    description: "Monasteries & Mountains",
    color: "text-indigo-600",
  },
  {
    name: "Ladakh",
    description: "Cold Desert & Pangong Lake",
    color: "text-orange-600",
  },
  {
    name: "Rishikesh",
    description: "Yoga & River Rafting",
    color: "text-teal-600",
  },
  {
    name: "Udaipur",
    description: "Lakes & Royal Palaces",
    color: "text-purple-600",
  },
  {
    name: "Andaman",
    description: "Scuba Diving & Islands",
    color: "text-cyan-600",
  },
  {
    name: "Agra",
    description: "Home of the Taj Mahal",
    color: "text-red-600",
  },
  {
    name: "Varanasi",
    description: "Spiritual Ghats & Temples",
    color: "text-yellow-700",
  },
  {
    name: "Nainital",
    description: "Lakes & Green Hills",
    color: "text-lime-600",
  },
  {
    name: "Mysore",
    description: "Palaces & Culture",
    color: "text-rose-600",
  },
  {
    name: "Mumbai",
    description: "City of Dreams & Bollywood",
    color: "text-gray-700",
  },
];

export default function CityDropdown() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 px-5 bg-white border border-gray-300 rounded-full flex justify-between items-center shadow-sm hover:shadow-md"
      >
        <span className="text-left">
          {selectedCity ? (
            <>
              <div className={cn("font-bold", selectedCity.color)}>
                {selectedCity.name}
              </div>
              <div className="text-sm text-gray-500 -mt-1">
                {selectedCity.description}
              </div>
            </>
          ) : (
            <span className="text-gray-500">Choose Your City...</span>
          )}
        </span>
        <ChevronDown className="w-5 h-5 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-80 overflow-y-auto">
          {cities.map((city) => (
            <button
              key={city.name}
              onClick={() => {
                setSelectedCity(city);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-100"
            >
              <div className={cn("font-bold", city.color)}>{city.name}</div>
              <div className="text-sm text-gray-500">{city.description}</div>
            </button>
          ))}
        </div>
      )}

      {selectedCity && (
        <div className="mt-4 text-center">
          <Button className="rounded-full px-6 py-2 bg-white  hover:bg-gray-900">
           <span className={cn("font-semibold", selectedCity.color)}>
              Search {selectedCity.name}
            </span>
          </Button>
        </div>
      )}
    </div>
  );
}