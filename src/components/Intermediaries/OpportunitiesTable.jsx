// @flow
import React from 'react';
import _ from 'lodash';
import DataTable from '../DataTable/DataTable';
import {
    Modal,
} from 'ui';

const opportunitiesColumnDefs = [
    {
        width: '100',
        caption: 'Name',
        render: x => <div style={{ color: 'red' }}>{x.name}</div>,
        compare: (x, y) => x.name.localeCompare(y.name),
    },
    {
        width: '100',
        caption: 'Value',
        render: x => <div style={{ color: 'green' }}>{x.value}</div>,
        compare: (x, y) => x.value.localeCompare(y.value),
    }
];

type OpportunitiesTableState = {
    filterString: ?string,
    filterStringForFilter: ?string,
};

export default class OpportunitiesTable extends React.Component {
    state: OpportunitiesTableState = {
        filterString: null,
        filterStringForFilter: null,
        showItemModal: false,
    };

    componentDidMount() {
        this.updateFilterString = _.debounce(this.internalUpdateFilterString, 200);
    }

    updateFilterString: (value: ?string) => void;

    internalUpdateFilterString(value: ?string): void {
        this.setState({
            filterStringForFilter: value,
        });
    }

    handleChangeFilterString(value: ?string): void {
        this.setState({
            filterString: value,
        });
        this.updateFilterString(value);
    }

    // Легко (необходимо!) мемоизируется последний вызов
    filterOpportunities(opportunities: Object[], filterString: string): Object[] {
        return opportunities.filter(x =>
            x.name.toLowerCase().includes(filterString.toLowerCase()) ||
            x.value.toLowerCase().includes(filterString.toLowerCase())
        );
    }

    handleRowClick(item: Object): void {
        this.setState({
            showItemModal: true,
            itemForModal: item,
        });
    }

    handleCloseModal() {
        this.setState({
            showItemModal: false,
            itemForModal: null,
        });
    }

    render() {
        const { opportunities } = this.props;
        const { filterString, filterStringForFilter, showItemModal, itemForModal } = this.state;
        const filteredOpportunities = filterStringForFilter ? this.filterOpportunities(opportunities, filterStringForFilter) : opportunities;

        return (
            <div>
                {showItemModal && (
                    <Modal onClose={() => this.handleCloseModal()}>
                        <Modal.Header>Item {itemForModal.name}</Modal.Header>
                        <Modal.Body>
                            name: {itemForModal.name},
                            value: {itemForModal.value},
                        </Modal.Body>
                        <Modal.Footer>
                            <button onClick={() => this.handleCloseModal()}>Close</button>
                        </Modal.Footer>
                    </Modal>
                )}
                <input value={filterString || ''} onChange={e => this.handleChangeFilterString(e.target.value)}/>
                <DataTable
                    data={filteredOpportunities}
                    columnDefs={opportunitiesColumnDefs}
                    onRowClick={item => this.handleRowClick(item)}
                />
            </div>
        );
    }
}
