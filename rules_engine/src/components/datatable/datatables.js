import React from "react";
import './datatable.scss';
import { Table, Row, Col } from "react-bootstrap";
import {
  sortData,
  filterData,
  paginateData
} from "react-bs-datatable/lib/utils/ClassHelpers";
import Pagination from "react-bs-datatable/lib/Pagination";
import PaginationOpts from "react-bs-datatable/lib/PaginationOpts";
import TableHeader from "react-bs-datatable/lib/TableHeader";
import TableBody from "react-bs-datatable/lib/TableBody";
import Filter from "react-bs-datatable/lib/Filter";
import classNames from "classnames";
import Datatable from 'react-bs-datatable';
class Datatables extends Datatable {

  render() {
    const { sortedProp, filterText, rowsPerPage, currentPage } = this.state;
    const {
      tableHeader,
      tableBody,
      onSort,
      onFilter,
      tableClass: customClass,
      keyName,
      labels,
      rowsPerPageOption
    } = this.props;
    const filteredData = filterData(
      tableHeader,
      filterText,
      onFilter,
      tableBody
    );
    const sortedData = sortData(sortedProp, onSort, filteredData);

    const paginatedData = paginateData(rowsPerPage, currentPage, sortedData);

    const tableClass = classNames({
      "table-datatable": true,
      [`${customClass}`]: true
    });
    return (
      <div className="datatable-container">
         <Row>
          <Col xs={12} md={8}>
            <PaginationOpts
              labels={labels}
              onRowsPerPageChange={this.onRowsPerPageChange}
              rowsPerPage={rowsPerPage}
              rowsPerPageOption={rowsPerPageOption}
              keyName={keyName}
            />
          </Col>
          <Col xs={12} md={4}>
            <Filter
            tableHeader={tableHeader}
            onChangeFilter={this.onChangeFilter}
            filterText={filterText}
            keyName={keyName}
            // Need to pass this prop.
            placeholder={labels.filterPlaceholder}
          />
          </Col>
        </Row>
        
        <Table className={tableClass}>
          <TableHeader
            tableHeader={tableHeader}
            keyName={keyName}
            sortedProp={sortedProp}
            onSortChange={this.onSortChange}
          />
          <TableBody
            tableHeader={tableHeader}
            keyName={keyName}
            labels={labels}
            paginatedData={paginatedData}
          />
        </Table>
        <Row>
         
          <Col xs={12} md={12}>
            <Pagination
              data={sortedData}
              rowsPerPage={rowsPerPage}
              keyName={keyName}
              currentPage={currentPage}
              onPageNavigate={this.onPageNavigate}
              labels={labels}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Datatables