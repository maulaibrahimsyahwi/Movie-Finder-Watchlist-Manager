// src/components/UI/Footer.jsx - DIPERBARUI GAYA NETFLIX
import React from "react";

// Komponen helper untuk tautan di footer
function FooterLink({ href, text }) {
  return (
    <li className="mb-2">
      <a href={href} className="text-gray-400 hover:underline text-sm">
        {text}
      </a>
    </li>
  );
}

function Footer() {
  return (
    <footer className="mt-16 py-12 border-t border-gray-800">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        {/* Judul Kontak */}
        <p className="text-gray-400 mb-6">Ada pertanyaan? Hubungi kami.</p>

        {/* Grid Tautan */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          {/* Kolom 1 */}
          <ul>
            <FooterLink href="#" text="FAQ" />
            <FooterLink href="#" text="Hubungan Investor" />
            <FooterLink href="#" text="Ketentuan Penggunaan" />
            <FooterLink href="#" text="Hubungi Kami" />
          </ul>

          {/* Kolom 2 */}
          <ul>
            <FooterLink href="#" text="Pusat Bantuan" />
            <FooterLink href="#" text="Pekerjaan" />
            <FooterLink href="#" text="Privasi" />
            <FooterLink href="#" text="Uji Kecepatan" />
          </ul>

          {/* Kolom 3 */}
          <ul>
            <FooterLink href="#" text="Akun" />
            <FooterLink href="#" text="Tukar Kartu Hadiah" />
            <FooterLink href="#" text="Preferensi Cookie" />
            <FooterLink href="#" text="Informasi Perusahaan" />
          </ul>

          {/* Kolom 4 */}
          <ul>
            <FooterLink href="#" text="Pusat Media" />
            <FooterLink href="#" text="Cara Menonton" />
            <FooterLink href="#" text="Pemberitahuan Legal" />
          </ul>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500 mt-8">
          CinemaHub &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
