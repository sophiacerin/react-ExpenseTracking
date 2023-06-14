import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Header from "../Header/Header";


function Dashboard() {
  const [getForm, setForm] = useState({
    expenseTitle: "",
    expenseNotes: "",
    expenseCategory: "",
    expenseAmount: "",
    paidBy: "",
    expenseDate: ""
  })
  // const [getListData, setListData] = useState(sessionStorage.getItem('addlist') ? JSON.parse(sessionStorage.getItem('addlist')) : []);
  const [getListData, setListData] = useState([])
  const [getId, setId] = useState(-1)
  //const [search, setSearch] = useState([])


  const getListAPI = () => {
    axios.get(`http://localhost:3000/book?email=${sessionStorage.getItem('email')}`).then((result) => {
      console.log(result.data);
      setListData(result.data)
    }).catch(() => {

    })
  }

  useEffect(() => {
    getListAPI();
  }, [])

  const onChangeHandler = (e) => {
    setForm({ ...getForm, [e.target.name]: e.target.value })
  }

  const onDeleteHandler = (index) => {

    axios.delete(`http://localhost:3000/book/${getListData[index].id}`).then(() => {
      getListAPI();
    }).catch(() => {

    })



    // let deleteList = [...getListData];
    // deleteList.splice(index, 1);
    // setListData(deleteList)
    // sessionStorage.setItem('deletelist', JSON.stringify(deleteList));
  }

  const onEditHandler = (index) => {
    setId(index);
    setForm({
      expenseTitle: getListData[index].expenseTitle,
      expenseNotes: getListData[index].expenseNotes,
      expenseCategory: getListData[index].expenseCategory,
      expenseAmount: getListData[index].expenseAmount,
      paidBy: getListData[index].paidBy,
      expenseDate: getListData[index].expenseDate

    })

  }

  const onEditSubmitHandler = () => {

    axios.put(`http://localhost:3000/book/${getListData[getId].id}`, {...getListData[getId],...getForm}).then(() => {
      getListAPI();
    }).catch(() => {

    })



  }


  return (
    <div class="container-fluid">
      <div class="servicepage ">
        <Header logout="true"/>
        {/* <h3 class="dashHeading"> Search Expense</h3> */}
        {/* <form class="dashboardform form-control"> */}
          {/* <label htmlFor="ExpenseDate">Expense Date:</label> */}
          {/* <input type="date" required id="expenseDate" value="expensedate" name="expensedate" class="sider" /> */}
          {/* <button type="submit" class="btn btn-lg signup-btn">Search</button> */}
        {/* </form> */}
        <table class="table table-hover dash-table mt-5 ">

          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Exp.Title</th>
              <th scope="col">Exp.Notes</th>
              <th scope="col">Exp.Category</th>
              <th scope="col">Exp.Amount</th>
              <th scope="col">Paid By</th>
              <th scope="col">Exp.Date</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>

            {getListData.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.expenseTitle}</td>
                  <td>{item.expenseNotes}</td>
                  <td>{item.expenseCategory}</td>
                  <td>{item.expenseAmount}</td>
                  <td>{item.paidBy}</td>
                  <td>{item.expenseDate}</td>
                  <td><button type="button" class="btn btn-primary"onClick={() => { onEditHandler(index) }} data-toggle="modal" data-target="#exampleModal" >
                    Edit
                  </button>
                  </td>
                  <td><button type="button" class="btn btn btn-danger" onClick={() => { onDeleteHandler(index) }}>Delete</button></td>
                </tr>
              )
            })}



          </tbody>
        </table>
        <div class="modal"  id="exampleModal"  tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Edit Contents</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div className="row row-1">
                  <div className="col-sm-4"></div>
                  <div className="col-sm-4">
                    <form class="expense-tag">
                      <div className="form-group">
                        <label htmlFor="expensetitle">Expense Title</label>
                        <input type="text" pattern="[Link-Za-z]{3}" className="form-control" id="expensetitle" name="expenseTitle" value={getForm.expenseTitle} onChange={onChangeHandler} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="expensenotes">Expense Notes</label>
                        <input type="text" pattern="[Link-Za-z]{3}" className="form-control" id="expensenotes" name="expenseNotes" value={getForm.expenseNotes} onChange={onChangeHandler} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="expensecategory">Expense Category</label>
                        <select id="expensecategory" name="expenseCategory" value={getForm.expenseCategory} onChange={onChangeHandler} className="dropdowns">
                          <option>--Select--</option>
                          <option value="Groceries">Groceries</option>
                          <option value="snacks">Snacks</option>
                          <option value="restaurant">Restaurant"</option>
                          <option value="outing">Outing</option>
                          <option value="movie">Movie</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="expenseamount">Expense Amount</label>
                        <input type="number" className="form-control" id="expenseamount" name="expenseAmount" value={getForm.expenseAmount} onChange={onChangeHandler} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="expensecategory" >Paid By</label>
                        <select id="paidby" className="dropdowns" name="paidBy" value={getForm.paidBy} onChange={onChangeHandler}>
                          <option>--Select--</option>
                          <option value="cash">Cash</option>
                          <option value="card">Card</option>
                          <option value="upi">UPI</option>
                          <option value="accounttransfer">Account Transfer</option>

                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="expensedate">Expense Date</label>
                        {getForm.expenseDate}
                        <input type="date" className="form-control" id="expenseDate" name="expenseDate" value={getForm.expenseDate} onChange={onChangeHandler} />
                      </div>
                      <button type="button" class="btn-close" data-dismiss="modal"  onClick={onEditSubmitHandler}  aria-label="Close">Save Changes</button>
                    </form>
                  </div>
                  <div className="col-sm-4"></div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;