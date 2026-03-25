import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function DepartmentManagement() {
  const nav = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    officer: "",
    work: ""
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/users/all")
      .then((res) => res.json())
      .then((data) => {
        const officers = data
          .filter((u) => u.role && u.role.toLowerCase() === "officer")
          .map((u) => ({
            id: u.id,
            name: u.department,
            officer: u.name,
            work: u.assignedWork
          }));

        setDepartments(officers);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addDepartment = async () => {
    if (!form.name || !form.officer || !form.work) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/users/add-officer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          department: form.name,
          name: form.officer,
          assignedWork: form.work
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(typeof data === "string" ? data : data.message);
        return;
      }

      alert(
        `Officer assigned successfully\nWork: ${data.assignedWork}`
      );

      setDepartments((prev) => [
        ...prev,
        {
          id: data.id,
          name: data.department,
          officer: data.name,
          work: data.assignedWork
        }
      ]);

      setForm({
        name: "",
        officer: "",
        work: ""
      });
    } catch (err) {
      console.error(err);
      alert("Failed to assign officer");
    }
  };

  const logout = () => {
    localStorage.removeItem("loggedUser");
    nav("/");
  };

  const totalDepartments = departments.length;
  const uniqueDepartments = [...new Set(departments.map((d) => d.name))].length;

  return (
    <div className="dash-main">
      <div className="sidebar">
        <div className="logo">
          <h2>RESOLVEIT</h2>
          <p>Admin Panel</p>
        </div>

        <ul>
          <li><button onClick={() => nav("/admin-dashboard")}>Dashboard</button></li>
          <li><button onClick={() => nav("/user-management")}>User Management</button></li>
          <li>
            <button className="active" onClick={() => nav("/department-management")}>
              Department Management
            </button>
          </li>
          <li><button onClick={() => nav("/complaints-overview")}>Complaint Oversight</button></li>
          <li><button onClick={() => nav("/reports")}>Reports</button></li>
          <li><button onClick={logout}>Logout</button></li>
        </ul>
      </div>

      <div className="dash-content">
        {/* Banner */}
        <div className="dept-banner">
          <div>
            <h2>Department Management</h2>
            <p>
              Assign officers to departments, manage responsibilities, and track
              department-level work allocation.
            </p>
          </div>
          <div className="dept-banner-badge">Admin Department Control</div>
        </div>

        {/* Summary */}
        <div className="dept-summary-cards">
          <div className="dept-summary-card dept-card-blue">
            <span>🏢</span>
            <h3>{uniqueDepartments}</h3>
            <p>Total Departments</p>
          </div>

          <div className="dept-summary-card dept-card-green">
            <span>👮</span>
            <h3>{totalDepartments}</h3>
            <p>Assigned Officers</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="dept-form-card">
          <div className="dept-form-header">
            <h3>Assign Department Officer</h3>
            <p>Fill the details below to assign a new officer to a department.</p>
          </div>

          <div className="dept-form-grid">
            <select name="name" value={form.name} onChange={handleChange}>
              <option value="">Select Department</option>
              <option value="Roads">Roads</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Electricity">Electricity</option>
              <option value="Water Supply">Water Supply</option>
            </select>

            <input
              type="text"
              name="officer"
              placeholder="Officer Name"
              value={form.officer}
              onChange={handleChange}
            />

            <input
              type="text"
              name="work"
              placeholder="Assigned Work"
              value={form.work}
              onChange={handleChange}
            />
          </div>

          <button className="dept-add-btn" onClick={addDepartment}>
            Assign Officer
          </button>
        </div>

        {/* Table Section */}
        <div className="dept-table-card">
          <div className="dept-table-header">
            <h3>Assigned Officers List</h3>
            <p>View all department officers and their assigned work.</p>
          </div>

          {departments.length === 0 ? (
            <div className="dept-empty-state">
              <h3>No departments assigned yet</h3>
              <p>Assigned officers will appear here once added.</p>
            </div>
          ) : (
            <table className="complaints-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Department</th>
                  <th>Officer</th>
                  <th>Assigned Work</th>
                </tr>
              </thead>

              <tbody>
                {departments.map((d) => (
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>
                      <span className="dept-name-badge">{d.name}</span>
                    </td>
                    <td>{d.officer}</td>
                    <td>{d.work}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default DepartmentManagement;