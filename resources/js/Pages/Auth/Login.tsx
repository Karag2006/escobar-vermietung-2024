import { useEffect, FormEventHandler } from "react";
import { Head, useForm } from "@inertiajs/react";

import GuestLayout from "@/Layouts/GuestLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

const Login = ({ status }: { status?: string }) => {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            username: "",
            password: "",
            remember: false,
        });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <Input
                    label="Benutzer Name"
                    error={errors.username}
                    id="username"
                    type="text"
                    name="username"
                    className="my-4 w-full"
                    disabled={processing}
                    autoComplete="username"
                    onChange={(e) => setData("username", e.target.value)}
                    onFocus={() => clearErrors("username")}
                />

                <Input
                    label="Passwort"
                    error={errors.password}
                    id="password"
                    type="password"
                    name="password"
                    disabled={processing}
                    className="my-4 w-full"
                    autoComplete="password"
                    onChange={(e) => setData("password", e.target.value)}
                    onFocus={() => clearErrors("password")}
                />

                <div className="flex items-center justify-end mt-8">
                    <Button variant="primary" size="sm" disabled={processing}>
                        Log in
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
};

export default Login;
