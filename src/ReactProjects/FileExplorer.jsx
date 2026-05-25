import React, { useState } from "react";

const initialData = {
  id: 1,
  name: "root",
  isFolder: true,
  children: [],
};

const FileNode = ({ node, addNode }) => {
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState("");
  const [isFolder, setIsFolder] = useState(false);

  return (
    <div style={{ marginLeft: 20 }}>
      <div>
        {node.isFolder ? "📁" : "📄"} {node.name}
        {node.isFolder && (
          <>
            <button
              onClick={() => {
                setShowInput(true);
                setIsFolder(false);
              }}
            >
              +File
            </button>

            <button
              onClick={() => {
                setShowInput(true);
                setIsFolder(true);
              }}
            >
              +Folder
            </button>
          </>
        )}
      </div>

      {/* Input box */}
      {showInput && (
        <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
          <button
            onClick={() => {
              if (!name.trim()) return;

              addNode(node.id, name, isFolder);
              setName("");
              setShowInput(false);
            }}
          >
            Save
          </button>
        </div>
      )}

      {/* Children */}
      {node.children.map((child) => (
        <FileNode key={child.id} node={child} addNode={addNode} />
      ))}
    </div>
  );
};

export default function App() {
  const [tree, setTree] = useState(initialData);
  const [id, setId] = useState(2);

  const addNode = (parentId, name, isFolder) => {
    const newNode = {
      id: id,
      name,
      isFolder,
      children: isFolder ? [] : [],
    };

    setId((prev) => prev + 1);

    const updateTree = (node) => {
      if (node.id === parentId) {
        return {
          ...node,
          children: [...node.children, newNode],
        };
      }

      return {
        ...node,
        children: node.children.map(updateTree),
      };
    };

    setTree(updateTree(tree));
  };

  return (
    <div>
      <h3>Step 3: Add File + Folder</h3>
      <FileNode node={tree} addNode={addNode} />
    </div>
  );
}
