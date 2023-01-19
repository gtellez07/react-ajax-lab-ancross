
export default function DisplayCards(props) {
    const allVillagers = props.villagers.map((villager, i) =>{
        return(
            <li key={`villager${i}`}>
                <img 
                src={villager.image_uri} 
                alt={villager.name[`name-USen`]}
                onClick={() => props.handleClick(villager)}
                />
                <p>{villager.name[`name-USen`]}</p>
            </li>
        )
    })
    return (
        <ul>{allVillagers}</ul>
    )
}