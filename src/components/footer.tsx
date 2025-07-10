export function Footer() {
  return (
    <footer className="py-6 border-t mt-auto">
      <div className="container flex flex-col items-center justify-center mx-auto px-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} PixelForge. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
