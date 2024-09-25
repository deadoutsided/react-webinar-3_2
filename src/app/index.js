import { useCallback, useContext, useEffect, useState } from "react";
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import { Routes, Route } from "react-router-dom";
import { ProductPage } from "./product-page";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/:current' element={<Main />} />
        <Route path='/products/:productId' element={<ProductPage />} />
      </Routes>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
