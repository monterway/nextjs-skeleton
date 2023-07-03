import React from 'react';
import { UserType } from '../../../types/UserType';

const UserContext = React.createContext<UserType | null>(null);

export default UserContext;
