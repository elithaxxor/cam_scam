<?php
$videoOutput = '';
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sanitize inputs
    $cameraIP = filter_input(INPUT_POST, 'cameraIP', FILTER_SANITIZE_STRING);
    $protocol = filter_input(INPUT_POST, 'protocol', FILTER_SANITIZE_STRING);

    // Validate protocol
    $allowed = ['http', 'rtsp', 'rtmp', 'hls'];
    if (!in_array($protocol, $allowed, true)) {
        $protocol = 'http';
    }

    // Escape for output
    $cameraIPEscaped = htmlspecialchars($cameraIP, ENT_QUOTES, 'UTF-8');

    switch ($protocol) {
        case 'http':
            $url = "http://$cameraIPEscaped";
            break;
        case 'rtsp':
            $url = "rtsp://$cameraIPEscaped:554/stream";
            break;
        case 'rtmp':
            $url = "rtmp://$cameraIPEscaped/live/stream";
            break;
        case 'hls':
            $url = "http://$cameraIPEscaped/hls/stream.m3u8";
            break;
    }

    $safeUrl = htmlspecialchars($url, ENT_QUOTES, 'UTF-8');

    // Basic mapping for MIME types
    $mimeTypes = [
        'http' => 'video/mp4',
        'hls'  => 'application/vnd.apple.mpegurl',
    ];
    $mimeType = $mimeTypes[$protocol] ?? null;

    if ($mimeType) {
        $videoOutput = "<h2>Live Feed from Camera:</h2>";
        $videoOutput .= "<video width='600' controls>";
        $videoOutput .= "<source src='$safeUrl' type='$mimeType'>";
        $videoOutput .= "Your browser does not support the video tag.";
        $videoOutput .= "</video>";
    } else {
        $safeProtocol = htmlspecialchars($protocol, ENT_QUOTES, 'UTF-8');
        $videoOutput = "<p><strong>Protocol '$safeProtocol' is not natively supported by HTML5 video.</strong></p>";
        $videoOutput .= "<p>Consider using a JavaScript player like <a href='https://videojs.com/' target='_blank'>Video.js</a>.</p>";
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
        <?php echo $videoOutput; ?>
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
