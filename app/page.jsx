import { Button } from "@/components/ui/button";
import Link from "next/link";
import HomeSearch from "@/components/home-search";
import { mostpopular, staycity , faqItems} from "@/lib/data";
import { StayCard } from "@/components/stay-card";
import Image from "next/image";
import { Calendar, House, Shield } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  return (
    <div > 

      {/* search section */}

  <section className="relative py-16 md:py-28 dotted-background bg-amber-100" >

               <div className="max-w-4xl mx-auto text-center">

                <div className="mb-8">
                  
                  <h1 className="text-2xl md:text-3xl mb-4 gradient-title">
              Discover your dream vacation stay with the power of  Smart Finder.</h1>

                
                </div>

                {/*SEARCH*/}
                <HomeSearch/>
              </div>




            </section>


      {/* Most Popular */}

        <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Most Popular Stays</h2>
            <Button variant="ghost" className="flex items-center">
              <Link href="/booked">
                View All 
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {mostpopular.map((stay) =>(
             <StayCard key={stay.id} stay={stay} />
           ) )}
          </div>
        </div>
      </section>



      {/* browse by city */}



<section className="py-12 bg-gray-200">
  <div className="container mx-auto px-4 " >
    <h2 className="text-2xl font-bold mb-6">Browse by City</h2>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {staycity.map((city) => (
        <Link
          key={city.name}
          href={`/stay?city=${city.name}`}
          className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition cursor-pointer"
        >
          {/* 👇 Image Wrapper */}
          <div className="relative w-full h-28 mb-3">
            <Image
              src={city.imageUrl || `/city/${city.name.toLowerCase()}.jpg`}
              alt={city.name}
              fill
              className="rounded-md object-cover"
            />
          </div>

        </Link>
      ))}
    </div>
  </div>
</section>





      {/* why choose us */}


         <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">
            Why Choose Our Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <House className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Thousands of verified Stays from trusted hosts and
                private admins.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Book a Stay online in minutes , With easy  check-in and check-out details.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Process</h3>
              <p className="text-gray-600">
                Verified listings and secure booking process for peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ */}

             <section className="py-12  bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-white">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-white">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-300">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

    </div>
  );
}
