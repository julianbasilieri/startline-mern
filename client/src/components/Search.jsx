import PropTypes from 'prop-types';
import { useState } from 'react';
import '../styles/Search.css'

const Search = ({ posts, setFilteredPosts }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        event.preventDefault();
        setSearchTerm(event.target.value);
        const filtered = posts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(filtered);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const filtered = posts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(filtered);
    };

    return (
        <div className="search">
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    className='input'
                    placeholder="Search posts by title"
                    style={{ width: '500%' }}
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

Search.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
        })
    ),
    setFilteredPosts: PropTypes.func.isRequired,
};

export default Search;