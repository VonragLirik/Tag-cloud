import { Route, Routes } from 'react-router-dom';

import { TagCloudComponent } from './components';

export const App = () => {
  return (
    <Routes>
      <Route path="*" element={<TagCloudComponent />} />
    </Routes>
  );
};
