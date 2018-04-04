import React, { Component } from 'react';
import axios from 'axios';
import { DataView, DataViewLayoutOptions } from 'primereact/components/dataview/DataView';

class TableProductsExample extends Component {

  constructor() {
    super();
    this.state = {
      records: [],
      totalRecords: 0
    };


  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then((res) => {
        console.log(res.data)
        this.datasource = res.data;
        this.setState({totalRecords: res.data.length})
      });
  }

  itemTemplate(item, layout) {
    console.log(item)
    return (
      <div>
        <div className="ui-g-12">
          <div className="ui-g-3">
            <img src={item.thumbnailUrl}/>
          </div>
          <div className="ui-g-6">
            <h3>TITLE: {item.title}</h3>
            <div>image url: {item.url}</div>
          </div>
          <div className="ui-g-3">
            <div>IMAGE ID: {item.id} </div>
          </div>
        </div>
      </div>
    )
  }

  loadData(event) {
    this.setState({ records: this.datasource.slice(event.first, (event.first + event.rows)) });
  }

  render() {
    return (
      <DataView value={this.state.records} itemTemplate={this.itemTemplate} paginator={true} rows={20}
      lazy={true} onLazyLoad={(e) => this.loadData(e)} totalRecords={this.state.totalRecords}></DataView>
    );
  }
}

export default TableProductsExample;
