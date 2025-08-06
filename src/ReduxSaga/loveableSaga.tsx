import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  Database,
  Cog,
  Zap,
} from "lucide-react";

interface ReduxAction {
  type: string;
  payload?: any;
}

interface ReduxState {
  todos: Array<{ id: number; text: string; completed: boolean }>;
  loading: boolean;
  error: string | null;
}

const ReduxSagaEducation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [reduxState, setReduxState] = useState<ReduxState>({
    todos: [],
    loading: false,
    error: null,
  });
  const [actionQueue, setActionQueue] = useState<ReduxAction[]>([]);
  const [sagaEffects, setSagaEffects] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const reduxConcepts = [
    {
      title: "Store",
      description: "Single source of truth that holds the entire state tree",
      icon: <Database className="w-5 h-5" />,
      color: "bg-gradient-store",
    },
    {
      title: "Actions",
      description: "Plain objects that describe what happened",
      icon: <Zap className="w-5 h-5" />,
      color: "bg-gradient-action",
    },
    {
      title: "Reducers",
      description: "Pure functions that specify how state changes",
      icon: <Cog className="w-5 h-5" />,
      color: "bg-gradient-reducer",
    },
  ];

  const sagaConcepts = [
    {
      title: "Generator Functions",
      description: "Functions that can pause and resume execution",
      example:
        "function* watchFetchTodos() { yield takeEvery('FETCH_TODOS', fetchTodos); }",
    },
    {
      title: "Effects",
      description: "Declarative instructions for middleware",
      example:
        "yield call(api.fetchTodos); yield put({ type: 'FETCH_SUCCESS', data });",
    },
    {
      title: "Side Effects",
      description: "Handle async operations, API calls, and side effects",
      example: "yield fork(watchFetchTodos); yield race({ task, cancel });",
    },
  ];

  const demoActions: ReduxAction[] = [
    { type: "FETCH_TODOS_REQUEST", payload: null },
    {
      type: "FETCH_TODOS_SUCCESS",
      payload: [{ id: 1, text: "Learn Redux", completed: false }],
    },
    { type: "ADD_TODO_REQUEST", payload: { text: "Learn Redux Saga" } },
    {
      type: "ADD_TODO_SUCCESS",
      payload: { id: 2, text: "Learn Redux Saga", completed: false },
    },
  ];

  const sagaSteps = [
    "🎯 Action dispatched: FETCH_TODOS_REQUEST",
    "🔄 Saga watching for FETCH_TODOS_REQUEST",
    "📡 call(api.fetchTodos) - API call made",
    "✅ API response received",
    "📤 put(FETCH_TODOS_SUCCESS) - New action dispatched",
    "🏪 Reducer updates state with new todos",
  ];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= demoActions.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    if (currentStep < demoActions.length) {
      const action = demoActions[currentStep];
      setActionQueue((prev) => [...prev, action]);

      // Simulate saga effects
      if (action.type.includes("REQUEST")) {
        setSagaEffects((prev) => [
          ...prev,
          `🔄 Saga intercepted: ${action.type}`,
        ]);
        setTimeout(() => {
          setSagaEffects((prev) => [...prev, `📡 Making API call...`]);
        }, 500);
      }

      // Update Redux state based on action
      if (
        action.type === "FETCH_TODOS_SUCCESS" &&
        Array.isArray(action.payload)
      ) {
        setReduxState((prev) => ({
          ...prev,
          todos: action.payload as Array<{
            id: number;
            text: string;
            completed: boolean;
          }>,
          loading: false,
        }));
      } else if (
        action.type === "ADD_TODO_SUCCESS" &&
        action.payload &&
        "id" in action.payload
      ) {
        setReduxState((prev) => ({
          ...prev,
          todos: [
            ...prev.todos,
            action.payload as { id: number; text: string; completed: boolean },
          ],
          loading: false,
        }));
      } else if (action.type.includes("REQUEST")) {
        setReduxState((prev) => ({ ...prev, loading: true }));
      }
    }
  }, [currentStep]);

  const handlePlay = () => setIsPlaying(!isPlaying);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setReduxState({ todos: [], loading: false, error: null });
    setActionQueue([]);
    setSagaEffects([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Redux & Redux Saga
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master state management and side effects in React applications
          </p>
        </div>

        {/* Interactive Demo */}
        <Card className="border-primary/20 shadow-glow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Interactive Demo</CardTitle>
                <CardDescription>
                  Watch Redux actions flow through sagas and update the store
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button onClick={handlePlay} variant="outline" size="sm">
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                <Button onClick={handleReset} variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Actions Flow */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">
                  Action Queue
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {actionQueue.map((action, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border transition-all duration-500 ${
                        index === currentStep
                          ? "border-primary bg-primary/10 scale-105"
                          : "border-border bg-card"
                      }`}
                    >
                      <div className="text-sm font-mono font-medium text-primary">
                        {action.type}
                      </div>
                      {action.payload && (
                        <div className="text-xs text-muted-foreground mt-1 font-mono">
                          {JSON.stringify(action.payload, null, 2)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Saga Effects */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-accent">
                  Saga Effects
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {sagaEffects.map((effect, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg border border-accent/20 bg-accent/5 animate-slide-in"
                    >
                      <div className="text-sm">{effect}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Redux State */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-secondary">
                  Current State
                </h3>
                <div className="p-4 rounded-lg border bg-secondary/5 border-secondary/20">
                  <pre className="text-sm font-mono">
                    {JSON.stringify(reduxState, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Educational Content */}
        <Tabs defaultValue="redux" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="redux">Redux Fundamentals</TabsTrigger>
            <TabsTrigger value="saga">Redux Saga</TabsTrigger>
          </TabsList>

          <TabsContent value="redux" className="space-y-6">
            {/* Redux Core Concepts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reduxConcepts.map((concept, index) => (
                <Card
                  key={index}
                  className="border-primary/20 hover:border-primary/40 transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${concept.color} text-white`}
                      >
                        {concept.icon}
                      </div>
                      <CardTitle className="text-xl">{concept.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {concept.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Redux Principles */}
            <Card>
              <CardHeader>
                <CardTitle>Three Principles of Redux</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">
                      1
                    </Badge>
                    <div>
                      <h4 className="font-semibold">Single Source of Truth</h4>
                      <p className="text-sm text-muted-foreground">
                        The global state is stored in a single store object tree
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">
                      2
                    </Badge>
                    <div>
                      <h4 className="font-semibold">State is Read-Only</h4>
                      <p className="text-sm text-muted-foreground">
                        State can only be changed by dispatching actions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">
                      3
                    </Badge>
                    <div>
                      <h4 className="font-semibold">Pure Functions</h4>
                      <p className="text-sm text-muted-foreground">
                        Reducers are pure functions that return new state
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Code Example */}
            <Card>
              <CardHeader>
                <CardTitle>Redux Example Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted font-mono text-sm">
                    <div className="text-primary font-semibold mb-2">
                      // Action
                    </div>
                    <div>const addTodo = (text) =&gt; ({`{`}</div>
                    <div className="ml-2">type: 'ADD_TODO',</div>
                    <div className="ml-2">payload: {`{ text }`}</div>
                    <div>{`});`}</div>

                    <div className="text-primary font-semibold mb-2 mt-4">
                      // Reducer
                    </div>
                    <div>
                      const todosReducer = (state = [], action) =&gt; {`{`}
                    </div>
                    <div className="ml-2">switch (action.type) {`{`}</div>
                    <div className="ml-4">case 'ADD_TODO':</div>
                    <div className="ml-6">
                      return [...state, action.payload];
                    </div>
                    <div className="ml-4">default:</div>
                    <div className="ml-6">return state;</div>
                    <div className="ml-2">{`}`}</div>
                    <div>{`};`}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saga" className="space-y-6">
            {/* Saga Concepts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sagaConcepts.map((concept, index) => (
                <Card
                  key={index}
                  className="border-accent/20 hover:border-accent/40 transition-colors"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{concept.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground text-sm">
                      {concept.description}
                    </p>
                    <div className="p-3 bg-muted rounded-lg">
                      <code className="text-xs font-mono">
                        {concept.example}
                      </code>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Saga Effects */}
            <Card>
              <CardHeader>
                <CardTitle>Common Saga Effects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      effect: "call",
                      description: "Call a function and wait for result",
                    },
                    {
                      effect: "put",
                      description: "Dispatch an action to the store",
                    },
                    {
                      effect: "take",
                      description: "Wait for an action to be dispatched",
                    },
                    {
                      effect: "fork",
                      description: "Start a saga in a non-blocking way",
                    },
                    {
                      effect: "race",
                      description:
                        "Run effects in parallel, cancel others when one completes",
                    },
                    {
                      effect: "select",
                      description: "Get data from the current state",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg border border-border"
                    >
                      <Badge variant="secondary" className="font-mono">
                        {item.effect}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Saga Example */}
            <Card>
              <CardHeader>
                <CardTitle>Redux Saga Example</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg bg-muted font-mono text-sm space-y-1">
                  <div className="text-accent font-semibold">
                    // Watcher Saga
                  </div>
                  <div>function* watchFetchTodos() {"{"}</div>
                  <div className="ml-2">
                    yield takeEvery('FETCH_TODOS_REQUEST', fetchTodos);
                  </div>
                  <div>{"}"}</div>

                  <div className="text-accent font-semibold mt-4">
                    // Worker Saga
                  </div>
                  <div>function* fetchTodos() {"{"}</div>
                  <div className="ml-2">try {"{"}</div>
                  <div className="ml-4">
                    const todos = yield call(api.fetchTodos);
                  </div>
                  <div className="ml-4">
                    yield put(
                    {"{ type: 'FETCH_TODOS_SUCCESS', payload: todos }"});
                  </div>
                  <div className="ml-2">{"} catch (error) {"}</div>
                  <div className="ml-4">
                    yield put(
                    {"{ type: 'FETCH_TODOS_FAILURE', payload: error.message }"}
                    );
                  </div>
                  <div className="ml-2">{"}"}</div>
                  <div>{"}"}</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Benefits Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Redux Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  Predictable state management
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  Time-travel debugging
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  Centralized state
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  Great developer tools
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Redux Saga Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-accent" />
                  Powerful async flow control
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-accent" />
                  Easy testing with generators
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-accent" />
                  Cancellable operations
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-accent" />
                  Background sync capabilities
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReduxSagaEducation;
