import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <DocumentMagnifyingGlassIcon className="h-64 w-64 text-indigo-600/20" />

      <h1 className="text-3xl text-center mt-2 text-black font-bold mb-5">
        Welcome to the Amazon Web Scraper
      </h1>

      <h2 className="text-lg italic text-center text-black/50">
        To learn how to code from ZERO experiencr, join ZERO TO FULL HERO
      </h2>

      <h3 className="text-lg italic text-center text-black/50">
        https://www.papareact.com/course
      </h3>
    </div>
  );
}
