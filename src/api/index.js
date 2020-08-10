import axios from "axios"

const url = "https://covid19.mathdro.id/api"

async function fetchData(country) {
  let dynamicURL = url

  if(country){
    dynamicURL = `${url}/countries/${country}`
  }

  try{
    const {data : {confirmed, recovered, deaths, active, lastUpdate}} = await axios.get(dynamicURL)
    return {confirmed, recovered, deaths, active,  lastUpdate}
  } catch(error) {
    return error
  }
}

async function fetchDailyData(){
  try{
    const {data} = await axios.get(`${url}/daily`)
    const neededData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportData
    }))

    return neededData
  } catch(error) {
    console.log(error);
  }
}

async function fetchCountries(){
  try{
    const {data : {countries}} = await axios.get(`${url}/countries`)
    return countries.map((country) => country.name)
  } catch(error){
    console.log(error);
  }
}

export {fetchDailyData, fetchData, fetchCountries}
