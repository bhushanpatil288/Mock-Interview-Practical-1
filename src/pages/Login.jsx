import { useState } from "react"
import { Link, useNavigate } from "react-router"
import AuthLayout from "../components/auth/AuthLayout"
import { useAuth } from "../auth/AuthContext"

const Login = () => {
	const [formData, setFormData] = useState({ email: "", password: "" })
	const [error, setError] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { login } = useAuth()
	const navigate = useNavigate()

	const handleSubmit = async (event) => {
		event.preventDefault()
		setError("")
		setIsSubmitting(true)

		try {
			await login(formData)
			navigate("/dashboard", { replace: true })
		} catch (authError) {
			setError(authError.message || "Unable to sign in. Please try again.")
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<AuthLayout
			eyebrow="Welcome back"
			title="Sign in to your account"
			description="Use your email and password to continue to your support dashboard."
		>
			<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
				{error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
				<div>
					<label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-slate-700">Email address</label>
					<input
						id="login-email"
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
					<div className="mb-2 flex items-center justify-between">
						<label htmlFor="login-password" className="text-sm font-semibold text-slate-700">Password</label>
						<span className="text-xs text-slate-400">Your account password</span>
					</div>
					<input
						id="login-password"
						type="password"
						name="password"
						className="input input-bordered w-full bg-white"
						placeholder="Enter your password"
						autoComplete="current-password"
						value={formData.password}
						onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))}
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary mt-1 w-full" disabled={isSubmitting}>
					{isSubmitting ? <span className="loading loading-spinner loading-sm" aria-hidden="true" /> : "Sign in"}
				</button>
			</form>
			<p className="mt-6 text-center text-sm text-slate-500">
				New to Help Desk Support?{" "}
				<Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-700">Create an account</Link>
			</p>
		</AuthLayout>
	)
}

export default Login
