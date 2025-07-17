export default function ScriptLoadingGuide() {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">
        Async vs Defer in JavaScript & React
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          What are &lt;script&gt;, async, and defer?
        </h2>
        <p className="mt-2 text-gray-700">
          Normally, scripts in HTML block page rendering.{" "}
          <code className="bg-gray-100 px-1">async</code> and
          <code className="bg-gray-100 px-1">defer</code> help optimize load
          time.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">1. Async</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            Loads script <strong>asynchronously</strong> and executes{" "}
            <strong>immediately</strong>.
          </li>
          <li>
            Does <strong>not wait</strong> for HTML parsing.
          </li>
          <li>
            Script execution <strong>order is not guaranteed</strong>.
          </li>
        </ul>
        <p className="mt-2 text-green-700">
          ✅ Use for: analytics, ads, independent scripts.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">2. Defer</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            Loads script <strong>asynchronously</strong>.
          </li>
          <li>
            Executes <strong>after HTML is fully parsed</strong>.
          </li>
          <li>
            <strong>Order is preserved</strong> for multiple defer scripts.
          </li>
        </ul>
        <p className="mt-2 text-blue-700">
          ✅ Use for: scripts dependent on DOM or script order.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Quick Comparison
        </h2>
        <table className="table-auto w-full mt-3 border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Feature</th>
              <th className="px-4 py-2 border">Normal</th>
              <th className="px-4 py-2 border">Async</th>
              <th className="px-4 py-2 border">Defer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Blocks HTML?</td>
              <td className="border px-4 py-2">Yes</td>
              <td className="border px-4 py-2">No</td>
              <td className="border px-4 py-2">No</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Executes after parse?</td>
              <td className="border px-4 py-2">No</td>
              <td className="border px-4 py-2">No</td>
              <td className="border px-4 py-2">Yes</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Order preserved?</td>
              <td className="border px-4 py-2">Yes</td>
              <td className="border px-4 py-2">No</td>
              <td className="border px-4 py-2">Yes</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Using External Scripts in React
        </h2>
        <p className="text-gray-700 mt-2">
          Use <code className="bg-gray-100 px-1">useEffect</code> to load
          scripts:
        </p>
        <pre className="bg-gray-100 text-sm p-3 rounded mt-2 overflow-x-auto">
          {`useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://example.com/script.js";
    script.defer = true; // or async = true
    document.body.appendChild(script);
  }, []);`}
        </pre>
      </section>

      <footer className="mt-8 text-gray-500 text-sm">
        ✅ Summary: <strong>Async</strong> = fast but unordered.{" "}
        <strong>Defer</strong> = ordered and DOM-safe. Prefer{" "}
        <strong>defer</strong> in React unless script must load immediately.
      </footer>
    </div>
  );
}
