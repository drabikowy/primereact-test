import React, { Component } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import { InputText } from 'primereact/components/inputtext/InputText';
import { MultiSelect } from 'primereact/components/multiselect/MultiSelect';

class TableExample extends Component {

  constructor() {
    super();
    this.state = {
      records: [],
      totalRecords: 0
    };
    this.onSelectionChange = this.onSelectionChange.bind(this);
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then((res) => {
        this.setState({records: res.data, totalRecords: res.data.length})
      });
  }

  displaySelection(selectedRecord) {
    if (selectedRecord) {
      return <div>Selected record: {selectedRecord.id}: {selectedRecord.url}</div>
    } else {
      return <div>Nothing selected</div>
    }
  }

  onSelectionChange(item) {
    this.setState({ selectedRecord: item.data })
  }

  render() {
    return (
      <DataTable
        value={this.state.records}
        paginator={true}
        rows={10}
        selectionMode="single"
        onSelectionChange={this.onSelectionChange}
        footer={this.displaySelection(this.state.selectedRecord)}>

        <Column field="id" header="id" sortable={true}/>
        <Column field="title" header="Title" filter={true}/>
        <Column field="url" header="Link" />
      </DataTable>
    );
  }
}

export default TableExample;
