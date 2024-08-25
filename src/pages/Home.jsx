import { WeatherDetails } from '../components/index';

function Home() {
  return (
    <>
      <div className="main min-h-screen max-w-screen bg-white dark:bg-gray-900 transition-all duration-300">
        {/* Container for the search bar and weather details */}
  
        <div className="flex flex-col items-center justify-center py-5 px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="w-full max-w-3xl">
            <WeatherDetails />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
