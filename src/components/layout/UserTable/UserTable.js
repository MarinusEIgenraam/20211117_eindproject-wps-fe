/** Created by ownwindows on 19-11-21 **/
////////////////////
//// Dependencies
import {useEffect, useState} from "react";

////////////////////
//// Interal
import './UserTable.css';
import UserReducer from "../../../reducer/UserReducer";

////////////////////
//// External

const UserTable = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getEmployees()
    }, [])

    const getEmployees = () => {

        UserReducer.getUsers().then((response) => {
            setUsers(response.data)
            console.log(response.data);
        });
    };

    return (
        <div className = "container">

            <h1 className = "text-center"> User List</h1>

            <table className = "table table-striped">
                <thead>
                <tr>
                    <th> User Id</th>
                    <th> User First Name</th>
                    <th> User Last</th>
                    <th> User Email</th>
                </tr>

                </thead>
                <tbody>
                {
                    users.map(
                        user =>
                            <tr key = {user.id}>
                                <td> {user.id }</td>
                                <td> {user.firstName }</td>
                                <td> {user.lastName }</td>
                                <td> {user.email }</td>

                            </tr>

                    )
                }

                </tbody>


            </table>

        </div>
    )
}


export default UserTable;