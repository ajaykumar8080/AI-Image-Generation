import ImageGeneratorForm from '@/components/image-generator-form';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <ImageGeneratorForm />
    </main>
  );
}
