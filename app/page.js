"use client"
import { useContext } from "react"
import { centralizedData } from "./context"
import { useRouter } from "next/navigation"
import axios from "axios"
import css from "./page.module.css"

const page = () => {
  const router = useRouter();

  const [data, setData] = useContext(centralizedData);
  // console.log(data)

  const trendingHandler = async ()=>{
    try {
      
      // let num = Math.floor(Math.random()*100);
      // const {data} = await axios.get(`https://api.unsplash.com/photos?client_id=I6wca94vUjZWXrxPxsL5l1qpjkcv5eScp0TuIP2atUk&page=${num}`)
      // setData(data)
      router.push("/list")
      
    } catch (error) {
      console.log(error)
    }
  }
  
  const searchHandler = ()=>{
    router.push("/search")
  }

  return (
    <>
      <div className={css.main}>
        <h1 className={css.h1}>Unsplash For Pictures</h1>
        <div className={css.btnsClass}>
          <button onClick={trendingHandler} className={css.btn}>Trending Images</button>
          <button onClick={searchHandler} className={css.btn}>Search Images</button>
        </div>
      </div>
    </>
  )
}

export default page


// Access Key:- I6wca94vUjZWXrxPxsL5l1qpjkcv5eScp0TuIP2atUk

/*
  // List of Images
// https://api.unsplash.com/photos?client_id=ID&page=1

// Seach Images
// https://api.unsplash.com/search/photos?client_id=ID&page=1&query=office
*/