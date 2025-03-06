import { FunctionComponent } from "react";

interface TableHeadingsProps {
  headings: string[];
}

const TableHeadings: FunctionComponent<TableHeadingsProps> = ({ headings }) => {
  return (
    <thead className="border-b border-surface bg-surface-light text-sm font-medium text-foreground dark:bg-surface-dark">
      <tr>
        {headings.map((head) => (
          <th key={head} className="px-2.5 py-2 text-center  font-medium">
            {head}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeadings;
