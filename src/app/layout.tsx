import '../styles/global.css'; 
import { AuthProvider, LanguageProvider, ThemeProvider } from "@/contexts";

export const metadata = {
    title: "To-do",
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
         <head>
          <link rel="icon" type="image/png" sizes="32x32" href="/logo/logo.png"  />
        </head>
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