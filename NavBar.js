import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    const [selectedButton, setSelectedButton] = useState('Home')

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
    };

    return (
        <div>
<Link to="/">
    <button
        className={`nav ${selectedButton === 'Home' ? 'selected' : ''}`}
        onClick={() => handleButtonClick('Home')}
    >
        Home
    </button>
</Link>
<Link to="/favorites">
    <button
        className={`nav ${selectedButton === 'Favorites' ? 'selected' : ''}`}
        onClick={() => handleButtonClick('Favorites')}
    >
        Favorites
    </button>
</Link>

        </div>
    );
}

export default NavBar;
