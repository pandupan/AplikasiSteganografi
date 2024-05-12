/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from 'react';
var CryptoJS = require("crypto-js");

const Test = () => {
  const [plaintext, setPlaintext] = useState('');
  const [secretKey, setSecretKey] = useState(
    CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex)
  );
  const [lsbSecretData, setLsbSecretData] = useState('');
  const [lsbCoverImage, setLsbCoverImage] = useState<File | null>(null);
  const [lsbHiddenImage, setLsbHiddenImage] = useState<string>('');
  const [lsbDecodedData, setLsbDecodedData] = useState<string>('');
  const [decryptionKey, setDecryptionKey] = useState<string>('');
  const [error, setError] = useState<string>('');

  const validateHex = (input: string) => /^[0-9A-Fa-f]+$/g.test(input);

  useEffect(() => {
    if (plaintext) {
      aesEncrypt();
    }
  }, [plaintext]); 


  const generateSecretKey = () => {
    const newKey = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
    setSecretKey(newKey);
  };

  const aesEncrypt = () => {
    if (!secretKey || !plaintext) return;

    if (!validateHex(secretKey)) {
      return;
    }

    try {
      const ciphertext = CryptoJS.AES.encrypt(
        plaintext,
        CryptoJS.enc.Hex.parse(secretKey),
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      ).ciphertext.toString(CryptoJS.enc.Hex);
      setLsbSecretData(ciphertext);
    } catch (error) {
      console.error("Error while encrypting:", error);
    }
  };

  const lsbEncrypt = () => {
    if (!lsbSecretData || !lsbCoverImage) {
      alert('Masukkan data rahasia dan pilih gambar penutup.');
      return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          console.error('Canvas context is null');
          return;
        }
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let dataIndex = 0;
        for (let i = 0; i < lsbSecretData.length; i++) {
          const charCode = lsbSecretData.charCodeAt(i);
          for (let j = 0; j < 8; j++) {
            const bit = (charCode >> j) & 1;
            // Mengatur bit terakhir dari nilai RGB untuk menyembunyikan pesan
            data[dataIndex] = (data[dataIndex] & 0xFE) | bit;
            dataIndex += 4; // Melompati setiap komponen warna (R, G, B, A)
          }
        }

        ctx.putImageData(imageData, 0, 0);
        setLsbHiddenImage(canvas.toDataURL());
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(lsbCoverImage);
  };

  const handleLoadImage = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            console.error('Canvas context is null');
            return;
          }
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          let decodedMessage = '';
          let charCode = 0;
          let dataIndex = 0;
          for (let i = 0; i < lsbSecretData.length; i++) {
            charCode = 0;
            for (let j = 0; j < 8; j++) {
              // Mendapatkan bit terakhir dari setiap nilai RGB
              const bit = data[dataIndex] & 1;
              charCode |= bit << j;
              dataIndex += 4; // Melompati setiap komponen warna (R, G, B, A)
            }
            decodedMessage += String.fromCharCode(charCode);
          }
          setLsbDecodedData(decodedMessage);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadImage = () => {
    if (!lsbHiddenImage) {
      alert('Tidak ada gambar tersembunyi yang dapat diunduh.');
      return;
    }

    const link = document.createElement('a');
    link.href = lsbHiddenImage;
    link.download = 'hidden_image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const decryptAES = () => {
    setError("");
    if (!decryptionKey || !lsbDecodedData) {
      setError("Key dan ChiperText harus diisi.");
      setLsbDecodedData("");
      return;
    }

    if (!validateHex(decryptionKey)) {
      setError("Key harus dalam format heksadesimal.");
      setLsbDecodedData("");
      return;
    }

    try {
      const bytes = CryptoJS.AES.decrypt(
        { ciphertext: CryptoJS.enc.Hex.parse(lsbDecodedData) },
        CryptoJS.enc.Hex.parse(decryptionKey),
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      );
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      setLsbDecodedData(originalText);
    } catch (error) {
      setError("Terjadi kesalahan saat melakukan dekripsi.");
      setLsbDecodedData("");
    }
  };

  return (
<div id="projects" className="flex flex-col gap-10 justify-center items-center">
  {/* Card 1 */}
  <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-1/2 mr-4">
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Encryption</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Plaintext</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
          value={plaintext}
          placeholder="Enter message to encrypt"
          onChange={(e) => setPlaintext(e.target.value)}
          style={{ height: "100px" }}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Secret Key (16-byte hexadecimal)</label>
        <div className="flex items-center">
          <textarea
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
            value={secretKey}
            placeholder="Enter Key in 16-byte hexadecimal format"
            onChange={(e) => {
              setSecretKey(e.target.value);
              if (!validateHex(e.target.value)) {
                console.error("Key must be in hexadecimal format.");
              }
            }}
            style={{ height: "100px" }}
            readOnly
          />
          <button
            className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded ml-2 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={generateSecretKey}
          >
            Generate Key
          </button>
        </div>
      </div>
    </div>
    <form className="mb-4">
      <label htmlFor="lsbSecretData" className="block mb-2">Enter secret data:</label>
      <input id="lsbSecretData" type="text" value={lsbSecretData} onChange={(e) => setLsbSecretData(e.target.value)} placeholder="Enter secret data" className="border border-gray-300 rounded-md py-2 px-3 mb-2" />
      <br />
      <label htmlFor="lsbCoverImage" className="block mb-2">Choose a cover image:</label>
      <input id="lsbCoverImage" type="file" onChange={(e) => setLsbCoverImage(e.target.files?.[0] || null)} accept="image/*" className="mb-2" />
      <button type="button" onClick={lsbEncrypt} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Hide Data into Image</button>
    </form>
    {lsbHiddenImage && (
      <div>
        <img src={lsbHiddenImage} alt="Hidden Image" className="mt-4 mb-2" width={200} height={200} />
        <button type="button" onClick={handleDownloadImage} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Download Hidden Image</button>
      </div>
    )}
  </div>
  {/* Card 2 */}
  <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-1/2">
    <h2 className="text-xl font-semibold mb-4">Decryption</h2>
    <form>
      <label htmlFor="hiddenImage" className="block mt-4 mb-2">Select an image with hidden data:</label>
      <input id="hiddenImage" type="file" onChange={handleLoadImage} accept="image/*" className="mb-2" />
      <button type="button" onClick={handleLoadImage} className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600">Load Hidden Image</button>
    </form>
    {lsbDecodedData && (
      <div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Decryption Key (16-byte hexadecimal)</label>
          <input
            className="border border-gray-300 rounded-md py-2 px-3 mb-2"
            type="text"
            value={decryptionKey}
            placeholder="Enter Key in 16-byte hexadecimal format"
            onChange={(e) => {
              setDecryptionKey(e.target.value);
              if (!validateHex(e.target.value)) {
                console.error("Key must be in hexadecimal format.");
              }
            }}
          />
        </div>
        <h2 className="mt-4 mb-2">Decoded Message:</h2>
        <p>{lsbDecodedData}</p>
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={decryptAES}
        >
          Decrypt Message
        </button>
      </div>
    )}
  </div>
</div>

  );
};

export default Test;
