// criar um hook para o contexto do usuário
// Language: typescript

import { User } from "firebase/auth";
import { createContext, useContext, useState } from "react";

export const UserContext = createContext<User | null>(null);
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
    }
    export const useUser = () => {
        const user = useContext(UserContext);
        if (!user) {
            throw new Error("useUser must be used within a UserProvider");
        }
        return user;
    }
    export const useUserId = () => {
        const user = useUser();
        return user.uid;
    }
    export const useUserName = () => {
        const user = useUser();
        return user.displayName;
    }
