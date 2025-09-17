import { Command, CommandGroup, CommandList, CommandSeparator } from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Search, RefreshCcw } from "lucide-react";
import { FilterSidebarProps } from "@/types/types";

const FilterSidebar = ({
  filters,
  searchTerm,
  setSearchTerm,
  selectedFilters,
  setSelectedFilters,
  priceValue,
  setPriceValue,
  applyFilter,
  categoryFilteredProducts,
  BreadcrumbNavigation
}: FilterSidebarProps) => {


  return (
    <Command className="border bg-transparent rounded-[5px] h-fit">
      <div className="flex items-center gap-1 px-1 py-2">
        <Search size={26} color="gray" className="mr-2" />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Products Name ..."
          className="text-sm outline-none text-gray-600 w-full"
        />
        <Button
          disabled={
            searchTerm ||
            categoryFilteredProducts.length  ||
            selectedFilters.Categories ||
            selectedFilters.Ratings ||
            selectedFilters.Tags
              ? false
              : true
          }
          variant="default"
          size="sm"
          onClick={() => {
            setSearchTerm("");
            setPriceValue(BreadcrumbNavigation[0] === 'Electronics' ? 500000 : 10000);
            setSelectedFilters({ Categories: "", Ratings: "", Tags: "" });
            applyFilter("", undefined, "");
          }}
          className="bg-orange-500 hover:bg-orange-400 text-white rounded-[5px]"
          title="Reset Your Filter"
        >
          <RefreshCcw />
        </Button>
      </div>
      <CommandSeparator />
      <CommandList className="max-h-[150vh]">
        {Object.keys(filters).map((category, index) => (
          <CommandGroup heading={category} key={index}>
            {category === "Pricing" ? (
              <div className="pt-3">
                <Slider
                  defaultValue={[priceValue]}
                  max={BreadcrumbNavigation[0] === 'Electronics' ? 500000 : 10000}
                  min={500}
                  step={1}
                  onValueChange={(value) => {
                    setPriceValue(value[0]);
                    applyFilter("", value[0], "Pricing");
                  }}
                  className="pb-3"
                />
                <p className="text-sm text-gray-500">Up to ₹{priceValue}</p>
              </div>
            ) : (
              <RadioGroup className="pt-3"
                value={selectedFilters[category as keyof typeof selectedFilters] || ""}
                onValueChange={(val) => {
                  setSelectedFilters((prev) => ({ ...prev, [category]: val }));
                  applyFilter(val, undefined, category);
                }}
              >
                {filters[category].map((option, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`${category}-${idx}`} className="cursor-pointer"/>
                    <Label className="text-[.7rem] cursor-pointer" htmlFor={`${category}-${idx}`}>
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </CommandGroup>
        ))}
      </CommandList>
    </Command>
  );
};

export default FilterSidebar;
