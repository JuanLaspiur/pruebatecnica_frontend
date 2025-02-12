import '../styles/global.css'; 
import { AuthProvider } from "../contexts/authcontext";
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
          <main> <AuthProvider>{children}</AuthProvider></main>
        </body>
      </html>
    )
  }