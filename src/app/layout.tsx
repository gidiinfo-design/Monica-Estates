import type { Metadata } from "next";
import { Pinyon_Script, Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const pinyonScript = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Monica Estates — Industrial & Institutional Real Estate | Noida, Greater Noida, Dholera",
  description:
    "44 years of Clients First. Monica Estates specialises in industrial, institutional, IT and office properties in Noida, Greater Noida, Yamuna Expressway and Dholera. Contact Tushar Dewan today.",
  keywords:
    "Monica Estates, industrial real estate Noida, institutional property Greater Noida, Yamuna Expressway land, Dholera Smart City, Tushar Dewan, factory warehouse, office space Noida",
  openGraph: {
    title: "Monica Estates — 44 Years of Industrial Real Estate Excellence",
    description:
      "Your Industrial Real Estate Advisor. Industrial, institutional, IT and office properties in Noida, Greater Noida, Yamuna Expressway and Dholera.",
    url: "https://monica-estates.vercel.app",
    siteName: "Monica Estates",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monica Estates — Industrial Real Estate",
    description:
      "44 years of Clients First. Industrial, institutional, IT and office properties.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "google-site-verification": "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pinyonScript.variable} ${cormorant.variable} ${jost.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "Monica Estates",
              description:
                "Industrial and institutional real estate agents in Noida, Greater Noida, Yamuna Expressway and Dholera. 44 years of Clients First.",
              url: "https://monica-estates.vercel.app",
              telephone: "+919891075222",
              founder: {
                "@type": "Person",
                name: "Tushar Dewan",
                jobTitle: "Your Industrial Real Estate Advisor",
              },
              areaServed: [
                { "@type": "City", name: "Noida" },
                { "@type": "City", name: "Greater Noida" },
                { "@type": "Place", name: "Yamuna Expressway" },
                { "@type": "Place", name: "Dholera" },
              ],
              foundingDate: "1982",
              slogan: "Clients First",
            }),
          }}
        />
      </head>
      <body className="bg-bg-primary text-off-white antialiased">
        {children}
      </body>
    </html>
  );
}
