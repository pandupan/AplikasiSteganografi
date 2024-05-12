import About from '@/components/pages/landing-page/About'
import Project from '@/components/pages/landing-page/Project'
import Contact from '@/components/pages/landing-page/Contact'
import Hero from '@/components/pages/landing-page/Hero'
import Service from '@/components/pages/landing-page/Service'


export default function Home() {
  return (
      <>      
            <Hero 
                  heading='"Dalam era teknologi yang terus berkembang, perlindungan data sensitif menjadi prioritas utama. Melalui aplikasi Steganografi AES-LSB, gabungan antara enkripsi AES dan penyembunyian pesan LSB, kami menjaga kerahasiaan data dengan kuat, meminimalkan risiko kebocoran informasi dalam dunia yang penuh dengan ancaman siber."' 
                  message='~Steganografi Project'
            />
            <About/>
            <Service/>
            <Project/>
            <Contact/>
      </>
  )
}

