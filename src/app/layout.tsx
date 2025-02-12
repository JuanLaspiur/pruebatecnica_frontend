import '../styles/global.css'; 
import { AuthProvider } from "@/contexts/authcontext";
import { LanguageProvider } from '@/contexts/languageContext';
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
                {children}
              </LanguageProvider>
            </AuthProvider>
          </main>
        </body>
      </html>
    )
  };