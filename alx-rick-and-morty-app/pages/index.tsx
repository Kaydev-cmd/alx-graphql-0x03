import { useQuery } from "@apollo/client";
import { GET_EPISODES } from "@/graphql/queries";
import { EpisodeProps, EpisodeCardProps } from "@/interfaces";
import EpisodeCard from "@/components/common/EpisodeCard";
import ErrorBoundary from "@/components/ErrorBoundary";
import ErrorProneComponent from "@/components/ErrorProneComponent";
import { useState, useEffect } from "react";

const Home = () => {
  const [page, setPage] = useState<number>(1);
  const { loading, error, data, refetch } = useQuery(GET_EPISODES, {
    variables: {
      page: page,
    },
  });

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  const results = data?.episodes.results;
  const info = data?.episodes.info;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#A3D5E0] to-[#F4F4F4] text-gray-800">
      {/* Header */}
      <header className="bg-[#4CA1AF] text-white py-6 text-center shadow-md">
        <h1 className="text-4xl font-bold tracking-wide">
          Rick and Morty Episodes
        </h1>
        <p className="mt-2 text-lg italic">
          Explore the multiverse of adventures!
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results &&
            results.map(({ id, name, air_date, episode }: EpisodeCardProps) => (
              <EpisodeCard
                key={id}
                id={id}
                name={name}
                air_date={air_date}
                episode={episode}
                info={info}
              />
            ))}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
            className="bg-[#45B69C] text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover-[#3D9B80] transition duration-200 transform hover:scale-105 cursor-pointer"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setPage((prev) => (prev < info.pages ? prev + 1 : prev))
            }
            className="bg-[#45B69C] text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover-[#3D9B80] transition duration-200 transform hover:scale-105 cursor-pointer"
          >
            Next
          </button>
        </div>
        <ErrorBoundary>
          <ErrorProneComponent />
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <footer className="bg-[#4CA1AF] text-white py-4 text-center shadow-md">
        <p>&copy; 2024 Rick and Morty Fan Page</p>
      </footer>
    </div>
  );
};
export default Home;
