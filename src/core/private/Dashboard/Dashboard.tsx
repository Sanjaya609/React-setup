import { useGetAllPost } from "./service/dashboard.query";

function Dashboard() {
    const { data: posts } = useGetAllPost();
    return (
        <div>Dashboard</div>
    )
}

export default Dashboard