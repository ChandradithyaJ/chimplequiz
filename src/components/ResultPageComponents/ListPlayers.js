import Player from "./Player"

const ListPlayers = ({ players }) => {
    return (
        <>
            {players.map(player => (
                <Player
                    key={player.playerId}
                    player={player}
                />
            ))}
        </>
    )
}

export default ListPlayers