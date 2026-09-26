
import { useSelector } from "react-redux"

const statusOptions = [
  { key: "open", label: "Open tickets", color: "#2563eb", light: "#eff6ff", icon: "○" },
  { key: "inprogress", label: "In progress", color: "#d97706", light: "#fffbeb", icon: "↻" },
  { key: "resolved", label: "Resolved", color: "#059669", light: "#ecfdf5", icon: "✓" },
  { key: "closed", label: "Closed", color: "#64748b", light: "#f1f5f9", icon: "−" },
]

const normalizeStatus = (value) => {
  const statusLabels = ["open", "in-progress", "resolved", "closed"]
  const statusValue = typeof value === "number" ? statusLabels[value - 1] : value
  return String(statusValue ?? "").toLowerCase().replace(/[^a-z]/g, "")
}

const Stats = () => {
  const tickets = useSelector((state) => state.ticket?.tickets ?? [])
  const counts = statusOptions.reduce((result, option) => {
    result[option.key] = tickets.filter((ticket) => normalizeStatus(ticket.status) === option.key).length
    return result
  }, {})
  const highPriorityCount = tickets.filter((ticket) => Number(ticket.priority) >= 2).length

  const cards = [
    {
      label: "Total tickets",
      value: tickets.length,
      detail: "All tickets in your queue",
      icon: "▤",
      color: "#4f46e5",
      light: "#eef2ff",
    },
    ...statusOptions.map((option) => ({
      ...option,
      value: counts[option.key],
      detail: option.key === "open" ? "Waiting for a response" : `${option.label} tickets`,
    })),
    {
      label: "Urgent & critical",
      value: highPriorityCount,
      detail: "Tickets needing attention",
      icon: "!",
      color: "#e11d48",
      light: "#fff1f2",
    },
  ]

  return (
    <section className="h-full overflow-y-auto bg-slate-50/70 p-5 sm:p-7" aria-labelledby="stats-heading">
      <header className="mb-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="mb-1 text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">Overview</p>
          <h1 id="stats-heading" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Support dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-500">A quick snapshot of your help desk activity.</p>
        </div>
        <span className="badge badge-outline gap-2 border-slate-200 bg-white px-3 py-3 text-slate-600">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> Updated live
        </span>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <article key={card.label} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500">{card.label}</p>
                <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{card.value}</p>
              </div>
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-xl text-xl font-semibold"
                style={{ color: card.color, backgroundColor: card.light }}
              >
                {card.icon}
              </span>
            </div>
            <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">{card.detail}</p>
          </article>
        ))}
      </div>

      <section className="mt-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm" aria-labelledby="status-summary-heading">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 id="status-summary-heading" className="font-semibold text-slate-900">Ticket status</h2>
            <p className="mt-1 text-sm text-slate-500">How your current queue is distributed</p>
          </div>
          <span className="text-sm font-medium text-slate-600">{tickets.length} total</span>
        </div>
        <div className="flex h-3 overflow-hidden rounded-full bg-slate-100" role="img" aria-label="Ticket counts by status">
          {statusOptions.map((option) => (
            <span
              key={option.key}
              title={`${option.label}: ${counts[option.key]}`}
              style={{
                width: `${tickets.length ? (counts[option.key] / tickets.length) * 100 : 0}%`,
                backgroundColor: option.color,
              }}
            />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {statusOptions.map((option) => (
            <div key={option.key} className="flex items-center gap-2 text-sm text-slate-600">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: option.color }} />
              <span>{option.label}</span>
              <span className="font-semibold text-slate-900">{counts[option.key]}</span>
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}

export default Stats