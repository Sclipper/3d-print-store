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
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  title: {
    default: "Bemu | Премиум дизайни за вашия дом",
    template: "%s | Bemu",
  },
  description: "Премиум дизайни за вашия дом. Открийте уникални продукти с високо качество. Декорации, играчки и аксесоари, изработени с прецизност и грижа в България. Бърза доставка в цялата страна.",
  keywords: [
    "декорации за дома",
    "уникални подаръци",
    "ръчно изработени продукти",
    "българско производство",
    "дизайнерски аксесоари",
    "интериорен дизайн",
    "персонализирани продукти",
    "онлайн магазин България",
    "играчки",
    "фигурки",
    "декоративни елементи",
    "подаръци",
    "премиум продукти",
    "Bemu",
  ],
  authors: [{ name: "Bemu" }],
  creator: "Bemu",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: BASE_URL,
    siteName: "Bemu",
    title: "Bemu | Премиум дизайни за вашия дом",
    description: "Премиум дизайни за вашия дом. Открийте уникални продукти с високо качество. Декорации, играчки и аксесоари, изработени с прецизност и грижа в България. Бърза доставка в цялата страна.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Bemu - Премиум дизайни за вашия дом",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bemu | Премиум дизайни за вашия дом",
    description: "Премиум дизайни за вашия дом. Открийте уникални продукти с високо качество. Декорации, играчки и аксесоари, изработени с прецизност и грижа в България.",
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
        {/* Google Analytics */}
        {GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}');
                `,
              }}
            />
          </>
        )}
        {/* JSON-LD Structured Data */}
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
