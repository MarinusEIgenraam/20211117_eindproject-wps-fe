import React from 'react';
import './Navigation.css';

import { ReactComponent as ShoppingCart } from '../../../assets/images/winkelmandje.svg';
import Dropdown from "../../shared/Dropdown/Dropdown";

const menuItems = [{
    name: "about",
    link: "/about"
}, {
    name: "blogs",
    link: "/blogs"
}, {
    name: "projects",
    link: "/projects"
},];

const Navigation = () => {



    return (
        <nav>

            <ShoppingCart className="shopping-cart-icon"/>

        </nav>
    )
};

export default Navigation;