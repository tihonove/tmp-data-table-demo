// @flow
import React from 'react';

type ColumnDefinition = {
    width: string;
    caption: string;
    render(item: Object): any;
    compare(left: Object, right: Object): number;
}

type DataTableProps = {
    data: Object[];
    columnDefs: ColumnDefinition[];
    onRowClick: (item: Object) => any;
};

const SortDirections = {
    Asc: 'Asc',
    Desc: 'Desc',
};
type SortDirection = $Keys<typeof SortDirections>;

type DataTableState = {
    sortByColumnDefIndex: ?number;
    sortDirection: SortDirection;
};

function invertSortDirection(sortDirection: SortDirection) {
    return sortDirection === SortDirections.Asc ? SortDirections.Desc : SortDirections.Asc;
}

export default class DataTable extends React.Component {
    props: DataTableProps;
    state: DataTableState = {
        sortByColumnDefIndex: null,
        sortDirection: 'Asc',
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState);
    }

    handleHeaderClick(columnDefIndex: number): void {
        const { sortByColumnDefIndex, sortDirection } = this.state;
        this.setState({
            sortByColumnDefIndex: columnDefIndex,
            sortDirection: sortByColumnDefIndex === columnDefIndex
                ? invertSortDirection(sortDirection)
                : 'Asc',
        });
    }

    sortData(data: Object[]): Object[] {
        const { columnDefs } = this.props;
        const { sortByColumnDefIndex, sortDirection } = this.state;

        if (sortByColumnDefIndex !== null && sortByColumnDefIndex !== undefined) {
            const columnDef = columnDefs[sortByColumnDefIndex];
            const comparator = sortDirection === SortDirections.Asc
                ? columnDef.compare
                : (x, y) => columnDef.compare(y, x);
            return data.slice().sort(comparator);
        }
        return data;
    }

    render() {
        const { data, columnDefs, onRowClick } = this.props;
        const sortedData = this.sortData(data);

        return (
            <table>
                <thead>
                    <tr>
                        {columnDefs.map((columnDef, columnDefIndex) => (
                            <th key={`header=${columnDefIndex}`}>
                                <a href='#' onClick={e => {
                                    e.preventDefault();
                                    this.handleHeaderClick(columnDefIndex);
                                }}>{columnDef.caption}</a>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item, index) => (
                        <tr onClick={() => onRowClick(item)} key={`row-${index}`}>
                            {columnDefs.map((columnDef, columnDefIndex) => (
                                <td key={`cell-${index}-${columnDefIndex}`}>{columnDef.render(item)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
}
