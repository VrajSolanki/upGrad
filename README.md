To run the project  
npm install  
npm run dev

Project structure  
  
src  
- index.html(has root node)  
- styles (common styles and font patterns)  
- services (helper methods)  
- store (injects redux)  
- layout ( mounts corelayout)
- utils (utility methods)  
- main.js(mounts the root node to react app.)  
- components  
-- common symantic based components
- routes  
 -- Choose  
 -- Student  
 -- Teacher  

 each route has  
 - components (representational components)
 - containers (containers, modules)
 - index (defines route path )  
 - routes (defines child routes, is optional)

 each component has  
 - .js (react component)
 - .scss (style classes)  
 - index.js (exposes component)
