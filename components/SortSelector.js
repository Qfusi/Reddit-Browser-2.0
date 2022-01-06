import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useRecoilState } from 'recoil';
import { subredditClickedState, subSortState, subTopSortState } from '../atoms/subredditAtom';

function classNames(isSelected, ...classes) {
    if (isSelected) {
        classes.push('text-orange-500');
    }
    return classes.filter(Boolean).join(' ');
}

export default function SortSelector() {
    const [subSort, setSubSort] = useRecoilState(subSortState);
    const [subTopSort, setTopSubSort] = useRecoilState(subTopSortState);
    const [, setloadingPosts] = useRecoilState(subredditClickedState);

    return (
        <div className="flex space-x-6">
            {/* Posts from selector */}
            <Transition
                as={Fragment}
                show={subSort == 'top'}
                enter="transition ease-out duration-500"
                enterFrom="opacity-0 translate-x-10"
                enterTo="opacity-100 translate-x-0"
                leave="transition ease-out duration-300"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-10">
                <div className="duration">
                    <Menu as="div" className="relative inline-block text-left w-32">
                        <div className="text-sm text-center space-y-1">
                            <p>Posts from</p>
                            <Menu.Button
                                className="inline-flex justify-center w-full rounded-md  shadow-sm px-2 py-1
                bg-slate-900 text-sm font-medium text-white hover:bg-slate-800 
                focus:outline-none focus:ring-1 
                 focus:ring-orange-100 cursor-pointer">
                                past {subTopSort}
                                <ChevronDownIcon
                                    className="-mr-1 ml-2 h-5 w-5"
                                    aria-hidden="true"
                                />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95">
                            <Menu.Items
                                className="origin-top-right absolute right-0 mt-2 w-28 py-1
                rounded-md border border-gray-800 bg-black ring-1 ring-black
                ring-opacity-5 focus:outline-none z-10">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                subTopSort == 'hour',
                                                active ? 'bg-slate-900' : 'text-gray-500',
                                                'block px-4 py-2 text-sm'
                                            )}
                                            onClick={() => {
                                                if (subTopSort !== 'hour') {
                                                    setTopSubSort('hour');
                                                    setloadingPosts(true);
                                                }
                                            }}>
                                            past hour
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                subTopSort == 'day',
                                                active ? 'bg-slate-900' : 'text-gray-500',
                                                'block px-4 py-2 text-sm'
                                            )}
                                            onClick={() => {
                                                if (subTopSort !== 'day') {
                                                    setTopSubSort('day');
                                                    setloadingPosts(true);
                                                }
                                            }}>
                                            past day
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                subTopSort == 'week',
                                                active ? 'bg-slate-900' : 'text-gray-500',
                                                'block px-4 py-2 text-sm'
                                            )}
                                            onClick={() => {
                                                if (subTopSort !== 'week') {
                                                    setTopSubSort('week');
                                                    setloadingPosts(true);
                                                }
                                            }}>
                                            past week
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                subTopSort == 'month',
                                                active ? 'bg-slate-900' : 'text-gray-500',
                                                'block px-4 py-2 text-sm'
                                            )}
                                            onClick={() => {
                                                if (subTopSort !== 'month') {
                                                    setTopSubSort('month');
                                                    setloadingPosts(true);
                                                }
                                            }}>
                                            past month
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                subTopSort == 'year',
                                                active ? 'bg-slate-900' : 'text-gray-500',
                                                'block px-4 py-2 text-sm'
                                            )}
                                            onClick={() => {
                                                if (subTopSort !== 'year') {
                                                    setTopSubSort('year');
                                                    setloadingPosts(true);
                                                }
                                            }}>
                                            past year
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                subTopSort == 'all',
                                                active ? 'bg-slate-900' : 'text-gray-500',
                                                'block px-4 py-2 text-sm'
                                            )}
                                            onClick={() => {
                                                if (subTopSort !== 'all') {
                                                    setTopSubSort('all');
                                                    setloadingPosts(true);
                                                }
                                            }}>
                                            all time
                                        </a>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </Transition>

            {/* Sort by selector */}
            <Menu as="div" className="relative inline-block text-left">
                <div className="text-sm text-center space-y-1">
                    <p>Sort by</p>
                    <Menu.Button
                        className="inline-flex justify-center w-full rounded-md  shadow-sm px-2 py-1
                bg-slate-900 text-sm font-medium text-white hover:bg-slate-800 
                focus:outline-none focus:ring-1 
                 focus:ring-orange-100 cursor-pointer">
                        {subSort}
                        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items
                        className="origin-top-right absolute right-0 mt-2 w-16 py-1
                rounded-md border border-gray-800 bg-black ring-1 ring-black
                ring-opacity-5 focus:outline-none z-10">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        subSort == 'top',
                                        active ? 'bg-slate-900' : 'text-gray-500',
                                        'block px-4 py-2 text-sm'
                                    )}
                                    onClick={() => {
                                        if (subSort !== 'top') {
                                            setSubSort('top');
                                            setloadingPosts(true);
                                        }
                                    }}>
                                    top
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        subSort == 'hot',
                                        active ? 'bg-slate-900' : 'text-gray-500',
                                        'block px-4 py-2 text-sm'
                                    )}
                                    onClick={() => {
                                        if (subSort !== 'hot') {
                                            setSubSort('hot');
                                            setloadingPosts(true);
                                        }
                                    }}>
                                    hot
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        subSort == 'best',
                                        active ? 'bg-slate-900' : 'text-gray-500',
                                        'block px-4 py-2 text-sm'
                                    )}
                                    onClick={() => {
                                        if (subSort !== 'best') {
                                            setSubSort('best');
                                            setloadingPosts(true);
                                        }
                                    }}>
                                    best
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        subSort == 'new',
                                        active ? 'bg-slate-900' : 'text-gray-500',
                                        'block px-4 py-2 text-sm'
                                    )}
                                    onClick={() => {
                                        if (subSort !== 'new') {
                                            setSubSort('new');
                                            setloadingPosts(true);
                                        }
                                    }}>
                                    new
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        subSort == 'rising',
                                        active ? 'bg-slate-900' : 'text-gray-500',
                                        'block px-4 py-2 text-sm'
                                    )}
                                    onClick={() => {
                                        if (subSort !== 'rising') {
                                            setSubSort('rising');
                                            setloadingPosts(true);
                                        }
                                    }}>
                                    rising
                                </a>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
