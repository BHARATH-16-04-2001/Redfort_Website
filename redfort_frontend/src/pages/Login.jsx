import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import "./LoginPage.css"

export default function LoginPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: "",
    password: ""
  })

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        form
      )

      localStorage.setItem("token", res.data.token)

      alert("Login Successful 🎉")
      navigate("/") // redirect home
    } catch (err) {
      setError("Invalid username or password")
    }

    setLoading(false)
  }

  return (
    <div className="login-container">

      <div className="login-card">

        <h1>🍽 Welcome Back</h1>
        <p>Login to reserve your luxury dining experience</p>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleLogin}>

          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={handleChange}
          />

          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />

            <span
              className="eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>

          <button className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="signup-link">
          New user? <Link to="/signup">Create Account</Link>
        </p>

      </div>

    </div>
  )
}
