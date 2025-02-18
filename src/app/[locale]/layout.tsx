import '../../styles/global.css'; 
import { AuthProvider, LanguageProvider, ThemeProvider } from "@/contexts";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export const metadata = {
    title: "To-do",
    description: "To do list",
    author: "Juan Laspiur",
};

export default async function Layout({
    children,
    params
}: {
    children: React.ReactNode;
    params: any;
}) {
    // Ensure locale exists in routing locales
    const { locale } = await params;
    if (!routing.locales.includes(locale as any)) {
        notFound(); // Handle missing locale
    }

    // Fetch the messages for the given locale
    const messages = await getMessages({ locale });

    return (
        <html lang={locale}>
            <head>
                <link rel="icon" type="image/png" sizes="32x32" href="/logo/logo.png" />
            </head>
            <body>
                <main>
                    <NextIntlClientProvider locale={locale} messages={messages}>
                        <AuthProvider>
                            <LanguageProvider>
                                <ThemeProvider>
                                    {children}
                                </ThemeProvider>
                            </LanguageProvider>
                        </AuthProvider>  
                    </NextIntlClientProvider>
                </main>
            </body>
        </html>
    );
}
