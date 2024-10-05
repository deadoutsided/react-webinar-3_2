import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import useStore from '../hooks/use-store';
import { ProtectedRouteElement } from '../components/protected-route-element';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();

  const activeModal = useSelector(state => state.modals.name);

  const selected = useSelector(state => ({
    auth: state.profile.auth,
    userDataLoading: state.profile.userDataLoading,
  }));
  const callbacks = {
    getUserData: useCallback(
      async mode => {
        await store.actions.profile.getUserData(mode);
      },
      [store],
    ),
  };

  useEffect(() => {
    callbacks.getUserData('No error');
  }, []);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={"/login"} element={<Login />} />
        <Route
          path={"/profile"}
          element={<ProtectedRouteElement auth={selected.auth} element={<Login />} to={'/login'}/>}
        />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
