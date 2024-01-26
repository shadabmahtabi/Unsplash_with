"use client"
import { useContext, useEffect, useRef, useState } from 'react'
import { centralizedData } from '../context'
import css from "./list.module.css"
import { useRouter } from 'next/navigation'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import Link from 'next/link'

const Trending = () => {
    const [page, setpage] = useState(1)
    const router = useRouter();
    const [data, setData] = useContext(centralizedData);
    // console.log(data)

    const renderImages = data.map((img, i)=>{
        return(
            <li key={img.id}>
                <Link href={`/details/${img.id}`}><img height={600} src={img.urls.regular} alt="" /></Link>
            </li>
        )
    })

    const goBack = ()=>{
        router.push("/")
    }

    const handlePageClick = (e)=>{
        console.log(e)
        setpage(e.selected + 1)
    }

    // let num = Math.floor(Math.random()*100);

    const GetImages = ()=>{
        let num = Math.floor(Math.random()*100);
        // console.log(num)

        axios.get(`https://api.unsplash.com/photos?client_id=${process.env.client_id}&page=${page}`)
        .then(d => setData(d.data))
    }

    useEffect(()=>{
        GetImages();
    },[page])

  return (
    <>
        <div className={css.nav}>
            <button onClick={goBack} className={css.btn}>←</button>
            <h1 className={css.h1}>Trending Images</h1>
        </div>
        <ul className={css.list}>{renderImages}</ul>
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={10}
            previousLabel="< previous"
            className={css.paginate}
        />
    </>
  )
}

export default Trending