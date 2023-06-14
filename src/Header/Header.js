import './Header.css';
import { Link } from 'react-router-dom';


function Header(props) {
    return (
        <nav className="navbar navbar-expand-lg  style">
            <Link className="navbar-brand name" to="#">TRACKER</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link name" to="/register">Register <span className="sr-only"></span></Link>
                    </li>
                    {/*<li className="nav-item">
                        <Link className="nav-link name" to="/About">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link name" to="/Services">Services</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link name" to="/Contact">Contact</Link>
                    </li>*/}
                    <li className="nav-item">
                        <button className="btn  btn-lg  button-1" type="button">Sign Up</button>
                    </li>
                    {props.logout && <li className="nav-item">
                        <button className="btn btn-lg button-2" type="button"><Link to="/login" className="button-2">Logout</Link></button>
                    </li>}
                    {!props.logout && <li className="nav-item">
                        <button className="btn btn-lg button-2" type="button"><Link to="/login" className="button-2">Login</Link></button>
                    </li>}
                    
                </ul>
            </div>
        </nav>
    )
}
export default Header;