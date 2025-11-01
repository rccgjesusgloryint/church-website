import Link from "next/link";

export default function NotFound() {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 text-center px-4">
      {/* 404 Icon / Emoji */}
      <div className="text-7xl md:text-8xl font-extrabold text-gray-300 select-none animate-pulse">
        404
      </div>

      {/* Title */}
      <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-800">
        Oops! Page Not Found
      </h2>

      {/* Description */}
      <p className="mt-2 text-gray-600 max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Return Button */}
      <Link
        href="/"
        className="mt-6 inline-block bg-black text-white px-6 py-2.5 rounded-md text-sm font-medium shadow hover:shadow-lg hover:bg-gray-800 transition-all duration-300"
      >
        Go Back Home
      </Link>

      {/* Subtle decorative line */}
      <div className="mt-10 w-24 h-1 bg-gray-300 rounded-full" />
    </section>
  );
}
