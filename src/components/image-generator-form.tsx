
"use client";

import { useState } from 'react';
import { generateImage } from '@/ai/flows/generate-image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Image as ImageIcon, AlertTriangle, Download } from 'lucide-react';
import NextImage from 'next/image'; 

export default function ImageGeneratorForm() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('Your amazing creation will appear here!');
  const [error, setError] = useState<string | null>(null);

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
    // Suggest a filename for the download
    const fileName = prompt.trim().toLowerCase().replace(/\s+/g, '_') || 'generated_image';
    link.download = `${fileName}.png`; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full max-w-xl shadow-xl rounded-xl border-t-[5px] border-primary">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-headline font-semibold text-primary">Create with AI</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="prompt-input" className="sr-only">Image Prompt</label>
          <Input
            id="prompt-input"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to create..."
            className="text-base"
            disabled={isLoading}
            aria-describedby="status-message"
          />
        </div>

        <Button
          onClick={handleGenerateImage}
          disabled={isLoading}
          className="w-full text-lg py-6"
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
          className="mt-6 min-h-[320px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center bg-gray-50 p-4 text-center overflow-hidden"
          aria-live="polite"
        >
          {isLoading && !imageUrl && (
            <div className="flex flex-col items-center text-muted-foreground">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="font-semibold">{statusMessage}</p>
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
              {error ? <AlertTriangle className="h-12 w-12 text-destructive mb-4" /> : <ImageIcon className="h-12 w-12 text-primary mb-4" /> }
              <p id="status-message" className={`font-semibold ${error ? 'text-destructive' : ''}`}>
                {error || statusMessage}
              </p>
            </div>
          )}
        </div>
        {imageUrl && !isLoading && (
          <Button
            onClick={handleDownloadImage}
            variant="outline"
            className="w-full text-lg py-6 mt-4"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Image
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
