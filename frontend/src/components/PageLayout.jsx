const PageLayout = ({ children }) => (
    <div className="min-h-screen bg-gray-100 text-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        {children}
      </div>
    </div>
  );
  export default PageLayout;
  