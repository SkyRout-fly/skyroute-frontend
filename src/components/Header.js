export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <div className="text-xl font-bold">SkyRoute</div>
      <nav className="flex gap-4">
        <span>Flights</span>
        <span>Hotels</span>
        <span>Cars</span>
      </nav>
    </header>
  );
}