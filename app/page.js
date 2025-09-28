import Container from '../components/ui/Container';

export default function HomePage() {
  return (
    <Container>
      <h2 className="text-2xl font-semibold mb-4">Welcome to UnitX</h2>
      <p className="text-gray-700">
        Convert units quickly and track your history. Use the navigation above to get started.
      </p>
    </Container>
  );
}
