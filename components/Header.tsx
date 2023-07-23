"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import logo2 from '@/public/images/logo2.png'
import logo3 from '@/public/images/logo3.png'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Avatar from 'react-avatar';
import { useBoardStore } from '@/store/BoardStore'
import { UserCircleIcon } from '@heroicons/react/24/solid';
import fetchSuggestion from '@/lib/fetchSuggestion'

const Header = () => {

    const [board, searchString, setSearchString] = useBoardStore((state) => [
        state.board,
        state.searchString,
        state.setSearchString
    ])

    const [loading, setLoading] = useState<boolean>(false);
    const [suggestion, setSuggestion] = useState<String>("")

    console.log(board);

    useEffect(() => {
        if (board.columns.size === 0) {
            return;
        }
        setLoading(true);

        const fetchSuggestionFunc = async () => {
            const suggestion = await fetchSuggestion(board);
            setSuggestion(suggestion);
            setLoading(false);
        }

        fetchSuggestionFunc();
    }, [board]);


    return (
        <header>
            <div className='flex flex-col md:flex-row items-center p-5  rounded-b-2xl'>
                <div className='absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50 -z-50'>

                </div>

                
                <div className="w-48 md:w-72 pb-10 md:pb-0">
                    <Image src={logo3} alt="logo" width={288} height={108} />
                </div>
                <div className='flex items-center space-x-5 flex-1 justify-end w-full'>
                    <form action="" className='flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial'>
                        <MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
                        <input type="text" placeholder='Search' className=' outline-none p-2' value={searchString} onChange={(e) => setSearchString(e.target.value)} />
                        <button type="submit" hidden>Search</button>
                    </form>
                    <Avatar name='Mahammad Zubair' round size='50' color="#0055D1" />
                </div>
            </div>
            <div className="flex items-center justify-center px-5 py-2 md:py-5">
                <p className="flex items-center p-3 text-sm font-normal pr-5 my-3 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1]">
                    <UserCircleIcon className={`inline-block h-10 w-10 text-[#0055D1] mr-1 ${loading && "animate-spin"}`} />
                    {
                        suggestion && !loading ? suggestion : `Summarising your tasks for the day...`
                    }
                </p>
            </div>
        </header>
    )
}

export default Header