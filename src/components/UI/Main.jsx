function Main({ children }) {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto lg:items-start">
      {children}
    </main>
  );
}

export default Main;
