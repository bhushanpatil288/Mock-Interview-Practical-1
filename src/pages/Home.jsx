import { siteDescription } from "../constants/info"
import { useNavigate } from "react-router"

const Home = () => {
    const navigate = useNavigate()
    return (
        <div className="hero bg-base-200 h-full">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">
                        {siteDescription}
                    </p>
                    <button className="btn btn-primary" onClick={() => navigate("/dashboard")}>
                        Open Dashboard
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home