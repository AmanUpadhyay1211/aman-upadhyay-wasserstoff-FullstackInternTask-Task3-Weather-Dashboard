import axios from "axios";

class Api {
  constructor() {}


  async searchCities({ state, limit = 5 }) {
    try {
      const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${state}&limit=${limit}&appid=52fc768d200d9f2960c9c299128cff1e`);
      console.log(response.data)
      return  response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async searchWheatherByCity({city}){
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=52fc768d200d9f2960c9c299128cff1e`)
      console.log(response.data)
      return  response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async searchWheatherByCoordinates({lat,lon}){
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=52fc768d200d9f2960c9c299128cff1e`)
      console.log(response.data)
      return  response.data;
    } catch (error) {
      console.log(error);
    }
  }

}

const api = new Api();
export default api;




// Wheather by city name--> https://api.openweathermap.org/data/2.5/weather?q=gurugram&units=metric&APPID=52fc768d200d9f2960c9c299128cff1e
// Wheather by lan lon --> https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// All atate name --> https://api.openweathermap.org/geo/1.0/direct?q=bihar&limit=5&appid=52fc768d200d9f2960c9c299128cff1e