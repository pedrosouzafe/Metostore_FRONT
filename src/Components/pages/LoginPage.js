import LoginSection from "../login-section";

function LoginPage({ user, setUser, loading, setLoading }) {
  return (
    <div>
      <LoginSection
        user={user}
        setUser={setUser}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}

export default LoginPage;
