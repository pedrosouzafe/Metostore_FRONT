import { useState } from "react";
import "./LoginSection.css";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function LoginSection({ loading, setLoading, user, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [stateLogin, setStateLogin] = useState(true);
  const [erro, setErro] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "" || password === "") {
      alert("Preencha os campos corretamente");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Login inválido");
          return res.json();
        })
        .then((data) => {
          localStorage.setItem("user", JSON.stringify(data));
          setUser({ id: data.id, name: data.name, email: data.email });

          setModalMessage(
            `Bem-vindo(a) de volta, ${data.name || "usuário"}! 👋`
          );
          setShowModal(true);

          setTimeout(() => {
            setShowModal(false);
            navigate("/");
          }, 2000);
        })
        .catch((error) => {
          setErro(error.message);
          alert(error.message);
        })
        .finally(() => setLoading(false));
    }, 2000);
  };

  const handleRegister = () => {
    if (email === "" || password === "" || name === "") {
      alert("Preencha os campos corretamente");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("E-mail já foi cadastrado");
          return res.json();
        })
        .then((data) => {
          localStorage.setItem("user", JSON.stringify(data));
          setUser({ id: data.id, name: data.name, email: data.email });

          setModalMessage(
            `Conta criada com sucesso! Bem-vindo(a), ${
              data.name || "usuário"
            } 🎉`
          );
          setShowModal(true);
          setTimeout(() => {
            setShowModal(false);
            navigate("/");
          }, 2000);
        })
        .catch((error) => {
          alert(error.message);
          setErro(error.message);
        })
        .finally(() => setLoading(false));
    }, 3000);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-main-container">
          <h2 className="login-title">
            {stateLogin ? "Bem-vindo de volta!" : "Crie sua conta"}
          </h2>

          <div className="toggle-sign-in">
            <button
              className={`entrar ${stateLogin ? "active" : ""}`}
              onClick={() => setStateLogin(true)}
            >
              Entrar
            </button>
            <button
              className={`cadastrar ${!stateLogin ? "active" : ""}`}
              onClick={() => setStateLogin(false)}
            >
              Cadastrar
            </button>
          </div>

          <div className="input-container">
            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} className="img-login" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
              />
            </div>

            {!stateLogin && (
              <div className="input-field">
                <FontAwesomeIcon icon={faUser} className="img-login" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome de usuário"
                  maxLength={50}
                />
              </div>
            )}

            <div className="input-field senha-container">
              <FontAwesomeIcon icon={faLock} className="img-login" />
              <input
                type={mostrarSenha ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
              />
              <button
                type="button"
                className="toggle-senha"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </button>
            </div>
          </div>

          <div className="submit-container">
            {stateLogin ? (
              <button onClick={handleLogin} disabled={loading}>
                {loading ? <div className="spinner"></div> : "Entrar"}
              </button>
            ) : (
              <button onClick={handleRegister} disabled={loading}>
                {loading ? <div className="spinner"></div> : "Cadastrar"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="login-right">
        <img src="/images/login-image.png" alt="Login illustration" />
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{modalMessage}</h3>
            <button onClick={closeModal}>Ir para a Home</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginSection;
