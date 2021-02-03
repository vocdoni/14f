// import Link from "next/link"
import { main } from "../i18n"

const title = process.env.PAGE_TITLE || ""

const NotFound = props => <div id="page-body">
    <div className="not-found body-card center">
        <h1>{title}</h1>
        <p>{main.notFound}</p>
    </div>
</div>

export default NotFound
