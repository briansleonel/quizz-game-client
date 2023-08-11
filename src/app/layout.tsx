import "./globals.css";
import { Inter } from "next/font/google";
import { ProviderRedux } from "@/store/ProviderRedux";
import { TanStackQueryProvider } from "@/libs/TanStackQueryProvider";
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/layout/Container";
import ToasterSonner from "@/libs/sonner/ToasterSonner";

//import "rsuite/dist/rsuite.min.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Quizz Game",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body className={inter.className}>
                <div className="">
                    {/*<Toaster position="top-right" reverseOrder={false} />*/}
                    <ToasterSonner />
                    <TanStackQueryProvider>
                        <ProviderRedux>
                            <Navbar />
                            <Container>{children}</Container>
                        </ProviderRedux>
                    </TanStackQueryProvider>
                </div>
            </body>
        </html>
    );
}
