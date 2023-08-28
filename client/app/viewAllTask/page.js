import AddTask from "@/components/AddTask";
import ViewAllTask from "@/components/ViewAllTask";
import React from "react";

function page() {
  return (
    <div className="max-w-3xl mx-auto md:px-0 px-4">
      <AddTask/>
      <ViewAllTask />
    </div>
  );
}

export default page;
