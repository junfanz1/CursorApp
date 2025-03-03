import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Junfan AI',
  description: 'Junfan AI API Management',
};

const globalStyles = {
  body: {
    margin: 0,
    padding: 0,
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#f5f5f5'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={globalStyles.body}>
        {children}
      </body>
    </html>
  );
}
