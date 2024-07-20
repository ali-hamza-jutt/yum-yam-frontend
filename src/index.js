import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './pages/App/App';
import RecipeDescription from './pages/RecipeDescription/RecipeDescription';
import AuthPage from './pages/AuthPage/AuthPage';
// import { AuthProvider } from './hooks/AuthContext'; // Import the AuthProvider
import Category from './pages/Category/Category';

const Root = ()=>{ 
  return(
    <Router>
      {/* <AuthProvider> */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recipeDescription/:id" element={<RecipeDescription />} />
        {/* <Route path="/recipeDescription" element={<RecipeDescription />} /> */}
        <Route path="/authPage" element={<AuthPage/>}/>
        {/* <Route path="/register" element={<SignupForm/>}/> */}
        <Route path="/:category" element={<Category />} />

      </Routes>
        {/* </AuthProvider> */}
    </Router>
);
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
