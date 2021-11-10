import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MovieListPage from '../src/pages/MovieListPage'
import MovieDetailPage from '../src/pages/MovieDetailPage'
import WishListPage from '../src/pages/WishListPage'

function App() {
    return (
        <div className="App">
            <Router>
                {/* <Route path="/" component={MovieListPage}></Route> */}
                <Switch>
                    <Route exact path="/">
                        <MovieListPage/>
                    </Route>
                    <Route exact path="/detail/:id">
                        <MovieDetailPage/>
                    </Route>
                    <Route exact path="/wishlist">
                        <WishListPage/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App