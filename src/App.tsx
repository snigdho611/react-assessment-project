import "./App.css";
import { Button } from "./components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "./components/ui/table";

function App() {
  return (
    <>
      <Button>Test</Button>
      <Table>
        <TableHeader className="bg-slate-100">
          <TableHead className="border-solid border-2 border-sky-500 ">
            Country
          </TableHead>
          <TableHead>Capital</TableHead>
          <TableHead>Flag</TableHead>
          <TableHead>Headline</TableHead>
          <TableHead>Current Weather</TableHead>
        </TableHeader>
        <TableBody>
          <TableCell>1</TableCell>
          <TableCell>2</TableCell>
          <TableCell>3</TableCell>
          <TableCell>4</TableCell>
          <TableCell>5</TableCell>
        </TableBody>
      </Table>
    </>
  );
}

export default App;
