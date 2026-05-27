export const Auth = (() => {
  const hashPassword = (pwd) => btoa(unescape(encodeURIComponent(pwd + '_bc_salt_2024')));

  const getUsers = () => JSON.parse(localStorage.getItem('bc_users') || '[]');
  const saveUsers = (users) => localStorage.setItem('bc_users', JSON.stringify(users));

  const getCurrentSession = () => JSON.parse(localStorage.getItem('bc_session') || 'null');
  const setSession = (user) => localStorage.setItem('bc_session', JSON.stringify(user));
  const clearSession = () => localStorage.removeItem('bc_session');

  const register = ({ fullname, username, email, password, birthdate }) => {
    const users = getUsers();

    if (!fullname || !username || !email || !password || !birthdate)
      return { ok: false, error: 'Todos los campos son obligatorios.' };

    if (password.length < 6)
      return { ok: false, error: 'La contraseña debe tener al menos 6 caracteres.' };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return { ok: false, error: 'Ingresa un correo válido.' };

    if (users.find(u => u.email === email.toLowerCase()))
      return { ok: false, error: 'Este correo ya está registrado.' };

    if (users.find(u => u.username.toLowerCase() === username.toLowerCase()))
      return { ok: false, error: 'Este nombre de usuario ya está en uso.' };

    const newUser = {
      id: 'u_' + Date.now(),
      fullname,
      username,
      email: email.toLowerCase(),
      password: hashPassword(password),
      birthdate,
      avatar: '',
      favorites: [],
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);
    return { ok: true, user: newUser };
  };

  const login = (identifier, password) => {
    const users = getUsers();
    const user = users.find(u =>
      u.email === identifier.toLowerCase() ||
      u.username.toLowerCase() === identifier.toLowerCase()
    );

    if (!user) return { ok: false, error: 'Usuario no encontrado.' };
    if (user.password !== hashPassword(password))
      return { ok: false, error: 'Contraseña incorrecta.' };

    const sessionData = { ...user };
    delete sessionData.password;
    setSession(sessionData);
    return { ok: true, user: sessionData };
  };

  const logout = () => {
    clearSession();
  };

  const updateUser = (userId, changes) => {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return false;

    if (changes.password) {
      changes.password = hashPassword(changes.password);
    }

    users[idx] = { ...users[idx], ...changes };
    saveUsers(users);

    const updated = { ...users[idx] };
    delete updated.password;
    setSession(updated);
    return updated;
  };

  const verifyPassword = (userId, password) => {
    const users = getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) return false;
    return user.password === hashPassword(password);
  };

  const deleteAccount = (userId) => {
    const users = getUsers();
    const filtered = users.filter(u => u.id !== userId);
    saveUsers(filtered);
    clearSession();
  };

  return { register, login, logout, getCurrentSession, updateUser, verifyPassword, deleteAccount };
})();

