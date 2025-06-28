Based on the files retrieved from the repository, here is a `README.md` for the `cam_scam` repository:

```markdown
# Cam-Scam

Cam-Scam is a tool designed to scam LLMs and reverse-engineer ways to extrapolate locations. It is a unique OSINT (Open Source Intelligence) project that primarily uses PHP and JavaScript.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

- Fetches and parses public camera links from EarthCam.
- Provides a simple React component to display these camera links.
- Integrates Shodan and Wigle APIs for expanded OSINT camera and network data.
- Includes phone caller identification feature for telecom OSINT.

## Installation

To install and set up this project, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/elithaxxor/cam_scam.git
    cd cam_scam
    ```

2. Install the required dependencies:
    ```sh
    # run the helper script or npm install directly
    ./setup.sh
    # or
    npm install
    ```

   The `setup.sh` script simply executes `npm install` for convenience.


3. Start the proxy server (defaults to port `3001`):

    ```sh
    PORT=3001 node APP/server.js
    ```



   You can configure a different port by setting the `PORT` environment variable.


## Usage

To use the `PublicCameras` component, import it into your React application and include it in your component tree:

```jsx
import React from 'react';
import PublicCameras from './index.js';

function App() {
    return (
        <div>
            <PublicCameras />
        </div>
    );
}

export default App;
```

Run the application (ensure the proxy server is also running):
```sh
npm start
```

The React components use the `REACT_APP_PROXY_URL` environment variable to
determine where the camera data is fetched from. It defaults to
`http://localhost:3001/api/cameras` if not specified.

### Running Tests

After installing dependencies you can run the test suite with:

```sh
npm test
```

## Dependencies

The project dependencies are managed via `npm`. The `package.json` file includes the following main dependency:

- React
- axios (for API calls)

## Testing

After installing dependencies, run the test suite with:

```sh
npm test
```

This project uses Jest for unit testing. All tests can be found in the `__tests__` directory.

## Running the PHP Script

1. Navigate to the `PHP` directory.
2. Start a PHP development server:
   ```sh
   php -S localhost:8000
   ```
3. Open `http://localhost:8000/cam_scam.php` in your browser.

## Running the Proxy Server

1. From the project root, run the server (defaults to port `3001`):
   ```sh
   PORT=3001 node APP/server.js
   ```
   Use the `PORT` variable to change the port if needed.

## Running the React Client

1. Ensure dependencies are installed.
   ```sh
   npm install
   ```
2. Start the React development server:
   ```sh
   npm start
   ```
   The client will use `REACT_APP_PROXY_URL` to reach the proxy server.

## Contributing

Feel free to open issues or submit pull requests to improve the project. Please include tests for new features when possible.

## License

This project is licensed under the MIT License.
```
This project uses Jest for unit testing. Running `npm test` executes
`publicCameras.test.js` and `server.test.js` from the `__tests__` directory.
