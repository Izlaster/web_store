import React, { useEffect, useState } from "react";
import { RouterProvider, createHashRouter, RouteObject } from "react-router-dom";

import Home from './pages/Home';
import Proxy from './pages/Proxy';
import FAQ from './pages/FAQ';
import Partners from './pages/Partners';
import Office from './pages/Office';

import { useAuth } from './hooks/useAuth';
import { IUser } from './interfaces/user';

function withUser(Component: React.FC<any>, user: IUser, setUser: (user: IUser) => void) {
  return React.cloneElement(<Component />, { data: user, setUser });
}

function App() {
  const { isAuth, userId, username } = useAuth();
  const [user, setUser] = useState<IUser>({
    id: userId || 0,
    username: username || "Unknown",
    balance: 0,
  });

  if (!window.Telegram?.WebApp) {
    console.error('Объект Telegram.WebApp недоступен!');
  } else {
    console.log('Telegram.WebApp доступен:', window.Telegram.WebApp);
  }

  useEffect(() => {
    if (isAuth) {
      // Логика аутентификации, если пользователь авторизован
      setUser((prevUser) => ({
        ...prevUser,
        id: userId || prevUser.id,
        username: username || prevUser.username,
      }));
    } else {
      console.warn("Пользователь не авторизован.");
    }
  }, [isAuth, userId, username]);

  const routes: RouteObject[] = [
    {
      path: "/",
      element: withUser(Home, user, setUser),
    },
    {
      path: "/proxy",
      element: withUser(Proxy, user, setUser),
    },
    {
      path: "/faq",
      element: withUser(FAQ, user, setUser),
    },
    {
      path: "/partners",
      element: withUser(Partners, user, setUser),
    },
    {
      path: "/profile",
      element: withUser(Office, user, setUser),
    },
  ];

  const router = createHashRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
