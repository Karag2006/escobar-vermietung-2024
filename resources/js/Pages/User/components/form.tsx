import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

import { getUserById } from "@/data/user";

import { InputTP24 } from "@/Components/ui/input-tp24";
import { DecisionButtons } from "@/Components/decision-buttons";
import { toast } from "sonner";

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
                onSuccess: () => {
                    toast.success("Benutzer erfolgreich angelegt");
                    close();
                },
                onError: () => {
                    toast.error("Es sind fehler aufgetreten");
                },
            });
        } else {
            patch(`/user/${currentID}`, {
                only: ["userList", "errors"],
                onSuccess: () => {
                    toast.success("Benutzer erfolgreich geändert");
                    close();
                },
                onError: () => {
                    toast.error("Es sind fehler aufgetreten");
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
                    <div className="flex flex-col gap-6 w-full">
                        <InputTP24
                            label="Benutzername (Name fürs Einloggen)*"
                            id="username"
                            value={data.username}
                            error={errors.username}
                            onChange={handleChange}
                            onFocus={() => clearErrors("username")}
                            disabled={processing}
                        />
                        <InputTP24
                            label="Name*"
                            id="name"
                            value={data.name}
                            error={errors.name}
                            onChange={handleChange}
                            onFocus={() => clearErrors("name")}
                            disabled={processing}
                        />
                        <InputTP24
                            label="E-Mail Addresse*"
                            id="email"
                            value={data.email}
                            error={errors.email}
                            onChange={handleChange}
                            onFocus={() => clearErrors("email")}
                            disabled={processing}
                        />
                    </div>
                    <div className="flex flex-col gap-6 w-full">
                        <InputTP24
                            label="Passwort"
                            id="password"
                            type="password"
                            value={data.password}
                            error={errors.password}
                            onFocus={() => clearErrors("password")}
                            onChange={handleChange}
                            disabled={processing}
                        />
                        <InputTP24
                            label="Passwort Wiederholen"
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            error={errors.password_confirmation}
                            onFocus={() => clearErrors("password_confirmation")}
                            onChange={handleChange}
                            disabled={processing}
                        />
                    </div>
                </div>

                <DecisionButtons
                    sendForm
                    yesLabel="Speichern"
                    noLabel="Abbrechen"
                    disabled={processing}
                    noAction={close}
                />
            </form>
        </div>
    );
};
