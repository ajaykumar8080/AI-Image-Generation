
import ImageGeneratorForm from '@/components/image-generator-form';
import ImageSlideshow from '@/components/image-slideshow';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
      <ImageGeneratorForm />
      <div className="w-full mt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
          Creations Showcase
        </h2>
        <ImageSlideshow />
      </div>
    </div>
  );
}
