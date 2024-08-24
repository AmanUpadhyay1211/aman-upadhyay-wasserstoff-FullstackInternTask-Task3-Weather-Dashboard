import { SearchBar, WeatherDetails,ThemeToggler } from './components/index';

function App() {
  return (
    <>
      <div className="main min-h-screen max-w-screen bg-white dark:bg-gray-900 transition-all duration-300">
        {/* Container for the search bar and weather details */}
        <div className="flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Search Bar */}
          <div className="w-full max-w-2xl">
            <SearchBar />
          </div>

          {/* Weather Details */}
          <div className="w-full max-w-3xl">
            <WeatherDetails />
          </div>
        </div>
        <ThemeToggler/>
      </div>
    </>
  );
}

export default App;
