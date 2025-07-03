import React from 'react';
import { Button } from './ui/button';
import { Heart , calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { mostpopular } from '@/lib/data';
import { SignedIn, SignedOut , SignInButton , SignOutButton   } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import { checkUser } from '@/lib/checkuser';

const Header = async () => {
const user = await checkUser();

  const isAdmin = user?.role === "ADMIN";
  const isAdminPage = false;
  return (
    <div className='fixed top-0 w-full bg-white grid grid-cols-2 items-center px-6 py-3 shadow z-50'>
     
    <Link href={"/"} className="flex items-center space-x-6">
 <Image
  src="/logo.jpg"
  alt="Stayo Logo"
  width={340}              
  height={60}
  className="max-h-14 w-auto object-contain"  
/>

   
  
</Link>
      
      <div className='flex justify-end items-center gap-4'>
       
        <Link href="/booked">
          <Button
          className="border-black text-white bg-green-700"
          variant="outline">
          Booked</Button>
        </Link>


         <Link href="/favourites">
           <Button className="border-black text-white bg-red-700" variant="outline">
            <Heart/>
            Favourites</Button>
         </Link>

             <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-20 h-20",
                },
              }}
            />
          </SignedIn>

           <SignedOut>
            {!isAdminPage && (
              <SignInButton forceRedirectUrl="/">
                <Button variant="outline">Login</Button>
              </SignInButton>
            )}
          </SignedOut>
        
      </div>
    </div>
  );
};

export default Header;
