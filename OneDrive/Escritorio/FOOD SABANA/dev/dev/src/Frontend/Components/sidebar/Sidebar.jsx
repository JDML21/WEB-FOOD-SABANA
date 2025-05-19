const Sidebar = ({ children }) => {
  return (
    <div className="h-full flex flex-col">
      {children}
    </div>
  );
};

export default Sidebar;