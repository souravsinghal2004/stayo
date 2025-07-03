import { AddStayoForm } from "./_components/upload-property-form";

export const metadata = {
  title: "Add New Property | Stayo Host ",
  description: "Add a new propert ",
};

export default function AddCarPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Property</h1>
      <AddStayoForm/>
    </div>
  );
}