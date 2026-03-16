import { Cairo } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { PublicRouteTransition } from "@/components/layout/PublicRouteTransition";

const cairo = Cairo({ 
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  display: "swap",
  variable: "--font-cairo",
});

export const metadata = {
  title: "كيان بورد | لوحة تحكم سحابية ذكية",
  description: "حول بياناتك إلى قرارات ذكية مع كيان بورد",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.variable} ${cairo.className} bg-white dark:bg-[#060B14] transition-colors duration-300 min-h-screen relative`}>
        <ThemeProvider>
          <ToastProvider>
            <PublicRouteTransition />
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
