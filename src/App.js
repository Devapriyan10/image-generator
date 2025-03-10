import { useState } from "react";

export default function ImageFormatter() {
  const [prompt, setPrompt] = useState("");
  const [resolution, setResolution] = useState("512x512");
  const [fileFormat, setFileFormat] = useState("PNG");
  const [watermark, setWatermark] = useState("");
  const [imageSrc, setImageSrc] = useState(null);

  const generateImage = async () => {
    const response = await fetch("http://localhost:5000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, resolution, fileFormat, watermark }),
    });
    const data = await response.json();
    setImageSrc(data.imageUrl);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-500">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">AI Image Generator</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium text-left">Prompt</label>
            <input
              type="text"
              className="border rounded w-full p-2 mt-1 bg-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter a description..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium text-left">Resolution</label>
              <select
                className="border rounded w-full p-2 mt-1 bg-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500"
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
              >
                <option value="512x512">512x512</option>
                <option value="1024x1024">1024x1024</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium text-left">File Format</label>
              <select
                className="border rounded w-full p-2 mt-1 bg-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500"
                value={fileFormat}
                onChange={(e) => setFileFormat(e.target.value)}
              >
                <option value="PNG">PNG</option>
                <option value="JPEG">JPEG</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium text-left">Watermark</label>
            <input
              type="text"
              className="border rounded w-full p-2 mt-1 bg-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter watermark text"
              value={watermark}
              onChange={(e) => setWatermark(e.target.value)}
            />
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded w-full transition duration-200"
            onClick={generateImage}
          >
            Generate Image
          </button>
        </div>

        {imageSrc && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700">Generated Image</h2>
            <img
              src={imageSrc}
              alt="Generated"
              className="mt-2 w-full max-w-md mx-auto rounded-lg border"
            />
          </div>
        )}
      </div>
    </div>
  );
}