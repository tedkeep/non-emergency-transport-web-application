# src folder

This folder contains all of the frontend code written in Javascript, [JSX](https://reactjs.org/docs/introducing-jsx.html) and CSS. Majority of the code is in the [components folder](./components) which holds the components which are used to build the user interfaces.

[[_TOC_]]

## components folder

Contains the components that are used to build the user interface for the web application. The folders README is found [here](./components).

## hooks folder

The hooks folder contains functions that are used within the components. [React hooks](https://softwareontheroad.com/react-hooks/#intro) allow [states](https://reactjs.org/docs/state-and-lifecycle.html) to be added to functional components. The hooks folder README is found [here](./hooks).

## redux folder

The redux folder contains the [redux](https://redux.js.org/) reducers, actions and stores. More information about the redux folder can be found in its [README](./redux).

## resources folder

This folder contains resources for the website such as images. The README is found [here](./resources).

## App.css

The css for the application is found here. Some smaller components have seperate css files however this file still contains most of the web applications css.

## App.js

This is the main component and is the entry point to all the applications pages. The component fulfills the following roles:

- The layout of the application.
- The routing of the application.
- Checking the user accessing the application is logged in. If not then they are sent to the log in page.

## App.test.js

This file runs tests for the App component. The test file is run on the script `npm run test`.

## index.js

The file wraps the App component inside a router and provider component. The router component is used to allow routing to happen in the child components. The provider component provides a central store for the redux and allows the child components to access the store. Meaning the child components can all reference the same data.

This file is then attached to the div with the id "root" in the html file. 

