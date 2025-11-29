import React,{ useState}from "react";
import { useNavigate } from "react-router-dom";



const Logout = ({classname,setUser}) => {
      const [loading, setloading] = useState(false);
    const navigate=useNavigate();

    const handleSubmit = async () => {
        setloading(true);
        const response = await fetch(`/api/auth/logout`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        navigate("/")
      setUser(null)
        setloading(false);
    }

  return (
     <button className="text-xs sm:text-sm lg:text-base border-2 border-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-full bg-transparent hover:bg-white hover:text-black transition duration-300 whitespace-nowrap" onClick={handleSubmit} disabled={loading}>
Logout
     </button>
  );
};

export default Logout;
