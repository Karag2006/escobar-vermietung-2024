import { Button } from "@/Components/ui/button";
import { InputTP24 } from "@/Components/ui/input-tp24";
import { getUserById } from "@/data/user";
import { useForm } from "@inertiajs/react";

import { useEffect } from "react";

interface UserFormProps {
    currentID: number;
    close: () => void;
}

export const UserForm = ({ currentID, close }: UserFormProps) => {
    const {
        data,
        setData,
        post,
        patch,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        id: currentID,
        username: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const key = e.currentTarget.id;
        const value = e.currentTarget.value;
        setData((data) => ({
            ...data,
            [key]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentID) {
            post("/user", {
                only: ["userList", "errors"],
                onSuccess: (page) => {
                    close();
                },
                onError: (errors) => {
                    console.log(errors);
                },
            });
        } else {
            patch(`/user/${currentID}`, {
                only: ["userList", "errors"],
                onSuccess: (page) => {
                    close();
                },
                onError: (errors) => {
                    console.log(errors);
                },
            });
        }
    };
    useEffect(() => {
        const getCurrentUser = () => {
            if (currentID) {
                getUserById(currentID).then((user) => setData({ ...user }));
            }
        };
        getCurrentUser();
        return;
    }, []);

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit}>
                <div className="flex gap-10 flex-col md:flex-row">
                    <div className="flex flex-col gap-10 w-full">
                        <InputTP24
                            label="Benutzername (Name fürs Einloggen)*"
                            id="username"
                            value={data.username}
                            onChange={handleChange}
                            disabled={processing}
                        />
                        <InputTP24
                            label="Name*"
                            id="name"
                            value={data.name}
                            onChange={handleChange}
                            disabled={processing}
                        />
                        <InputTP24
                            label="E-Mail Addresse*"
                            id="email"
                            value={data.email}
                            onChange={handleChange}
                            disabled={processing}
                        />
                    </div>
                    <div className="flex flex-col gap-10 w-full">
                        <InputTP24
                            label="Passwort"
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={handleChange}
                            disabled={processing}
                        />
                        <InputTP24
                            label="Passwort Wiederholen"
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={handleChange}
                            disabled={processing}
                        />
                    </div>
                </div>

                <div className="formActions flex gap-2 mt-8">
                    <Button
                        type="submit"
                        variant="success"
                        disabled={processing}
                    >
                        Senden
                    </Button>
                    <Button
                        type="reset"
                        variant="destructive"
                        onClick={close}
                        disabled={processing}
                    >
                        Abbrechen
                    </Button>
                </div>
            </form>
        </div>
    );
};
