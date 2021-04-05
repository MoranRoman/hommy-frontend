
import React from "react";
import {
    Link,
    useHistory,
    withRouter
} from "react-router-dom";

const LinkPage = ({ id, history, signOut }) => {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: "55%", fontSize: "44pt", margin: "3vh 0 0 4vw" }}>
                {history.location.pathname === "/" ?
                    <Link to="/"><a style={{ color: "orange" }}>&#8226;Hommy&#8226;</a></Link> : <Link to="/">&#8226;Hommy&#8226;</Link>
                }
            </div>
            <div style={{ width: "45%", fontSize: "24pt", margin: "3vh 4vw 0 0", display: "flex", justifyContent: "space-between" }}>
                {
                    console.log(history.location)
                }
                {history.location.pathname === "/houses" ?
                    <Link to="/houses"><a style={{ color: "orange" }}>Catalog</a></Link> : <Link to="/houses">Catalog</Link>

                }
                {history.location.pathname === "/favourites" ?
                    <Link to="/favourites"><a style={{ color: "orange" }}>Favourites</a></Link> : <Link to="/favourites">Favourites</Link>
                }
                {history.location.pathname === "/favourites" ?
                    <Link to={`/user/${id}`}><a style={{ color: "orange" }}>My account</a></Link> : <Link to={`/user/${id}`}>My account</Link>
                }
                {history.location.pathname === "/favourites" ?
                    <Link to="/supportchat"><a style={{ color: "orange" }}>Help</a></Link> : <Link to="/supportchat">Help</Link>
                }
                {JSON.parse(localStorage.getItem('tokens'))?.accessToken &&
                    <button onClick={() => signOut()}>Sign Out</button>}
            </div>
        </div >
    )
}

export default withRouter(LinkPage)