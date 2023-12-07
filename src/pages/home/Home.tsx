import React, { useEffect, useState } from 'react';
import { IUser } from '../../types/IUser';
import { useUserContext } from '../../contexts/Context';
import { GetUser } from '../../api/User';

const Home: React.FC = () => {

    const { jwt } = useUserContext();

    const [users, setUsers] = useState<IUser[]>([]);
    const [usersLoading, setUsersLoading] = useState<boolean>();
    const [usersError, setUsersError] = useState<string>();

    useEffect(() => {
        const getAllUsers = async () => {
            if (!jwt) return [];
        
            setUsersError(undefined);
            setUsersLoading(true);

            const allUsersResult = await GetUser(jwt);

            if (allUsersResult.isSuccess) {
                setUsers(allUsersResult.users || []);
            } else {
                setUsersError(allUsersResult.error);
            }

            setUsersLoading(false);
        };

        getAllUsers();
    }, [jwt]);

    return (
    <div>
        Home
    </div>
    );
}

export default Home;