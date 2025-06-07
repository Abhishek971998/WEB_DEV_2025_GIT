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
