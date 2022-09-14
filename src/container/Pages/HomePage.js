import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loader } from "../../basic/helpers";
import { getUsersList } from "../../redux/actions/homePageActions";
import "../../styles/HomePage.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const initialUserId = 1;
const renderCellData = (cell) =>
  cell ? cell : <span className="text-danger">NA</span>;
const columns = [
  {
    dataField: "id",
    text: "User ID",
    formatter: renderCellData,
  },
  {
    dataField: "login",
    text: "User Name",
    formatter: renderCellData,
  },
  {
    dataField: "name",
    text: "Name",
    formatter: renderCellData,
  },
  {
    dataField: "location",
    text: "Location",
    formatter: renderCellData,
  },
  {
    dataField: "public_repos",
    text: "Public Repo",
    formatter: renderCellData,
  },
  {
    dataField: "followers",
    text: "Followers",
    formatter: renderCellData,
  },
  {
    dataField: "following",
    text: "Following",
    formatter: renderCellData,
  },
];

let usersIds = [];

const HomePage = () => {
  const dispatch = useDispatch();
  const usersListLoader = useSelector(
    (state) => state.rootReducer.homePageReducer?.userLoading
  );
  const userDetailsLoading = useSelector(
    (state) => state.rootReducer.homePageReducer?.userDetailsLoading
  );
  const usersList = useSelector(
    (state) => state.rootReducer.homePageReducer?.usersList
  );
  const userDetails = useSelector(
    (state) => state.rootReducer.homePageReducer?.userDetails
  );
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pagination = paginationFactory({
    page: currentPage,
    sizePerPage: 10,
    totalSize: 100,
    showTotal: true,
    alwaysShowAllBtns: false,
    onPageChange: function (page, sizePerPage) {
      setCurrentPage(page);
    },
    hideSizePerPage: true,
  });
  const onTableChange = (type, newState) => {
    if (type === "pagination") {
      if (Number(newState.page) === 1) {
        dispatch(getUsersList({ since: initialUserId }));
        usersIds = [];
      } else {
        dispatch(getUsersList({ since: newState.data.at(-1).id }));
        usersIds = [];
      }
    }
  };

  const renderUsersData = () => {
    if (usersListLoader || userDetailsLoading) {
      return loader();
    } else if (usersData.length === 0) {
      return <div className="f2">No Data Available</div>;
    } else {
      return (
        <div className="container mb-5 table_container">
          <BootstrapTable
            hover
            striped
            bootstrap4
            remote={{ pagination: true, filter: false, sort: true }}
            onTableChange={onTableChange}
            bordered={false}
            keyField="id"
            data={usersData}
            columns={columns}
            pagination={pagination}
          />
        </div>
      );
    }
  };

  useEffect(() => {
    usersList.length === 0 && dispatch(getUsersList({ since: initialUserId }));
  }, []);

  useEffect(() => {
    if (usersList.length > 0) {
      usersList.forEach((ele) => {
        dispatch(getUsersList(ele.login));
        usersIds = [];
        setUsersData([]);
      });
    }
  }, [usersList]);

  useEffect(() => {
    if (userDetails.length > 0) {
      userDetails.forEach((data) => {
        if (!usersIds.includes(data.id)) {
          usersIds.push(data.id);
          setUsersData((prev) => {
            let tempData = [...prev];
            tempData.push(data);
            tempData.sort((a, b) => a.id - b.id);
            return tempData;
          });
        }
      });
    }
  }, [userDetails]);

  return (
    <div className="container mb-5 ">
      <p className="my-3">Users list</p>
      {renderUsersData()}
    </div>
  );
};

export default React.memo(HomePage);
