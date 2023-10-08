import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { AuthContext } from './AuthProvider';
import ApiClient from '@/utils/api-client';
import { Unit } from '@/utils/types';

interface UserContextInterface {
  getUserUnits: () => Promise<Unit[] | undefined>;
  units?: Unit[];
}

export const UserContext = createContext<Partial<UserContextInterface>>({});

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useContext(AuthContext);
  const client = useMemo(() => new ApiClient(), []);
  const [units, setUnits] = React.useState<Unit[] | undefined>();

  const getUserUnits = async () => {
    if (!auth?.user?.userId) return
    const res = await (await client.get(`users/${auth.user.userId}/units`)).json()
    const resUnits: Unit[] | undefined = res?.map((unit: any) => ({
      unitCode: unit.unit_code,
      unitName: unit.unit_name,
    }))
    return resUnits
  }

  useEffect(() => {
    if (!auth?.user?.userId) return
    getUserUnits().then((resUnits: Unit[] | undefined) => {
      setUnits(resUnits)
    })
  }, [auth?.user?.userId])

  const value: UserContextInterface = {
    getUserUnits,
    units
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => React.useContext(UserContext)

export type { UserContextInterface };

