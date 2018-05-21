// We only need to import the modules necessary for initial render
// We import the routes that we would render across the application.
// CoreLayout is just a wrapper which acts as container for all subsequent child routes.

// Each route has index.js, components, containers and routes folder.
// The index exposes the root component to the external structure.
// The components folder contains all the React component to be rendered wrt that block.
// the containers folder contains the route container which exposes the redux props, actions and thunk to the components.
// It also contains the module corrosponding to the code block with pure actions, thunks and local functions.

// In this project we have 3 routes, Choose where we decide which role to navigate to,
// Teacher which provides the authoring, editting, deleting of questions and assignment block to assign these questions to students.
// Student Route provides the student end, with functionalities like student list, student details-> question list and attempt module to 
// answer these questions.

import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import ChooseRoute from './Choose'
import TeacherRoute from './Teacher'
import StudentRoute from './Student'

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: ChooseRoute(store),
  childRoutes: [
    ChooseRoute(store),
    TeacherRoute(store),
    StudentRoute(store)
  ]
})


export default createRoutes
