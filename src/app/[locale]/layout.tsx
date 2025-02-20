import '../../styles/global.css'; 
import { AuthProvider, ThemeProvider } from "@/contexts";
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: any;
}) {
    const { locale } = await params as { locale: 'es' | 'en'};
    if (!routing.locales.includes(locale)) { 
        notFound(); 
    }

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
                                <ThemeProvider>
                                    {children}
                                </ThemeProvider>
                        </AuthProvider>  
                    </NextIntlClientProvider>
                </main>
            </body>
        </html>
    );
}
