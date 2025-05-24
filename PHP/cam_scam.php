<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input to avoid HTML/JS injection
    $cameraIP = filter_input(INPUT_POST, 'cameraIP', FILTER_SANITIZE_STRING);
    $protocol = filter_input(INPUT_POST, 'protocol', FILTER_SANITIZE_STRING);

    // Basic validation for allowed protocols
    $allowed = ["http", "rtsp", "rtmp", "hls"];
    if (!in_array($protocol, $allowed, true)) {
        $protocol = "http";
    }

    $cameraIPEscaped = htmlspecialchars($cameraIP, ENT_QUOTES, 'UTF-8');
    $url = "";

    switch ($protocol) {
        case "http":
            $url = "http://$cameraIPEscaped";
            break;
        case "rtsp":
            $url = "rtsp://$cameraIPEscaped:554/stream";
            break;
        case "rtmp":
            $url = "rtmp://$cameraIPEscaped/live/stream";
            break;
        case "hls":
            $url = "http://$cameraIPEscaped/hls/stream.m3u8";
            break;
    }

    $protocolEscaped = htmlspecialchars($protocol, ENT_QUOTES, 'UTF-8');

    echo "<h2>Live Feed from Camera:</h2>";
    echo "<video width='600' controls>\n".
         "    <source src='$url' type='video/$protocolEscaped'>\n".
         "    Your browser does not support the video tag.\n".
         "</video>";
}
?>
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

