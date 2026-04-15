"use client"

import { useState } from "react"
import { Trash2, Plus, Search, UserCircle, Eye, Pencil } from "lucide-react"

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
    {
      id: 1,
      name: "John123",
      email: "john@mail.com",
      apis: ["Payments API"],
      status: "Active",
      lastAccessed: "2026-04-10",
    },
    {
      id: 2,
      name: "Alice99",
      email: "alice@mail.net",
      apis: ["Auth API", "SMS API"],
      status: "Inactive",
      lastAccessed: "2026-04-11",
    },
    {
      id: 3,
      name: "Mike007",
      email: "mike@mail.com",
      apis: ["Biller Engine API"],
      status: "Active",
      lastAccessed: "2026-04-12",
    },
  ])

  const [search, setSearch] = useState("")
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

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.apis.join(" ").toLowerCase().includes(search.toLowerCase())
  )

  const handleAddUser = () => {
    const usernameRegex = /^[a-zA-Z0-9]+$/
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net)$/

    if (!usernameRegex.test(newUser.name)) {
      setError("Username must be letters & numbers only")
      return
    }

    if (!emailRegex.test(newUser.email)) {
      setError("Email must end with .com or .net")
      return
    }

    if (users.some(u => u.email === newUser.email)) {
      setError("Email already exists")
      return
    }

    if (newUser.apis.length === 0) {
      setError("Select at least one API")
      return
    }

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

  const handleDelete = (id: number) => {
    setUsers(users.filter(u => u.id !== id))
  }

  const handleStatusChange = (id: number, status: "Active" | "Inactive") => {
    setUsers(prev =>
      prev.map(u =>
        u.id === id ? { ...u, status } : u
      )
    )
  }

  const toggleApi = (api: string) => {
    setNewUser(prev => ({
      ...prev,
      apis: prev.apis.includes(api)
        ? prev.apis.filter(a => a !== api)
        : [...prev.apis, api]
    }))
  }

  const handleCancel = () => {
    setNewUser({ name: "", email: "", apis: [] })
    setError("")
    setShowModal(false)
  }

  const handleSaveEdit = () => {
    if (!selectedUser) return

    setUsers(prev =>
      prev.map(u => (u.id === selectedUser.id ? selectedUser : u))
    )

    setSelectedUser(null)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-blue-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 bg-white shadow-md rounded-xl p-4">

        <div className="flex items-center gap-4">
          <img
            src="/logo.png"
            alt="logo"
            className="h-12 w-12 object-contain border rounded-lg p-1 bg-white"
          />

          <div>
            <h1 className="text-2xl font-bold text-black">
              API Access Dashboard
            </h1>
            <p className="text-blue-500 text-sm">
              Manage users & API permissions
            </p>
          </div>
        </div>

        <div className="relative">
          <button onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <UserCircle size={34} className="text-blue-600" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg">
              <button
                onClick={() => window.location.href = "/"}
                className="w-full px-4 py-2 hover:bg-blue-100 text-left"
              >
                🌐 View Website
              </button>

              <button
                onClick={() => alert("Logged out")}
                className="w-full px-4 py-2 hover:bg-blue-100 text-left"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ACTION BAR */}
      <div className="flex justify-between mb-6">

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl shadow"
        >
          <Plus size={16} />
          Add User
        </button>

        <div className="relative w-72">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
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
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr key={user.id} className="border-t">

                  <td className="p-4 font-medium">{user.name}</td>
                  <td className="p-4">{user.email}</td>

                  <td className="p-4 flex flex-wrap gap-2">
                    {user.apis.map((api, i) => (
                      <span key={i} className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                        {api}
                      </span>
                    ))}
                  </td>

                  <td className="p-4">
                    <select
                      value={user.status}
                      onChange={(e) =>
                        handleStatusChange(user.id, e.target.value as any)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>

                  <td className="p-4 text-gray-500">{user.lastAccessed}</td>

                  <td className="p-4 text-right flex gap-3 justify-end">

                    {/* VIEW */}
                    <button
                      onClick={() => { setSelectedUser(user); setMode("view") }}
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-500 hover:text-white transition shadow"
                    >
                      <Eye />
                    </button>

                    {/* EDIT */}
                    <button
                      onClick={() => { setSelectedUser(user); setMode("edit") }}
                      className="p-2 rounded-full bg-green-100 hover:bg-green-600 hover:text-white transition shadow"
                    >
                      <Pencil />
                    </button>

                    {/* DELETE */}
                    <button onClick={() => handleDelete(user.id)} className="p-2 rounded-full bg-red-100 hover:bg-red-600 hover:text-white transition shadow">
                      <Trash2 />
                    </button>

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-6 text-gray-500">
                  User is not available
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* VIEW / EDIT MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-96 shadow-2xl border animate-in zoom-in-95">

            <h2 className="font-bold text-xl mb-4 text-center text-blue-600">
              {mode === "view" ? "👁️ User Details" : "✏️ Edit User"}
            </h2>

            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-4 mb-4 shadow">
              <p className="text-lg font-semibold">{selectedUser.name}</p>
              <p className="text-sm opacity-90">{selectedUser.email}</p>
            </div>

            <input
              className="w-full mb-2 border p-2 rounded"
              value={selectedUser.name}
              disabled={mode === "view"}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, name: e.target.value })
              }
            />

            <input
              className="w-full mb-2 border p-2 rounded"
              value={selectedUser.email}
              disabled={mode === "view"}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
            />

            <div className="mb-4">
              <p className="text-sm font-medium mb-2 text-blue-600">APIs:</p>

              {mode === "view" ? (
                <div className="flex flex-wrap gap-2">
                  {selectedUser.apis.map((api, i) => (
                    <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      {api}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_APIS.map(api => (
                    <button
                      key={api}
                      onClick={() => {
                        const exists = selectedUser.apis.includes(api)
                        setSelectedUser({
                          ...selectedUser,
                          apis: exists
                            ? selectedUser.apis.filter(a => a !== api)
                            : [...selectedUser.apis, api]
                        })
                      }}
                      className={`px-2 py-1 rounded-full text-xs border transition ${
                        selectedUser.apis.includes(api)
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {api}
                    </button>
                  ))}
                </div>
              )}
            </div>

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
                  className="w-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow"
                >
                  Save Changes
                </button>
              )}

            </div>

          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="mt-10 text-center text-sm text-gray-500">
        <div className="bg-white border rounded-xl shadow-sm p-4">
          <p>© 2026 Tylersoft-eclectics. All rights reserved.</p>
          <p>API Access Dashboard • Manage users & API permissions</p>
        </div>
      </div>

      {/* ADD USER MODAL (ENHANCED) */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
          onClick={handleCancel}
        >
          <div
            className="bg-white p-6 rounded-2xl w-96 shadow-2xl border animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-4 mb-4 shadow">
              <h2 className="font-bold text-lg">🚀 Add New User</h2>
              <p className="text-xs opacity-90">Create and assign API access</p>
            </div>

            {error && (
              <p className="text-red-500 text-sm mb-2">{error}</p>
            )}

            <input
              placeholder="Username"
              className="w-full mb-2 border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({ ...newUser, name: e.target.value })
              }
            />

            <input
              placeholder="Email"
              className="w-full mb-3 border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />

            <div className="mb-4">
              <p className="text-sm font-medium mb-2 text-blue-600">
                Select APIs:
              </p>

              <div className="flex flex-wrap gap-2">
                {AVAILABLE_APIS.map(api => (
                  <button
                    key={api}
                    onClick={() => toggleApi(api)}
                    className={`px-3 py-1 rounded-full text-xs border transition shadow-sm ${
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

            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="w-1/2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleAddUser}
                className="w-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow"
              >
                Add User
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
