import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1><i class="fab fa-spotify"></i>Spotify Project</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/artist-search">Artist Search</Link>
                <Link to="/genre-search">Genre Search</Link>
            </div>
        </nav>
    )
}

export default Navbar
