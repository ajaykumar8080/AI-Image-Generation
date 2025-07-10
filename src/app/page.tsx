import ImageGeneratorForm from '@/components/image-generator-form';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex flex-col items-center justify-center">
      <ImageGeneratorForm />
    </div>
  );
}
