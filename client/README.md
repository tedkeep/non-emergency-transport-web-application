# Client environment

This is the frontend of the web application and it is what's run on the users browser. The frontend uses the [React Javascript framework](https://reactjs.org/) to build the user interface and uses [NPM](https://www.npmjs.com/) (Node Package Manager) to bring in packages that help with the development. The React application was created using the [Create React App](https://create-react-app.dev/) package which sets up the required environment to develop, run and build the React application. All of the development for the frontend is contained within the [src folder](./src).

[[_TOC_]]

## Content

### public

The public folder contains the html file which the javascript is linked to. The public folder README can be found [here](./public)

### src

The folder contains all of the javascript React components and css. When the application is built, the contents in the src folder will be compiled to run more efficiently. The src folder README is found [here](./src)

### package.json

The package.json is where all the packages information is found. The packages hold code that is needed for the application to run and the package.json holds the information about these packages so anyone can download and install the packages to use and develop this project.

More information on how to read, use and edit the package.json file can be found [here](https://docs.npmjs.com/files/package.json).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
