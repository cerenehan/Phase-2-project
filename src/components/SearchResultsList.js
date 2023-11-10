import { useShopContext } from "../context/shop-context";


function SearchResultsList() {
    const {searchResults} = useShopContext()

    return (
        <div className='results-list'>
            { searchResults.map(p => { return <div key={p.id}>{p.title}</div> }) }
        </div>
    )
}


export default SearchResultsList;
