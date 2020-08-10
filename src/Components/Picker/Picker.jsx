import React, {useState, useEffect} from "react"
import {NativeSelect, FormControl} from "@material-ui/core"
import {fetchCountries} from "../../api"

import styles from "./Picker.module.css"

function Picker({handleCountry}){
  const [allCountries, updateCountries] = useState([])

  useEffect(() => {
    async function fetchAPI(){
      updateCountries(await fetchCountries())
    }

    fetchAPI()
  }, [updateCountries])

  return(
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => handleCountry(e.target.value)}>
        <option value="">Global</option>
        {allCountries.map((country, idx) => <option key={idx} value={country}>{country}</option>)}
      </NativeSelect>
    </FormControl>
  )
}

export default Picker
