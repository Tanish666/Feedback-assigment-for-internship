import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <head>
        <title>FeedBack swiper</title>
      </head>
      <body
        className= {`antialiased bg-[#F7F8F9]  scrollbar scrollbar-white`}
      >
        {children}
      </body>
    </html>
  );
}

