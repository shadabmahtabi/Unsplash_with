"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import css from "./image.module.css"
import { useRouter } from 'next/navigation';

const Details = (props) => {
    const router = useRouter();
    const imageId = props.params.id;
    const [imgData, setImgData] = useState('')
    const [dets, setdets] = useState([])

    const getDetails = async ()=>{
        try {

            const {data} = await axios.get(`https://api.unsplash.com/photos/${imageId}?client_id=I6wca94vUjZWXrxPxsL5l1qpjkcv5eScp0TuIP2atUk`)
            setImgData(data.urls)
            setdets(data.user)
            
        } catch (error) {
            console.log(error)
            
        }
    }

    // console.log(dets.first_name + dets.last_name)
    // console.log(dets)

    useEffect(()=>{
        getDetails();
    },[])

    const goBack = ()=>{
        router.push("/")
    }

  return (
    <>
        <div className={css.nav}>
            <button onClick={goBack} className={css.btn}>←</button>
            <h1 className={css.h1}>Image Details</h1>
        </div>
        <div className={css.imgBox}>
            <img className={css.img} src={imgData.regular}/>
            <div className={css.detsBox}>
                <h1>Author Name : {dets.first_name} {dets.last_name}</h1>
                <h2>username: {dets.username}</h2>
                <h2>Instagram Profile : <a href={`https://www.instagram.com/${dets.instagram_username}/`}>{dets.instagram_username}</a></h2>
                <h2><a href={dets.portfolio_url}>View Potfolio</a></h2>
            </div>
        </div>
    </>
  )
}

export default Details