// might not use this as signout needs provider kind to execute sign out
import { signOut } from "@/auth"

export default function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut("github")
            }}
        >
            <button type="submit">Sign Out</button>
        </form>
    )
}