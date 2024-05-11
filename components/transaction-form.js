import { categories, types } from "@/lib/consts";
import Label from "./label";
import Select from "./select";
import Input from "./input";
import Button from "./button";

export default function TransactionForm() {
    return <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Label className="mb-1">Type</Label>
                <Select>
                    {types.map(type => <option key={type}>{type}</option>)}
                </Select>
            </div>

            <div>
                <Label className="mb-1">Category</Label>
                <Select>
                    {categories.map(category => <option key={category}>{category}</option>)}
                </Select>
            </div>

            <div>
                <Label className="mb-1">Date</Label>
                <Input />
            </div>

            <div>
                <Label className="mb-1">Amount</Label>
                <Input type='number' />
            </div>

            <div className="col-span-2">
                <Label className="mb-1">Description</Label>
                <Input type='number' />
            </div>

            <div className="flex justify-end">
                <Button type='submit'>Save</Button>
            </div>
        </div>
    </form>
}