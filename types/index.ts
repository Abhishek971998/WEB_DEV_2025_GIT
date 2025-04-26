export interface Topic {
  id: string;
  title: string;
  category: 'javascript' | 'react';
  summary: string;
  codeExamples: CodeExample[];
  qa?: QA[];
}

export interface CodeExample {
  title: string;
  code: string;
  explanation: string;
}

export interface QA {
  question: string;
  answer: string;
}

export interface SearchState {
  query: string;
  setQuery: (query: string) => void;
}

export interface ThemeState {
  isDark: boolean;
  toggle: () => void;
}