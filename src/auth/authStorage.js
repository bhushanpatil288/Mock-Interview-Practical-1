const USERS_KEY = "helpdesk_users"
const SESSION_KEY = "helpdesk_session"
const PASSWORD_HASH_ITERATIONS = 120000

const readUsers = () => {
    try {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]")
        return Array.isArray(users) ? users : []
    } catch {
        return []
    }
}

const toHex = (bytes) => Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("")
const fromHex = (value) => new Uint8Array(value.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)))

const hashPassword = async (password, salt) => {
    if (!globalThis.crypto?.subtle) {
        throw new Error("Secure password hashing is unavailable in this browser.")
    }

    const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        "PBKDF2",
        false,
        ["deriveBits"],
    )
    const hash = await crypto.subtle.deriveBits(
        { name: "PBKDF2", salt, iterations: PASSWORD_HASH_ITERATIONS, hash: "SHA-256" },
        key,
        256,
    )
    return toHex(new Uint8Array(hash))
}

const writeSession = (user) => {
    const sessionUser = { id: user.id, name: user.name, email: user.email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser))
    return sessionUser
}

export const getCurrentUser = () => {
    try {
        const user = JSON.parse(localStorage.getItem(SESSION_KEY) ?? "null")
        return user?.id && user?.email ? user : null
    } catch {
        return null
    }
}

export const registerUser = async ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()
    const normalizedName = name.trim()
    const users = readUsers()

    if (!normalizedName) throw new Error("Enter your name.")
    if (password.length < 8) throw new Error("Use a password with at least 8 characters.")
    if (!globalThis.crypto?.subtle || !globalThis.crypto?.getRandomValues || !globalThis.crypto?.randomUUID) {
        throw new Error("Secure browser features are unavailable. Try a modern browser on localhost.")
    }

    if (users.some((user) => user.email === normalizedEmail)) {
        throw new Error("An account with this email already exists.")
    }

    const salt = crypto.getRandomValues(new Uint8Array(16))
    const user = {
        id: crypto.randomUUID(),
        name: normalizedName,
        email: normalizedEmail,
        salt: toHex(salt),
        passwordHash: await hashPassword(password, salt),
    }
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]))
    return writeSession(user)
}

export const authenticateUser = async ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()
    const user = readUsers().find((item) => item.email === normalizedEmail)

    if (!user) throw new Error("Email or password is incorrect.")

    const passwordHash = await hashPassword(password, fromHex(user.salt))
    if (passwordHash !== user.passwordHash) {
        throw new Error("Email or password is incorrect.")
    }

    return writeSession(user)
}

export const clearCurrentUser = () => localStorage.removeItem(SESSION_KEY)
