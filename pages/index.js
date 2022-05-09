import UploadForm from "../Components/UploadForm/UploadForm";
import MainLayout from "../Components/Layout/MainLayout";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    fetch("/api/db/connect");
  }, []);
  return (
    <MainLayout>
      <UploadForm></UploadForm>
    </MainLayout>
  );
}
