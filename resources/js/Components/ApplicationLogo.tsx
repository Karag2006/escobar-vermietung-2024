import { Link } from "@inertiajs/react";

export default function ApplicationLogo() {
    return (
        <Link href="/">
            <img alt="Escobar Logo" src="/site-logo.jpg" className="w-full" />
        </Link>
    );
}
