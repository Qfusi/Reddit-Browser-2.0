import { ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useRecoilState, useRecoilValue } from "recoil"
import { profileImageState } from "../atoms/profileAtom"
import { fetchMyProfile, FETCH_MY_PROFILE_SUCCESS } from "../actions/fetchMyProfile";
import { useEffect } from "react";
import { subredditIdState } from "../atoms/subredditAtom";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react/cjs/react.production.min";

function Center() {
    const { data: session } = useSession();
    const [profileImage, setProfileImage] = useRecoilState(profileImageState);
    const selectedSubreddit = useRecoilValue(subredditIdState);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }

    useEffect(() => {
        fetchMyProfile(session.user.accessToken)
        .then((res) => {
            if (res.type === FETCH_MY_PROFILE_SUCCESS)
                setProfileImage(res.payload?.icon_img)
        })
        .catch((err) => {
            console.log(`${err.type} - ${err.payload?.stack}`);
        });
    }, [session]);
    return (
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
            <header className="absolute top-5 right-8">
                <Menu as="div">
                    <Menu.Button onClick={() => _} className="flex items-center space-x-3 opacity-90 bg-slate-900
                    hover:opacity-80 cursor-pointer rounded-lg pr-2 text-white overflow-visible h-10 focus:outline-none">
                        <img className="bg-black relative -left-2 w-16 h-16 rounded-full" src={profileImage} alt="" />
                        <h2>{session?.user.name}</h2>
                        <ChevronDownIcon className="h-5 w-5" />
                    </Menu.Button>
                    
                  <Transition as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="bg-black origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a href="#"
                            className={classNames(active ? 'bg-slate-900' : '', 'block px-4 py-2 text-sm text-gray-500')}>
                            Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a href="#"
                            className={classNames(active ? 'bg-slate-900' : '', 'block px-4 py-2 text-sm text-gray-500')}>
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a href="#"
                            onClick={signOut}
                            className={classNames(active ? 'bg-slate-900' : '', 'block px-4 py-2 text-sm text-gray-500')}>
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
            </header>
            
            <section className={`flex items-end space-x-7 bg-gradient-to-b from-slate-400 to-black h-80 text-white p-8`}>
                <img className="bg-black h-44 w-44 shadow-2xl rounded-full" src={selectedSubreddit?.icon_img} alt="" />
                <div>
                    <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{selectedSubreddit?.display_name}</h1>
                </div>
            </section>
            <div>
                {/* posts */}
            </div>
        </div>
    )
}

export default Center
