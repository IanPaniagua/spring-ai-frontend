import React, { useState } from "react";

function ImageGenerator() {
    const [prompt, setPrompt] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const [loading, setLoading] = useState(false);

    const generateImages = async () => {
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:8080/generate-image?prompt=${prompt}`) 
            const urls = await response.json();
            setImageUrls(urls);
        } catch (error) {
            console.error("Error generating images:", error);
        }

        setLoading(false);
    };

    return (
        <div className="tab-content">
            <h2>Image Generator</h2>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter a prompt"
            />
            <button onClick={generateImages}>Generate Images</button>
            {loading && <p>Loading...</p>}
            <div className="image-grid">
                {imageUrls.map((url, index) => (
                    <img 
                        key={index}
                        src={url}
                        alt={`Generated image ${index + 1}`}
                    />
                ))}
                {[...Array(4-imageUrls.length)].map((_, index) => (
                    <div key={index + imageUrls.length} className="empty-image-slot"></div>
                ))}
            </div>
        </div>
    );
}

export default ImageGenerator;
