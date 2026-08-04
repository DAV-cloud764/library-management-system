import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaBookOpen } from 'react-icons/fa';
import authService from '../../services/authService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [validated, setValidated] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {

    console.log("LOGIN BUTTON CLICKED");
    e.preventDefault();
    const form = e.currentTarget;

    // Bootstrap Validation Check
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setLoading(true);
    setErrorMsg('');

    try {
      await authService.login(username, password);
      navigate('/dashboard');
    } catch (err) {
  console.error("Login Error:", err);
  setErrorMsg(typeof err === "string" ? err : "Login failed");
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row w-100 justify-content-center">
        <div className="col-md-6 col-lg-5 col-xl-4">
          <div className="card card-soft-shadow p-4 bg-white">
            
            {/* Header section */}
            <div className="text-center mb-4">
              <div className="bg-uni-blue rounded-circle d-inline-flex p-3 mb-3">
                <FaBookOpen size={32} className="text-white" />
              </div>
              <h4 className="fw-bold text-uni-blue mb-1">Student Library Management System</h4>
            </div>

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="alert alert-danger py-2" role="alert">
                {errorMsg}
              </div>
            )}

            {/* Form */}
            <form noValidate validated={validated.toString()} className={validated ? "was-validated" : ""} onSubmit={handleLogin}>
              
              <div className="mb-3">
                <label className="form-label text-secondary fw-semibold small">Username</label>
                <div className="input-group has-validation">
                  <span className="input-group-text bg-light border-end-0">
                    <FaUser className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0 ps-0 bg-light"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">Please enter your username.</div>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label text-secondary fw-semibold small">Password</label>
                <div className="input-group has-validation">
                  <span className="input-group-text bg-light border-end-0">
                    <FaLock className="text-muted" />
                  </span>
                  <input
                    type="password"
                    className="form-control border-start-0 ps-0 bg-light"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">Please enter your password.</div>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-uni-blue w-100 py-2 rounded-3 fw-bold"
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                ) : null}
                {loading ? 'Authenticating...' : 'Login'}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;