import { Switch, Route } from "wouter";
import { Provider } from 'react-redux';
import { store } from "./store/store";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TopRated from "./pages/TopRated";
import Upcoming from "./pages/Upcoming";
import MovieDetail from "./pages/MovieDetail";
import SearchResults from "./pages/SearchResults";

function Router() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/top-rated" component={TopRated} />
        <Route path="/upcoming" component={Upcoming} />
        <Route path="/movie/:id" component={MovieDetail} />
        <Route path="/search" component={SearchResults} />
        <Route>
          <div className="min-h-screen bg-cinema-dark text-white flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
              <p className="text-gray-400">The page you're looking for doesn't exist.</p>
            </div>
          </div>
        </Route>
      </Switch>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;