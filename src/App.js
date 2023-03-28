import {React} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ArticlesCardsGrid from './components/Card';
import Login from './components/Login';
import useToken from './components/useToken';
import HeroImageBackground from './components/Hero';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  };
  
  return (
    <>
      <HeroImageBackground/>
      <BrowserRouter>
        <Switch>
          <Route path="/articles">
            <ArticlesCardsGrid />
          </Route>
        </Switch>
      </BrowserRouter>
      </>
  );
}

export default App;