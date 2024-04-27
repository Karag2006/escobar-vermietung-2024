import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { InputTP24 } from "@/Components/ui/input-tp24";
import { UserItem } from "@/types/user";
import { router } from "@inertiajs/react";
import { useState } from "react";

interface UserFormProps {
    currentID: number;
    close: () => void;
}

export const UserForm = ({ currentID, close }: UserFormProps) => {
    const [values, setValues] = useState<UserItem>({
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
        <div className="p-4">
            <form onSubmit={handleSubmit}>
                <div className="flex gap-10 flex-col md:flex-row">
                    <div className="flex flex-col gap-10 w-full">
                        <InputTP24
                            label="Benutzername (Name fürs Einloggen)*"
                            id="username"
                            value={values.username}
                            onChange={handleChange}
                        />
                        <InputTP24
                            label="Name*"
                            id="name"
                            value={values.name}
                            onChange={handleChange}
                        />
                        <InputTP24
                            label="E-Mail Addresse*"
                            id="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-10 w-full">
                        <InputTP24
                            label="Passwort"
                            id="password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                        />
                        <InputTP24
                            label="Passwort Wiederholen"
                            id="password_confirmation"
                            type="password"
                            value={values.password_confirmation}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="formActions flex gap-2 mt-8">
                    <Button type="submit" variant="success">
                        Senden
                    </Button>
                    <Button type="reset" variant="destructive" onClick={close}>
                        Abbrechen
                    </Button>
                </div>
            </form>
        </div>
    );
};
