import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingAnimation from '../parts/LoadingAnimation'
import LoadingT from '../assets/images/loadingT.gif'
import '../assets/css/style.css'

export default function WishListPage() {
    const [movieWishlist, setMovieWishlist] = useState([])
    const [loading, setLoading] = useState(true)
    const [animation, setAnimation] = useState(false)

    const removeWishlist = id => {
        let filter = movieWishlist.filter(movie => { return parseInt(movie.id) !== parseInt(id) })
        let list = filter.map(movie => { return movie.id.toString() })
        
        setAnimation(true)
        setTimeout(() => {
            setAnimation(false)
            setMovieWishlist(filter)
        }, 1000)
        
        localStorage.setItem('movieWishList', JSON.stringify(list))
    }
    
    useEffect(() => {
        fetch(`https://my-json-server.typicode.com/rickyandrean99/Movie-REST-API/movies`)
        .then((response) => {
            return response.json()
        })
        .then((movieList) => {
            let cookieId = JSON.parse(localStorage.getItem('movieWishList'))
            movieList = movieList.filter((movie) => {
                return cookieId.some((id) => { 
                    return parseInt(id) === parseInt(movie.id)
                })
            })
            
            setMovieWishlist(movieList)
            setLoading(false)
        })
    }, [])
    
    if (!loading) {
        return (
            <>
                <div className="container">
                    <h1 className="index-title pop-bold">Movie Wishlist</h1>
        
                    <div style={{margin: '0 0 30px 10px', width: '100%'}}>
                        <Link to='/' className="pop-bold" style={{color: 'white', fontSize: '1rem', textDecoration: 'none'}}>{`<  Back to movie list`}</Link>
                    </div>
        
                    <div className="movie-list">
                        {
                            movieWishlist.map(movie => {
                                return (
                                    <div className="movie-box" key={`movie-${movie.id}`}>
                                        <div className="movie-card" style={{height: 'auto'}}>
                                            <div className="card-image"><img src={movie.photo} alt={movie.title} className="movie-image"/></div>
        
                                            <div className="card-content">
                                                <h5 className="content-title pop-bold" style={{textAlign: 'center'}}>{movie.title}</h5>
                                                <Link to={`/detail/${movie.id}`} className="pop-medium" style={{textAlign: 'center', textDecoration: 'none', display: 'block', background: '#0275d8', border: '0', outline: '0', color: 'white', width: '100%', padding: '8px 0', fontSize: '1rem', borderRadius: '3px'}}>See details</Link>
                                                <button type="button" onClick={() => removeWishlist(movie.id)} className="pop-medium" style={{cursor: 'pointer', marginTop: '10px', background: '#d9534f', border: '0', outline: '0', color: 'white', width: '100%', padding: '8px 0', fontSize: '1rem', borderRadius: '3px'}}>Remove from wishlist</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
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
            <div className="container">
                <h1 className="index-title pop-bold">Movie Wishlist</h1>
    
                <div style={{margin: '0 0 30px 10px', width: '100%'}}>
                    <Link to='/' className="pop-bold" style={{color: 'white', fontSize: '1rem', textDecoration: 'none'}}>{`<  Back to movie list`}</Link>
                </div>
    
                <div style={{display: 'flex', flexDirection: 'column', width: '100%', margin: '0', justifyContent: 'center', alignItems: 'center', marginTop: '20vh'}}>
                    <div><LoadingAnimation/></div>
                    <h2 style={{color: 'white'}} className="pop-medium">Loading wishlist...</h2>
                </div>
            </div>
        )
    }
}