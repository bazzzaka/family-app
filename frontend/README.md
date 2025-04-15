# Family App Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and features an Apple-inspired design system.

## Running the Application

### Development Mode

```bash
npm install
npm start
```

This runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
```

Builds the app for production to the `build` folder.

## Docker Deployment

This project includes Docker support for easy deployment.

### Using Docker Compose (Recommended)

To run both frontend and backend services:

```bash
# From the project root
docker-compose up -d
```

This will:
- Build the frontend and backend images
- Start containers for both services
- Make the frontend available at http://localhost:3000
- Make the backend available at http://localhost:5000

### Using Docker Directly

To build and run only the frontend:

```bash
# Build the image
docker build -t family-app-frontend .

# Run the container
docker run -p 3000:80 -d family-app-frontend
```

## Stable Dependencies

This project uses stable versions of dependencies to ensure compatibility:

- React 18.2.0
- MUI 5.14.9
- Framer Motion 10.16.4

## Redesigned UI

The application features an Apple-inspired design with:

- Clean, minimal aesthetics
- Frosted glass UI elements
- Apple's SF Pro-inspired typography
- Apple color palette
- Subtle animations

## Development Guidelines

- Use the established Apple-inspired design system
- Follow the existing component structure
- Ensure responsive design works on all device sizes
- Test in both light and dark mode

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
