import React from 'react';
import './cockpitProcess.scss';
import { connect } from 'react-redux';
import Sidebar from '../../components/sidebar/sidebar'
import Datatables from "../../components/datatable/datatables"   
import moment from "moment"; 
import {WORKFLOWS} from './../../constants/baseURL';
import { GetRequest } from '../../api/apiList';
const customLabels = {
    first: "<<",
    last: ">>",
    prev: "<",
    next: ">",
    show: "Display",
    entries: "rows",
    noResults: "There is no data to be displayed",
    filterPlaceholder: "Enter a text!"
  };

  const onSortFunction = {
    date(columnValue) {
      // Convert the string date format to UTC timestamp
      // So the table could sort it by number instead of by string
      return moment(columnValue, "Do MMMM YYYY").valueOf();
    }
  };
  const header = { 'content-type': 'application/json' }
class CockpitProcess extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            pageID:'cockpitProcess',
            headerData:[
            { title: 'State', prop: 'name', sortable: true, filterable: true ,cell: (row) =><div>{row.incidents===0?<i className="fa fa-check-circle" aria-hidden="true"></i>:<i className="fa fa-times-circle-o" aria-hidden="true"></i>}</div>},
                { title: 'Incidents', prop: 'incidents'},
                { title: 'Running Instances', prop: 'instances'},
                { title: 'Name', prop: 'name',cell: (row) =><div>{row.name===null?row.key:row.name}</div>},
                { title: 'Tenant ID', prop: 'tenantid'}
               
            ],
            tableData:[]
		};
	}

	componentDidMount() {
        GetRequest(WORKFLOWS,header).then(res=>{
            if(res.status==200){
                this.setState({
                    tableData:res.data
                })
            }
        }).catch(function (error) {
            console.log(error);
      });
	}

	render() {
        const {tableData,headerData} = this.state;
		return (
            <div className="main-container" id="cockpitProcess">
            <Sidebar pageID={this.state.pageID}/>
            <main className="main-layout">
            
                <h3 className="bottom-line">Workflow Definitions</h3>
            
                <Datatables
                  tableHeader={headerData}
                  tableBody={tableData}
                  keyName="userTable"
                  tableClass="striped hover responsive"
                  rowsPerPage={10}
                  rowsPerPageOption={[5, 10, 15, 20]}
                  initialSort={{ prop: "username", isAscending: true }}
                  onSort={onSortFunction}
                  labels={customLabels}
                  />
              </main>
            </div>
		);
	}
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(
	CockpitProcess
);