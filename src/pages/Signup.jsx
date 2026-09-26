import { useState } from "react"
import { Link, useNavigate } from "react-router"
import AuthLayout from "../components/auth/AuthLayout"
import { useAuth } from "../auth/AuthContext"

const Signup = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" })
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { signup } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError("")
        setIsSubmitting(true)

        try {
            await signup(formData)
            navigate("/dashboard", { replace: true })
        } catch (authError) {
            setError(authError.message || "Unable to create your account. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <AuthLayout
            eyebrow="Get started"
            title="Create your account"
            description="Sign up with your name, email, and a password to start managing support tickets."
        >
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
                <div>
                    <label htmlFor="signup-name" className="mb-2 block text-sm font-semibold text-slate-700">Full name</label>
                    <input
                        id="signup-name"
                        type="text"
                        name="name"
                        className="input input-bordered w-full bg-white"
                        placeholder="Your name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="signup-email" className="mb-2 block text-sm font-semibold text-slate-700">Email address</label>
                    <input
                        id="signup-email"
                        type="email"
                        name="email"
                        className="input input-bordered w-full bg-white"
                        placeholder="you@example.com"
                        autoComplete="email"
                        value={formData.email}
                        onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="signup-password" className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                    <input
                        id="signup-password"
                        type="password"
                        name="password"
                        className="input input-bordered w-full bg-white"
                        placeholder="At least 8 characters"
                        autoComplete="new-password"
                        minLength={8}
                        value={formData.password}
                        onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))}
                        required
                    />
                    <p className="mt-1.5 text-xs text-slate-400">Use at least 8 characters.</p>
                </div>
                <button type="submit" className="btn btn-primary mt-1 w-full" disabled={isSubmitting}>
                    {isSubmitting ? <span className="loading loading-spinner loading-sm" aria-hidden="true" /> : "Create account"}
                </button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">Sign in</Link>
            </p>
        </AuthLayout>
    )
}

export default Signup
