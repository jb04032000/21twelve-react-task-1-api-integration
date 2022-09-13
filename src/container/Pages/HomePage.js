import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loader } from "../../basic/helpers";
import { getUsersList } from "../../redux/actions/homePageActions";
import "../../styles/HomePage.css";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const pagination = paginationFactory({
  sizePerPageList: [{ text: "7", value: 7 }],
});
const renderCellData = (cell) =>
  cell ? cell : <span className="text-danger">NA</span>;
const columns = [
  {
    dataField: "id",
    text: "User ID",
    formatter: renderCellData,
    sort: true,
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
let usersData = [];

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

  const renderUsersData = () => {
    if (usersListLoader || userDetailsLoading) {
      return loader();
    } else if (usersData.length === 0) {
      return <div className="f2">No Data Available</div>;
    } else {
      return (
        <div className="container mb-5 table_container">
          <BootstrapTable
            bordered={false}
            striped
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
    usersList.length === 0 && dispatch(getUsersList());
  }, []);

  useEffect(() => {
    if (usersList.length > 0) {
      usersList.forEach((ele) => {
        dispatch(getUsersList(ele.login));
      });
    }
  }, [usersList]);

  useEffect(() => {
    if (userDetails.length > 0) {
      userDetails.forEach((data) => {
        if (usersIds === 0) {
          usersIds.push(data.id);
        } else if (!usersIds.includes(data.id)) {
          usersIds.push(data.id);
          usersData.push(data);
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
