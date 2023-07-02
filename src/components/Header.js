const Header = () => {
    return(
        <div className="header">
            <img 
                src={require("../images/chimple-logo.png")}
                className="chimple-logo"
                alt="Chimple Logo"
            />
            <h1 className="title">Chimple Learning</h1>
        </div>
    )
}

export default Header