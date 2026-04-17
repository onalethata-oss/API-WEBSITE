"use client"

import { useState } from "react"
import { Trash2, Plus, Search, UserCircle, Eye, Pencil, Download } from "lucide-react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts"

interface User {
  id: number
  name: string
  email: string
  apis: string[]
  status: "Active" | "Inactive"
  lastAccessed: string
}

const AVAILABLE_APIS = [
  "Payments API",
  "Auth API",
  "SMS API",
  "Biller Engine API",
  "Secure Acceptance"
]

export default function Dashboard() {

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John123", email: "john@mail.com", apis: ["Payments API"], status: "Active", lastAccessed: "2026-04-10" },
    { id: 2, name: "Alice99", email: "alice@mail.net", apis: ["Auth API", "SMS API"], status: "Inactive", lastAccessed: "2026-04-11" },
    { id: 3, name: "Mike007", email: "mike@mail.com", apis: ["Biller Engine API"], status: "Active", lastAccessed: "2026-04-12" }
  ])

  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const [showModal, setShowModal] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [mode, setMode] = useState<"view" | "edit">("view")

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    apis: [] as string[],
  })

  const [error, setError] = useState("")

  const USERS_PER_PAGE = 5

  // FILTER + PAGINATION
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.apis.join(" ").toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE)

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE
  )

  // CHART DATA
  const apiCount: Record<string, number> = {}
  users.forEach(u =>
    u.apis.forEach(api => {
      apiCount[api] = (apiCount[api] || 0) + 1
    })
  )

  const pieData = Object.keys(apiCount).map(key => ({
    name: key,
    value: apiCount[key]
  }))

  const barData = [
    { name: "Active", value: users.filter(u => u.status === "Active").length },
    { name: "Inactive", value: users.filter(u => u.status === "Inactive").length }
  ]

  // ADD USER
  const handleAddUser = () => {
    const usernameRegex = /^[a-zA-Z0-9]+$/
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net)$/

    if (!usernameRegex.test(newUser.name)) return setError("Username must be letters & numbers only")
    if (!emailRegex.test(newUser.email)) return setError("Email must end with .com or .net")
    if (users.some(u => u.email === newUser.email)) return setError("Email already exists")
    if (newUser.apis.length === 0) return setError("Select at least one API")

    const user: User = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      apis: newUser.apis,
      status: "Active",
      lastAccessed: new Date().toISOString().split("T")[0],
    }

    setUsers(prev => [...prev, user])
    handleCancel()
  }

  // EDIT SAVE
  const handleSaveEdit = () => {
    if (!selectedUser) return

    setUsers(prev =>
      prev.map(u =>
        u.id === selectedUser.id ? { ...selectedUser } : u
      )
    )

    setSelectedUser(null)
  }

  // DELETE
  const handleDelete = (id: number) => {
    setUsers(users.filter(u => u.id !== id))
  }

  // STATUS
  const handleStatusChange = (id: number, status: "Active" | "Inactive") => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status } : u))
  }

  // TOGGLE API (ADD)
  const toggleApi = (api: string) => {
    setNewUser(prev => ({
      ...prev,
      apis: prev.apis.includes(api)
        ? prev.apis.filter(a => a !== api)
        : [...prev.apis, api]
    }))
  }

  // TOGGLE API (EDIT)
  const toggleApiEdit = (api: string) => {
    if (!selectedUser) return

    setSelectedUser(prev => {
      if (!prev) return prev

      const exists = prev.apis.includes(api)

      return {
        ...prev,
        apis: exists
          ? prev.apis.filter(a => a !== api)
          : [...prev.apis, api]
      }
    })
  }

  const handleCancel = () => {
    setNewUser({ name: "", email: "", apis: [] })
    setError("")
    setShowModal(false)
  }

  // PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF()

    const rows = users.map(u => [
      u.name,
      u.email,
      u.apis.join(", "),
      u.status,
      u.lastAccessed
    ])

    doc.text("Users Report", 14, 15)

    autoTable(doc, {
      startY: 20,
      head: [["Name", "Email", "APIs", "Status", "Last Access"]],
      body: rows
    })

    doc.save("users.pdf")
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-blue-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 bg-white shadow-md rounded-xl p-4">

        <div className="flex items-center gap-4">

          <img src="/logo.png" className="h-10 w-12 border rounded-lg p-1" />
          <div>
            <h1 className="text-2xl font-bold">API Access Dashboard</h1>
            <p className="text-blue-500 text-sm">Manage users & API permissions</p>
          </div>
        </div>

        <div className="relative">
          <UserCircle size={34} className="text-blue-600 cursor-pointer" onClick={() => setShowProfileMenu(p => !p)} />
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-xl border">
              import Link from "next/link"

<a href="http://localhost:3000" target="_blank">
  <button className="block w-full px-4 py-2 hover:bg-gray-100 text-left">
    View Website
  </button>
</a>
              <button className="block w-full px-4 py-2 text-red-500 hover:bg-gray-100 text-left">Logout</button>
            </div>
          )}
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-3 gap-4 mb-6">

  {/* USER STATUS */}
  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5 rounded-2xl shadow-lg hover:scale-[1.02] transition">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-sm font-semibold opacity-90">User Status</h3>
      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Live</span>
    </div>

    <div className="text-m opacity-80">
      {barData[0].value} Active
    </div>

    <p className="text-m opacity-80">
      {barData[1].value} Inactive users
    </p>
  </div>


  {/* TOTAL USERS */}
  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-5 rounded-2xl shadow-lg hover:scale-[1.02] transition">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-sm font-semibold opacity-90">Total Users</h3>
      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">All</span>
    </div>

    <div className="text-3xl font-bold">
      {users.length}
    </div>

    <p className="text-sm opacity-80">
      Registered users in system
    </p>
  </div>


  {/* TOTAL API ASSIGNMENTS */}
  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-5 rounded-2xl shadow-lg hover:scale-[1.02] transition">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-sm font-semibold opacity-90">API Usage</h3>
      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">APIs</span>
    </div>

    <div className="text-3xl font-bold">
      {users.reduce((acc, u) => acc + u.apis.length, 0)}
    </div>

    <p className="text-sm opacity-80">
      Total APIs assigned
    </p>
  </div>

</div>

   {/* CHARTS */}
<div className="grid grid-cols-2 gap-4 mb-6">

  

</div>
      {/* ACTION BAR */}
      <div className="flex justify-between mb-6">
        <div className="flex gap-2">
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl shadow">
            <Plus size={16} /> Add User
          </button>
          <button onClick={handleDownloadPDF} className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-xl shadow">
            <Download size={16} /> Download
          </button>
        </div>

        <div className="relative w-72">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            placeholder="Search Users..."
            className="w-full pl-10 pr-4 py-2 border rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE  */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">APIs</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Last Access</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map(user => (
              <tr key={user.id} className="border-t">
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4">{user.email}</td>

                <td className="p-4 flex flex-wrap gap-2">
                  {user.apis.map((api, i) => (
                    <span key={i} className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">{api}</span>
                  ))}
                </td>

                <td className="p-4">
                  <select
                    value={user.status}
                    onChange={(e) => handleStatusChange(user.id, e.target.value as any)}
                    className="border rounded px-2 py-1"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </td>

                <td className="p-4 text-gray-500">{user.lastAccessed}</td>

                <td className="p-4 text-right flex gap-3 justify-end">
                  <button onClick={() => { setSelectedUser({ ...user }); setMode("view") }}><Eye /></button>
                  <button onClick={() => { setSelectedUser({ ...user }); setMode("edit") }}><Pencil /></button>
                  <button onClick={() => handleDelete(user.id)}><Trash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      {/* VIEW / EDIT */}
     {selectedUser && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-2xl w-96 shadow-2xl border animate-in zoom-in-95">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-4 mb-4 shadow">
        <h2 className="text-lg font-bold">
          {mode === "view" ? "User Details" : "Edit User"}
        </h2>
        <p className="text-xs opacity-90">
          {mode === "view" ? "View user information" : "Update user information"}
        </p>
      </div>

      {/* USER CARD */}
      <div className="bg-gray-50 rounded-xl p-3 mb-4 border">
        <p className="font-semibold text-gray-800">{selectedUser.name}</p>
        <p className="text-sm text-gray-500">{selectedUser.email}</p>
      </div>

      {/* INPUTS */}
      <input
        className="w-full mb-2 border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        value={selectedUser.name}
        disabled={mode === "view"}
        onChange={(e) =>
          setSelectedUser(prev => prev && { ...prev, name: e.target.value })
        }
      />

      <input
        className="w-full mb-3 border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        value={selectedUser.email}
        disabled={mode === "view"}
        onChange={(e) =>
          setSelectedUser(prev => prev && { ...prev, email: e.target.value })
        }
      />

      {/* APIs */}
      <div className="mb-4">
        <p className="text-sm font-medium mb-2 text-blue-600">APIs</p>

        <div className="flex flex-wrap gap-2">
          {AVAILABLE_APIS.map(api => (
            <button
              key={api}
              disabled={mode === "view"}
              onClick={() => toggleApiEdit(api)}
              className={`px-3 py-1 rounded-full text-xs transition shadow-sm ${
                selectedUser.apis.includes(api)
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {api}
            </button>
          ))}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedUser(null)}
          className="w-1/2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          Close
        </button>

        {mode === "edit" && (
          <button
            onClick={handleSaveEdit}
            className="w-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow hover:opacity-90"
          >
            Save Changes
          </button>
        )}
      </div>

    </div>
  </div>
)}

      {/* ADD USER */}
{showModal && (
  <div
    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
    onClick={handleCancel}
  >
    <div
      className="bg-white p-6 rounded-2xl w-96 shadow-2xl border animate-in zoom-in-95"
      onClick={(e) => e.stopPropagation()}
    >

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-4 mb-4 shadow">
        <h2 className="font-bold text-lg">Add New User</h2>
        <p className="text-xs opacity-90">
          Create user and assign API access
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-red-500 text-sm mb-3 bg-red-50 border border-red-200 p-2 rounded">
          {error}
        </p>
      )}

      {/* INPUTS */}
      <input
        placeholder="Username"
        className="w-full mb-3 border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        value={newUser.name}
        onChange={(e) =>
          setNewUser({ ...newUser, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        className="w-full mb-4 border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        value={newUser.email}
        onChange={(e) =>
          setNewUser({ ...newUser, email: e.target.value })
        }
      />

      {/* API SELECTION */}
      <div className="mb-4">
        <p className="text-sm font-semibold mb-2 text-blue-600">
          Select APIs
        </p>

        <div className="flex flex-wrap gap-2">
          {AVAILABLE_APIS.map((api) => (
            <button
              key={api}
              onClick={() => toggleApi(api)}
              className={`px-3 py-1 rounded-full text-xs transition shadow-sm ${
                newUser.apis.includes(api)
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {api}
            </button>
          ))}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-2">
        <button
          onClick={handleCancel}
          className="w-1/2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleAddUser}
          className="w-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
        >
          Add User
        </button>
      </div>

    </div>
  </div>
)}
{/* PAGINATION */}
<div className="flex justify-center items-center gap-4 mt-6">

  {/* PREV */}
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition shadow
      ${page === 1 
        ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
        : "bg-white hover:bg-blue-50 text-blue-600"}
    `}
  >
    Previous
  </button>

  

  {/* NEXT */}
  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition shadow
      ${page === totalPages 
        ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
        : "bg-white hover:bg-blue-50 text-blue-600"}
    `}
  >
    Next 
  </button>

</div>


       {/* FOOTER */}
      <div className="mt-10 text-center text-sm text-gray-500">
        <div className="bg-white border rounded-xl shadow-sm p-4">
          <p>© 2026 Tylersoft-eclectics. All rights reserved.</p>
          <p>API Access Dashboard • Manage users & API permissions</p>
        </div>
      </div>


    </div>
  )
}