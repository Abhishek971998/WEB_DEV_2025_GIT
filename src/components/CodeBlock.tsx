import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy } from "lucide-react";

export const CodeBlock = ({ code, language = "javascript" }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="relative">
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 rounded-md bg-gray-700 text-white opacity-70 hover:opacity-100"
      >
        <Copy className="h-4 w-4" />
      </button>
      <SyntaxHighlighter
        language={language}
        style={tomorrow}
        className="rounded-lg !bg-gray-800"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
