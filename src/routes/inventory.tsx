import { createFileRoute } from "@tanstack/react-router";
import {
	PackageMinus,
	PackagePlus,
	Plus,
	SearchIcon,
	ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, SearchInput } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/inventory")({
	component: RouteComponent,
});

function InventoryTable() {
	return (
		<Table className="rounded-md">
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>In Stock</TableHead>
					<TableHead>MRP/SRP</TableHead>
					<TableHead>Dealer{"'"}s Price</TableHead>
					<TableHead></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>Lavender Oil</TableCell>
					<TableCell>50</TableCell>
					<TableCell>299.00</TableCell>
					<TableCell>224.25</TableCell>
					<TableCell className="w-40">
						<div className="flex gap-2">
							<Button>
								<ShoppingCart size={10} />
							</Button>
							<Button title="Add inventory">
								<PackagePlus size={10} />
							</Button>
							<Button title="Subtract inventory">
								<PackageMinus size={10} />
							</Button>
						</div>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Lemongrass Oil</TableCell>
					<TableCell>50</TableCell>
					<TableCell>299.00</TableCell>
					<TableCell>224.25</TableCell>
					<TableCell className="w-40">
						<div className="flex gap-2">
							<Button>
								<ShoppingCart size={10} />
							</Button>
							<Button title="Add inventory">
								<PackagePlus size={10} />
							</Button>
							<Button title="Subtract inventory">
								<PackageMinus size={10} />
							</Button>
						</div>
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
}

function RouteComponent() {
	return (
		<div className="min-h-screen grid grid-cols-12 grid-rows-12 gap-4">
			<section className="col-span-2 row-span-9">
				<Button className="w-full">
					<Plus size={20} />
					Add product
				</Button>
			</section>
			<section className="col-span-10 row-span-9 flex flex-col gap-4">
				<SearchInput />
				<InventoryTable></InventoryTable>
			</section>
			{/* <section className="col-span-2 row-span-3">Test</section>
			<section className="col-span-10 row-span-3">Test</section> */}
		</div>
	);
}
