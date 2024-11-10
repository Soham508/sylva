import { Dropdown } from "flowbite-react"
import { Avatar } from "flowbite-react/components/Avatar"
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const User = () => {
    const [openModal, setOpenModal] = useState(false);
    const { currentUser, logout } = useAuth();
    const photoURL = currentUser?.photoURL

    const handleLogOut = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error during sign-in:', error);
        }
    };

    return (
        <div className='items-center relative cursor-pointer hover:shadow-xl shadow-lg hover:shadow-slate-400/80 justify-center m-2 rounded-full'>
            <Dropdown
                arrowIcon={false}
                inline
                className="bg-black border p-2  border-slate-900 rounded-lg"
                label={<Avatar alt="User" img={photoURL ? photoURL : 'https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg'} rounded />
                }
            >
                <Dropdown.Header className="text-white">
                    <span className="block text-sm">{currentUser?.displayName}</span>
                    <span className="block truncate text-sm font-medium">{currentUser?.email}</span>
                </Dropdown.Header>
                <Link to='details'><Dropdown.Item className="text-white m-1 hover:text-black rounded-lg ">Personal details</Dropdown.Item></Link>
                <Link to='portfolio'><Dropdown.Item className="text-white m-1 hover:text-black rounded-lg ">Portfolio</Dropdown.Item></Link>
                <Link to='risk-profile'><Dropdown.Item className="text-white m-1 hover:text-black rounded-lg ">Risk profile</Dropdown.Item></Link>
                <Link to='settings'><Dropdown.Item className="text-white m-1 hover:text-black rounded-lg ">Settings</Dropdown.Item></Link>
                <Dropdown.Divider />
                <Dropdown.Item className="p-0 h-8  rounded-lg"> <span className="text-white h-full w-full pl-4 flex items-center justify-start hover:bg-red-700 rounded-lg " onClick={() => setOpenModal(true)}>Sign out</span></Dropdown.Item>
            </Dropdown>

            <Modal show={openModal} size="sm" onClose={() => setOpenModal(false)} popup>
                <Modal.Header className="bg-black rounded-t-lg" />
                <Modal.Body className="bg-black rounded-b-lg">
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto transition mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
                            Are you sure you want to Sign-out?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" className="transition duration-700 ease-in-out hover:scale-105 hover:-translate-y-1" onClick={handleLogOut}>
                                Yes, I'm sure
                            </Button>
                            <button className="bg-slate-100 hover:bg-slate-200 rounded-lg p-2 transition duration-700 ease-in-out hover:scale-105 hover:-translate-y-1" onClick={() => setOpenModal(false)}>
                                No, cancel
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default User