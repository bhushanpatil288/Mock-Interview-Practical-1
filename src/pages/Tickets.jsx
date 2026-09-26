import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router"
import Card from "../components/common/Card"

const normalizeStatus = (value) => {
    const statusLabels = ["open", "in-progress", "resolved", "closed"]
    const statusValue = typeof value === "number" ? statusLabels[value - 1] : value
    return String(statusValue ?? "").toLowerCase().replace(/[^a-z]/g, "")
}

const Tickets = ({ statusFilter }) => {
    const [search, setSearch] = useState("")
    const tickets = useSelector((state) => state.ticket?.tickets ?? [])
    const visibleTickets = tickets.filter((ticket) => {
        const matchesStatus = !statusFilter || normalizeStatus(ticket.status) === normalizeStatus(statusFilter)
        const searchableText = `${ticket.title} ${ticket.description} ${ticket.assignedTo ?? ""}`.toLowerCase()
        return matchesStatus && searchableText.includes(search.trim().toLowerCase())
    })
    const heading = statusFilter ? `${statusFilter} tickets` : "All tickets"
    const isClosedTicketsView = normalizeStatus(statusFilter) === "closed"

    return (
        <section className="h-full overflow-y-auto bg-slate-50/70 p-5 sm:p-7" aria-labelledby="tickets-heading">
            <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="mb-1 text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">Support queue</p>
                    <h1 id="tickets-heading" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{heading}</h1>
                    <p className="mt-2 text-sm text-slate-500">
                        {visibleTickets.length} {visibleTickets.length === 1 ? "ticket" : "tickets"}
                        {search && " matching your search"}
                    </p>
                </div>
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                    <label className="input input-bordered flex w-full items-center gap-2 bg-white sm:w-64" aria-label="Search tickets">
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-slate-400">
                            <circle cx="11" cy="11" r="7" />
                            <path d="m20 20-4-4" />
                        </svg>
                        <input
                            type="search"
                            className="grow"
                            placeholder="Search tickets"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </label>
                    <Link to="/dashboard/create-ticket" className="btn btn-primary whitespace-nowrap">
                        <span aria-hidden="true" className="text-lg leading-none">+</span>
                        Create ticket
                    </Link>
                </div>
            </header>

            {visibleTickets.length ? (
                <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
                    {visibleTickets.map((ticket) => (
                        <li key={ticket.id} className="min-w-0">
                            <Card ticket={ticket} canDelete={isClosedTicketsView} />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                    <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl text-indigo-600" aria-hidden="true">
                        {search ? "⌕" : "✓"}
                    </span>
                    <h2 className="text-lg font-semibold text-slate-900">
                        {search ? "No matching tickets" : statusFilter ? `No ${statusFilter.toLowerCase()} tickets` : "Your queue is clear"}
                    </h2>
                    <p className="mt-2 max-w-sm text-sm text-slate-500">
                        {search ? "Try another title, description, or assignee." : "Create a ticket to start tracking a support request."}
                    </p>
                    {!search && !statusFilter && (
                        <Link to="/dashboard/create-ticket" className="btn btn-primary btn-sm mt-5">Create your first ticket</Link>
                    )}
                </div>
            )}
        </section>
    )
}

export default Tickets