// Component-based lazy loading → React.lazy() allows components to load only when needed.

// Route-based lazy loading → Each route loads a separate JS bundle dynamically when visited.

// Compoent based lazy loading

// we can funtion(local utils fuctions) lazy load

// we can also do libraries/packages

// webpack-bundle-analyze  //only of development external npm package

//if a package is not used then react automaticlly tree shake and that wont be included in the bundle

//https://loadable-components.com/  --react team recommends this

// Multiple Suspense boundaries → Use multiple Suspense components to avoid blocking the entire app.

// Optimization Techniques
// Memoization (React.memo, useMemo, useCallback) → Prevents unnecessary re-renders.

// Dynamic Imports (import()) → Load modules only when required instead of at startup.

// Tree Shaking → Removes unused code from final production builds (especially useful with ES6 modules).

// Reduce Bundle Size → Use tools like Webpack Bundle Analyzer to check and optimize the JS bundle.

// Lazy Load Images & Components → Use libraries like react-lazyload for better performance.

// Use Code Splitting with Redux → Dynamically load reducers when needed instead of at startup.

// Use Suspense for Data Fetching (React 18 & beyond) → Simplifies async operations while improving performance

//bundlephobia

{
  /* <img src="large-image.jpg" loading="lazy" alt="Lazy loaded in React" />
  
  <img 
  src="small.jpg" 
  srcset="small.jpg 480w, medium.jpg 768w, large.jpg 1200w" 
  sizes="(max-width: 600px) 480px, (max-width: 900px) 768px, 1200px" 
  alt="Responsive image" 
/>
  
  */
}

// import {get}  from "lodash" // wrong way this will import all the code into the app or into bundled code

// import get from "loash/get" // this will only the required code
// 50kb difference in bundle size

// Have one one entry point for the app → This helps in better code splitting and tree shaking.

// Use dynamic imports for code splitting → Use import() to load modules dynamically.

// Use React.lazy() for component-based lazy loading → Load components only when they are needed.

// use Suspense for loading states → Wrap lazy-loaded components in <Suspense> to handle loading states gracefully.

// Use React.memo() for memoization → Prevent unnecessary re-renders of components.

// Use useMemo() and useCallback() for performance optimization → Memoize values and functions to avoid unnecessary calculations.

// Use Webpack Bundle Analyzer to analyze bundle size → Helps identify large dependencies and optimize them.

// Use code splitting with React Router → Load routes dynamically to reduce initial load time.

// use React.lazy() for route-based lazy loading → Load route components only when the route is accessed.

// Always add width and height attributes to images → Helps the browser allocate space for images before they load, improving layout stability.

// Use responsive images with srcset and sizes attributes → Allows the browser to choose the best image size based on device resolution and viewport size.

// use lazy loading for images → Use the loading="lazy" attribute to defer loading of off-screen images until they are needed.

// Use SVGs for icons and simple graphics → They are scalable, lightweight, and reduce HTTP requests.

// Minimize and compress JavaScript and CSS files → Reduces bundle size and improves load time.

// Remove unused code with tree shaking → Ensures only used exports are included in the final bundle.

// Defer non-critical JavaScript → Prevents render-blocking of essential page content.

// Use HTTP/2 for multiplexing requests → Reduces latency and improves page load performance.

// Implement server-side rendering (SSR) for critical pages → Improves SEO and perceived performance.

// Use content delivery networks (CDNs) → Serves static assets faster by using geographically distributed servers.

// Avoid inline styles for critical rendering → Use external stylesheets or CSS-in-JS for better caching and separation.

// Use CSS containment (contain property) → Improves rendering performance by isolating layout and paint.

// Preload key assets like fonts and hero images → Hints to the browser to load critical assets earlier.

// Use font-display: swap for custom fonts → Reduces font loading delay and avoids invisible text (FOIT).

// Avoid large third-party libraries for small features → Replace with lighter alternatives or custom implementations.

// Limit the number of reflows and repaints → Optimize DOM updates and animations to minimize layout thrashing.

// Batch DOM updates → Reduces layout recalculations by updating DOM elements together.

// Throttle and debounce event handlers → Prevents excessive function calls from events like scroll and resize.

// Use service workers to cache static assets → Enables offline support and faster repeat visits.

// Use lazy hydration with frameworks like React 18 → Delay hydration until needed for better interaction speed.

// Avoid synchronous JavaScript during page load → Blocks the main thread and delays rendering.

// Analyze and remove duplicate dependencies → Avoids unnecessary bloat and redundancy in bundles.

// Monitor performance with tools like Lighthouse and Web Vitals → Regularly assess and improve key metrics (LCP, FID, CLS).
