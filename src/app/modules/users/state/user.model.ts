export interface User {
  id: number | string;  
  name: string;
  email: string;
  role: string;
}

export function createUser(params: Partial<User>) {
  return {...params  } as User;
}
