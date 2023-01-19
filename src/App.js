import { useEffect, useState } from 'react'
import DisplayCards from './DisplayCards'

function App() {
  // api data
  let [data, setData] = useState({villagers: []})
  // search input
  let [search, setSearch] = useState('')
  //favorited villagers
  let [faves, setFaves] = useState([])

  useEffect(() => {
    fetch('http://acnhapi.com/v1/villagers/')
    .then(response => response.json())
    .then((responseData) => {
      responseData = Object.values(responseData)
      setData({villagers: responseData})
    })
    .catch(err => console.warn(err))
  }, [])

    const getFilteredVillagers = e => {
    const searchTerm = search.toLowerCase()
    const filteredVillagers = data.villagers.filter(villager => {
      const name = villager.name[`name-USen`].toLowerCase()
        return name.includes(searchTerm)
    })
     return filteredVillagers
  }

    const handleClick = villager => {
      // make sure the villager is not in the faves array
      if (!faves.includes(villager)) {
        setFaves([...faves, villager])
      } else {
        // find the villager's index in the faves state
        const villagerIndex = faves.indexOf(villager)
        // make a copy of the faves array, so we can mutate it
        const favesCopy = [...faves]
        // splice the villager out and setState
        favesCopy.splice(villagerIndex, 1)
        setFaves(favesCopy)
      }
    }
  

  return (
    <div className='App'>
    <label htmlFor="search-input">Search:</label>
    <input
      type='text'
      placeholder='enter villager name...'
      value={search}
      onChange={e => setSearch(e.target.value)}
     />

     <div style={{ display: '' }}>
      <div>
        <h1>Searched Villagers:</h1>

      <DisplayCards 
        villagers={getFilteredVillagers()}
        handleClick={handleClick}
      />
      <div/>

      <h1>Favorites:</h1>

      <DisplayCards 
        villagers={faves}
      />
      </div>
    </div>
  </div>  
  );
}

export default App;