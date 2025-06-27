import React, { useEffect, useState } from 'react';

const PublicCameras = () => {

  const [cameraLinks, setCameraLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [activeTab, setActiveTab] = useState('earthcam');

  // EarthCam state
  const [earthcamLinks, setEarthcamLinks] = useState([]);
  const [earthcamLoading, setEarthcamLoading] = useState(true);
  const [earthcamError, setEarthcamError] = useState(null);

  // Shodan state
  const [shodanData, setShodanData] = useState([]);
  const [shodanLoading, setShodanLoading] = useState(false);
  const [shodanError, setShodanError] = useState(null);

  // Wigle state
  const [wigleData, setWigleData] = useState([]);
  const [wigleLoading, setWigleLoading] = useState(false);
  const [wigleError, setWigleError] = useState(null);

  // Phone ID state
  const [phoneIdResult, setPhoneIdResult] = useState(null);
  const [phoneIdLoading, setPhoneIdLoading] = useState(false);
  const [phoneIdError, setPhoneIdError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');


  useEffect(() => {
    const fetchCameras = async () => {
      try {
        // Fetch HTML via your proxy (not directly from EarthCam)
        const proxyUrl = process.env.REACT_APP_PROXY_URL ||
          'http://localhost:3001/api/cameras';
        const response = await fetch(proxyUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Extract camera links
        const links = doc.querySelectorAll('a.cam_link');
        const urls = Array.from(links).map(link => link.href);

        setCameraLinks(urls);
        setError(null);
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Failed to load cameras. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCameras();

    if (activeTab === 'earthcam') {
      fetchEarthcam();
    } else if (activeTab === 'shodan') {
      fetchShodan();
    } else if (activeTab === 'wigle') {
      fetchWigle();
    }
  }, [activeTab]);

  const fetchEarthcam = async () => {
    setEarthcamLoading(true);
    setEarthcamError(null);
    try {
      const response = await fetch('http://localhost:3001/api/cameras');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);

      }
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const links = doc.querySelectorAll('a.cam_link');
      const urls = Array.from(links).map(link => link.href);
      setEarthcamLinks(urls);
    } catch (error) {
      console.error('Fetch error:', error);
      setEarthcamError('Failed to load EarthCam cameras. Please try again later.');
    } finally {
      setEarthcamLoading(false);
    }
  };

  const fetchShodan = async () => {
    setShodanLoading(true);
    setShodanError(null);
    try {
      const response = await fetch('http://localhost:3001/api/shodan');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setShodanData(data);
    } catch (error) {
      console.error('Shodan fetch error:', error);
      setShodanError('Failed to load Shodan data. Please try again later.');
    } finally {
      setShodanLoading(false);
    }
  };

  const fetchWigle = async () => {
    setWigleLoading(true);
    setWigleError(null);
    try {
      const response = await fetch('http://localhost:3001/api/wigle');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setWigleData(data);
    } catch (error) {
      console.error('Wigle fetch error:', error);
      setWigleError('Failed to load Wigle data. Please try again later.');
    } finally {
      setWigleLoading(false);
    }
  };

  const handlePhoneIdSubmit = async (e) => {
    e.preventDefault();
    setPhoneIdLoading(true);
    setPhoneIdError(null);
    setPhoneIdResult(null);

    // Basic phone number format validation
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneIdError('Invalid phone number format. Please enter in E.164 format.');
      setPhoneIdLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/phoneid?number=${encodeURIComponent(phoneNumber)}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPhoneIdResult(data);
    } catch (error) {
      console.error('Phone ID fetch error:', error);
      setPhoneIdError(error.message || 'Failed to identify phone number. Please try again later.');
    } finally {
      setPhoneIdLoading(false);
    }
  };


  const filteredLinks = cameraLinks.filter(link =>
    link.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render states: loading, error, or success
  return (
    <div>
      <h1>Camera Finder & OSINT Tools</h1>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setActiveTab('earthcam')} disabled={activeTab === 'earthcam'}>EarthCam</button>
        <button onClick={() => setActiveTab('shodan')} disabled={activeTab === 'shodan'}>Shodan</button>
        <button onClick={() => setActiveTab('wigle')} disabled={activeTab === 'wigle'}>Wigle</button>
        <button onClick={() => setActiveTab('phoneid')} disabled={activeTab === 'phoneid'}>Phone ID</button>
      </div>

      {activeTab === 'earthcam' && (
        <div>
          {earthcamLoading && <p>Loading EarthCam cameras...</p>}
          {earthcamError && <p style={{ color: 'red' }}>{earthcamError}</p>}
          {!earthcamLoading && !earthcamError && (
            <ul>
              {earthcamLinks.map((link, index) => (
                <li key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {activeTab === 'shodan' && (
        <div>
          {shodanLoading && <p>Loading Shodan data...</p>}
          {shodanError && <p style={{ color: 'red' }}>{shodanError}</p>}
          {!shodanLoading && !shodanError && (
            <ul>
              {shodanData.map((item, index) => (
                <li key={index}>
                  <strong>IP:</strong> {item.ip_str} <br />
                  <strong>Port:</strong> {item.port} <br />
                  <strong>Data:</strong> {item.data} <br />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {activeTab === 'wigle' && (
        <div>
          {wigleLoading && <p>Loading Wigle data...</p>}
          {wigleError && <p style={{ color: 'red' }}>{wigleError}</p>}
          {!wigleLoading && !wigleError && (
            <ul>
              {wigleData.map((item, index) => (
                <li key={index}>
                  <strong>SSID:</strong> {item.ssid} <br />
                  <strong>BSSID:</strong> {item.bssid} <br />
                  <strong>Location:</strong> {item.trilat}, {item.trilong} <br />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {activeTab === 'phoneid' && (
        <div>
          <form onSubmit={handlePhoneIdSubmit}>
            <label>
              Enter Phone Number:
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1234567890"
                required
              />
            </label>
            <button type="submit" disabled={phoneIdLoading}>Identify</button>
          </form>
          {phoneIdLoading && <p>Identifying phone number...</p>}
          {phoneIdError && <p style={{ color: 'red' }}>{phoneIdError}</p>}
          {phoneIdResult && (
            <div>
              <h3>Phone ID Result:</h3>
              <ul>
                <li><strong>Number:</strong> {phoneIdResult.number}</li>
                <li><strong>Country:</strong> {phoneIdResult.country}</li>
                <li><strong>Location:</strong> {phoneIdResult.location}</li>
                <li><strong>Carrier:</strong> {phoneIdResult.carrier}</li>
                <li><strong>Line Type:</strong> {phoneIdResult.line_type}</li>
              </ul>
            </div>
          )}
        </div>

      )}
    </div>
  );
}; 

export default PublicCameras;
