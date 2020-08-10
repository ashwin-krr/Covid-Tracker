import React from "react"

import {Cards, Chart, Picker, Articles} from "./Components"
import styles from "./App.module.css"
import {fetchData} from "./api"

class App extends React.Component{
  state = {
    data : {},
    country: ""
  }
  async componentDidMount(){
    const fetchedData = await fetchData();
    this.setState({data : fetchedData})
  }

  handleCountry = async (country) => {
    const fetchedData = await fetchData(country)
    this.setState({data : fetchedData, country : country})
  }
  render (){
    const {data, country} = this.state
    return (
    <div className={styles.container}>
      <Cards data={data}/>
      <Picker handleCountry={this.handleCountry}/>
      <Chart data={data} country={country}/>
      <Articles />
    </div>
    )
  }
}

export default App
