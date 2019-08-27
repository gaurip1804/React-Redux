    import React, { Component } from "react";
    import './home.scss';
    import Sidebar from '../../components/sidebar/sidebar'
    import Datatables from "../../components/datatable/datatables"
    import { UncontrolledAlert  } from 'reactstrap';
    import moment from "moment"; 
    import Modals from "../../components/modals/modals";
    import {Form,FormGroup, Label, Input, Button,ButtonGroup,Dropdown,DropdownItem,DropdownMenu,DropdownToggle,ModalFooter} from 'reactstrap';
    import {GET_ALL_ENTITIES,GET_ALL_TENANT_ENTITIES} from './../../constants/baseURL';
    
    // this is action 
    import { GetRequest,GetAllEntitiesData, GetEntityTenant,PostRequest, PutRequest,DelelteRequest } from '../../api/apiList';
    import axios from 'axios';
    import { connect } from 'react-redux';
   import { postRequest } from "../../api/axiosUtility";
// import store from './../../redux/store';  //importing data from store


    const onSortFunction = {
      date(columnValue) {
        // Convert the string date format to UTC timestamp
        // So the table could sort it by number instead of by string
        return moment(columnValue, "Do MMMM YYYY").valueOf();
      }
    };

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

    
  const active_tab_style = {
    fontSize: '15px',
    backgroundColor: '#4C9900'
  };

  const inactive_tab_style = {
    fontSize: '15px',
    backgroundColor: '#A9A9A9'
  };

  const header = { 'content-type': 'application/json' }
  var test;

    class Home extends Component {
      constructor() {
        document.title = 'Rules Engine';
        super();
        this.state={
          response :[],
            pageID:'home',
            bodyData:'',
            modal: false,
            persons:[],
            error : '',
            headerData:[
              { title: 'Name', prop: 'name', sortable: true, filterable: true },
              { title: 'Availability', prop: 'availability'},
              { title: 'Tenant Name', prop: 'tenantName'},
              { title: 'Actions', prop: 'actions',cell: (row) =><div>
                <i className="fa fa-clock-o" title="Add Workflows" aria-hidden="true" onClick = {()=>this.addWorkflows(row.id)}></i>  &nbsp;
                <i className="fa fa-wrench" title="Add Attributes" aria-hidden="true" 
              onClick={()=>this.addAttributes(row.id)} ></i>
                &nbsp; <i className="fa fa-trash" aria-hidden="true" title="Delete" onClick= {()=> window.confirm('Are you sure you want to delete this record?') ? this.deleteRow(row.id): null}></i> 
                &nbsp; <i className="fa fa-pencil-square-o" aria-hidden="true" title="Edit Entity" onClick={()=>this.editEntity(row.id)}></i>
                </div>
              }
            ],
            currentRow : '-1',
            successMsg  : '',
            errorMsg : '',
            title : '',
            data : '',
            size:'s',
          types : [
              {
                  name: 'IntegerSerial',
                  value: '1'
              },
              {
                  name: 'Integer',
                  value: '2'
              },
              {
                  name: 'Float',
                  value: '3'
              },
              {
                  name: 'Varchar',
                  value: '4'
              },
              {
                  name: 'DateTime',
                  value: '5'
              },
              {
                  name: 'Text',
                  value: '6'
              },
              {
                  name: 'Boolean',
                  value: '7'
              },
              {
                name: 'Star Rating',
                value: '8'
            },
          ],
     
          transactionTypes : [
            {
                name: 'Create',
                value: '1'
            },
            {
                name: 'Update',
                value: '2'
            },
            {
                name: 'Delete',
                value: '3'
            },
            {
                name: 'List',
                value: '4'
            },
            {
                name: 'View',
                value: '5'
            },
            {
                name: 'Maintain',
                value: '6'
            },
        ],
 
        }
      }

      componentDidMount() {
        const URL = GET_ALL_ENTITIES;
        const ETURL = GET_ALL_TENANT_ENTITIES;

       
        this.props.GetAllEntitesAction(URL,header,"DISPLAY_ALL");
      //  this.props.GetTenantEntitesAction(ETURL,header,"DISPLAY_ALL_TENANTS")
      
        
       

      //  const {GetAllEntitesAction,GetTenantEntitesAction} = this.props;
      //  GetAllEntitesAction(URL,header,"DISPLAY_ALL");
      //  GetTenantEntitesAction(ETURL,header,"DISPLAY_ALL_TENANTS")
      }

      static getDerivedStateFromProps(nextProps, prevProps) {
    //     debugger;
        // we cannot setState
        // if (nextProps.allentitiesData != prevProps.allentitiesData) {
        //   return {
        //     allentitiesData: nextProps.allentitiesData,
        //   };
        // }

        if (nextProps.responseData != prevProps.responseData) {
          return {
            responseData: nextProps.responseData,
          };
        }
        return null;
    }

    componentDidUpdate(prevProps) {
    //  debugger;
        // if (this.props.responseData.allentitiesData != this.state.response) {
        //   this.setState({ 
        //     allentities: this.props.responseData.allentitiesData,
        //   });
        // }

        if (this.props.responseData != this.state.response) {
          this.setState({ 
            response: this.props.responseData,
          });
        }
    }

//--------------------------------------------------------------------------------------------------------------
      render() {
        let {headerData,response,successMsg,errorMsg,title,data,size,tenants}=this.state;
        console.log("allentitiesData",response.allentitiesData)
        console.log("alltenants",response.alltenants)
        let tableData = [];
        if(response.allentitiesData){
            response.allentitiesData.map((res) => {
            let  data = {
                id: res.id,
                name : res.name ? res.name : '',
                availability : res.availability == true ? 'Yes' : 'No',
                tenantName : res.tenantName,
              }
              tableData.push(data)
          })

        }


        return (
          <div className="main-container" id="home">
          <Sidebar pageID={this.state.pageID}/>
          <main className="main-layout">
              {successMsg ?  <UncontrolledAlert  color="success">
              {successMsg}
          </UncontrolledAlert >  : errorMsg ? <UncontrolledAlert  color="danger">
              {errorMsg}
          </UncontrolledAlert > : '' }
              <h3 className="bottom-line">Entities <button className="btn btn-secondary float-right" onClick={()=> this.addEntity()}>
                Add Entity</button></h3>
              {response ? 
              <Datatables
                tableHeader={headerData}
                tableBody={tableData}
                keyName="userTable"
                tableClass="striped hover responsive"
                rowsPerPage={5}
                rowsPerPageOption={[5, 10, 15, 20]}
                initialSort={{ prop: "username", isAscending: true }}
                onSort={onSortFunction}
                labels={customLabels}
                /> : 'No data' }
            </main>
            {/* <Modals title={title} isOpen={this.state.modal} toggle={this.toggle}  data={data()} size = {size} modal={this.state.modal}/> */}
          </div>
        );
      }
    }


    //Step 1
//debugger;
    const mapStateToProps = (state) => ({
         
        // allentitiesData: state.HomeReducer.allentitiesData,

     //   allentitiesData : state.HomeReducer.allentitiesData,
     //   allTenants : state.TenantReducer.entityTenants,

        responseData : state.HomeReducer,
    });

    const mapDispatchToProps = dispatch => {
      return {
        GetAllEntitesAction: (url,header,type) => dispatch(GetAllEntitiesData(url,header,type)),
        GetTenantEntitesAction : (url,header,type) => dispatch(GetEntityTenant(url,header,type)),
      }
    }

    export default connect(mapStateToProps,mapDispatchToProps)(Home);
