import { siteName } from "../../constants/info"

const AuthLayout = ({ eyebrow, title, description, children }) => (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-indigo-50/50 to-slate-100 px-4 py-10">
        <div className="w-full max-w-md">
            <div className="mb-6 flex items-center justify-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-sm font-bold tracking-wide text-white shadow-lg shadow-indigo-200" aria-hidden="true">
                    HD
                </span>
                <span className="text-lg font-bold tracking-tight text-slate-900">{siteName}</span>
            </div>
            <section className="rounded-3xl border border-white/80 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8" aria-labelledby="auth-heading">
                <header className="mb-6">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">{eyebrow}</p>
                    <h1 id="auth-heading" className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
                </header>
                {children}
            </section>
            <p className="mt-5 text-center text-xs leading-5 text-slate-500">
                Practice project · Accounts are stored in this browser only; this is not production authentication.
            </p>
        </div>
    </main>
)

export default AuthLayout
