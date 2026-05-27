import { PRODUCTS_DB } from './data.js';

export const Favorites = (() => {
  const getFavIds = (userId) => {
    const users = JSON.parse(localStorage.getItem('bc_users') || '[]');
    const user = users.find(u => u.id === userId);
    return user ? (user.favorites || []) : [];
  };

  const saveFavIds = (userId, favIds) => {
    const users = JSON.parse(localStorage.getItem('bc_users') || '[]');
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return;
    users[idx].favorites = favIds;
    localStorage.setItem('bc_users', JSON.stringify(users));

    const session = JSON.parse(localStorage.getItem('bc_session') || 'null');
    if (session) {
      session.favorites = favIds;
      localStorage.setItem('bc_session', JSON.stringify(session));
    }
  };

  const toggle = (userId, productId) => {
    let favs = getFavIds(userId);
    if (favs.includes(productId)) favs = favs.filter(id => id !== productId);
    else favs.push(productId);

    saveFavIds(userId, favs);
    return favs;
  };

  const isFav = (userId, productId) => getFavIds(userId).includes(productId);

  const getFavProducts = (userId) => {
    const favIds = getFavIds(userId);
    return PRODUCTS_DB.filter(p => favIds.includes(p.id));
  };

  return { toggle, isFav, getFavProducts, getFavIds };
})();

