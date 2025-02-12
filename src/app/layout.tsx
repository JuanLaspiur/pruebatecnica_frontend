import '../styles/global.css'; 
import { AuthProvider } from "@/contexts/authcontext";
import { LanguageProvider } from '@/contexts/languageContext';
import { ThemeProvider } from '@/contexts/themeContext';
export const metadata = {
    title: "To do",
    description: "To do list ",
    author: "Juan Laspiur",
  };
export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
          <main> 
            <AuthProvider>
              <LanguageProvider>
                <ThemeProvider>
                  {children}
                </ThemeProvider>
              </LanguageProvider>
            </AuthProvider>
          </main>
        </body>
      </html>
    )
  };