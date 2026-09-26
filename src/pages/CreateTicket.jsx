import { useState } from "react"
import { useDispatch } from "react-redux"
import { createTicket } from "../redux/ticketSlice"

const priorityOptions = [
    { value: 1, label: "Low", description: "Routine request", color: "bg-emerald-500", selected: "border-emerald-300 bg-emerald-50 ring-2 ring-emerald-100" },
    { value: 2, label: "Urgent", description: "Needs timely attention", color: "bg-amber-500", selected: "border-amber-300 bg-amber-50 ring-2 ring-amber-100" },
    { value: 3, label: "Critical", description: "High impact or blocked", color: "bg-rose-500", selected: "border-rose-300 bg-rose-50 ring-2 ring-rose-100" },
]

const CreateTicket = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    })
    const [priority, setPriority] = useState(1)
    const [submitted, setSubmitted] = useState(false)
    const [formError, setFormError] = useState("")
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target
        setSubmitted(false)
        setFormError("")
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const title = formData.title.trim()
        const description = formData.description.trim()
        if (!title || !description) {
            setFormError("Enter a title and description before creating the ticket.")
            return
        }

        const ticketData = {
            id: crypto.randomUUID(),
            title,
            description,
            assignedTo: "Unassigned",
            priority,
            status: 1
        }
        dispatch(createTicket(ticketData))
        setSubmitted(true)
        setFormError("")
        setFormData({
            title: "",
            description: ""
        })
        setPriority(1)
    }

    return (
        <section className="h-full overflow-y-auto bg-slate-50/70 p-5 sm:p-7" aria-labelledby="create-ticket-heading">
            <header className="mx-auto mb-6 max-w-2xl">
                <p className="mb-1 text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">New request</p>
                <h1 id="create-ticket-heading" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Create a ticket</h1>
                <p className="mt-2 text-sm text-slate-500">Describe the issue and set its priority so the team can help.</p>
            </header>

            <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                {submitted && (
                    <div role="status" className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 font-bold" aria-hidden="true">✓</span>
                        Ticket created. It is now available in your ticket list.
                    </div>
                )}
                {formError && (
                    <div role="alert" className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                        {formError}
                    </div>
                )}

                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="ticket-title" className="mb-2 block text-sm font-semibold text-slate-800">Ticket title</label>
                        <input
                            id="ticket-title"
                            type="text"
                            className="input input-bordered w-full bg-white"
                            placeholder="e.g. Unable to access my account"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            maxLength={100}
                            required
                        />
                        <p className="mt-1.5 text-xs text-slate-400">Keep it short and specific.</p>
                    </div>

                    <div>
                        <label htmlFor="ticket-description" className="mb-2 block text-sm font-semibold text-slate-800">Description</label>
                        <textarea
                            id="ticket-description"
                            className="textarea textarea-bordered min-h-36 w-full resize-y bg-white"
                            placeholder="Include what happened and any steps you have already tried..."
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            maxLength={1000}
                            required
                        />
                        <p className="mt-1.5 text-right text-xs text-slate-400">{formData.description.length}/1000</p>
                    </div>

                    <fieldset>
                        <legend className="mb-2 text-sm font-semibold text-slate-800">Priority</legend>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            {priorityOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    aria-pressed={priority === option.value}
                                    onClick={() => setPriority(option.value)}
                                    className={`rounded-xl border p-3 text-left transition-all ${priority === option.value ? option.selected : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"}`}
                                >
                                    <span className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                                        <span className={`h-2.5 w-2.5 rounded-full ${option.color}`} />
                                        {option.label}
                                        {priority === option.value && <span className="ml-auto text-xs text-slate-500">Selected</span>}
                                    </span>
                                    <span className="mt-1 block text-xs text-slate-500">{option.description}</span>
                                </button>
                            ))}
                        </div>
                    </fieldset>

                    <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-slate-500">Assigned to the support team after submission.</p>
                        <button type="submit" className="btn btn-primary px-6">
                            Create ticket
                            <span aria-hidden="true">→</span>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default CreateTicket