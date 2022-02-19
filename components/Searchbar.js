import { SearchIcon } from '@heroicons/react/outline';
import { debounce } from 'lodash';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { fetchSearchResults } from '../actions/fetchSearchResults';
import { fetchSubreddit, FETCH_SUBREDDIT_SUCCESS } from '../actions/fetchSubreddit';
import { subredditClickedState, subredditIdState } from '../atoms/subredditAtom';
import styles from '../styles/Searchbar.module.css';

function Searchbar() {
    const { data: session } = useSession();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState();
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [, setSelectedSubreddit] = useRecoilState(subredditIdState);
    const [, setSubredditClicked] = useRecoilState(subredditClickedState);

    useEffect(() => {
        if (searchTerm) {
            setLoading(true);
            debouncedSearch(searchTerm);
        } else {
            setSearchResults();
        }
    }, [searchTerm]);

    const debouncedSearch = useCallback(
        debounce((term) => {
            fetchSearchResults(session.user.accessToken, term)
                .then((res) => {
                    setSearchResults(res.payload);
                })
                .catch((err) => console.log(`${err.type} - ${err.payload}`));
            setSelectedIndex(-1);
            setLoading(false);
        }, 2000),
        []
    );

    const setSub = async (i) => {
        console.log('2');

        try {
            const res = await fetchSubreddit(
                session.user.accessToken,
                `r/${searchResults[i ?? selectedIndex]}`
            );
            if (res.type === FETCH_SUBREDDIT_SUCCESS) {
                setSelectedSubreddit(res.payload);
                setSubredditClicked(true);
                setSearchTerm('');
            }
        } catch (err) {
            console.log(`${err.type} - ${err.payload?.stack}`);
        }
    };

    const handleInputChange = (e) => {
        if (e.target.value != searchTerm) {
            setSearchTerm(e.target.value);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key == 'Escape' && searchTerm != '') {
            setSearchTerm('');
        }

        if (e.key == 'Enter' && searchResults && selectedIndex != -1) {
            setSub();
        }

        if (!searchResults) {
            return;
        }

        if (e.key == 'ArrowDown' || (!e.shiftKey && e.key == 'Tab')) {
            if (selectedIndex == searchResults.length - 1) {
                setSelectedIndex(0);
            } else {
                setSelectedIndex(selectedIndex + 1);
            }
            return e.preventDefault();
        }
        if (e.key == 'ArrowUp' || (e.shiftKey && e.key == 'Tab')) {
            if (selectedIndex == 0) {
                setSelectedIndex(searchResults?.length - 1);
            } else {
                setSelectedIndex(selectedIndex - 1);
            }
            return e.preventDefault();
        }
    };

    return (
        <div className="group relative flex py-2 px-2 w-full bg-black border border-gray-900 rounded focus-within:border-gray-500">
            <SearchIcon className="w-5 group-hover:text-gray-400 group-focus-within:text-gray-400" />
            <input
                className="w-full bg-black outline-none placeholder:text-gray-500 ml-2 focus"
                placeholder="Search"
                value={searchTerm}
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
                // TODO FIGURE THIS SHIT OUT.. THIS METHOD IS CALLED BEFORE THE ONCLICK BELOW.
                // SEARCHTERM WHICH EMPTIES SEARCHRESULTS WHICH MEANS THE setSub(i) onclick below fails
                // onBlur={(e) => {
                //     console.log(e);
                //     if (searchTerm != '') {
                //         setSearchTerm('');
                //     }
                // }}
            />
            <div
                className={`${
                    loading ? styles.loading : ''
                } flex w-5 h-5 after:translate-x-0.5 after:-translate-y-1`}></div>
            <div
                className={`absolute bottom-0 left-0 w-full py-2 bg-black border rounded border-gray-900 
                transition-all ease-out duration-700 translate-y-full ${
                    searchResults ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}>
                {searchResults?.length ? (
                    <ol>
                        {searchResults.map((result, i) => (
                            <li
                                key={i}
                                onClick={() => setSub(i)}
                                className={`px-2 py-1 hover:bg-slate-900 ${
                                    selectedIndex == i ? 'bg-slate-900' : ''
                                }`}>
                                <button onKeyDown={handleKeyDown}>
                                    <p>{result}</p>
                                </button>
                            </li>
                        ))}
                    </ol>
                ) : (
                    <div className="px-2 py-1">
                        <p>No search results</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Searchbar;
