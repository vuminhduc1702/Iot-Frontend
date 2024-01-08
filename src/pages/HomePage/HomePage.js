import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layout/MainLayout/MainLayout";

export default function HomePage() {
  return <MainLayout>home </MainLayout>;
}
