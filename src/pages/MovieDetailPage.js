import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Star from '../assets/images/star.png'
import parse from 'html-react-parser'
import LoadingAnimation from '../parts/LoadingAnimation'
import LoadingT from '../assets/images/loadingT.gif'
import '../assets/css/style.css'

export default function MovieDetailPage() {
    let { id } = useParams()
    let genres = ''
    const [movie, setMovie] = useState({})
    const [loading, setLoading] = useState(true)
    const [wish, setWish] = useState(false)
    const [animation, setAnimation] = useState(false)

    const addOrRemoveWishlist = () => {
        let movieWishList = JSON.parse(localStorage.getItem('movieWishList'))
        let list = []

        // If wish is true, then remove movie id,
        // otherwise add movie id to wishlist
        if (wish) {
            list = movieWishList.filter(movie => { return parseInt(movie) !== parseInt(id) })

            // Animation and output
            setAnimation(true)
            setTimeout(() => {
                setAnimation(false)
                setWish(false)
            }, 1000)
        } else {
            // If wishlist empty, just add this movie id to list array,
            // otherwise get all wishlist and store it to list array then push this movie id to its array
            if (movieWishList != null)
                list = movieWishList
            
            list.push(id)

            // Animation and output
            setAnimation(true)
            setTimeout(() => {
                setAnimation(false)
                setWish(true)
            }, 1000)
        }

        // Update local storage
        localStorage.setItem('movieWishList', JSON.stringify(list))
    }

    useEffect(() => {
        fetch('https://my-json-server.typicode.com/rickyandrean99/Movie-REST-API/movies')
        .then(res => res.json())
        .then((movies) => {
            const selectedMovie = movies.filter(movie => { return movie.id === parseInt(id) })[0]
            setMovie(selectedMovie)

            // Check if this movie exist on wishlist
            let movieList = JSON.parse(localStorage.getItem('movieWishList'))
            if (movieList != null) if (movieList.some(movie => parseInt(movie) === parseInt(id))) setWish(true)

            setLoading(false)
        })
        .catch((error) => console.log('Error Occured'))
    }, [id])

    if (!loading) {
        movie.genres.forEach(genre => genres += `<div className="genre-card pop-medium">${genre}</div>`)

        return (
            <>
                <div className="container" id="maindetail">
                    <div className="detail-card">
                        <div className="detail-image-wrapper"><img src={movie.photo} className="detail-image" alt={movie.title}/></div>
        
                        <div className="detail-content-wrapper">
                            <div className="content-group">
                                <div className="content-head-left">
                                    <h4 className="title pop-bold">{movie.title}</h4>
                                    <h6 className="sub-title pop-normal">{movie.release_date}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{movie.runtime} minutes</h6>
                                </div>
        
                                <div className="content-head-right">
                                    <div>
                                        <span className="rating pop-medium title">{movie.rating}</span>
                                        <img src={Star} className="star" alt="star"/>
                                    </div>
                                </div>
        
                                <div className="genre-list">
                                    {parse(genres)}
                                </div>
    
                                <div className="content-text">
                                    <div className="pop-bold storyline">Storyline</div>
                                    <div className="pop-normal description" style={{lineHeight: '1.7rem', marginTop: '1rem'}}>{movie.description}</div>
                                    <div className="pop-normal description"><span style={{color: '#777777'}}>Director</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{movie.director}</div>
                                </div>
    
                                <div style={{width: '100%', marginBottom: '20px'}}>
                                    {
                                        wish 
                                        ?
                                        <button onClick={addOrRemoveWishlist} className="pop-bold" type="button" style={{cursor: 'pointer', outline: 'none', border: 'none', background: '#d9534f', color: 'white', width: '100%', padding: '7px 0', borderRadius: '2px', fontSize: '1rem'}}>
                                            Remove from wishlist
                                        </button>
                                        :
                                        <button onClick={addOrRemoveWishlist} className="pop-bold" type="button" style={{cursor: 'pointer', outline: 'none', border: 'none', background: 'white', color: 'black', width: '100%', padding: '7px 0', borderRadius: '2px', fontSize: '1rem'}}>
                                            Save to wishlist
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    animation? 
                    <div style={{background: 'rgba(20,20,20,0.8)', position: 'fixed', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh', top: '0', left: '0', boxSizing: 'border-box', margin: '0', padding: '0'}}>
                        <img src={LoadingT} alt="loadingT"/>
                    </div>                    
                    : ''
                }
            </>
        )
    } else {
        return (
            <>
                <div style={{display: 'flex', flexDirection: 'column', height: '90vh', width: '100%', margin: '0', alignItems: 'center', justifyContent: 'center'}}>
                    <div><LoadingAnimation/></div>
                    <h2 style={{color: 'white'}} className="pop-medium">Loading movie detail...</h2>
                </div>
            </>
        )
    }
}