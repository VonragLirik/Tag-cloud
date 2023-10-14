import { Navigate, Route, Routes } from 'react-router-dom';

import { TagCloudComponent } from './components';

export const App = () => {
  return (
    <Routes>
      <Route
        path=""
        element={
          <Navigate
            to={{
              pathname: `/`,
            }}
          />
        }
      />
      <Route path="/" element={<TagCloudComponent />} />

      {/* Route for redirect unknown paths */}
      <Route
        path="*"
        element={
          <Navigate
            to={{
              pathname: `/`,
            }}
          />
        }
      />
    </Routes>
  );
};
