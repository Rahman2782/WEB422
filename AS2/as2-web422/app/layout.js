
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.css';

export const metadata = {
  title: 'Library Management', 
  description: 'A simple library management system built with Next.js.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}