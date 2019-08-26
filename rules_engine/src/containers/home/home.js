    import React, { Component } from "react";
    import './home.scss';
    import Sidebar from '../../components/sidebar/sidebar'
    import Datatables from "../../components/datatable/datatables"
    import { UncontrolledAlert  } from 'reactstrap';
    import moment from "moment"; 
    import Modals from "../../components/modals/modals";
    import {Form,FormGroup, Label, Input, Button,ButtonGroup,Dropdown,DropdownItem,DropdownMenu,DropdownToggle,ModalFooter} from 'reactstrap';
    import {GET_ALL_ENTITIES,GET_ALL_TENANT_ENTITIES,GET_ENTITIES_WITH_PK,ADD_ENTITY,GET_TENANT_BY_ID,ADD_ATTRIBUTE,ENTITY_WORKFLOWS,WORKFLOWS} from './../../constants/baseURL';
    
    // this is action 
    import { GetRequest,GetAllEntitiesData, PostRequest, PutRequest,DelelteRequest } from '../../api/apiList';

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
            name : '',
            isprivate : 'No',
            showtenant : false,
            dropdownOpen: false,
            dropDownValue : '',
            isAuthenticated : false,
            dropDownText : '',
            tenants: '',
            title:'Add Entity',
            size:'s',
            addattFlag : false,
            //attribute states
            typedropdown : false,
            lengthabled : false,
            alias : '',
            fentity : 0,
            pkfield : 0,
            displayField : 0,
            fcheckabled : false,
            ownAbled : false,
            atname: '',
            type: '',
            length: '',
            isprimary: false,
            isforeignkey:false,
            checked: false,
            dropdownOpen: false,
            dropDownText: '',
            dropdownEntity : false,
            dropdownpk: false,
            dropDownTextpkfield : '',
            dropdowndisplayField : false,
            dropDownTextdisplayField:'',
            dropDownTextentity : '',
            headerData1: [
              { title: 'Name', prop: 'name', sortable: true, filterable: true },
              { title: 'Type', prop: 'type' },
              { title: 'Length', prop: 'length' },
              { title: 'Pk Flag', prop: 'pkFlag' },
              { title: 'Mandatory', prop: 'mandatory' },
              {
                  title: 'Actions', prop: 'actions', cell: (row) => <div>
                      <i className="fa fa-trash" aria-hidden="true" title="Delete" onClick={() => window.confirm('Are you sure you want to delete this record?') ? this.deleteRowAttribute(row.id) : null}></i>
                  </div>
              }
          ],
          dropDownDisabled : true,
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
          // Entity Workflow states
          addWfFlag : false,
          dropDownTextWfs : '',
          dropdownWorkflow : false,
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
        dropdownOpenTt : false,
        headerData3: [
          { title: 'Name', prop: 'name', sortable: true, filterable: true },
          { title: 'Type', prop: 'type' },
          { title: 'Actions', prop: 'actions', cell: (row) => 
          <div>
                   <i className="fa fa-trash" aria-hidden="true" title="Delete" onClick={() => window.confirm('Are you sure you want to delete this record?') ? this.deleteWorkFlow(row.id) : null}></i> 
              </div>
          }
      ],
        }
      }

      componentDidMount() {
        const URL = GET_ALL_ENTITIES;
        debugger;
        this.props.GetAllEntitesAction(URL,header,"DISPLAY_ALL");
        

  
        GetRequest(GET_ALL_TENANT_ENTITIES,header)
        .then(tenants => {
          this.setState({
          tenants : tenants.data,
          });
        })
          .catch(function (error) {
              console.log(error);
        });
      }

      static getDerivedStateFromProps(nextProps, prevProps) {
        // debugger;
        // we cannot setState
        if (nextProps.allentitiesData != prevProps.allentitiesData) {
          return {
            allentitiesData: nextProps.allentitiesData,
          };
        }
        
        return null;
    }

    componentDidUpdate(prevProps) {
      // debugger;
        if (this.props.allentitiesData.allentitiesData != this.state.response) {
          this.setState({ response: this.props.allentitiesData.allentitiesData });
        }
    }

//------------------------------------Functions for Attributes-------------------------------------------------
     
      addEntity = () => {
        // this.state.addattFlag = false;
        // this.state.title='Add Entity';
        // this.state.size='s';
        // this.state.addWfFlag = false;
        this.setState({
          addattFlag:false,
          title:"Add Entity",
          size:"s",
          addWfFlag:false
        });
         this.getInitialState(); 
         this.setInitalWorkflowState();
          this.toggle();
      }

      getInitialState = () => {
          this.state.name = '';
          this.state.isprivate = 'No';
          this.state.dropdownOpen = false;
          this.state.dropDownValue = '';
          this.state.dropDownText = '';
          this.state.entityId = '';
          this.state.Tt = '';
          this.state.workflow = '';
      }

      toggle = () => {
        this.setState({
          modal: !this.state.modal,
        });
      }

      dropdowntoggle = () => {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

      handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
            dropDownText: event.target.name == 'tenant' ? event.currentTarget.textContent : this.state.dropDownText,
            dropDownTextdisplayField: event.target.name == 'displayField' ? event.currentTarget.textContent : this.state.dropDownTextdisplayField,
        });
      }

      submitForm = (e) => {
        e.preventDefault();
         var data = {
          name: this.state.name,
          availability: this.state.isprivate == 'Yes' ? true : false,
          tenantId: this.state.isprivate == 'Yes' ? this.state.tenant : 0 
        }
         this.addEntityApi(data);
        }

        addEntityApi = (data) => {
          this.setInitalWorkflowState();
          if(this.state.entityId){    //EDIT
            PutRequest(ADD_ENTITY+'/'+ this.state.entityId,data,header)
            .then(response => {
              if(response.status == '200'){
                this.setState({successMsg : 'Record Updated Successfully'});
                setTimeout(() => {
                 this.setState({
                   successMsg: ''
                 });
               }, 2000);
               GetRequest(GET_ALL_ENTITIES,header)
               .then(res => {
                 this.setState({response:res.data})
               }).catch(err=>{
                 console.log(err)
               })
              }
            }).catch(error=> {
              console.log(error);
                this.setState({errorMsg : "Failed to update the record"})
                setTimeout(() => {
                  this.setState({
                    errorMsg: ''
                  });
                }, 2000);
            })
          }
          else {       //ADD
            PostRequest(ADD_ENTITY,data,header)
            .then(response => {
              if(response.status == '200'){
               this.setState({successMsg : 'Record Added Successfully'});
               setTimeout(() => {
                this.setState({
                  successMsg: ''
                });
              }, 2000);

              GetRequest(GET_ALL_ENTITIES,header)
              .then(res => {
                this.setState({response:res.data})
              }).catch(err=>{
                console.log(err)
              })

              }
            }).catch((error) => {
                console.log(error);
                this.setState({errorMsg : "Failed to add the record"})
                setTimeout(() => {
                  this.setState({
                    errorMsg: ''
                  });
                }, 2000);
              })
            }
             
           this.getInitialState()
           this.state.modal = false;
          }

          editEntity = (rowId) => {
            this.getInitialState();
            this.state.addWfFlag = false
            this.setState({title:'Edit Entity',size:'s',addattFlag : false})
            GetRequest(GET_ALL_ENTITIES + '/'+ rowId,header)
                      .then(response => {
                        this.setState({
                          id : response.data.id,
                          name: response.data.name,
                          isprivate : response.data.availability == false ? 'No' : 'Yes',
                          dropdownOpen: false,
                          tenant : response.data.tenantId,
                          entityId : rowId
                        });
                      })
                      .then(() => {
                            if(this.state.tenant != 0){
                             GetRequest(GET_TENANT_BY_ID + '/'+ this.state.tenant)
                                .then((res) => {
                                    this.setState({
                                      dropDownText: res.data[0].name,
                                    });
                                })
                                .catch(function (error) {
                                  console.log(error);
                                }); 
                              }
                            })
                   this.toggle();
          }

      deleteRow = (id) => {
        let url = ADD_ENTITY+`/${id}`;
        axios.delete(url)
        .then(res => {
          if(res.status == '204'){
            GetRequest(GET_ALL_ENTITIES)
              .then(response => {
                this.setState({ response: response.data });
              })
              .catch((error) => {
                console.log(error);
              })
            this.setState({successMsg : 'Record Deleted Successfully'});
            setTimeout(() => {
              this.setState({
                successMsg: ''
              });
            }, 2000);
            }
        })
        .catch((error) => {
          console.log(error);
          this.setState({errorMsg : 'Cannot delete entity. May be it has related accounts. Delete those accounts first'});
          setTimeout(() => {
            this.setState({
              errorMsg: ''
            });
          }, 2000);
        });

        this.getInitialState();
      }
         
      resetForm = () => {
        this.setState({name:'',isprivate:'No',dropdownOpen:false,dropDownValue:'',dropDownText:''})
      }

//------------------------------------Functions for Attributes--------------------------------------------------

          addAttributes = (entityId) => {
              this.setState({entityId:entityId, title : 'Add Attributes',size:'xl', addattFlag:true});
              GetRequest(GET_ENTITIES_WITH_PK)
                .then(response => {
                  let endata = [];
                  response.data.map(items => {
                    endata.push({id:items.id,name:items.name} );
                  })
                  this.setState({entityData : endata});
                })
                .catch((error) => {
                  console.log(error);
                })
                this.getEntityAttributes(entityId);
                this.toggle();
          }

          getEntityAttributes = (entityId) => {
            if(entityId != '-1'){
            var url = ADD_ENTITY + `/${entityId}/attribute`;
            GetRequest(url)
                .then(response => {
                    this.setState({ responseAtt: response.data.attributes, name: response.data.name });
                })
                .catch(function (error) {
                    console.log(error);
                });
              }
            }

            setInitialState = () =>
            {
              this.setState({
                  atname: '',
                  type: '',
                  length: '',
                  isprimary: false,
                  checked: false,
                  dropdownOpen: false,
                  dropDownText: '',
                  successMsg: '',
                  errorMsg: '',
                  typedropdown : false,
                  lengthabled : false,
                  alias : '',
                  fentity : 0,
                  pkfield : 0,
                  displayField : 0,
                  fcheckabled : false,
                  ownAbled : false,
                  dropDownDisabled : true,
                  dropDownTextentity : '',
                  isforeignkey : '',
                  dropDownTextdisplayField : '',
                  dropDownTextentitypkfield : '',
                  dropDownTextpkfield : '',
                });
              }

          handleChangeEntity = (event) => {
            var entityId = event.target.value;
            this.setState({
                fentity : event.target.value,
                dropDownTextentity: event.target.name == 'fentity' ? event.currentTarget.textContent : this.state.dropDownTextentity,
              })
              var url = ADD_ENTITY + `/${entityId}/attribute`;
              GetRequest(url)
                  .then(response => {
                      var pkdata = []; var allAttData = [];
                      response.data.attributes.map((items)=> {
                          allAttData.push({name: items.name,id :items.id,length :items.length,type :items.type,pkFlag : items.pkFlag});
                      if(items.pkFlag == true){
                          pkdata.push({name: items.name,id :items.id,length :items.length,type :items.type,pkFlag : items.pkFlag});
                          }
                      });
                    this.setState({ responsepks: pkdata,responseallAtt : allAttData });
                  })
                  .catch(function (error) {
                      console.log(error);
                  });
              }

              handleChangeType = (event) => {
                this.state.lengthabled = false;
                this.setState({
                    dropDownText: event.target.name == 'type' ? event.currentTarget.textContent : this.state.dropDownText,
                    type : event.target.value,
                    lengthabled : (event.currentTarget.textContent == 'Boolean' || event.currentTarget.textContent == 'Text' || event.currentTarget.textContent == 'DateTime' || event.currentTarget.textContent == 'Star Rating' ) ? true : this.state.lengthabled,
                    length : (event.currentTarget.textContent == 'Boolean' || event.currentTarget.textContent == 'Text' || event.currentTarget.textContent == 'DateTime') ? '' : (event.currentTarget.textContent == 'Star Rating' ? 1 : this.state.length),
                });
              } 
              
              handleChangeEntity = (event) => {
                var entityId = event.target.value;
                this.setState({
                    fentity : event.target.value,
                    dropDownTextentity: event.target.name == 'fentity' ? event.currentTarget.textContent : this.state.dropDownTextentity,
                })
                var url = ADD_ENTITY + `/${entityId}/attribute`;
                axios.get(url)
                .then(response => {
                    var pkdata = []; var allAttData = [];
                    response.data.attributes.map((items)=> {
                        allAttData.push({name: items.name,id :items.id,length :items.length,type :items.type,pkFlag : items.pkFlag});
                    if(items.pkFlag == true){
                        pkdata.push({name: items.name,id :items.id,length :items.length,type :items.type,pkFlag : items.pkFlag});
                        }
                    });
                  this.setState({ responsepks: pkdata,responseallAtt : allAttData });
                })
                .catch(function (error) {
                    console.log(error);
                });
              }

            handleChangePk = (event) =>
            {
              var pkId = event.target.value;
              this.setState({
                  pkfield : event.target.value,
                  dropDownTextpkfield: event.target.name == 'pkfield' ? event.currentTarget.textContent : this.state.dropDownTextentitypkfield,
              });
              
              this.state.responsepks.map(value => {
                  if(value.id == pkId)
                  {
                    this.setState({
                              length:value.length,
                              type: value.type == '1' ? '2' : value.type,
                              lengthabled:true})
                  this.state.types.map(items => {
                      if(items.value == value.type)
                      {
                          this.setState({
                              dropDownText : items.name == 'IntegerSerial' ? 'Integer' : items.name,
                              typedropdown:true})
                            }
                        })
                      }
                    })
                }

                dropdowntoggleEntity = () => {
                  this.setState({
                      dropdownEntity: !this.state.dropdownEntity
                    });
                }

                dropdowntogglepk = () => {
                  this.setState({
                      dropdownpk: !this.state.dropdownpk
                  });
              }

              dropdowntoggledisplayField = () => {
                this.setState({
                    dropdowndisplayField: !this.state.dropdowndisplayField
                });
            }

            handleCheckbox = () => {  
              this.setState({
                  isprimary: !this.state.isprimary,
                  isforeignkey :  false,
                  dropDownDisabled :true,
                  fentity : this.state.isprimary == true ? '' : '',
                  dropDownTextentity :this.state.isprimary == true ? '' : '',
                  pkfield : this.state.isprimary == true ? '' : '',
                  dropDownTextpkfield : this.state.isprimary == true ? '' : '',
                  displayField : this.state.isprimary == true ? '' : '',
                  dropDownTextdisplayField : this.state.isprimary == true ? '' : '',
                  type : this.state.isprimary == true ? this.state.type : '1',
                  dropDownText : this.state.isprimary == true ? '' : 'IntegerSerial',
                  typedropdown : this.state.isprimary == true ? false : true,
                  length : this.state.isprimary == true ? '' : '',
                  lengthabled : false,
                  fcheckabled : this.state.isprimary == true ? false : true,
              });
            }

            handleCheckbox_fk = () => {
              this.setState({
                  isforeignkey: !this.state.isforeignkey,
                  isprimary : false ,
                  dropDownDisabled : this.state.isforeignkey == true ? true:false,
                  typedropdown : this.state.isforeignkey == false ? false : this.state.typedropdown,
                  lengthabled : this.state.isforeignkey == false ? false : '',
                  fentity : this.state.isforeignkey == false ? '' : this.state.fentity,
                  displayField : this.state.isforeignkey == false ? '' : this.state.displayField,
                  dropDownTextdisplayField : '',
                  dropDownTextentity : '',
                  pkfield : '',
                  dropDownTextpkfield : '',
                  type : '',
                  dropDownText : '',
                  length : '',
                  ownAbled : this.state.isforeignkey == true ? false : true,
              });
            }

            submitAttForm = (e) => {
              e.preventDefault();
              var attributeData = {
                  name: this.state.atname,
                  type: this.state.type, 
                  length: this.state.length,
                  mandatory: this.state.checked,
                  pkFlag: this.state.isprimary,
                  entityId: this.state.entityId,
                  alias : this.state.alias,
                  referenceId : this.state.pkfield ? parseInt(this.state.pkfield) : 0,
                  referenceDisplayId : this.state.displayField ? parseInt(this.state.displayField) : 0,
              }

             // console.log("attributeData",attributeData)
              this.saveAttributes(attributeData);
            }

            saveAttributes = (data) => {
            PostRequest(ADD_ATTRIBUTE,data,header)
                  .then(response => {
                      if (response.status == '200') {
                          this.setState({ successMsg: 'Record Added Successfully'});
                          setTimeout(() => {
                              this.setState({
                                successMsg: ''
                              });
                            }, 2000);
                          this.getEntityAttributes(this.state.entityId);
                      }
                      
                  })
                  .catch(err => {
                    console.log(err.response.data);
                      this.setState({ errorMsg: 'Record Not Added. '+ err.response.data });
                      setTimeout(() => {
                          this.setState({
                              errorMsg: ''
                          });
                        }, 3000);
                  })
                  this.setInitialState();
            }
  
        deleteRowAttribute = (id) => {
          let url = ADD_ATTRIBUTE +  `/${id}`
  
          axios.delete(url)
              .then(res => {
                  if (res.status == '204') {
                      this.setState({ successMsg: 'Record deleted successfully' });
                      setTimeout(() => {
                          this.setState({
                            successMsg: ''
                          });
                        }, 2000);
                      this.getEntityAttributes(this.state.entityId);
                  }
              })
              .catch((error) => {
                  console.log(error);
                  this.setState({ errorMsg: error.response.data});
                  setTimeout(() => {
                      this.setState({
                          errorMsg: ''
                      });
                    }, 3000);
              });
              this.setInitialState();
          }


        resetAttForm = () => {
          this.setInitialState();
      }

//---------------------------------------Add Workflows----------------------------------------------------------


  handleChangeWfs = (event) => {
    this.setState({
      workflow : event.target.value,
      dropDownTextWfs: event.target.name == 'workflow' ? event.currentTarget.textContent : this.state.dropDownTextWfs,
    })
  }

  dropdowntoggleWorkflows = () => {
    this.setState({
        dropdownWorkflow: !this.state.dropdownWorkflow
      });
  }

  dropdowntoggleTt = () => {
    this.setState({
      dropdownOpenTt: !this.state.dropdownOpenTt
    });
  }

  handleChangeTt = (event) => {
      this.setState({
        Tt : event.target.value, 
        dropDownTextTt: event.target.name == 'Tt' ? event.currentTarget.textContent : this.state.dropDownTextTt,
      })
  }

  addWorkflows = (entityId) => {
    this.state.addattFlag = false;
    this.setState({entityId:entityId, title : 'Add Workflows',size:'xl', addWfFlag:true});
      GetRequest(ENTITY_WORKFLOWS,header)
        .then(res=>{
         this.setState({entityWf : res.data})
        })

        GetRequest(WORKFLOWS,header)
        .then(res=>{
         this.setState({allWfs : res.data})
        })
    this.toggle();
  }

    submitWorflow = (e) => {
      e.preventDefault();
        var data = {
          "entityId": this.state.entityId,
          "workflowId": this.state.workflow,
          "transactionType": this.state.Tt
        }
        this.saveWorflow(data)
    }
    saveWorflow = (data) => {
      postRequest(ENTITY_WORKFLOWS,data,header)
      .then(res=>{
        if(res.status == '200'){
          this.setState({
            successMsg : 'Record Added Successfully'
          });
            GetRequest(ENTITY_WORKFLOWS,header)
              .then(res=>{
              this.setState({entityWf : res.data})
              })
            setTimeout(()=>{
              this.setState({
                successMsg : ''
              })
            },2000)
        }
        this.setInitalWorkflowState();
      })
    }

    deleteWorkFlow = (workFlowId)=> {
      axios.delete(ENTITY_WORKFLOWS+"/"+ workFlowId)
        .then(res => {
          if(res.status == '204'){
            GetRequest(ENTITY_WORKFLOWS)
              .then(response => {
                this.setState({ entityWf: response.data });
              })
              .catch((error) => {
                console.log(error);
              })
            this.setState({successMsg : 'Record Deleted Successfully'});
            setTimeout(() => {
              this.setState({
                successMsg: ''
              });
            }, 2000);
            }
        })
        .catch((error) => {
          console.log(error);
          this.setState({errorMsg : error});
          setTimeout(() => {
            this.setState({
              errorMsg: ''
            });
          }, 2000);
        });
    }

    setInitalWorkflowState = () => {
      this.state.workflow = '';
      this.state.dropDownTextWfs = '';
      this.state.dropDownTextTt  = '';
      this.state.Tt = '';
      this.setState({
        workflow : this.state.workflow,
        dropDownTextWfs : this.state.dropDownTextWfs,
        dropDownTextTt : this.state.dropDownTextTt,
        Tt : this.state.Tt,
      })
    }

//--------------------------------------------------------------------------------------------------------------
      render() {
        let {headerData,response,successMsg,errorMsg,tenants,entityId,title,size,addattFlag,typedropdown,lengthabled,alias,fcheckabled,ownAbled,atname,length,isprimary,isforeignkey,checked,dropdownOpen,dropDownText,dropdownEntity,dropdownpk,dropDownTextpkfield,dropdowndisplayField,dropDownTextdisplayField,dropDownTextentity,headerData1,dropDownDisabled,types,entityData,responsepks,responseallAtt,responseAtt,addWfFlag,allWfs,dropDownTextWfs,dropdownWorkflow,transactionTypes,dropdownOpenTt,dropDownTextTt,entityWf,headerData3}=this.state;
        
        let tableData = [];
        if(response){
            response.map((res) => {
            let  data = {
                id: res.id,
                name : res.name ? res.name : '',
                availability : res.availability == true ? 'Yes' : 'No',
                tenantName : res.tenantName 
              }
              tableData.push(data)
          })

        }

      //  console.log(store.get);

        if (responseAtt) {
          var tableDataAtt = []
          var typeName = '';
          responseAtt.map((res) => {
              types.map(type=>{
                  if(type.value == res.type){
                      typeName = type.name
                  }
              })
              let data = {
                  id: res.id,
                  entityId: res.entityId,
                  name: res.name,
                  type: typeName,
                  length: res.length,
                  mandatory: res.mandatory == true ? 'Yes' : 'No',
                  pkFlag: res.pkFlag == true ? 'Yes' : 'No',
              }
              tableDataAtt.push(data)
          })
      }


      var workFlows=[];
      if(entityWf) {
        entityWf.map((item) => 
        {
          if(item.entityId == entityId)
          {
            let entityWfs = {
                name : item.workflowId.split(":")[0],
                type : item.transactionType == '1' ? 'Create' : item.transactionType == '2' ? 'Update' : item.transactionType == '3' ? 'Delete' : item.transactionType == '4' ? 'List' : item.transactionType == '5' ? 'View' : item.transactionType == '6' ? 'Maintain' : 'No type',
                id : item.id,
              }
              workFlows.push(entityWfs);
          }
        })
      }

        let search = false;
        const data = () => {
          if(addattFlag)
          {
            return(
            <div>
               {successMsg ?  <UncontrolledAlert  color="success">
              {successMsg}
          </UncontrolledAlert >  : errorMsg ? <UncontrolledAlert  color="danger">
              {errorMsg}
          </UncontrolledAlert > : '' }
                  <Form onSubmit={this.submitAttForm} id="attributeForm">
                        <input type="hidden" value={this.state.entityId} name="entityId" readOnly></input>
                        <div className="row">
                            <div className="col-sm-5 col-md-5 col-lg-5 col-xl-5 titleOwn">
                            <FormGroup>
                                <big className="biglabel"> Own field </big>
                                <Label className="check">
                                <Input type="checkbox" name="isprimary" onChange={this.handleCheckbox} checked = {isprimary} value={isprimary} disabled = {ownAbled} />
                                Primary Key </Label> 
                            </FormGroup>
                            </div>
                            <div className="col-sm-5 col-md-5 col-lg-5 col-xl-5 titleOwn">
                            <FormGroup>
                                <big className="biglabel">External Field (FK) </big>
                                <Label className="check">
                                <Input type="checkbox" name="isforeignkey" onChange={this.handleCheckbox_fk} checked = {isforeignkey} value={isforeignkey} disabled = {fcheckabled}/>
                                Foreign Key </Label> 
                            </FormGroup>
                            </div>
                            </div>
                            <div className="row">
                            <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                <FormGroup>
                                    <Label for="name">Attribute Name : </Label>
                                    <Input type="text" name="atname" id="atname" value={atname} onChange={this.handleChange} required autoFocus />
                                </FormGroup>
                            </div>
                            <div className="col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                            <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            <FormGroup>
                                    <Label for="type">Entity :  </Label>
                                    {entityData ?
                                    <Dropdown 
                                    isOpen={dropdownEntity} 
                                    toggle={this.dropdowntoggleEntity} 
                                    className="selectType">
                                        <DropdownToggle caret disabled = {dropDownDisabled} required > 
                                            {dropDownTextentity ? dropDownTextentity : 'Choose Option'}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {entityData.map((type) => (
                                                <DropdownItem name="fentity" onClick={this.handleChangeEntity} key={type.id} value={type.id}>{type.name}</DropdownItem>
                                            ))
                                            }
                                        </DropdownMenu>
                                        </Dropdown> : '' }
                                </FormGroup>
                            </div>
                            </div>
                            <div className="row">
                            <div className="col-sm-2 col-md-2 col-lg-2 col-xl-2 LabelType">
                                <FormGroup>
                                    <Label for="type">Type :  </Label>
                                    <Dropdown isOpen={dropdownOpen} toggle={this.dropdowntoggle} className="selectType" required={true}>
                                        <DropdownToggle caret required disabled={typedropdown}>
                                            {dropDownText ?dropDownText : 'Choose Option'}
                                        </DropdownToggle>
                                        <DropdownMenu required>
                                            {types.map((type) => (
                                                <DropdownItem name="type" onClick={this.handleChangeType} key={type.value} value={type.value}>{type.name}</DropdownItem>
                                            ))
                                            }
                                        </DropdownMenu>
                                    </Dropdown>
                                </FormGroup>
                                </div>
                                <div className="col-sm-2 col-md-2 col-lg-2 col-xl-2 LabelType">
                                <FormGroup>
                                    <Label for="length">Length : </Label>
                                    <Input type="number" name="length" id="length" value={length} onChange={this.handleChange} required disabled={lengthabled} />
                                </FormGroup>
                            </div>
                            <div className="col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                            <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            
                              <FormGroup>
                                    <Label for="type">PK Field:  </Label>
                                    <Dropdown isOpen={dropdownpk} toggle={this.dropdowntogglepk}  className="selectType">
                                        <DropdownToggle caret  disabled = {dropDownDisabled}>
                                            {dropDownTextpkfield ? dropDownTextpkfield : 'Choose Option'}
                                        </DropdownToggle>
                                        {responsepks ? 
                                        <DropdownMenu>
                                            {responsepks.map((type) => (
                                                <DropdownItem name="pkfield" onClick={this.handleChangePk} key={type.id} value={type.id} pklength = {type.length} pktype = {type.type} pkname={type.name}>{type.name}</DropdownItem>
                                            ))
                                            }
                                        </DropdownMenu> : ''}
                                    </Dropdown>
                                </FormGroup> 
                            </div>
                            </div>
                        <div className="row">
                        <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                <FormGroup>
                                    <Label for="label">Label Name : </Label>
                                    <Input type="text" name="alias" id="alias" value={alias} onChange={this.handleChange} />
                                </FormGroup>
                            </div>
                            <div className="col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                            <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            <FormGroup>
                                    <Label for="type">Display Field :  </Label>
                                    <Dropdown isOpen={dropdowndisplayField} toggle={this.dropdowntoggledisplayField}  className="selectType">
                                        <DropdownToggle caret  disabled = {dropDownDisabled}>
                                            {dropDownTextdisplayField ? dropDownTextdisplayField : 'Choose Option'}
                                        </DropdownToggle>
                                        {responseallAtt ?
                                        <DropdownMenu>
                                            {responseallAtt.map((type) => (
                                                <DropdownItem name="displayField" onClick={this.handleChange} key={type.id} value={type.id}>{type.name}</DropdownItem>
                                            ))
                                            }
                                        </DropdownMenu> : ''}
                                    </Dropdown>
                                </FormGroup>
                            </div>
                            <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="isrequired" checked={checked} value = {checked} onChange={e => this.setState({ checked: e.target.checked })} />
                                        Mandatory
                                    </Label>
                                </FormGroup>
                            </div>
                        </div>
                    <ModalFooter>
                        <Button type="submit" className="btn btn-secondary modalButton">Submit</Button>
                        <Button color="secondary" type='button' onClick={this.resetAttForm} >Reset</Button>
                    </ModalFooter>
                </Form>
            

            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div className="main-container" id="attributes">
                            <main className="main-layout">
                              {tableDataAtt ? 
                                <Datatables
                                    tableHeader={headerData1}
                                    tableBody={tableDataAtt}
                                    keyName="userTable"
                                    tableClass="striped hover responsive"
                                    rowsPerPage={5}
                                    rowsPerPageOption={[5, 10, 15, 20]}
                                    searching={search}
                                /> : '' }
                            </main>
                        </div>
                </div>
            </div>

            </div>
          );
          }
          else if(addWfFlag){
            return(
            <div>
                {successMsg ?  <UncontrolledAlert  color="success">
              {successMsg}
          </UncontrolledAlert >  : errorMsg ? <UncontrolledAlert  color="danger">
              {errorMsg}
          </UncontrolledAlert > : '' }
              <Form onSubmit = {this.submitWorflow}>
                <div className = 'row'>
                  <div className = 'col-sm-2 col-md-2 col-lg-2 col-xl-2'></div>
                  <div className = 'col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                      <Dropdown isOpen={dropdownWorkflow} toggle={this.dropdowntoggleWorkflows} className="selectType" required>
                                  <DropdownToggle caret required>
                                    {dropDownTextWfs ? dropDownTextWfs : 'Choose Option'}
                                  </DropdownToggle>
                                    {allWfs ?
                                    <DropdownMenu>
                                    {allWfs.map((item) => (
                                    <DropdownItem name = 'workflow' key = {item.id} value={item.id} onClick = {this.handleChangeWfs}>{item.id.split(":")[0]}
                                    </DropdownItem>
                                    ))}
                                  </DropdownMenu> : ''}
                              </Dropdown> 
                              </div>

                    <div className = 'col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                      {transactionTypes ?  
                      <Dropdown isOpen={dropdownOpenTt} toggle={this.dropdowntoggleTt} className="selectType" required>
                  <DropdownToggle caret required className="selectType">
                    {dropDownTextTt ? dropDownTextTt : 'Choose Option'}
                  </DropdownToggle>
                  <DropdownMenu>
                    {transactionTypes.map((item) => {
                    return <DropdownItem name = 'Tt' key = {item.value} value={item.value} onClick = {this.handleChangeTt}>{item.name}</DropdownItem>
                    })}
                  </DropdownMenu>
              </Dropdown> : "  Data Not Found"}
              </div>
              </div>
             
              <ModalFooter>
                        <Button type="submit" className="btn btn-secondary modalButton">Submit</Button>
                        <Button color="secondary" type='button' onClick={this.setInitalWorkflowState} >Reset</Button>
              </ModalFooter>
              </Form>
             
              {workFlows ? 
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div className="main-container" id="attributes">
                            <main className="main-layout">
                             
                                <Datatables
                                    tableHeader={headerData3}
                                    tableBody={workFlows}
                                    keyName="userTable"
                                    tableClass="striped hover responsive"
                                    rowsPerPage={5}
                                    rowsPerPageOption={[5, 10, 15, 20]}
                                    searching={search}
                                /> 
                            </main>
                        </div>
                </div>
            </div> : '' }
            </div>
            )
          }
          else {
          return(
              <div>
                <Form onSubmit={this.submitForm}>
                  {entityId ? 
                  <Input type="hidden" name="entityId" id="entityId" value= {this.state.entityId} readOnly/> : ''
                }
                      <FormGroup>
                          <Label for="entityName">Name : </Label>
                          <Input type="text" name="name" id="name" value= {this.state.name} placeholder="Entity Name" onChange={this.handleChange} required autoFocus/>
                      </FormGroup>

                      <FormGroup>
                          <Label for="Private">Private ? </Label>
                          <ButtonGroup style={{paddingLeft:10,paddingTop:-0, height: 40}} >
                              <Button type = "radio" style ={this.state.isprivate == 'Yes' ? active_tab_style : inactive_tab_style} name="isprivate"  onClick={this.handleChange} value = "Yes" >Yes</Button>
                              <Button  type = "radio" style={this.state.isprivate == 'No' ? active_tab_style : inactive_tab_style} name="isprivate"  onClick={this.handleChange} value= "No">No</Button>
                            </ButtonGroup> 
                      </FormGroup>

                      {this.state.isprivate == 'Yes' ? 
                          <FormGroup>
                          <Label for="tenant">Tenant :  </Label>
                        {tenants ?
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.dropdowntoggle} required>
                                  <DropdownToggle caret required>
                                    {this.state.dropDownText ? this.state.dropDownText : 'Choose Option'}
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    {tenants.map((tenant) => {
                                    return <DropdownItem name = 'tenant' key = {tenant.id} value={tenant.id} onClick = {this.handleChange}>{tenant.name}</DropdownItem>
                                    })}
                                  </DropdownMenu>
                              </Dropdown> : "  Data Not Found"}
                          </FormGroup>
                            : '' } 
                        <ModalFooter>
                      <Button type="submit" className="btn btn-secondary modalButton">Submit</Button>
                        <Button color="secondary" type = 'button' onClick={this.resetForm} >Reset</Button>
                    </ModalFooter>
                      </Form>
              </div>
          )}
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
            <Modals title={title} isOpen={this.state.modal} toggle={this.toggle}  data={data()} size = {size} modal={this.state.modal}/>
          </div>
        );
      }
    }


    //Step 1

    const mapStateToProps = state => ({
        allentitiesData: state.HomeReducer
    });

    const mapDispatchToProps = dispatch => {
      return {
        GetAllEntitesAction: (url,header,type) => dispatch(GetAllEntitiesData(url,header,type)),
         
      }
    }

    export default connect(mapStateToProps,mapDispatchToProps)(Home);
