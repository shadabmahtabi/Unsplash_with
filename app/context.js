"use client"
import { createContext, useState } from 'react'
export const centralizedData = createContext(null);

const DataStore = (props) => {

    const [data, setData] = useState([])

  return (
    <>
        <centralizedData.Provider value={[data, setData]}>
            {props.children}
        </centralizedData.Provider>
    </>
  )
}

export default DataStore