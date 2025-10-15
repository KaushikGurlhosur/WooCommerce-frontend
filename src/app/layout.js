import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "WooCommerce Product Viewer",
  description: "View WooCommerce products via API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
