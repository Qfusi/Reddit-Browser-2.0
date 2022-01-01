import ItemVote from "./ItemVote";
import Modal from "react-modal";
import { useState } from "react";
import ModalPost from "./ModalPost";
import { BsPinAngle } from "react-icons/bs";
import { timeSince } from "../lib/timeAndDateHelper";

Modal.setAppElement("#__next");

function ListPostItem({ post, id }) {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    }

    return (
        <div className="grid grid-cols-12 text-gray-500 py-2 px-4 hover:bg-gray-900 rounded-lg">
            <div className="flex items-center pr-8 justify-between">
                <p className="text-xs hidden md:inline">{id}</p>
                <ItemVote item={post} />
            </div>
            <div className="col-span-9 flex space-x-2 cursor-pointer" onClick={handleClick}>
                {post.data.thumbnail && <img className="h-16 w-16 cursor-pointer" src={post.data.thumbnail} alt="" />}
                <div className="flex flex-col truncate max-w-screen-lg">
                    <p key={post.data.id} className="text-white cursor-pointer">
                        {post.data.title}
                    </p>
                    <div className="flex text-sm space-x-1">
                        <p>Posted by </p>
                        <p className="cursor-pointer hover:text-white">
                            {`${post.data.author}`}
                        </p>
                        <p>
                            {timeSince(new Date(post.data.created * 1000))}
                        </p>
                        {post.data.stickied ? <BsPinAngle className="h-4 w-4 text-green-500"/> : ""}
                    </div>
                </div>
            </div>
            
            
            <div className="col-span-2 grid grid-cols-2 grid-rows-2 items-center justify-items-center ml-auto md:ml-0 text-sm">
                <p className="hover:text-white cursor-pointer">Share</p>
                <p className="hover:text-white cursor-pointer">Save</p>
                <p className="hover:text-white cursor-pointer">Comments</p>
                <p className="hover:text-white cursor-pointer">Hide</p>
            </div>

            <Modal className="text-gray-500 absolute inset-x-56 inset-y-0 bg-black p-4 
            outline-none overflow-auto border-x border-gray-900 rounded-md scrollbar-hide"
            isOpen={open}
            onRequestClose={() => {if (open){setOpen(false)} }}
            closeTimeoutMS={200}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0,0,0,0.75'
                }
            }}
            >
                <ModalPost post={post} />
            </Modal>
        </div>
    )
}

export default ListPostItem
