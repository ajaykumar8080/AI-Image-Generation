
"use client";

import { useState } from 'react';
import { generateImage } from '@/ai/flows/generate-image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Image as ImageIcon, AlertTriangle, Download, X, History, Trash2 } from 'lucide-react';
import NextImage from 'next/image'; 

export default function ImageGeneratorForm() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('Your amazing creation will appear here!');
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      setError('Please write a description for the image.');
      setStatusMessage('Prompt cannot be empty.');
      return;
    }

    setIsLoading(true);
    setImageUrl(null);
    setError(null);
    setStatusMessage('Conjuring your image... please wait.');

    try {
      const result = await generateImage({ prompt });
      if (result.imageDataUri) {
        setImageUrl(result.imageDataUri);
        setStatusMessage('Your masterpiece is ready!');
        setHistory(prevHistory => 
          [prompt, ...prevHistory.filter(p => p.toLowerCase() !== prompt.toLowerCase())].slice(0, 5)
        );
      } else {
        throw new Error('Image generation failed to return data.');
      }
    } catch (err) {
      console.error("Error generating image:", err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Oops! Something went wrong. ${errorMessage}`);
      setStatusMessage('Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadImage = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    const fileName = prompt.trim().toLowerCase().replace(/\s+/g, '_') || 'generated_image';
    link.download = `${fileName}.png`; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleClearPrompt = () => {
    setPrompt('');
    setImageUrl(null);
    setError(null);
    setStatusMessage('Your amazing creation will appear here!');
  };

  const handleHistoryClick = (historyPrompt: string) => {
    setPrompt(historyPrompt);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <>
      <Card className="w-full max-w-xl shadow-xl rounded-xl border-t-[5px] border-primary animate-fadeIn transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
        <CardHeader className="text-center px-4 md:px-6">
          <CardTitle className="text-2xl md:text-3xl font-headline font-semibold text-primary">Explore the AI</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 px-4 md:px-6 pb-6">
          <div className="space-y-2 relative">
            <label htmlFor="prompt-input" className="sr-only">Image Prompt</label>
            <Input
              id="prompt-input"
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to create..."
              className="pr-10"
              disabled={isLoading}
              aria-describedby="status-message"
            />
            {prompt && (
              <button
                onClick={handleClearPrompt}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear prompt"
                disabled={isLoading}
              >
                <X className="h-6 w-6" />
              </button>
            )}
          </div>

          <Button
            onClick={handleGenerateImage}
            disabled={isLoading}
            className="w-full text-base md:text-lg py-5 md:py-6 transition-transform duration-200 ease-in-out hover:scale-105"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Image'
            )}
          </Button>
          
          <div 
            id="image-display-area"
            className="mt-6 min-h-[250px] sm:min-h-[320px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center bg-gray-50 p-4 text-center overflow-hidden"
            aria-live="polite"
          >
            {isLoading && !imageUrl && (
              <div className="flex flex-col items-center text-muted-foreground">
                <Loader2 className="h-10 w-10 md:h-12 md:w-12 animate-spin text-primary mb-4" />
                <p className="font-semibold text-sm md:text-base">{statusMessage}</p>
              </div>
            )}
            {!isLoading && imageUrl && (
              <NextImage 
                src={imageUrl} 
                alt={prompt || "Generated AI image"} 
                width={1024} 
                height={1024} 
                className="max-w-full h-auto rounded-md object-contain"
                data-ai-hint="generated image"
                priority={true} 
              />
            )}
            {!isLoading && !imageUrl && (
               <div className="flex flex-col items-center text-muted-foreground">
                {error ? <AlertTriangle className="h-10 w-10 md:h-12 md:w-12 text-destructive mb-4" /> : <ImageIcon className="h-10 w-10 md:h-12 md:w-12 text-primary mb-4" /> }
                <p id="status-message" className={`font-semibold text-sm md:text-base ${error ? 'text-destructive' : ''}`}>
                  {error || statusMessage}
                </p>
              </div>
            )}
          </div>
          {imageUrl && !isLoading && (
            <Button
              onClick={handleDownloadImage}
              variant="outline"
              className="w-full text-base md:text-lg py-5 md:py-6 mt-4 transition-transform duration-200 ease-in-out hover:scale-105"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Image
            </Button>
          )}
        </CardContent>
      </Card>
      
      {history.length > 0 && (
        <Card className="w-full max-w-xl mt-8 animate-fadeIn shadow-lg rounded-xl">
          <CardHeader className="px-4 md:px-6">
            <CardTitle className="flex items-center justify-between text-lg md:text-xl">
              <div className="flex items-center">
                <History className="mr-2 h-5 w-5" />
                Search History
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClearHistory}
                aria-label="Clear search history"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                disabled={isLoading}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 md:px-6 pb-6">
            <ul className="space-y-2">
              {history.map((item, index) => (
                <li key={index}>
                  <button 
                    onClick={() => handleHistoryClick(item)} 
                    className="w-full text-left p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors duration-200 text-sm md:text-base"
                    disabled={isLoading}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </>
  );
}
