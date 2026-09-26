import { useDispatch } from "react-redux"
import { mockEmployees } from "../../constants/mockEmployees"
import { assignTicket, deleteClosedTicket, updateTicketStatus } from "../../redux/ticketSlice"

const statusStyles = {
    open: { label: "Open", classes: "bg-blue-50 text-blue-700 ring-blue-600/10" },
    inprogress: { label: "In progress", classes: "bg-amber-50 text-amber-700 ring-amber-600/10" },
    resolved: { label: "Resolved", classes: "bg-emerald-50 text-emerald-700 ring-emerald-600/10" },
    closed: { label: "Closed", classes: "bg-slate-100 text-slate-600 ring-slate-500/10" },
}

const statusOptions = [
    { value: 1, label: "Open" },
    { value: 2, label: "In progress" },
    { value: 3, label: "Resolved" },
    { value: 4, label: "Closed" },
]

const Card = ({ ticket, canDelete = false }) => {
    const { title, description, priority, assignedTo = "Unassigned", status } = ticket
    const assignee = String(assignedTo ?? "Unassigned")
    const dispatch = useDispatch()

    const statusLabels = ["open", "in-progress", "resolved", "closed"]
    const rawStatus = typeof status === "number" ? statusLabels[status - 1] : status
    const normalizedStatus = String(rawStatus ?? "").toLowerCase().replace(/[^a-z]/g, "")
    const ticketStatus = statusStyles[normalizedStatus] ?? { label: "Unknown", classes: "bg-slate-100 text-slate-600 ring-slate-500/10" }
    const currentStatus = statusOptions.find((option) => option.label.toLowerCase().replace(/[^a-z]/g, "") === normalizedStatus)?.value ?? 1
    const priorityDetails = {
        1: { label: "Low priority", color: "bg-emerald-500" },
        2: { label: "Urgent", color: "bg-amber-500" },
        3: { label: "Critical", color: "bg-rose-500" },
    }
    const ticketPriority = priorityDetails[priority] ?? { label: "Priority unset", color: "bg-slate-300" }
    const selectedEmployee = mockEmployees.find((employee) =>
        ticket.assignedToId
            ? employee.id === String(ticket.assignedToId)
            : employee.name === assignee,
    )
    const handleAssignment = (event) => {
        const employee = mockEmployees.find((item) => item.id === event.target.value)
        if (employee) {
            dispatch(assignTicket({ id: ticket.id, assignedTo: employee.name, assignedToId: employee.id }))
        }
    }
    const handleStatusChange = (event) => {
        dispatch(updateTicketStatus({ id: ticket.id, status: Number(event.target.value) }))
    }
    const handleDelete = () => {
        const confirmed = window.confirm(`Permanently delete "${title || "Untitled ticket"}"?`)
        if (confirmed) dispatch(deleteClosedTicket(ticket.id))
    }

    return (
        <article className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className={`h-1.5 ${ticketPriority.color}`} />
            <div className="flex h-full flex-col p-5">
                <div className="mb-3 flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${ticketStatus.classes}`}>
                        {ticketStatus.label}
                    </span>
                    <span className="text-xs font-medium text-slate-500">{ticketPriority.label}</span>
                </div>
                <h2 className="line-clamp-1 text-base font-semibold text-slate-900" title={title}>{title || "Untitled ticket"}</h2>
                <p className="mt-2 line-clamp-3 min-h-[3.75rem] text-sm leading-5 text-slate-500">
                    {description || "No description provided."}
                </p>
                <div className="mt-auto flex items-center gap-3 border-t border-slate-100 pt-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-700" aria-hidden="true">
                        {assignee.slice(0, 1).toUpperCase() || "?"}
                    </span>
                    <div className="min-w-0">
                        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Assigned to</p>
                        <p className="truncate text-sm font-medium text-slate-700">{assignee}</p>
                    </div>
                </div>
                <label className="mt-4 flex flex-col gap-2 text-xs font-medium text-slate-500">
                    Assign to
                    <select
                        className="select select-bordered select-sm w-full bg-white text-sm text-slate-700"
                        value={selectedEmployee?.id ?? ""}
                        onChange={handleAssignment}
                        aria-label={`Assign ${title || "untitled ticket"} to an employee`}
                    >
                        <option value="" disabled>Select an employee</option>
                        <optgroup label="Support staff">
                            {mockEmployees.filter((employee) => employee.role === "support").map((employee) => (
                                <option key={employee.id} value={employee.id}>{employee.name}</option>
                            ))}
                        </optgroup>
                        <optgroup label="Employees">
                            {mockEmployees.filter((employee) => employee.role === "employee").map((employee) => (
                                <option key={employee.id} value={employee.id}>{employee.name}</option>
                            ))}
                        </optgroup>
                    </select>
                </label>
                <label className="mt-3 flex items-center justify-between gap-3 text-xs font-medium text-slate-500">
                    Update status
                    <select
                        className="select select-bordered select-sm w-36 bg-white text-sm text-slate-700"
                        value={currentStatus}
                        onChange={handleStatusChange}
                        aria-label={`Update status for ${title || "untitled ticket"}`}
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </label>
                {canDelete && (
                    <button
                        type="button"
                        className="btn btn-sm btn-outline mt-4 border-rose-200 text-rose-700 hover:border-rose-300 hover:bg-rose-50"
                        onClick={handleDelete}
                    >
                        Delete closed ticket
                    </button>
                )}
            </div>
        </article>
    )
}

export default Card;
