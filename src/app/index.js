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
    auth: state.session.auth,
    userDataLoading: state.session.userDataLoading,
  }));
  const callbacks = {
    getUserData: useCallback(
      mode => {
        store.actions.profile.getUserData(mode);
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
          element={<ProtectedRouteElement auth={selected.auth} loading={selected.userDataLoading} checkAuth={callbacks.getUserData} element={<Login />}/>}
        />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
