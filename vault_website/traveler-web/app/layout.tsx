import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Traveler Guide",
  description: "Discover hidden places and amazing views",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white">
        {/* This puts the Navbar at the very top of every page */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}