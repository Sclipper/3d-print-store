import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers";
import { getCategories } from "@/lib/airtable";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://bemu.bg';

export const metadata: Metadata = {
  title: {
    default: "Bemu | Премиум 3D принтирани продукти",
    template: "%s | Bemu",
  },
  description: "Премиум дизайни за вашия дом. Открийте уникални 3D принтирани продукти с високо качество.",
  keywords: ["3D принтиране", "3D printed", "дизайн", "декорация", "България", "Bemu"],
  authors: [{ name: "Bemu" }],
  creator: "Bemu",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: BASE_URL,
    siteName: "Bemu",
    title: "Bemu | Премиум 3D принтирани продукти",
    description: "Премиум дизайни за вашия дом. Открийте уникални 3D принтирани продукти с високо качество.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Bemu - Премиум 3D принтирани продукти",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bemu | Премиум 3D принтирани продукти",
    description: "Премиум дизайни за вашия дом. Открийте уникални 3D принтирани продукти с високо качество.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "theme-color": "#ffffff",
  },
};

// Organization JSON-LD schema
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Bemu",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  sameAs: [],
};

// WebSite JSON-LD schema for search
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Bemu",
  url: BASE_URL,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch categories for header navigation
  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  try {
    categories = await getCategories();
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }

  return (
    <html lang="bg">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header categories={categories} />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
