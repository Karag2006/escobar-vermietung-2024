import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

import { getUserById } from "@/data/user";

import { InputTP24 } from "@/Components/ui/input-tp24";
import { DecisionButtons } from "@/Components/decision-buttons";

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
                <div className="flex gap-10 flex-col md:flex-row mb-8">
                    <div className="flex flex-col gap-6 w-full">
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
                    <div className="flex flex-col gap-6 w-full">
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

                <DecisionButtons
                    sendForm
                    yesLabel="Senden"
                    noLabel="Abbrechen"
                    disabled={processing}
                    noAction={close}
                />
            </form>
        </div>
    );
};
