import "./style.scss";

export default function CssConcepts() {
  function BoxSizingDemo() {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h2>🔍 Box Sizing: content-box vs border-box</h2>

        <div style={{ display: "flex", gap: "40px", marginTop: "30px" }}>
          {/* Content-box */}
          <div>
            <h3>📦 content-box (default)</h3>
            <div
              style={{
                // boxSizing: "content-box",
                width: "200px",
                padding: "20px",
                border: "10px solid red",
                backgroundColor: "#ffeaea",
              }}
            >
              <strong>Width: 200px</strong>
              <br />
              {/* Content + Padding + Border = <strong>260px actual width</strong> */}
              Total size stays <strong>exactly 200px</strong>
            </div>
          </div>

          {/* Border-box */}
          <div>
            <h3>📏 border-box</h3>
            <div
              style={{
                boxSizing: "border-box",
                width: "200px",
                padding: "20px",
                border: "10px solid green",
                backgroundColor: "#eaffea",
              }}
            >
              <strong>Width: 200px</strong>
              <br />
              Total size stays <strong>exactly 200px</strong>
            </div>
          </div>
        </div>

        <p style={{ marginTop: "40px", fontStyle: "italic", color: "#666" }}>
          Use <code>box-sizing: border-box</code> for consistent sizing. It's
          easier to manage layouts.
        </p>
      </div>
    );
  }

  return (
    <div className="concepts-container">
      <h1>CSS Revision: Box Model, Display Types, Positioning</h1>

      <section>
        <h2>📦 CSS Box Model</h2>
        <p>Every HTML element is a box composed of:</p>
        <ul>
          <li>
            <strong>Content</strong>: The actual text/image
          </li>
          <li>
            <strong>Padding</strong>: Space between content and border
          </li>
          <li>
            <strong>Border</strong>: The line surrounding the padding
          </li>
          <li>
            <strong>Margin</strong>: Space outside the border
          </li>
        </ul>
        <div className="box-model-demo">Box</div>
      </section>

      <section>
        <h2>📏 Block vs Inline vs Inline-block</h2>
        <ul>
          <li>
            <strong>Block</strong>: Takes full width, starts on new line.
            Width/height respected.
          </li>
          <li>
            <strong>Inline</strong>: No line break. Width/height ignored.
          </li>
          <li>
            <strong>Inline-block</strong>: Like inline, but width/height are
            respected.
          </li>
          <img
            src="https://via.placeholder.com/100"
            style={{
              width: "200px",
              padding: "20px",
              border: "5px solid red",
              backgroundColor: "#fff0f0",
              boxSizing: "content-box",
            }}
            alt="content-box"
          />
        </ul>
        <div className="block">Block</div>
        <span className="inline">Inline</span>
        <span className="inline">Inline</span>

        <span className="inline-block">Inline-block</span>
      </section>

      <section>
        <h2>📌 Position Properties</h2>
        <ul>
          <li>
            <strong>Static</strong>: Default. Not positioned.
          </li>
          <li>
            <strong>Relative</strong>: Moves relative to its normal position.
          </li>
          <li>
            <strong>Absolute</strong>: Positioned relative to nearest positioned
            ancestor.
          </li>
          <li>
            <strong>Fixed</strong>: Stays at fixed position relative to
            viewport.
          </li>
          <li>
            <strong>Sticky</strong>: Scrolls normally, then sticks to top when
            reaching a threshold.
          </li>
        </ul>

        <div className="position-container">
          <div className="box static">Static</div>
          <div className="box relative">Relative</div>
          <div className="box absolute">Absolute</div>
          <div className="box fixed">Fixed</div>
          <div className="box sticky">Sticky</div>
        </div>
      </section>
      <section>
        <BoxSizingDemo />
      </section>
    </div>
  );
}
