import React, {useState, useEffect} from "react";

export const MenuContext = React.createContext({})

export default function MenuContextProvider({children}) {
    const [menu, setMenu] = useState([])
    const [filteredMenu, setFilteredMenu] = useState([])
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")

    useEffect(() => {
        setFilteredMenu(menu.filter(item => {
            return item.name.toLowerCase().includes(search.toLowerCase()) && (category === "" || item.category === category)
        }))
    }, [search, category, menu])

    const selectCategory = (newCategory) => {
        if (newCategory === category) {
            setCategory("")
        } else {
            setCategory(newCategory)
        }
    }

    return (
        <MenuContext.Provider value={{menu: filteredMenu, setMenu, search, setSearch, category, selectCategory}}>
            {children}
        </MenuContext.Provider>
    )
}