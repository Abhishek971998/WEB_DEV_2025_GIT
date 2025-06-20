"use strict";

import React, { useState } from "react";

let helloWorld: unknown = "Hello World";
helloWorld = 24;

// 1. Basic Types
type BasicTypes = {
  string: string;
  number: number;
  boolean: boolean;
  array: number[];
  tuple: [string, number];
  enum: "RED" | "GREEN" | "BLUE";
  any: any;
  unknown: unknown;
  // never: never;
  void: void;
};

// Tuple type examples
type NumberBooleanTuple = [number, boolean];
type StringNumberTuple = [string, number];
type MixedTuple = [string, number, boolean];

// 2. Interface vs Type
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
  readonly createdAt: Date; // Readonly property
}

type Admin = User & {
  // Intersection type
  role: "ADMIN";
  permissions: string[];
};

// 3. Generics
function getFirstItem<T>(arr: T[]): T | undefined {
  return arr[0];
}

// 5. Type Guards
function isAdmin(user: User | Admin): user is Admin {
  return "role" in user;
}

// UtilityTypesExamples.tsx
// ✅ TypeScript Utility Types – Interview Prep with Explanations

// 1. Partial<T>
// 🔹 Makes all properties in a type optional.
type User_ = { name: string; age: number };
type PartialUser = Partial<User_>; // { name?: string; age?: number }

// 2. Required<T>
// 🔹 Makes all optional properties required.
type Config = { debug?: boolean };
type StrictConfig = Required<Config>; // { debug: boolean }

// 3. Readonly<T>
// 🔹 Prevents properties from being reassigned (makes them immutable).
type Todo = { title: string };
const task: Readonly<Todo> = { title: "TS prep" };
// task.title = "New"; ❌ Error: Cannot assign to 'title' because it is a read-only property.

// 4. Pick<T, K>
// 🔹 Creates a new type by selecting specific keys from another type.
type FullUser = { id: number; name: string; email: string };
type BasicUser = Pick<FullUser, "id" | "name">; // { id: number; name: string }

// 5. Omit<T, K>
// 🔹 Opposite of Pick — removes specified keys from a type.
type NoEmailUser = Omit<FullUser, "email">; // { id: number; name: string }

// 6. Record<K, T>
// 🔹 Creates an object type with keys `K` and values of type `T`.
type Roles = "admin" | "user";
const permissions: Record<Roles, boolean> = {
  admin: true,
  user: false,
};

// 7. Exclude<T, U>
// 🔹 Excludes specific members from a union type.
type Letters = "a" | "b" | "c";
type Excluded = Exclude<Letters, "a">; // "b" | "c"

// 8. Extract<T, U>
// 🔹 Extracts common members from two union types.
type Extracted = Extract<"a" | "b" | "c", "a" | "d">; // "a"

// 9. NonNullable<T>
// 🔹 Removes `null` and `undefined` from a type.
type MaybeString = string | null | undefined;
type JustString = NonNullable<MaybeString>; // string

// --------------------
// (Optional for use in React component)
const UtilityDemo = () => {
  return <div>Utility Types Demo – Check console or type info</div>;
};

const TypeScriptExample: React.FC = () => {
  // State with TypeScript
  const [selectedConcept, setSelectedConcept] = useState<string>("basic");
  const [codeExample, setCodeExample] = useState<string>("");

  // Example data
  const basicTypes: BasicTypes = {
    string: "Hello",
    number: 42,
    boolean: true,
    array: [1, 2, 3],
    tuple: ["age", 25],
    enum: "RED",
    any: "can be anything",
    unknown: "needs type checking",
    // never: (() => {
    //   throw new Error("never returns");
    // })(),
    void: undefined,
  };

  // Tuple examples
  const numberBooleanTuple: NumberBooleanTuple = [24, true];
  const stringNumberTuple: StringNumberTuple = ["age", 25];
  const mixedTuple: MixedTuple = ["name", 42, true];

  console.log("Tuple examples:", {
    numberBooleanTuple,
    stringNumberTuple,
    mixedTuple,
  });

  const user: User = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    createdAt: new Date(),
  };

  type Status = "success" | "error" | "loading";

  function showStatus(status: Status) {
    if (status === "loading") {
      console.log("Loading...");
    } else {
      console.log("Status:", status);
    }
  }

  showStatus("loading");

  // config.port = 4000; ❌ Error: Cannot assign to 'port' because it is a read-only property.

  const admin: Admin = {
    ...user,
    role: "ADMIN",
    permissions: ["read", "write", "delete"],
  };

  // Concept explanations
  const concepts = {
    basic: {
      title: "Basic Types",
      description: "TypeScript's fundamental type system",
      example: `// Tuple type definition
type NumberBooleanTuple = [number, boolean];
type StringNumberTuple = [string, number];
type MixedTuple = [string, number, boolean];

// Tuple usage
const numberBooleanTuple: NumberBooleanTuple = [24, true];
const stringNumberTuple: StringNumberTuple = ["age", 25];
const mixedTuple: MixedTuple = ["name", 42, true];`,
    },
    interface: {
      title: "Interface vs Type",
      description: "Defining object shapes and type aliases",
      example: `interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional
  readonly createdAt: Date; // Readonly
}`,
    },
    generics: {
      title: "Generics",
      description: "Creating reusable type-safe components",
      example: `function getFirstItem<T>(arr: T[]): T | undefined {
  return arr[0];
}`,
    },
    utility: {
      title: "Utility Types",
      description: "Built-in type transformations",
      example: `type PartialUser = Partial<User>;
type RequiredUser = Required<User>;
type ReadonlyUser = Readonly<User>;
type PickUser = Pick<User, "name" | "email">;
type OmitUser = Omit<User, "id" | "createdAt">;`,
    },
    typeGuards: {
      title: "Type Guards",
      description: "Runtime type checking",
      example: `function isAdmin(user: User | Admin): user is Admin {
  return "role" in user;
}`,
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          TypeScript Concepts
        </h1>

        {/* Navigation */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {Object.entries(concepts).map(([key, concept]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedConcept(key);
                setCodeExample(concept.example);
              }}
              className={`p-4 rounded-lg text-center transition-colors ${
                selectedConcept === key
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-blue-50"
              }`}
            >
              {concept.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {concepts[selectedConcept as keyof typeof concepts].title}
          </h2>
          <p className="text-gray-600 mb-6">
            {concepts[selectedConcept as keyof typeof concepts].description}
          </p>

          {/* Code Example */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <pre className="text-green-400 overflow-x-auto">
              <code>{codeExample}</code>
            </pre>
          </div>

          {/* Live Example */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Live Example
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              {selectedConcept === "basic" && (
                <div className="space-y-2">
                  {Object.entries(basicTypes).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-4">
                      <span className="font-mono text-blue-600">{key}:</span>
                      <span className="font-mono text-gray-700">
                        {JSON.stringify(value)}
                      </span>
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold mb-2">Tuple Examples:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-4">
                        <span className="font-mono text-blue-600">
                          numberBooleanTuple:
                        </span>
                        <span className="font-mono text-gray-700">
                          {JSON.stringify(numberBooleanTuple)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-mono text-blue-600">
                          stringNumberTuple:
                        </span>
                        <span className="font-mono text-gray-700">
                          {JSON.stringify(stringNumberTuple)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-mono text-blue-600">
                          mixedTuple:
                        </span>
                        <span className="font-mono text-gray-700">
                          {JSON.stringify(mixedTuple)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedConcept === "interface" && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <span className="font-mono text-blue-600">User:</span>
                    <span className="font-mono text-gray-700">
                      {JSON.stringify(user, null, 2)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-mono text-blue-600">Admin:</span>
                    <span className="font-mono text-gray-700">
                      {JSON.stringify(admin, null, 2)}
                    </span>
                  </div>
                </div>
              )}

              {selectedConcept === "generics" && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <span className="font-mono text-blue-600">
                      First number:
                    </span>
                    <span className="font-mono text-gray-700">
                      {getFirstItem([1, 2, 3])}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-mono text-blue-600">
                      First string:
                    </span>
                    <span className="font-mono text-gray-700">
                      {getFirstItem(["a", "b", "c"])}
                    </span>
                  </div>
                </div>
              )}

              {selectedConcept === "typeGuards" && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <span className="font-mono text-blue-600">
                      Is Admin (User):
                    </span>
                    <span className="font-mono text-gray-700">
                      {isAdmin(user) ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-mono text-blue-600">
                      Is Admin (Admin):
                    </span>
                    <span className="font-mono text-gray-700">
                      {isAdmin(admin) ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeScriptExample;
