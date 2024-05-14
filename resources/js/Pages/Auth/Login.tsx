import { useEffect, FormEventHandler } from "react";
import { Head, useForm } from "@inertiajs/react";

import GuestLayout from "@/Layouts/GuestLayout";
import { Button } from "@/Components/ui/button";
import { InputTP24 } from "@/Components/ui/input-tp24";
import { toast } from "sonner";

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

        post(route("login"), {
            only: ["errors"],
            onSuccess: () => {
                toast.success("Eingeloggt");
            },
            onError: () => {
                toast.error("Fehler beim einloggen");
            },
        });
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
                <InputTP24
                    label="Benutzer Name"
                    error={errors.username}
                    id="username"
                    type="text"
                    name="username"
                    className="my-4 w-full"
                    disabled={processing}
                    autoComplete="username"
                    value={data.username}
                    onChange={(e) => setData("username", e.target.value)}
                    onFocus={() => clearErrors("username")}
                />

                <InputTP24
                    label="Passwort"
                    error={errors.password}
                    id="password"
                    type="password"
                    name="password"
                    disabled={processing}
                    className="my-4 w-full"
                    autoComplete="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    onFocus={() => clearErrors("password")}
                />

                <div className="flex items-center justify-end mt-8">
                    <Button
                        variant="primary"
                        size="sm"
                        disabled={processing}
                        type="submit"
                    >
                        Log in
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
};

export default Login;
