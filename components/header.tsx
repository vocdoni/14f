import Link from "next/link"
// import AppContext from './app-context'
// import { useContext } from "react"

type Props = {
    children?: any
}

export default function Header({ children, ...props }: Props) {
    const title = process.env.PAGE_TITLE || ""

    return <div id="header">
        <ul className="left">
            <li><Link href="/">{title}</Link></li>
        </ul>
        <ul className="right">
            <li><a href="https://blog.vocdoni.io" target="_blank">Blog</a></li>
            <li><a href="https://docs.vocdoni.io" target="_blank">Docs</a></li>
            <li><a href="https://discord.gg/sQCxgYs" target="_blank">Discord</a></li>
        </ul>
    </div>
}
