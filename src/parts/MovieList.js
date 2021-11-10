import React from 'react'
import '../assets/css/style.css'
import { Link } from 'react-router-dom'

export default function MovieList(props) {
    return (
        <section>
            <div className="movie-list">
                {
                    props.movies.map(item => {
                        return (
                            <div className="movie-box" key={`movie-${item.id}`}>
                                <div className="movie-card">
                                    <div className="card-image"><img src={item.photo} alt={item.title} className="movie-image"/></div>

                                    <div className="card-content">
                                        <h5 className="content-title pop-bold">{item.title}</h5>
                                        <p className="content-description pop-normal">{item.description.split(" ").splice(0,20).join(" ")}...</p>
                                        <Link to={`/detail/${item.id}`} className="pop-medium more">Read Details</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}
