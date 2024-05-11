'use client'
import React, { useState, useEffect } from 'react';
var CryptoJS = require("crypto-js");

export default function Test() {
  const [message, setMessage] = useState<string>("Hello, world!");
  const [key, setKey] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [view, setView] = useState<Uint8Array | null>(null);
  const [clampedArray, setClampedArray] = useState<ImageData | null>(null);
  const [modifiedImageSrc, setModifiedImageSrc] = useState<string | null>(null);

  const validateHex = (input: string) => {
    const hexRegex = /^[0-9A-Fa-f]+$/g;
    return hexRegex.test(input);
  };

  useEffect(() => {
    setKey(CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex));
  }, []);

  useEffect(() => {
    AESAlgorithm();
  }, [message, key]);

  useEffect(() => {
    if (view && clampedArray) {
      hideData(result, clampedArray);
    }
  }, [result, clampedArray]);

  const AESAlgorithm = () => {
    setError("");
    if (!key) {
      setError("Key harus diisi.");
      setResult("");
      return;
    }

    if (!validateHex(key)) {
      setError("Key harus dalam format heksadesimal.");
      setResult("");
      return;
    }

    try {
      const ciphertext = CryptoJS.AES.encrypt(
        message,
        CryptoJS.enc.Hex.parse(key),
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      ).ciphertext.toString(CryptoJS.enc.Hex);
      setResult(ciphertext);
    } catch (error) {
      setError("Terjadi kesalahan saat melakukan enkripsi.");
      setResult("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleGenerateKey = () => {
    setKey(CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.error('File not found');
      return;
    }

    const fr = new FileReader();

    fr.onload = function(loadEvent) {
      if (loadEvent.target) {
        const arrayBuffer = loadEvent.target.result;
        setView(new Uint8Array(arrayBuffer as ArrayBuffer));
      }
    };

    fr.readAsArrayBuffer(file);
  };

  const hideData = (encryptedMessage: string, imageData: ImageData) => {
    let newIndex = 0;

    for (let i = 0, length = encryptedMessage.length; i < length; i++) {
      let asciiCode = encryptedMessage.charCodeAt(i);
      let first2bit = asciiCode & 0x03;
      let first4bitMiddle = (asciiCode & 0x0C) >> 2;
      let first6bitMiddle = (asciiCode & 0x30) >> 4;
      let first8bitMiddle = (asciiCode & 0xC0) >> 6;

      replaceByte(imageData, first2bit, newIndex);
      replaceByte(imageData, first4bitMiddle, newIndex);
      replaceByte(imageData, first6bitMiddle, newIndex);
      replaceByte(imageData, first8bitMiddle, newIndex);

      newIndex++;
    }

    setClampedArray(imageData);
    updateModifiedImage(imageData);
  };

  const replaceByte = (imageData: ImageData, bits: number, index: number) => {
    let byteIndex = index * 4;
    let byteValue = imageData.data[byteIndex];
    byteValue = (byteValue & 0xFC) | bits;
    imageData.data[byteIndex] = byteValue;
  };

  const updateModifiedImage = (imageData: ImageData) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Canvas context not found');
      return;
    }

    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.putImageData(imageData, 0, 0);

    setModifiedImageSrc(canvas.toDataURL());
  };

  return (
    <div id="projects" className="w-full min-h-full flex flex-col justify-center items-center">
      <h1 className="text-3xl sm:text-3xl md:text-5xl uppercase flex flex-col lg:max-h-[150px] gap-2 mb-4 sm:mb-8">
        AES
      </h1>
      <div className="p-6 w-1/2 max-w-full mx-auto bg-blue-300 bg-opacity-25 backdrop-filter backdrop-blur-lg border border-blue-300 rounded-lg shadow-xl">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Masukan Pesan
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
            placeholder="Enter message to encrypt/decrypt"
            style={{ height: "100px" }}
            value={message}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Masukan Kunci (16-byte hexadecimal)
          </label>
          <div className="flex items-center">
            <textarea
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
              placeholder="Enter Key in 16-byte hexadecimal format"
              style={{ height: "100px" }}
              value={key}
              readOnly // Disable editing of key
            />
            <button className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded ml-2 transition duration-300 ease-in-out transform hover:scale-105" onClick={handleGenerateKey}>
              Generate Key
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Hasil Enkripsi
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
            placeholder="Encrypted result"
            readOnly
            style={{ height: "100px" }}
            value={result}
          />
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="flex items-center justify-center w-full">
            <label
              title="imagedrop"
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <img
                alt="Uploaded Image"
                className="mb-2"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                src={view ? URL.createObjectURL(new Blob([view])) : ''}
              />
              <div className={`flex flex-col items-center justify-center pt-5 pb-6`}>
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
<div className="flex items-center justify-center w-full">
  <div className="w-full h-64 border-2 border-gray-300 bg-gray-50 border-dashed rounded-lg bg-cover bg-center">
    {clampedArray && (
      <img
        alt="Modified Image"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
        src={URL.createObjectURL(new Blob([clampedArray.data], { type: 'image/png' }))}
      />
    )}
  </div>
</div>

        </div>
        <div className="flex justify-center">
          <button className="bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 transition duration-300 ease-in-out transform hover:scale-105">
            Hide Data
          </button>
        </div>
      </div>
    </div>
  );
}
