import DisplayErrorMessage from "@/components/DisplayErrorMessage";

export default function NotFoundPage() {
  return (<DisplayErrorMessage pageTitle={"Not Found"} contentTitle={"404"} content={"Error 404 - The page you're looking for doesn't exist"} />);
}
