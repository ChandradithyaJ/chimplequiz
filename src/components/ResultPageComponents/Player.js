const Player = ({ player }) => {
    return (
        <article 
            className={player.finished ? "player-container" : "hide-player-container"}
        >
            <div className="player-results">
                <div className="player-details">
                    <p className="player-name">
                        {player.displayName ? player.displayName : "Unknown"}
                    </p>
                    <p className="player-score">
                        {player.score}
                    </p>
                </div>
            </div>
        </article>
    )
}

export default Player