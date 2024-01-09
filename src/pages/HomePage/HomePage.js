import { useContext, useEffect } from "react";
import MainLayout from "../../layout/MainLayout/MainLayout";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { isAuthed, role } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthed) {
      if (role === 1) {
        navigate("/admin");
      } else if (role === 2) {
        navigate("/chat");
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  return <MainLayout>Loading...</MainLayout>;
}
