import React, { useState, useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import SearchIcon from '@material-ui/icons/Search';


const dataTags = [
    {   
        name: 'Family',
        id: 1
    },
    {   
        name: 'Co-Workers',
        id: 2
    },
    {   
        name: 'Hockey club',
        id: 3
    },
    {   
        name: 'Swiss Embassy',
        id: 4
    },
    {   
        name: 'Family in law',
        id: 5
    },
    {   
        name: 'Friends',
        id: 6
    },
    {   
        name: 'Startup Investor ',
        id: 7
    },
    {   
        name: 'Zurich Meetup Group',
        id: 8
    },
    {   
        name: 'Moscow Meetup Group Group',
        id: 9
    },
    {   
        name: 'Milan Meetup Group Group',
        id: 10
    },
    {   
        name: 'Brussels Meetup Group Group',
        id: 11
    },
    {   
        name: 'Madrid Meetup Group Group',
        id: 12
    },
    {   
        name: 'Athens Meetup Group Group',
        id: 13
    }



]


const Select = () => {

    //State of saved tags
    const [ tags, setTags ] = useState([]);

    //Use it to know when expand the menu 
    const [ showoptions, setShowOptions ] = useState(false);
    
    //Hold the value of the search input 
    const [ searchargument, setSearchArgument ] = useState('');

    //Contain the differents options of the search input result
    const [ searchresults, setSearchResults ] = useState([]);

    //When click a checkbox
    const handleChange = (e) => {
        if( e.target.checked ) {
            
                setTags([
                    ...tags,
                    e.target.value
                ])

        }else{
            setTags(
                tags.filter(tag => tag !== e.target.value)
            )
        }
    }

    //When click a search result
    const handleClickSearch = (value) => {
        setTags([
            ...tags,
            value
        ]);
        setSearchArgument('');
    }

    //Any change of searchargument, search again
    useEffect(() => {
        if(searchargument.trim() !== ''){
            const searchresulttags = dataTags.filter(tag => tag.name.toLowerCase().includes(searchargument));
            setSearchResults(searchresulttags);
        }else{
            setSearchResults([]);
        }
        

    }, [searchargument])

  

    return ( 
        <form>
            <h4>Multi Select</h4>
            <div className="menu-options">
                <div 
                    className="header-menu"
                >
                    <div className="options-selected" >
                        { tags.length === 0 
                                ? <p className="choose-tag">Choose a tag</p>
                                :  
                                    tags.slice(0,3).map(tag => {
                                        return(
                                            <p
                                                className="option-selected"
                                                onClick={()=>setTags(tags.filter(t => t !== tag))}                                             
                                                key={tag}  
                                            >
                                                {tag}
                                            </p>
                                        )    
                                    })                    
                        } 

                    </div> 

                    {
                        tags.length > 0 &&
                        <p className="option-selected">
                            {tags.length}
                        </p>
                    }
                    
                    
                    { showoptions 
                        ?  
                            <ExpandLessIcon 
                                onClick={() => setShowOptions(!showoptions)} 
                                className="icon"/> 
                        :   <ExpandMoreIcon 
                                onClick={() => setShowOptions(!showoptions)}
                                className="icon"/> 
                    }
                </div>
               
                {showoptions 
                    ? 
                        <div className="main-menu">
                            <div className="container-search">
                                <input
                                    type="text"
                                    name="tag-search"
                                    placeholder="Search"
                                    className="input-search"
                                    value={searchargument}
                                    onChange={(e) => setSearchArgument(e.target.value.toLowerCase().trim())}
                                />
                                <SearchIcon className="search-icon"/>

                                {searchargument !== '' &&
                                    <ul>
                                        {searchresults.length === 0 &&
                                            <li>
                                                <button
                                                >No hay coincidencias</button>
                                                
                                            </li>
                                        }
                                        {searchresults.slice(0,5).map(result => (

                                            <li
                                                key={result.id}
                                            >
                                                <button
                                                    onClick={() => handleClickSearch(result.name)}
                                                >{result.name}</button>
                                            </li>

                                        ))}
                                    </ul>
                                }
                                
                            </div>
                            
                            <div className="container-options">
                                {
                                    dataTags.slice(0,8).map(tag => {
                                        return (
                                            <div 
                                                className="option"
                                                key={tag.id}
                                            >
                                                <label className="label-option">
                                                    <input 
                                                        type="checkbox" 
                                                        name={tag.name} 
                                                        value={tag.name}
                                                        onChange={handleChange}
                                                        checked={tags.includes(tag.name)}
                                                    />
                                                    <span className="checkmark"></span>

                                                {tag.name}</label>
                                            </div>
                                        )
                                    })
                                }                              
                                
                            </div>
                        </div>

                    : null
                }
                
            </div>
            
        </form>
        );
}
 
export default Select;