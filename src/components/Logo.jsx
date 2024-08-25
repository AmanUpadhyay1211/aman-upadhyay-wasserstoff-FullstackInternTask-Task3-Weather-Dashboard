

function Logo({ height = 'h-12', className = '' }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img src="/images/WeatherAppLogo.png" alt="logo" className={`${height}`} />
    </div>
  );
}

export default Logo;