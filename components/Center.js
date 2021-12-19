import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil"
import { profileImageState } from "../atoms/profileAtom"
import { fetchMyProfile } from "../actions/fetchMyProfile";
import { useEffect } from "react";

function Center() {
    const { data: session } = useSession();
    const [profileImage, setProfileImage] = useRecoilState(profileImageState);

    useEffect(() => {
        fetchMyProfile(session.user.accessToken, session.user.name)
        .then((res) => {
            console.log(res)
            setProfileImage(res.payload?.icon_img)
        })
        .catch((err) => {
            console.log(`${err.type} - ${err.payload?.stack}`);
        });
    }, [session]);

    return (
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
            <header className="absolute top-5 right-8">
                <div className="flex items-center space-x-3 opacity-90 bg-red-400
                hover:opacity-80 cursor-pointer rounded-lg p-1 pr-2 text-white">
                    <img className="rounded-full w-10 h-10" src={profileImage} alt="" />
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className="h-5 w-5" />
                </div>
            </header>
        </div>
    )
}

export default Center
