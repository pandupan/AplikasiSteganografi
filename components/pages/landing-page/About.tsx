/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { itemShow } from '@/components/lib/animate'
import { Carousel } from 'flowbite-react';
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'


const About = () => {
  return (
    <section id="about" className='relative'>
      <div className='z-10'>
        <div className="absolute top-[10%] -right-[400px] w-[600px] h-1/2 aspect-video bg-colorfull-blue blur-[250px]" />
        <div className="absolute bottom-[10%] left-[-100px] h-[80%] w-[300px] aspect-video bg-colorfull-blue blur-[250px]" />
      </div>
      <div className='flex flex-wrap justify-evenly -mt-[10rem] container mx-auto h-auto'>
        <div className='flex items-center justify-center w-[250px] sm:w-[500px] md:w-1/4 lg:w-1/4 h-[650px] rounded-md sm:mt-[200px]'>
          <Carousel slideInterval={5000} >
            <img
              alt="..."
              src="https://i.postimg.cc/rwJ0C3V6/Whats-App-Image-2024-05-12-at-07-37-03.jpg"
              className='object-contain rounded-md'
            />
            <img
              alt="..."
              src="https://i.postimg.cc/YqVmCZrM/Whats-App-Image-2024-05-12-at-07-37-03-1.jpg"
              className='object-contain rounded-md'
            />
            <img
              alt="..."
              src="https://i.postimg.cc/s2d67BgH/Whats-App-Image-2024-05-12-at-07-37-01-3.jpg"
              className='object-contain rounded-md'
            />
          </Carousel>
        </div>
      
        <div className="px-4 py-4 sm:py-20 z-50">
          <div className="sm:container overflow-x-hidden">
            <h1 className="ml-2 sm:ml-0 text-xl sm:text-3xl md:text-5xl uppercase flex flex-col lg:max-h-[40px] lg:gap-2 lg:mt-[130px]">
            <motion.span
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className='font-semibold'
              >
                Introducing
              </motion.span>
              <motion.span
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                About <span className='font-bold text-blue-500'>AES ALGORITHM & LSB METHOD</span>
              </motion.span>
            </h1>
            <div
              className="max-w-[800px] mx-auto p-6 sm:px-8 sm:py-12 rounded-md bg-white border border-gray-600 mt-4 md:[90px] lg:mt-[120px]"
            >
              <h1 className="text-xl sm:text-2xl tracking-widest uppercase font-bold">Least Significant Bit</h1>
              <p className="sm:text-lg max-w-2xl mt-4 mb-6 text-left sm:text-justify">
                <span className="text-colorfull-blue font-semibold">LSB</span>  Merupakan metode steganografi yang umum digunakan untuk menyembunyikan pesan rahasia dalam gambar.<span className="text-blue-500 font-semibold">  Dalam metode ini, pesan disisipkan ke dalam gambar dengan memanfaatkan bit-bit terakhir  yang tidak signifikan dari nilai piksel.</span>Karena perubahan kecil pada nilai piksel umumnya tidak terlihat oleh mata manusia, pesan rahasia bisa disembunyikan tanpa mengurangi kualitas visual gambar secara signifikan.
              </p>
              <h1 className="text-xl sm:text-2xl tracking-widest uppercase font-bold">Advanced Encryption Standard</h1>
              <p className="sm:text-lg max-w-2xl mt-4 mb-6 text-left sm:text-justify">
                <span className="text-colorfull-blue font-semibold">AES</span>  Merupakan algoritma kriptografi yang sering digunakan untuk enkripsi dan dekripsi data. <span className="text-blue-500 font-semibold">   Dalam prosesnya, AES mengubah blok data menjadi blok data terenkripsi menggunakan kunci tertentu.</span>Proses enkripsi dan dekripsi melibatkan serangkaian langkah operasi, seperti SubBytes, ShiftRows, MixColumns, dan AddRoundKey. AES telah menjadi standar yang diakui secara internasional dan sering digunakan dalam berbagai aplikasi untuk melindungi data sensitif.
              </p>
              <Disclosure>              
                {({open}) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-base font-medium text-gray-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                      <span>Keamanan Tinggi.</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-blue-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-gray-500">
                    AES telah terbukti menjadi algoritma kriptografi yang sangat aman. Berdasarkan desain dan analisis yang ketat, AES memberikan tingkat keamanan yang tinggi terhadap berbagai serangan kriptografi yang diketahui saat ini. Ini termasuk serangan brute-force (mencoba semua kemungkinan kunci secara bergantian), serangan differensial, dan serangan linier. Dengan kata lain, bahkan dengan komputasi canggih, memecahkan enkripsi AES tanpa kunci yang benar menjadi sangat sulit.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 mb-2 text-left text-base font-medium text-gray-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                      <span>Kualitas Visual Gambar</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-blue-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-gray-500">
                    Metode Least Significant Bit (LSB) memungkinkan pengguna akan menyembunyikan pesan dalam gambar tanpa mengurangi kualitas visualnya. Pengguna tetap dapat menikmati gambar dengan jelas dan tanpa gangguan, sementara pesan rahasia tetap tersembunyi dengan aman.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure>              
                {({open}) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-base font-medium text-gray-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                      <span>Kombinasi Teknologi </span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-blue-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-gray-500">
                    Gabungan AES dan LSB membentuk solusi yang kuat dan inovatif untuk menyembunyikan pesan dalam gambar. Dengan menggabungkan keamanan tingkat tinggi dari AES dan efisiensi penyembunyian pesan dari LSB, aplikasi ini menawarkan solusi yang seimbang antara keamanan dan kualitas visual gambar yang optimal.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
