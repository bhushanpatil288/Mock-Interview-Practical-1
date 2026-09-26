import { Link, useNavigate } from "react-router"
import { siteName } from "../constants/info"
import { useAuth } from "../auth/AuthContext"

const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const initials = user?.name?.trim().split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "U"

    const handleLogout = () => {
        logout()
        navigate("/login", { replace: true })
    }

    return (
        <div className="navbar border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6">
            <div className="flex-1">
                <Link to="/dashboard" className="flex items-center gap-3 text-lg font-bold tracking-tight text-slate-900">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-xs font-bold text-white" aria-hidden="true">HD</span>
                    {siteName}
                </Link>
            </div>
            <div className="flex items-center gap-3">
                <span className="hidden text-right sm:block">
                    <span className="block text-sm font-semibold text-slate-800">{user?.name}</span>
                    <span className="block text-xs text-slate-500">{user?.email}</span>
                </span>
                <div className="dropdown dropdown-end">
                    <button type="button" tabIndex={0} className="btn btn-ghost btn-circle" aria-label="Open account menu">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">{initials}</span>
                    </button>
                    <ul tabIndex={-1} className="menu dropdown-content z-10 mt-3 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                        <li className="menu-title px-3 py-2">
                            <span className="truncate">{user?.email}</span>
                        </li>
                        <li>
                            <button type="button" onClick={handleLogout} className="text-rose-600">Sign out</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar