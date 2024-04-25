import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { UserItem } from "@/types/user";
import { router } from "@inertiajs/react";
import { useState } from "react";

interface UserFormProps {
    currentID: number;
    close: () => void;
}

export const UserForm = ({ currentID, close }: UserFormProps) => {
    const [values, setValues] = useState<UserItem>({
        id: 0,
        username: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const key = e.currentTarget.id;
        const value = e.currentTarget.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post("/user", values);
        router.reload({ only: ["userList"] });
        close();
    };
    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    label="Benutzername"
                    id="username"
                    value={values.username}
                    onChange={handleChange}
                />
                <Input
                    label="Name"
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                />
                <Input
                    label="E-Mail"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                />
                <Input
                    label="Passwort"
                    id="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                />
                <Input
                    label="Passwort Wiederholen"
                    id="password_confirmation"
                    type="password"
                    value={values.password_confirmation}
                    onChange={handleChange}
                />

                <Button type="submit" variant="success">
                    Senden
                </Button>
            </form>
        </div>
    );
};
