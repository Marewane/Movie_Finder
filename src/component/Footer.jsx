export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-4 bg-white shadow-md flex justify-center items-center">
      <p className="text-gray-600 text-sm">
        &copy; {currentYear} Movie Finder. All rights reserved.
      </p>
    </footer>
  );
}
