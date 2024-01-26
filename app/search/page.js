"use client"
import axios from "axios";
import css from "./search.module.css";
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ReactPaginate from "react-paginate";
import Link from 'next/link'

const SearchImages = () => {
    const router = useRouter()
    const [inpData , setInputData] = useState("")
    const [images, setImages] = useState([])
    const [searched, setSearched] = useState(false)
    const [page, setpage] = useState(1)
    
    const goBack = ()=>{
        router.push("/")
    }

    const SubmitHandler = async (e)=>{
        e.preventDefault();
        try {

            const {data} = await axios.get(`https://api.unsplash.com/search/photos?client_id=${process.env.client_id}&page=${page}&query=${inpData}`)

            setImages(data.results)
            console.log(data.results)
            
        } catch (error) {
            console.log(error)
        }
        // setInputData("")

        setSearched(!searched)
    }

    let searchedImages;
    if(images.length > 0){
        searchedImages = images.map((img, i)=>{

            return (
                <li key={img.id}>
                    <Link href={`/details/${img.id}`}><img src={img.urls.regular} height={500} alt="" /></Link>
                </li>
            )
        })
    }

    const handlePageClick = (e)=>{
        console.log(e)
        setpage(e.selected + 1)
    }

    const GetImages = ()=>{
        let num = Math.floor(Math.random()*100);
        console.log(num)
        axios.get(`https://api.unsplash.com/search/photos?client_id=${process.env.client_id}&page=${num}&query=random`)
        .then(d => setImages(d.data.results))

        // axios.get(`https://api.unsplash.com/photos?client_id=I6wca94vUjZWXrxPxsL5l1qpjkcv5eScp0TuIP2atUk&page=${page}`)
        // .then(d => setData(d.data))
    }

    useEffect(()=>{
        {inpData === "" ? GetImages() : SubmitHandler()}
    },[page])

  return (
    <>
        <div className={css.header}>
            <button onClick={goBack} className={css.backBtn}>←</button>
            <form onSubmit={SubmitHandler} className={css.form}>
                <h1 className={css.h1}>Search Images</h1>
                <input type="text" value={inpData} onChange={(e)=> setInputData(e.target.value)} className={css.inp} required/>
                <button className={css.btn}>Search</button>
            </form>
        </div>
        <ul className={css.list}>{searchedImages}</ul>
        {searched ? '' : <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={10}
            previousLabel="< previous"
            className={css.paginate}
        />}
    </>
  )
}

export default SearchImages