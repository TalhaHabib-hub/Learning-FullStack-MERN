import { IoPersonSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import { FiMenu, FiX } from "react-icons/fi";
import { FaMars, FaVenus, FaChild, FaHome, FaPalette, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
const Header = () => {
  const bag = useSelector((store) => store.bag);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <header>
        <div className="logo_container">
          <Link to="/">
            <img
              className="myntra_home"
              src="public/images/talon-logo.png"
              alt="Talon_logo"
            />
          </Link>
        </div>
        <nav className={`nav_bar${menuOpen ? " is-open" : ""}`}>
          <a href="#"><FaMars className="nav_icon" /> Men</a>
          <a href="#"><FaVenus className="nav_icon" /> Women</a>
          <a href="#"><FaChild className="nav_icon" /> Kids</a>
          <a href="#"><FaHome className="nav_icon" /> Home & Living</a>
          <a href="#"><FaPalette className="nav_icon" /> Beauty</a>
          <a href="#">
            <FaRegStar className="nav_icon" /> Studio <sup>New</sup>
          </a>
        </nav>
        <div className="search_bar">
          <span className="material-symbols-outlined search_icon">search</span>
          <input
            type="search"
            className="search_input"
            aria-label="Search products, brands and more"
            placeholder="Search for products, brands and more"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <button
          className="menu_button"
          type="button"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
        <div className="action_bar">
          <div className="action_container">
            <IoPersonSharp />
            <span className="action_name">Profile</span>
          </div>
          <div className="action_container">
            <FaHeart />
            <span className="action_name">Wishlist</span>
          </div>
          <Link className="action_container" to="/bag">
            <IoBag />
            <span className="action_name">Bag</span>
            <span className="bag-item-count">{bag.length}</span>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
