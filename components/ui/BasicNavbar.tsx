import type { ComponentChild } from "preact"


export default function BasicNavbar({logo}: {logo: ComponentChild}) {
    return <nav className="max-w-4xl p-4 mx-auto flex justify-center">
        {/* logo */}
        <a href="/" className="flex items-center space-x-2">
            {logo}
        </a>
    </nav>
}