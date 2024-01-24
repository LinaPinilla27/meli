import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/store';
import SearchLayout from '../components/searchLayout';
import SearchResult from '../components/searchResult';
import ProductDetail from '../components/productDetail';

const AppRouter = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<SearchLayout />} />
            <Route path="/items" element={<SearchResult />} />
            <Route path="/items/:id" element={<ProductDetail />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default AppRouter;