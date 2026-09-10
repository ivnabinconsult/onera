import "./globals.css";

export const metadata = {
  title: "On3ra — Future Innovations",
  description: "Run your whole business from one place: projects, content, analytics, and your website.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
