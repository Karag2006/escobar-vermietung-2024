import { UserItem } from "@/types/user";
import { useState } from "react";

export const UserForm = () => {
    const [values, setValues] = useState<UserItem>({
        username: "",
        name: "",
        email: "",
    });
    return (
        <div>
            <form action="">User Form</form>
        </div>
    );
};
