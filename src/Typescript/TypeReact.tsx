/*
  ==============================
  TypeScript Full Tutorial (Beginner to Advanced)
  ==============================
*/

// =====================
// 1. BASIC TYPES
// =====================
let id: number = 5; // number
let company: string = "OpenAI"; // string
let isActive: boolean = true; // boolean
let x: any = "Hello"; // any (avoid if possible)

let ids: number[] = [1, 2, 3]; // array of numbers
let arr: any[] = [1, "hello", true]; // array of any

// Tuple
let person: [number, string, boolean] = [1, "John", true];

// Tuple Array
let employees: [number, string][] = [
  [1, "Alice"],
  [2, "Bob"]
];

// Union
let pid: string | number = 22; // variable can be string or number

// Enum
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}

// Object
const user: { id: number; name: string } = {
  id: 1,
  name: "John"
};

// =====================
// 2. INTERFACES
// =====================
interface User {
  id: number;
  name: string;
  age?: number; // optional property
}

const user1: User = {
  id: 1,
  name: "Alice"
};

// Readonly
interface ReadonlyUser {
  readonly id: number;
  name: string;
}

// Function types in interface
interface MathFunc {
  (x: number, y: number): number;
}

const add: MathFunc = (x, y) => x + y;

// =====================
// 3. CLASSES
// =====================
class Person {
  private id: number;
  protected name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  public register(): string {
    return `${this.name} is registered.`;
  }
}

const john = new Person(1, "John");

// Inheritance
class Employee extends Person {
  position: string;

  constructor(id: number, name: string, position: string) {
    super(id, name);
    this.position = position;
  }
}

const emp = new Employee(2, "Steve", "Developer");

// =====================
// 4. GENERICS
// =====================
function getArray<T>(items: T[]): T[] {
  return new Array().concat(items);
}

let numArray = getArray<number>([1, 2, 3]);
let strArray = getArray<string>(["a", "b", "c"]);

// =====================
// 5. TYPE ASSERTIONS
// =====================
let cid: any = 1;
let customerId = cid as number; // asserting type

// =====================
// 6. FUNCTIONS
// =====================
function log(message: string): void {
  console.log(message);
}

function multiply(x: number, y: number): number {
  return x * y;
}

// Optional and default parameters
function greet(name: string = "Guest"): string {
  return `Hello, ${name}`;
}

// =====================
// 7. ADVANCED TYPES
// =====================

// Intersection
type Admin = {
  id: number;
  role: string;
};

type Member = {
  name: string;
};

type AdminMember = Admin & Member;

const adminUser: AdminMember = {
  id: 1,
  role: "admin",
  name: "Admin Joe"
};

// Literal types
let direction: "up" | "down";
direction = "up";

// =====================
// 8. UTILITY TYPES
// =====================
interface Task {
  title: string;
  completed: boolean;
}

type PartialTask = Partial<Task>; // all properties optional

type ReadonlyTask = Readonly<Task>; // all properties readonly

// Pick & Omit
type TitleOnly = Pick<Task, "title">;
type WithoutCompleted = Omit<Task, "completed">;

// =====================
// 9. REACT + TYPESCRIPT EXAMPLE
// =====================
import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const CustomButton: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

const App: React.FC = () => {
  const handleClick = () => alert("Clicked!");

  return <CustomButton label="Click Me" onClick={handleClick} />;
};

export default App;

/*
  This .tsx file contains:
  - Basic types (string, number, boolean, any, union, enums)
  - Interfaces and classes
  - Generics, assertions, and functions
  - Advanced and utility types
  - A practical React component example with props typing
*/
