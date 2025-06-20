import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { takeEvery, put, call, delay } from "redux-saga/effects";

// Action Types
const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
const INCREMENT_ASYNC = "INCREMENT_ASYNC";
const INCREMENT = "INCREMENT";

// Action Creators
const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
  description: "Triggers user data fetch",
});

const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
  description: "Handles successful user data fetch",
});

const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
  description: "Handles failed user data fetch",
});

const incrementAsync = () => ({
  type: INCREMENT_ASYNC,
  description: "Triggers async increment",
});

// Initial State
const initialState = {
  count: 0,
  user: null,
  loading: false,
  error: null,
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case FETCH_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
};

// Mock API call replaced with real API call
const fetchUserAPI = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return response.json();
};

// Update the saga to handle the async API call
function* fetchUserSaga() {
  try {
    const user = yield call(fetchUserAPI);
    yield put(fetchUserSuccess(user));
  } catch (error) {
    yield put(fetchUserFailure(error.message));
  }
}

function* incrementAsyncSaga() {
  yield delay(1000);
  yield put({ type: INCREMENT });
}

function* rootSaga() {
  yield takeEvery(FETCH_USER_REQUEST, fetchUserSaga);
  yield takeEvery(INCREMENT_ASYNC, incrementAsyncSaga);
}

// Create Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// Create Store
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

// Run Saga
sagaMiddleware.run(rootSaga);

// Component
const ReduxSagaDemo = () => {
  const { count, user, loading, error } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
          padding: "20px",
          backgroundColor: "#1a237e",
          color: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "2.5em" }}>Redux Saga Playground</h1>
        <p style={{ fontSize: "1.2em", opacity: 0.9 }}>
          Learn Redux Saga through interactive examples
        </p>
      </div>

      {/* Concepts Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          }}
        >
          <h2 style={{ color: "#1a237e", marginTop: 0 }}>
            🎭 What is Redux Saga?
          </h2>
          <p style={{ lineHeight: 1.6 }}>
            Redux Saga is a middleware library that helps manage side effects in
            Redux applications. It uses ES6 Generators to make asynchronous
            flows easy to read, write and test.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#e3f2fd",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          }}
        >
          <h2 style={{ color: "#1a237e", marginTop: 0 }}>⚡ Key Concepts</h2>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              display: "grid",
              gap: "10px",
            }}
          >
            <li
              style={{
                padding: "10px",
                backgroundColor: "white",
                borderRadius: "5px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <strong>🎭 Saga:</strong> A function that handles side effects
            </li>
            <li
              style={{
                padding: "10px",
                backgroundColor: "white",
                borderRadius: "5px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <strong>⚡ Effects:</strong> Plain JavaScript objects containing
              instructions
            </li>
            <li
              style={{
                padding: "10px",
                backgroundColor: "white",
                borderRadius: "5px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <strong>🔄 takeEvery:</strong> Spawns a saga on each action
              dispatched
            </li>
            <li
              style={{
                padding: "10px",
                backgroundColor: "white",
                borderRadius: "5px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <strong>📞 call:</strong> Executes a function and returns its
              result
            </li>
            <li
              style={{
                padding: "10px",
                backgroundColor: "white",
                borderRadius: "5px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <strong>⏳ delay:</strong> Creates a delay effect
            </li>
          </ul>
        </div>
      </div>

      {/* Live Demo Section */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "40px",
        }}
      >
        <h2 style={{ color: "#1a237e", marginTop: 0, textAlign: "center" }}>
          🎮 Live Demo
        </h2>

        {/* Async Counter */}
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "30px",
          }}
        >
          <h3 style={{ color: "#1a237e" }}>Async Counter</h3>
          <div
            style={{
              fontSize: "2em",
              textAlign: "center",
              margin: "20px 0",
              color: "#1a237e",
              fontWeight: "bold",
            }}
          >
            {count}
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => dispatch(incrementAsync())}
              style={{
                padding: "12px 24px",
                fontSize: "1.1em",
                backgroundColor: "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
              onMouseOver={(e) =>
                (e.target.style.transform = "translateY(-2px)")
              }
              onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
            >
              Increment Async (1s delay)
            </button>
          </div>
        </div>

        {/* User Data Fetch */}
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ color: "#1a237e" }}>User Data Fetch</h3>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <button
              onClick={() => dispatch(fetchUserRequest())}
              style={{
                padding: "12px 24px",
                fontSize: "1.1em",
                backgroundColor: "#2196f3",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
              onMouseOver={(e) =>
                (e.target.style.transform = "translateY(-2px)")
              }
              onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
            >
              Fetch User Data
            </button>
          </div>

          {loading && (
            <div
              style={{
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#e3f2fd",
                borderRadius: "5px",
                marginBottom: "20px",
              }}
            >
              <div style={{ fontSize: "1.2em", color: "#1a237e" }}>
                Loading...
              </div>
            </div>
          )}

          {error && (
            <div
              style={{
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#ffebee",
                borderRadius: "5px",
                marginBottom: "20px",
              }}
            >
              <div style={{ color: "#c62828" }}>Error: {error}</div>
            </div>
          )}

          {user && (
            <div
              style={{
                backgroundColor: "#e8f5e9",
                padding: "20px",
                borderRadius: "5px",
                marginTop: "20px",
              }}
            >
              <h4 style={{ color: "#1a237e", marginTop: 0 }}>User Details:</h4>
              <pre
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "5px",
                  overflow: "auto",
                  margin: 0,
                }}
              >
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Behind the Scenes Section */}
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "40px",
        }}
      >
        <h2 style={{ color: "#1a237e", marginTop: 0 }}>🔍 Behind the Scenes</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
            }}
          >
            <h3 style={{ color: "#1a237e", marginTop: 0 }}>
              Async Counter Flow
            </h3>
            <ol style={{ paddingLeft: "20px" }}>
              <li>Click "Increment Async" button</li>
              <li>INCREMENT_ASYNC action dispatched</li>
              <li>Saga middleware catches action</li>
              <li>1-second delay executed</li>
              <li>INCREMENT action dispatched</li>
              <li>Counter updates in UI</li>
            </ol>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
            }}
          >
            <h3 style={{ color: "#1a237e", marginTop: 0 }}>User Fetch Flow</h3>
            <ol style={{ paddingLeft: "20px" }}>
              <li>Click "Fetch User Data" button</li>
              <li>FETCH_USER_REQUEST action dispatched</li>
              <li>Saga middleware catches action</li>
              <li>API call executed</li>
              <li>Success/Failure action dispatched</li>
              <li>UI updates with result</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Code Examples Section */}
      <div
        style={{
          backgroundColor: "#1a237e",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ color: "white", marginTop: 0 }}>📝 Saga Code Examples</h2>
        <div
          style={{
            backgroundColor: "#2c3e50",
            padding: "20px",
            borderRadius: "8px",
            overflow: "auto",
          }}
        >
          <pre
            style={{
              color: "#fff",
              margin: 0,
              fontFamily: "'Fira Code', monospace",
              fontSize: "0.9em",
              lineHeight: 1.5,
            }}
          >
            {`// Root Saga
function* rootSaga() {
  yield takeEvery(FETCH_USER_REQUEST, fetchUserSaga);
  yield takeEvery(INCREMENT_ASYNC, incrementAsyncSaga);
}

// User Fetch Saga
function* fetchUserSaga() {
  try {
    const user = yield call(fetchUserAPI);
    yield put(fetchUserSuccess(user));
  } catch (error) {
    yield put(fetchUserFailure(error.message));
  }
}

// Async Increment Saga
function* incrementAsyncSaga() {
  yield delay(1000);
  yield put({ type: INCREMENT });
}`}
          </pre>
        </div>
        <p
          style={{
            color: "white",
            marginTop: "20px",
            opacity: 0.9,
            lineHeight: 1.6,
          }}
        >
          <strong>Note:</strong> Sagas use generator functions (function*) and
          yield effects to handle asynchronous operations. They make it easy to
          test and reason about complex async flows.
        </p>
      </div>
    </div>
  );
};

// App Component
const App = () => {
  return (
    <Provider store={store}>
      <ReduxSagaDemo />
    </Provider>
  );
};

export default App;
