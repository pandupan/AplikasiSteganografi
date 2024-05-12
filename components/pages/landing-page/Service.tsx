'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Modal, Card } from 'flowbite-react';

const Service = () => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  
  // State untuk menentukan apakah Card sedang dalam mode "show more" atau "show less"
  const [showMore, setShowMore] = useState<Array<boolean>>([false, false, false]);

  // Fungsi untuk mengubah status showMore pada indeks tertentu
  const toggleShowMore = (index: number) => {
    const newShowMore = [...showMore];
    newShowMore[index] = !newShowMore[index];
    setShowMore(newShowMore);
  };

  return (
    <section id="services" className='container mx-auto relative w-full h-full'>
      <div className='z-10'>
        <div className="absolute top-[40%] left-[35%] w-[200px] h-1/2 aspect-video bg-colorfull-purple blur-[250px]" />
        <div className="absolute top-[40%] left-0 w-[200px] h-1/2 aspect-video bg-colorfull-purple blur-[250px]" />
        <div className="absolute top-[40%] right-0 w-[200px] h-1/2 aspect-video bg-colorfull-purple blur-[250px]" />
      </div>
      <div className='flex flex-col justify-center items-center w-full h- py-20'>
        <div className="container flex justify-center items-center mb-10">
          <h1 className="text-xl sm:text-3xl md:text-5xl uppercase flex flex-col gap-y-2 text-center">
            <motion.span
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='font-semibold'
            >
              Our Algorithm
            </motion.span>
            <motion.span
              initial={{ y: -50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Is All YOU <span className='font-bold text-blue-500'>NEED</span>
            </motion.span>
          </h1>
        </div>

        <div className="flex justify-around flex-col md:flex-row flex-wrap items-center gap-[50px] h-full">
          {[0, 1, 2].map((index) => (
            <div key={index} className={`m-6 sm:m-0 max-w-[300px] max-h-full z-[50] shadow-[0_3px_10px_rgb(0,0,0,0.2)] ${showMore[index] ? 'h-full' : ''}`}>
              <Card
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                imgSrc="/images/secure.jpg"
                className="h-full"
              >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <p>
                    {index === 0 ? 'Enkripsi Pesan dengan AES' : index === 1 ? 'Sembunyikan Pesan dalam Gambar dengan LSB' : ' Dekripsi pesan dengan Advanced Encryption Standard (AES)'}
                  </p>
                </h5>
                <p className={`font-normal text-gray-700 dark:text-gray-400 ${showMore[index] ? '' : 'line-clamp-3 lg:line-clamp-5'}`}>
                  {index === 0 ? 'Tahapan utama dalam AES melibatkan inisialisasi kunci, putaran (rounds), dan operasi pada blok data. Pertama, kunci enkripsi diinisialisasi sesuai dengan panjang kunci yang dipilih, seperti 128-bit, 192-bit, atau 256-bit. Kemudian, proses putaran terdiri dari empat tahap: SubBytes, ShiftRows, MixColumns, dan AddRoundKey. SubBytes menggantikan setiap byte dengan byte dari tabel substitusi S-box, sementara ShiftRows merandomisasi data dengan menggeser baris-baris dalam blok. MixColumns mengubah kolom-kolom menggunakan operasi perkalian matriks, dan AddRoundKey menggabungkan blok data dengan kunci putaran. Proses putaran berulang hingga jumlah putaran selesai, menghasilkan tingkat keamanan yang tinggi sambil mempertahankan efisiensi operasional yang baik. Dengan demikian, AES menggabungkan langkah-langkah ini untuk mengamankan data dan melindungi informasi sensitif.' : index === 1 ? 'Metode Least Significant Bit (LSB) dalam steganografi gambar melibatkan beberapa tahapan.  Proses dimulai dengan memilih piksel-piksel dari gambar yang akan digunakan sebagai tempat untuk menyisipkan pesan rahasia. Selanjutnya, pesan rahasia diubah menjadi urutan bit (binary), dan setiap bit dari pesan tersebut disisipkan secara berurutan ke dalam LSB dari saluran warna (red, green, blue) pada piksel yang dipilih. Proses ini berulang hingga seluruh pesan tersembunyi telah disisipkan. Jika jumlah bit pesan melebihi kapasitas gambar, perlu dilakukan rekonsiliasi. Akhirnya, gambar hasil yang telah dimodifikasi dengan pesan rahasia disimpan untuk distribusi atau penyimpanan lebih lanjut.' : 'Standard (AES) dalah proses mengembalikan pesan yang telah dienkripsi kembali ke bentuk aslinya menggunakan kunci dekripsi yang sesuai.  ahapan-tahapan ini mencakup inisialisasi kunci dekripsi yang sesuai, penggunaan kunci putaran yang dihasilkan secara terbalik, dan serangkaian tahap putaran yang meliputi InverseSubBytes, InverseShiftRows, InverseMixColumns, dan AddRoundKey. Proses ini diulangi secara terbalik hingga tahap terakhir selesai, dan pesan yang telah dienkripsi dapat dipulihkan ke bentuk aslinya. Dekripsi AES memastikan bahwa pesan yang dihasilkan setelah dekripsi identik dengan pesan aslinya sebelum dienkripsi.'}
                </p>
                <button type="button" onClick={() => toggleShowMore(index)} className="place-self-end text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 my-2">
                  {showMore[index] ? 'Show Less' : 'Read More'}
                </button>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
