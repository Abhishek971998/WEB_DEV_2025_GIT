import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { TopicCard } from "../components/TopicCard";
import { topics } from "../../data/topics";
import { useSearchStore, useThemeStore } from "../../store";

function TopicList({ category }) {
  const { query } = useSearchStore();
  const filteredTopics = topics.filter(
    (topic) =>
      topic.category === category &&
      (topic.title.toLowerCase().includes(query.toLowerCase()) ||
        topic.summary.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-6">
        {filteredTopics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}

function App() {
  const { isDark } = useThemeStore();
  let nav = useLocation();
  console.log(nav, "nav");

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* <Navigation /> */}
        {nav.pathname == "/react" && <TopicList category="react" />}

        {nav.pathname == "/javascript" && <TopicList category="javascript" />}

        {/* <Routes>
          <Route path="/" element={<Navigate to="/javascript" replace />} />
          <Route
            path="/javascript"
            element={<TopicList category="javascript" />}
          />
          <Route path="/react" element={<TopicList category="react" />} />
        </Routes> */}
      </div>
    </div>
  );
}

export default App;
