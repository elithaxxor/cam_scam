<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize user inputs to avoid HTML injection and malformed URLs
    $cameraIP = filter_var($_POST["cameraIP"], FILTER_SANITIZE_STRING);
    $protocol = filter_var($_POST["protocol"], FILTER_SANITIZE_STRING);

    // Only allow expected protocols
    $allowed = ["http", "rtsp", "rtmp", "hls"];
    if (!in_array($protocol, $allowed)) {
        $protocol = "http"; // fallback to a safe default
    }
    $url = "";

    switch ($protocol) {
        case "http":
            $url = "http://$cameraIP";
            break;
        case "rtsp":
            $url = "rtsp://$cameraIP:554/stream";
            break;
        case "rtmp":
            $url = "rtmp://$cameraIP/live/stream";
            break;
        case "hls":
            $url = "http://$cameraIP/hls/stream.m3u8";
            break;
    }

    $safeUrl = htmlspecialchars($url, ENT_QUOTES, 'UTF-8');
    $safeProtocol = htmlspecialchars($protocol, ENT_QUOTES, 'UTF-8');

    // Map protocol/extension to correct MIME type
    $mimeTypes = [
        'mp4' => 'video/mp4',
        'webm' => 'video/webm',
        'ogg' => 'video/ogg',
        'ogv' => 'video/ogg',
        'mov' => 'video/quicktime',
        'mkv' => 'video/x-matroska',
        // Add more as needed
    ];

    $lowerProtocol = strtolower($protocol);
    $mimeType = isset($mimeTypes[$lowerProtocol]) ? $mimeTypes[$lowerProtocol] : null;

    echo "<h2>Live Feed from Camera:</h2>";

    if ($mimeType) {
        echo "<video width='600' controls>\n".
             "    <source src='$safeUrl' type='$mimeType'>\n".
             "    Your browser does not support the video tag.\n".
             "</video>";
    } else {
        // For unsupported protocols like RTMP/RTSP, suggest using a JS player
        echo "<p><strong>Protocol '$safeProtocol' is not natively supported by HTML5 video.</strong></p>";
        echo "<p>Consider using a JavaScript player library such as <a href='https://videojs.com/' target='_blank'>Video.js</a> or <a href='https://github.com/ant-media/StreamApp' target='_blank'>Ant Media StreamApp</a> for RTMP/RTSP streams.</p>";
        // Optionally, you could include a JS player integration here
    }
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

