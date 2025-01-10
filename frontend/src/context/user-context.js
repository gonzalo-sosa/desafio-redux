import { createContext } from 'react';

const userContext = createContext(null);

userContext.displayName = 'userContext';

export default userContext;
