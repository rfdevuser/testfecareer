"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import TickerWrapper from '../Assests/ticker';
import Link from 'next/link';
import { MY_TICKER } from '@/utils/gql/GQL_QUERIES';
import { useApolloClient, useQuery } from '@apollo/client'; // Import useApolloClient


const Hero = () => {
  
  return (
    <>
   <div>
        <div className="bg-hero  w-full h-full text-black max-h-550px bg-white transform  origin-top overflow-hidden z-0">
        <div className='flex justify-center bg-[#831843] text-white'> 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝒕𝒐 𝑹𝑨𝑲𝑯𝑰𝑺 𝑭𝑨𝑺𝑯𝑰𝑶𝑵𝑺, 𝒘𝒉𝒆𝒓𝒆 𝒆𝒗𝒆𝒓𝒚 𝒔𝒕𝒊𝒕𝒄𝒉 𝒕𝒆𝒍𝒍𝒔 𝒂 𝒔𝒕𝒐𝒓𝒚 𝒐𝒇 𝒆𝒍𝒆𝒈𝒂𝒏𝒄𝒆 𝒂𝒏𝒅 𝒄𝒉𝒂𝒓𝒎.
        </div> 
      
      <div className=' bg-[#831843] z-0   '>
      <div className='relative z-10 flex flex-rows  justify-center items-center sm:flex-row sm:justify-center gap-5 '>
        <Link href="https://www.onati-global.com/"><Image
          alt='Onati Global'
          src="/logos/OGtrans.png"
          height={50}
          width={50}
          className='z-10  sm:mb-0 bg-white'
          loading='lazy'
        />
        </Link>
       <Link href="https://www.rebblebee.com/"> <Image
          alt='Rebblebee'
          src="/logos/RB_KIDS.png"
          height={50}
          width={50}
          className='z-10  sm:mb-0'
          loading='lazy'
        />
        </Link>
       <Link href="https://www.wetailor4u.com/"><Image
          alt='wetailor4u'
          src="/logos/wetailor4u.png"
          height={50}
          width={50}
          className='z-10  sm:mb-0'
          loading='lazy'
        />
        </Link> 
       <Link href="https://www.ogiftbangalore.com/"> <Image
          alt='ogift'
          src="/logos/OGIFT.jpg"
          height={50}
          width={50}
          className='z-10  sm:mb-0'
          loading='lazy'
        />
           </Link>
      </div>
   
      </div>
      <div className='flex justify-center flex-col'>
    <div className='-mt-16'> <TickerWrapper /></div> 
    <div className='' style={{ 
        backgroundImage: `url('/background/bg.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}>
      <div className='absolute text-center w-30'>  𝒘𝒆 𝒃𝒆𝒍𝒊𝒆𝒗𝒆 𝒊𝒏 𝒇𝒐𝒔𝒕𝒆𝒓𝒊𝒏𝒈 𝒂 𝒄𝒖𝒍𝒕𝒖𝒓𝒆 𝒐𝒇 𝒄𝒓𝒆𝒂𝒕𝒊𝒗𝒊𝒕𝒚, 𝒊𝒏𝒏𝒐𝒗𝒂𝒕𝒊𝒐𝒏, 𝒂𝒏𝒅 𝒅𝒆𝒅𝒊𝒄𝒂𝒕𝒊𝒐𝒏. 𝑾𝒆 𝒂𝒓𝒆 𝒑𝒂𝒔𝒔𝒊𝒐𝒏𝒂𝒕𝒆 𝒂𝒃𝒐𝒖𝒕 𝒄𝒓𝒆𝒂𝒕𝒊𝒏𝒈 𝒆𝒙𝒄𝒆𝒑𝒕𝒊𝒐𝒏𝒂𝒍 𝒇𝒂𝒔𝒉𝒊𝒐𝒏 𝒆𝒙𝒑𝒆𝒓𝒊𝒆𝒏𝒄𝒆𝒔 𝒕𝒉𝒂𝒕 𝒓𝒆𝒔𝒐𝒏𝒂𝒕𝒆 𝒘𝒊𝒕𝒉 𝒐𝒖𝒓 𝒄𝒖𝒔𝒕𝒐𝒎𝒆𝒓𝒔 𝒘𝒐𝒓𝒍𝒅𝒘𝒊𝒅𝒆. 𝑨𝒔 𝒘𝒆 𝒄𝒐𝒏𝒕𝒊𝒏𝒖𝒆 𝒕𝒐 𝒈𝒓𝒐𝒘, 𝒘𝒆 𝒂𝒓𝒆 𝒍𝒐𝒐𝒌𝒊𝒏𝒈 𝒇𝒐𝒓 𝒕𝒂𝒍𝒆𝒏𝒕𝒆𝒅 𝒊𝒏𝒅𝒊𝒗𝒊𝒅𝒖𝒂𝒍𝒔 𝒘𝒉𝒐 𝒔𝒉𝒂𝒓𝒆 𝒐𝒖𝒓 𝒗𝒊𝒔𝒊𝒐𝒏 𝒂𝒏𝒅 𝒗𝒂𝒍𝒖𝒆𝒔 𝒕𝒐 𝒋𝒐𝒊𝒏 𝒐𝒖𝒓 𝒕𝒆𝒂𝒎.
      </div></div>
      
      <div className='relative z-10  mt-90 flex items-center justify-center' style={{ 
        backgroundImage: `url('/background/hero2.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height:500,
 
        zIndex: 0,
      }}>
        
      <Image
          src="/logos/rf.png"
          alt='logo'
          height={600}
          width={600}
          className='z-100 -mt-20 shadow-xd '
          style={{ opacity: 5 ,    zIndex: 10 }} 
          loading='lazy'
          
        />
        </div>
      </div>
      </div>
      </div>
     
    </>
  );
}

export default Hero;
