import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Navigation2 } from "lucide-react";

const SearchField = () => {
  return (
    <div className="flex items-start justify-start min-h-screen p-4">
      <Card className="flex w-full max-w-md gap-5 p-4">
        <div className="w-full">
          <Input placeholder="Search Map" className="border-gray-200" />
        </div>
        <div className="flex w-2/5 gap-5">
          <Button className="w-auto text-white bg-blue-500 hover:bg-blue-600">
            Search
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9 hover:bg-gray-100"
          >
            <Navigation2 className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SearchField;
