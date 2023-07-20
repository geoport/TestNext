import React from 'react';
import { InputField } from './FormFields';
import { DeleteRowButton } from './Buttton';
import { FormField } from 'models/FormField';

/**
 * A component that represents a table element.
 *
 * @param children - The child elements of the table.
 *
 * @returns A React node representing a table element.
 */
export function Table(props: { children: React.ReactNode }) {
    return (
        <table className="w-full border-collapse border border-slate-500">
            {props.children}
        </table>
    );
}

/**
 * A component that represents a table head element.
 *
 * @param children - The child elements of the table head.
 *
 * @returns A React node representing a table head element.
 */
export function TableHead(props: { children: React.ReactNode }) {
    return <thead className="h-10 border">{props.children}</thead>;
}

/**
 * A component that represents a table header cell element.
 *
 * @param children - The child elements of the table header cell.
 *
 * @returns A React node representing a table header cell element.
 */
export function Th(props: { children?: React.ReactNode }) {
    return <th className="border border-slate-600">{props.children}</th>;
}

/**
 * A component that represents a table data cell element.
 *
 * @param children - The child elements of the table data cell.
 *
 * @returns A React node representing a table data cell element.
 */
export function Td(props: { children?: React.ReactNode }) {
    return (
        <td className="border border-slate-600 text-center">
            {props.children}
        </td>
    );
}

/**
 * A component that represents a table data cell element with form field.
 *
 * @param formField - The form field object for the cell.
 * @param index - The index of the row that contains the cell.
 * @param handleChange - A function to handle changes to the cell's value.
 * @param dataSource - The data source for the table.
 *
 * @returns A React node representing a table data cell element.
 */
const TableCell = (props: {
    formField: FormField;
    index: number;
    handleChange: (e: any) => void;
    dataSource: any[];
}) => {
    const { formField, index, handleChange, dataSource } = props;
    return (
        <td className="border border-slate-600">
            <InputField
                formField={formField}
                onChange={handleChange}
                value={dataSource[index][formField.id]}
                noLabel={true}
            />
        </td>
    );
};

/**
 * A component that represents a table row element.
 *
 * @param index - The index of the row.
 * @param form - An object representing the form fields for the row.
 * @param columnIDs - An array of IDs representing the columns of the row.
 * @param handleChange - A function to handle changes to the row's values.
 * @param handleRemove - A function to handle removal of the row.
 * @param dataSource - The data source for the table.
 * @param tableID - A unique ID for the table.
 *
 * @returns A React node representing a table row element.
 */
const Row = (props: {
    index: number;
    form: { [key: string]: FormField };
    columnIDs: string[];
    handleChange: (e: any, index: number) => void;
    handleRemove: (index: number) => void;
    dataSource: any[];
    tableID: string;
}) => {
    const {
        index,
        form,
        columnIDs,
        handleChange,
        handleRemove,
        dataSource,
        tableID,
    } = props;
    return (
        <tr>
            {columnIDs.map((columnID) => {
                return (
                    <TableCell
                        formField={form[columnID]}
                        index={index}
                        handleChange={(e) => handleChange(e, index)}
                        key={`${tableID}_${columnID}_${index}`}
                        dataSource={dataSource}
                    />
                );
            })}
            {index > 0 ? (
                <DeleteRowButton onClick={() => handleRemove(index)} />
            ) : (
                <DeleteRowButton onClick={() => {}} />
            )}
        </tr>
    );
};

/**
 * A component that represents a table creator.
 *
 * @param columnTitles - An array of titles for the table columns.
 * @param dataSource - The data source for the table.
 * @param form - An object representing the form fields for the table.
 * @param columnIDs - An array of IDs representing the columns of the table.
 * @param handleChange - A function to handle changes to the table's values.
 * @param handleRemove - A function to handle removal of a row.
 * @param tableID - A unique ID for the table.
 *
 * @returns A Table component.
 */
export function TableCreator(props: {
    columnTitles: any[];
    dataSource: any[];
    form: { [key: string]: FormField };
    columnIDs: string[];
    handleChange: (e: any, index: number) => void;
    handleRemove: (index: number) => void;
    tableID: string;
}) {
    const {
        columnTitles,
        dataSource,
        form,
        columnIDs,
        handleChange,
        handleRemove,
        tableID,
    } = props;
    return (
        <Table>
            <TableHead>
                <tr>
                    {columnTitles.map((column, index) => (
                        <Th key={`${tableID}_col_${index}`}>{column}</Th>
                    ))}
                    <Th></Th>
                </tr>
            </TableHead>
            <tbody>
                {dataSource.map((_, index) => {
                    return (
                        <Row
                            index={index}
                            key={`${tableID}_${index}`}
                            form={form}
                            columnIDs={columnIDs}
                            handleChange={handleChange}
                            handleRemove={handleRemove}
                            dataSource={dataSource}
                            tableID={tableID}
                        />
                    );
                })}
            </tbody>
        </Table>
    );
}
