
```markdown
# Cam Scam PHP Script

This repository contains a PHP script designed to scam LLMs and reverse engineer ways to extrapolate locations. The script provides a web interface for accessing live feeds from cameras using various streaming protocols.

## Overview

**Note**: The previous `index.html` file that duplicated the PHP page has been
removed. All form markup and processing logic now reside solely in
`cam_scam.php`.

The `cam_scam.php` file is a PHP script that allows users to access and view live camera feeds by providing the camera's IP address and selecting the appropriate streaming protocol. The script supports HTTP, RTSP, RTMP, and HLS protocols.

## Features

- **Protocol Support**: Supports multiple streaming protocols including HTTP, RTSP, RTMP, and HLS.
- **Dynamic URL Construction**: Constructs the appropriate URL based on the selected protocol and the provided camera IP address.
- **Live Feed Display**: Displays the live video feed within the web interface using HTML5 video elements.
- **User-Friendly Interface**: Provides a simple and responsive web form for users to input camera details.
- **Input Sanitization**: Sanitizes all user-provided values to prevent injection attacks.

## Prerequisites

To run this PHP script, you need a web server with PHP support. Common setups include:

- **Apache** with PHP
- **Nginx** with PHP-FPM

## Installation

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/elithaxxor/cam_scam.git
    ```

2. **Navigate to the PHP Directory**:
    ```sh
    cd cam_scam/PHP
    ```

3. **Deploy the Script**:
    - Place the `cam_scam.php` file in your web server's document root or a subdirectory.

4. **Access the Script**:
    - Open your web browser and navigate to the script's URL, e.g., `http://your-server-ip/cam_scam.php`.

## Usage

1. **Open the Web Interface**:
    - Navigate to the URL where the `cam_scam.php` script is deployed.

2. **Enter Camera Details**:
    - **Camera IP**: Enter the IP address of the camera you want to access.
    - **Protocol**: Select the streaming protocol (HTTP, RTSP, RTMP, or HLS).

3. **Submit the Form**:
    - Click the "Access" button to view the live feed from the camera.

### Example

1. Open the URL in your browser: `http://your-server-ip/cam_scam.php`.
2. Enter the Camera IP: `192.168.1.100`.
3. Select the Protocol: `RTSP`.
4. Click "Access" to view the live feed.

## Code Explanation

### cam_scam.php

The `cam_scam.php` file contains both the PHP logic for processing the form submission and the HTML form for user input.

#### PHP Logic

The PHP section at the top handles the form submission, constructs the appropriate URL based on the selected protocol, and outputs an HTML video element to display the live feed.

#### HTML Form

The HTML section provides a form for users to input the camera IP and select the protocol. The form is styled to be user-friendly and responsive.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Access Hidden Camera</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        form {
            display: flex;
            flex-direction: column;
        }
        input, select, button {
            margin: 10px 0;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        button {
            background-color: #007BFF;
            color: #fff;
            border: none;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Access Hidden Camera</h1>
        <form method="post">
            <label for="cameraIP">Camera IP:</label>
            <input type="text" id="cameraIP" name="cameraIP" placeholder="Enter Camera IP" required>
            
            <label for="protocol">Protocol:</label>
            <select id="protocol" name="protocol" required>
                <option value="http">HTTP</option>
                <option value="rtsp">RTSP</option>
                <option value="rtmp">RTMP</option>
                <option value="hls">HLS</option>
            </select>
            
            <button type="submit">Access</button>
        </form>
    </div>
</body>
</html>
```

## Current Status

As of the latest update on **2025-04-03 04:04:09 (UTC)**, the `cam_scam.php` script is functional and ready for deployment.
