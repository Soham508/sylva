import { useAuth } from "@/context/AuthContext"

const Dashboard = () => {

    const { currentUser } = useAuth();

    return (
        <div>{currentUser?.displayName}</div>
    )
}

export default Dashboard