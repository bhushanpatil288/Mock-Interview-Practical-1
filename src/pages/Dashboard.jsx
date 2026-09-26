import { NavLink } from "react-router"
import { Outlet } from "react-router"
import { useSelector } from "react-redux"
import { dashboardLinks } from "../constants/info"

const linkIcons = {
  "/dashboard": "⌂",
  "create-ticket": "+",
  tickets: "▤",
  "open-tickets": "○",
  "in-progress-tickets": "↻",
  "resolved-tickets": "✓",
  "closed-tickets": "−",
}

const linkStatuses = {
  "open-tickets": "open",
  "in-progress-tickets": "inprogress",
  "resolved-tickets": "resolved",
  "closed-tickets": "closed",
}

const normalizeStatus = (value) => {
  const statusLabels = ["open", "in-progress", "resolved", "closed"]
  const statusValue = typeof value === "number" ? statusLabels[value - 1] : value
  return String(statusValue ?? "").toLowerCase().replace(/[^a-z]/g, "")
}

const Dashboard = () => {
  const tickets = useSelector((state) => state.ticket?.tickets ?? [])

  const getCount = (path) => {
    const statusKey = linkStatuses[path]
    if (path === "tickets") return tickets.length
    if (!statusKey) return null
    return tickets.filter((ticket) => normalizeStatus(ticket.status) === statusKey).length
  }

  return (
    <section className="h-full p-3 sm:p-5">
      <div className="flex h-full flex-col gap-4 lg:flex-row">
        <aside className="w-full shrink-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm lg:w-64">
          <div className="hidden px-3 pb-3 pt-2 lg:block">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Workspace</p>
            <h2 className="mt-1 font-semibold text-slate-900">Help desk</h2>
          </div>
          <nav aria-label="Dashboard navigation" className="flex gap-1 overflow-x-auto lg:flex-col">
            {dashboardLinks.map((link) => {
              const count = getCount(link.path)
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/dashboard"}
                  className={({ isActive }) => `flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors lg:w-full ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/80 text-base font-semibold shadow-sm" aria-hidden="true">
                    {linkIcons[link.path]}
                  </span>
                  <span className="whitespace-nowrap">{link.name}</span>
                  {count !== null && (
                    <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-500">
                      {count}
                    </span>
                  )}
                </NavLink>
              )
            })}
          </nav>
        </aside>
        <div className="min-h-0 min-w-0 flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Outlet />
        </div>
      </div>
    </section>
  )
}

export default Dashboard