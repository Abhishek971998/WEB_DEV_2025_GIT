import React from "react";
import { Topic } from "../../types";
import { CodeBlock } from "./CodeBlock";
import { ChevronDown, ChevronUp } from "lucide-react";

export const TopicCard = ({ topic }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div
        className="p-4 cursor-pointer flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {topic.title}
        </h3>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </div>

      {isExpanded && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {topic.summary}
          </p>

          {topic.codeExamples.map((example, index) => (
            <div key={index} className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {example.title}
              </h4>
              <CodeBlock code={example.code} />
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {example.explanation}
              </p>
            </div>
          ))}

          {topic.qa && (
            <div className="mt-6">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Interview Q&A
              </h4>
              {topic.qa.map((qa, index) => (
                <div key={index} className="mb-4">
                  <p className="font-medium text-gray-900 dark:text-white">
                    Q: {qa.question}
                  </p>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    A: {qa.answer}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
