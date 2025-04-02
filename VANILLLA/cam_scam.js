


async function findPublicCameras() {

    const url = "https://www.earthcam.com/network/";

    try {
        // Fetch the HTML content of the page
        const response = await fetch(url);
        const text = await response.text();

        // Parse the HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        // Find all camera links on the page
        const cameraLinks = doc.querySelectorAll('a.cam_link');

        // Extract and print the URLs of the cameras
        cameraLinks.forEach(link => {
            console.log(link.href);
        });
    } catch (error) {
        console.error('Error fetching or parsing the page:', error);
    }
}

// Call the function to find and print public cameras
findPublicCameras();



