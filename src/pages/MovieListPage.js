import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import MovieList from '../parts/MovieList'
import LoadingAnimation from '../parts/LoadingAnimation'
import '../assets/css/style.css'

export default function MovieListPage() {
    const [allMovies, setAllMovies] = useState([])
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const searchInput = useRef(null)

    const searchMovie = () => {
        searchInput.current.focus()

        let keyword = searchInput.current.value.toLowerCase()
        const filtered = allMovies.filter(movie => movie.title.toLowerCase().includes(keyword))
        setMovies(filtered)
    }

    useEffect(() => {
        fetch(`https://my-json-server.typicode.com/rickyandrean99/Movie-REST-API/movies`)
        .then((response) => {
            return response.json()
        })
        .then((movieList) => {
            setAllMovies(movieList)
            setMovies(movieList)
            setLoading(false)
        })
    }, [])
    
    if (!loading) {
        return (
            <>
                <div className="container">
                    <h1 className="index-title pop-bold">Movie List</h1>

                    <div style={{margin: '0 -10px 30px', width: '100%', textAlign: 'right'}}>
                        <Link to='/wishlist' className="pop-bold" style={{color: 'white', fontSize: '1rem', textDecoration: 'none'}}>See wishlist &nbsp;{`>`}</Link>
                    </div>

                    <div className="search-wrapper">
                        <input type="name" className="search-box pop-normal" ref={searchInput} placeholder="Search movies..." onKeyUp={searchMovie} autoComplete="off"/>
                    </div>
                        
                    <MovieList movies={movies}></MovieList>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="container">
                    <h1 className="index-title pop-bold">Movie List</h1>

                    <div style={{margin: '0 -10px 30px', width: '100%', textAlign: 'right'}}>
                        <Link to='/wishlist' className="pop-bold" style={{color: 'white', fontSize: '1rem', textDecoration: 'none'}}>See wishlist &nbsp;{`>`}</Link>
                    </div>

                    <div className="search-wrapper">
                        <input type="name" className="search-box pop-normal" ref={searchInput} placeholder="Search movies..." onKeyUp={searchMovie} autoComplete="off"/>
                    </div>
                        
                    <div style={{display: 'flex', flexDirection: 'column', width: '100%', margin: '0', alignItems: 'center', justifyContent: 'center', marginTop: '20vh'}}>
                        <div><LoadingAnimation/></div>
                        <h2 style={{color: 'white'}} className="pop-medium">Loading movie list...</h2>
                    </div>
                </div>
                
            </>
        )
    }
}
