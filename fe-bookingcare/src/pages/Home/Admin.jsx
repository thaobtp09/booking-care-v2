import { Switch, Route, Redirect } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import AdminUI from "../../components/AdminUI";

// Pages
import UserList from "../users/UserList";
import RoleList from "../roles/RoleList";
// import DoctorSchedule from "../doctor/DoctorSchedule";
import PermissionPage from "../permissions/PermissionPage";


// const DoctorPage = () => <div>Quản lý Bác sĩ</div>;
// const FacilityPage = () => <div>Quản lý Cơ sở y tế</div>;
// const SpecialtyPage = () => <div>Quản lý Chuyên khoa</div>;

const Admin = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  const role = user?.role;

  return (
    <AdminUI>
      <Switch>
        {/* DEFAULT REDIRECT */}
        <Route exact path="/admin">
          {role === "ADMIN" && <Redirect to="/admin/users" />}
          {/* {role === "DOCTOR" && <Redirect to="/admin/schedule" />} */}
        </Route>

        {/* USER & ROLE */}
        <Route path="/admin/users" component={UserList} />
        <Route path="/admin/roles" component={RoleList} />
        <Route path="/admin/permissions" component={PermissionPage} />

        {/* KHÁC */}
        {/* <Route path="/admin/schedule" component={DoctorSchedule} />
        <Route path="/admin/doctors" component={DoctorPage} />
        <Route path="/admin/facilities" component={FacilityPage} />
        <Route path="/admin/specialties" component={SpecialtyPage} /> */}

        <Redirect to="/admin" />
      </Switch>
    </AdminUI>
  );
};

export default Admin;
