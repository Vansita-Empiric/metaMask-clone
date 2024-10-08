import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

const Welcome = lazy(() => import("./components/Welcome"));
const CreatePassword = lazy(() => import("./components/CreatePassword"));
const ReviewRecoveryPhase = lazy(() => import("./components/ReviewRecoveryPhase"));
const Complition = lazy(() => import("./components/Complition"));
const Home = lazy(() => import("./components/Home"));

function App() {
  return (
    <div>
        <Router>
          <Routes>
          <Route
            path="/welcome"
            element={
              <Suspense
                fallback={
                  <div className="text-center">Home page is loading...</div>
                }
              >
                <Welcome />
              </Suspense>
            }
          />
          <Route 
            path="/create-password"
            element={
              <Suspense 
                fallback={
                  <div className="text-center">Create - Password page is loading...</div>
                }
              >
                <CreatePassword />
              </Suspense>
            }
          />
          <Route 
            path="/review-recovery-phase"
            element={
              <Suspense
                fallback={
                  <div className="text-center">Recovery - phase page is loading...</div>
                }
              >
                <ReviewRecoveryPhase />
              </Suspense>
            }
          />
          <Route 
            path="/completion"
            element={
              <Suspense 
                fallback={
                  <div className="text-center">Completion page is loading...</div>
                }
              >
                <Complition />
              </Suspense>
            }
          />
          <Route 
            path="/home"
            element={
              <Suspense
                fallback={
                  <div className="text-center">Home page is loading...</div>
                }
              >
                <Home />
              </Suspense>
            }
          />
          </Routes>
        </Router>
        <ToastContainer />        
    </div>
  );
}

export default App;
