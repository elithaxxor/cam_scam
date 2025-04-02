<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $cameraIP = $_POST["cameraIP"];
    $protocol = $_POST["protocol"];
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

    echo "<h2>Live Feed from Camera at Fairmount Cemetery:</h2>";
    echo "<video width='600' controls>
            <source src='$url' type='video/$protocol'>
            Your browser does not support the video tag.
          </video>";
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
    </div>
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
        <label for="protocol">Protocol:</label>
        <select id="protocol" name="protocol" required>
            <option value="http">HTTP</option>
            <option value="rtsp">RTSP</option>
            <option value="rtmp">RTMP</option>
            <option value="hls">HLS</option>
        </select>
        
    ====== 
    </div>
</body>
</html>        <label for="cameraPort">Camera Port:</label>
        <input type="text" id="cameraPort" name="cameraPort" placeholder="Enter Camera Port (e.g., 8080)" required>
        
        <label for="cameraUsername">Camera Username:</label>
        <input type="text" id="cameraUsername" name="cameraUsername" placeholder="Enter Camera Username" required>
        
        <label for="cameraPassword">Camera Password:</label>
        <input type="password" id="cameraPassword" name="cameraPassword" placeholder="Enter Camera Password" required>
        
        ====== 
        <label for="protocol">Protocol:</label>
        <select id="protocol" name="protocol" required>
            <option value="http">HTTP</option>
            <option value="rtsp">RTSP</option>
            <option value="rtmp">RTMP</option>
            <option value="hls">HLS</option>
        </select>
        
        <button type="submit">Access</button>
    </form
    </div>
</body>
</html>        

        <label for="cameraPort">Camera Port:</label>
        <input type="text" id="cameraPort" name="cameraPort" placeholder="Enter Camera Port (e.g., 8080)" required>
        
        <label for="cameraUsername">Camera Username:</label>
        <input type="text" id="cameraUsername" name="cameraUsername" placeholder="Enter Camera Username" required>
        
        <label for="cameraPassword">Camera Password:</label>
        <input type="password" id="cameraPassword" name="cameraPassword" placeholder="Enter Camera Password" required>
        
        ====== 
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
