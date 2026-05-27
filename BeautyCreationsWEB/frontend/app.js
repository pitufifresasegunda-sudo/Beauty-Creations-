import { Auth } from '../backend/auth.js';
import { Favorites } from '../backend/favorites.js';
import { PRODUCTS_DB, FILTER_SUBCATS, SIMULATED_STORES } from '../backend/data.js';


let currentUser = null;
let currentSection = 'inicio';
let previousSection = 'inicio';
let currentProduct = null;
let activeFilters = new Set();
const mxnFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN'
});

const els = {
  authScreen: document.getElementById('auth-screen'),
  appScreen: document.getElementById('app-screen'),
  searchFilterBar: document.getElementById('search-filter-bar'),
  searchInput: document.getElementById('search-input'),
  sortSelect: document.getElementById('sort-select'),
  categoryFilters: document.getElementById('category-filters'),
  grids: {
    inicio: document.getElementById('grid-inicio'),
    skincare: document.getElementById('grid-skincare'),
    maquillaje: document.getElementById('grid-maquillaje'),
    favoritos: document.getElementById('grid-favoritos')
  },
  favEmpty: document.getElementById('fav-empty'),
  productDetail: document.getElementById('product-detail'),
  view: {
    inicio: document.getElementById('view-inicio'),
    skincare: document.getElementById('view-skincare'),
    maquillaje: document.getElementById('view-maquillaje'),
    favoritos: document.getElementById('view-favoritos'),
    producto: document.getElementById('view-producto'),
    perfil: document.getElementById('view-perfil')
  },
  backBtn: document.getElementById('back-btn'),
  usernameDisplay: document.getElementById('username-display'),
  userAvatar: document.getElementById('user-avatar'),
  dropdownMenu: document.getElementById('dropdown-menu'),
  btnLogin: document.getElementById('btn-login'),
  btnRegister: document.getElementById('btn-register'),
  loginForm: document.getElementById('login-form'),
  registerForm: document.getElementById('register-form'),
  loginError: document.getElementById('login-error'),
  registerError: document.getElementById('register-error'),
  registerSuccess: document.getElementById('register-success'),
  // Profile
  profFullname: document.getElementById('prof-fullname'),
  profUsername: document.getElementById('prof-username'),
  profPassword: document.getElementById('prof-password'),
  profileMsg: document.getElementById('profile-msg'),
  profileAvatarPreview: document.getElementById('profile-avatar-preview'),
  avatarInput: document.getElementById('avatar-input'),
  btnSaveProfile: document.getElementById('btn-save-profile'),
  btnOpenDelete: document.getElementById('btn-open-delete'),
  // Delete modal
  deleteModal: document.getElementById('delete-modal'),
  deletePassword: document.getElementById('delete-password'),
  deleteError: document.getElementById('delete-error'),
  btnCancelDelete: document.getElementById('btn-cancel-delete'),
  btnConfirmDelete: document.getElementById('btn-confirm-delete'),
  // Stores modal
  storesModal: document.getElementById('stores-modal'),
  storesGeoStatus: document.getElementById('stores-geo-status'),
  storesList: document.getElementById('stores-list'),
  btnCloseStores: document.getElementById('close-stores')
};

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id)?.classList.add('active');
}

function formatPrice(price) {
  return mxnFormatter.format(price);
}

function buildAvatar(username) {
  const canvas = document.createElement('canvas');
  canvas.width = 80;
  canvas.height = 80;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#d4a0b0';
  ctx.fillRect(0, 0, 80, 80);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(username?.[0]?.toUpperCase() || 'B', 40, 40);
  return canvas.toDataURL();
}

function updateUserUI() {
  if (!currentUser) return;
  els.usernameDisplay.textContent = currentUser.username;
  els.userAvatar.src = currentUser.avatar || buildAvatar(currentUser.username);
}

function initApp() {
  showScreen('app-screen');
  updateUserUI();
  renderAllGrids();
  navigateTo('inicio');
}

// AUTH UI
function showRegister() {
  els.loginForm.style.display = 'none';
  els.registerForm.style.display = 'block';
}

function showLogin() {
  els.registerForm.style.display = 'none';
  els.loginForm.style.display = 'block';
}

function handleLogin() {
  const identifier = document.getElementById('login-identifier').value.trim();
  const password = document.getElementById('login-password').value;
  els.loginError.textContent = '';

  const result = Auth.login(identifier, password);
  if (!result.ok) {
    els.loginError.textContent = result.error;
    return;
  }

  currentUser = result.user;
  initApp();
}

function handleRegister() {
  els.registerError.textContent = '';
  els.registerSuccess.textContent = '';

  const data = {
    fullname: document.getElementById('reg-fullname').value.trim(),
    username: document.getElementById('reg-username').value.trim(),
    email: document.getElementById('reg-email').value.trim(),
    password: document.getElementById('reg-password').value,
    birthdate: document.getElementById('reg-birthdate').value
  };

  const result = Auth.register(data);
  if (!result.ok) {
    els.registerError.textContent = result.error;
    return;
  }

  const loginResult = Auth.login(data.email, data.password);
  if (loginResult.ok) {
    currentUser = loginResult.user;
    initApp();
  } else {
    els.registerSuccess.textContent = '¡Cuenta creada! Ahora inicia sesión.';
    showLogin();
  }
}

function handleLogout() {
  Auth.logout();
  currentUser = null;
  currentSection = 'inicio';
  previousSection = 'inicio';
  activeFilters.clear();
  showScreen('auth-screen');
}

// SPA navigation
function navigateTo(section) {
  const showFilters = ['inicio', 'skincare', 'maquillaje', 'favoritos'];
  els.searchFilterBar.style.display = showFilters.includes(section) ? 'flex' : 'none';

  Object.values(els.view).forEach(v => v?.classList.remove('active'));
  els.view[section]?.classList.add('active');

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.section === section);
  });

  if (section === 'favoritos') renderFavoritos();
  if (section === 'inicio') buildFilters('all');
  if (section === 'skincare') buildFilters('skincare');
  if (section === 'maquillaje') buildFilters('maquillaje');
  if (section === 'perfil') loadProfileForm();

  if (['inicio', 'skincare', 'maquillaje'].includes(section)) {
    els.searchInput.value = '';
    els.sortSelect.value = '';
    activeFilters.clear();
    applyFilters();
  }

  if (section !== 'producto') previousSection = section;
  currentSection = section;
}

function goBack() {
  navigateTo(previousSection);
}

// Render products
function renderAllGrids() {
  renderGrid(PRODUCTS_DB, 'inicio');
  renderGrid(PRODUCTS_DB.filter(p => p.category === 'skincare'), 'skincare');
  renderGrid(PRODUCTS_DB.filter(p => p.category === 'maquillaje'), 'maquillaje');
}

function renderGrid(products, whichGrid) {
  const grid = els.grids[whichGrid];
  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = '<p class="no-products">No se encontraron productos.</p>';
    return;
  }

  grid.innerHTML = products.map(buildProductCard).join('');
}

function buildProductCard(p) {
  const isFav = currentUser ? Favorites.isFav(currentUser.id, p.id) : false;
  const unavailableClass = !p.available ? 'unavailable' : '';
  const favIcon = isFav ? '❤️' : '🤍';
  const img = p.image
    ? `<img src="${p.image}" alt="${p.name}" onerror="this.src='https://placehold.co/200x150?text=BC'" />`
    : `<img src="https://placehold.co/200x150?text=Beauty+Creations" alt="${p.name}" />`;

  return `
    <div class="product-card ${unavailableClass}" id="card-${p.id}">
      <button class="fav-btn" data-fav-toggle="${p.id}" title="Favorito">${favIcon}</button>
      <div class="card-click" data-open-product="${p.id}">
        ${img}
        <div class="card-body">
          <h3>${p.name}</h3>
          <div class="price">${formatPrice(p.price)}</div>
          <span class="category-badge">${p.subcategory}</span>
        </div>
      </div>
    </div>
  `;
}

function attachGridHandlers(gridEl) {
  if (!gridEl) return;

  gridEl.querySelectorAll('[data-open-product]').forEach(el => {
    el.addEventListener('click', () => openProduct(el.dataset.openProduct));
  });

  gridEl.querySelectorAll('[data-fav-toggle]').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      toggleFav(btn.dataset.favToggle);
    });
  });
}

function renderFavoritos() {
  if (!currentUser) return;
  const favProducts = Favorites.getFavProducts(currentUser.id);

  els.favEmpty.style.display = favProducts.length === 0 ? 'block' : 'none';
  els.grids.favoritos.innerHTML = favProducts.map(buildProductCard).join('');
  attachGridHandlers(els.grids.favoritos);
}

function toggleFav(productId) {
  if (!currentUser) return;
  Favorites.toggle(currentUser.id, productId);

  // Sync currentUser from session
  const session = Auth.getCurrentSession();
  if (session) currentUser = session;

  const card = document.getElementById('card-' + productId);
  if (card) {
    const btn = card.querySelector('[data-fav-toggle="' + productId + '"]');
    if (btn) btn.textContent = Favorites.isFav(currentUser.id, productId) ? '❤️' : '🤍';
  }

  if (currentSection === 'favoritos') renderFavoritos();
  if (currentSection === 'producto' && currentProduct) updateDetailFavBtn(productId);
}

function updateDetailFavBtn(productId) {
  const detailFavBtn = document.getElementById('detail-fav-btn');
  if (!detailFavBtn) return;
  const isFavNow = Favorites.isFav(currentUser.id, productId);
  detailFavBtn.textContent = isFavNow ? '❤️ En favoritos' : '🤍 Agregar a favoritos';
}

// Product detail
function openProduct(productId) {
  currentProduct = PRODUCTS_DB.find(p => p.id === productId);
  if (!currentProduct) return;

  previousSection = currentSection;
  currentSection = 'producto';

  const isFav = currentUser ? Favorites.isFav(currentUser.id, productId) : false;
  const disponible = currentProduct.available
    ? '<span style="color:green;">✔ Disponible</span>'
    : '<span style="color:red;">✘ No disponible</span>';

  const img = currentProduct.image
    ? `<img src="${currentProduct.image}" alt="${currentProduct.name}" onerror="this.src='https://placehold.co/600x350?text=Beauty+Creations'" />`
    : `<img src="https://placehold.co/600x350?text=Beauty+Creations" alt="${currentProduct.name}" />`;

  els.productDetail.innerHTML = `
    ${img}
    <div class="detail-info">
      <div class="detail-category">${currentProduct.category} · ${currentProduct.subcategory}</div>
      <h2>${currentProduct.name}</h2>
      <div class="detail-price">${formatPrice(currentProduct.price)}</div>
      <p class="detail-desc">${currentProduct.description}</p>
      <p class="detail-status"><strong>Tienda:</strong> ${currentProduct.sourceStore || 'Beauty Creations MX'}</p>
      <p class="detail-status"><strong>Estado:</strong> ${disponible}</p>
      <div class="detail-actions">
        <button id="detail-fav-btn">${isFav ? '❤️ En favoritos' : '🤍 Agregar a favoritos'}</button>
        <button class="btn-stores" id="btn-stores-nearby">📍 Tiendas cercanas</button>
      </div>
    </div>
  `;

  document.getElementById('search-filter-bar').style.display = 'none';
  Object.values(els.view).forEach(v => v?.classList.remove('active'));
  els.view.producto?.classList.add('active');

  document.getElementById('detail-fav-btn')?.addEventListener('click', (ev) => {
    ev.stopPropagation();
    toggleFav(productId);
  });
  document.getElementById('btn-stores-nearby')?.addEventListener('click', () => openStoresModal());
}

// Filters/search
function buildFilters(scope) {
  const subcats = FILTER_SUBCATS[scope] || FILTER_SUBCATS.all;
  activeFilters.clear();

  els.categoryFilters.innerHTML = subcats.map(sub => `
    <button class="filter-btn" data-sub="${sub}" type="button">${sub.charAt(0).toUpperCase() + sub.slice(1)}</button>
  `).join('');

  els.categoryFilters.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => toggleFilter(btn.dataset.sub));
  });
}

function toggleFilter(sub) {
  if (activeFilters.has(sub)) activeFilters.delete(sub);
  else activeFilters.add(sub);

  els.categoryFilters.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', activeFilters.has(btn.dataset.sub));
  });

  applyFilters();
}

function applyFilters() {
  const query = els.searchInput.value.toLowerCase().trim();
  const sort = els.sortSelect.value;

  let base = [];
  if (currentSection === 'inicio') base = PRODUCTS_DB;
  else if (currentSection === 'skincare') base = PRODUCTS_DB.filter(p => p.category === 'skincare');
  else if (currentSection === 'maquillaje') base = PRODUCTS_DB.filter(p => p.category === 'maquillaje');
  else if (currentSection === 'favoritos') base = currentUser ? Favorites.getFavProducts(currentUser.id) : [];

  let filtered = base.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.subcategory.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query)
  );

  if (activeFilters.size > 0) {
    filtered = filtered.filter(p => activeFilters.has(p.subcategory));
  }

  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  if (sort === 'alpha-asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === 'alpha-desc') filtered.sort((a, b) => b.name.localeCompare(a.name));

  const gridMap = {
    inicio: 'inicio',
    skincare: 'skincare',
    maquillaje: 'maquillaje',
    favoritos: 'favoritos'
  };

  const which = gridMap[currentSection];
  if (!which) return;

  renderGrid(filtered, which);
  attachGridHandlers(els.grids[which]);
}

// Stores modal
function openStoresModal() {
  els.storesModal.classList.add('open');
  els.storesList.innerHTML = '';
  els.storesGeoStatus.textContent = 'Obteniendo tu ubicación...';

  if (!navigator.geolocation) {
    els.storesGeoStatus.textContent = 'Tu navegador no soporta geolocalización.';
    renderSimulatedStores(null);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      els.storesGeoStatus.textContent = 'Ubicación detectada. Mostrando tiendas cercanas:';
      renderSimulatedStores({ lat: latitude, lng: longitude });
    },
    () => {
      els.storesGeoStatus.textContent = 'No se pudo obtener tu ubicación. Mostrando tiendas de referencia:';
      renderSimulatedStores(null);
    }
  );
}

function renderSimulatedStores(userLocation) {
    let stores = [...SIMULATED_STORES];


  if (userLocation) {
    stores = stores
      .map(s => ({
        ...s,
        distance: haversineKm(userLocation.lat, userLocation.lng, s.lat, s.lng)
      }))
      .sort((a, b) => a.distance - b.distance);
  }

  els.storesList.innerHTML = stores.map(s => `
    <div class="store-card">
      <h4>${s.name}</h4>
      <p>📍 ${s.address}</p>
      <p>🚗 ${s.distance.toFixed(1)} km aprox.</p>
      <a href="${s.mapsUrl}" target="_blank">🗺️ Cómo llegar</a>
    </div>
  `).join('');
}

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function closeStoresModal() {
  els.storesModal.classList.remove('open');
}

// Profile
function loadProfileForm() {
  if (!currentUser) return;
  els.profFullname.value = currentUser.fullname || '';
  els.profUsername.value = currentUser.username || '';
  els.profPassword.value = '';
  els.profileMsg.textContent = '';
  els.profileAvatarPreview.src = currentUser.avatar || buildAvatar(currentUser.username);
}

function previewAvatar(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    els.profileAvatarPreview.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function saveProfile() {
  const msgEl = els.profileMsg;
  msgEl.textContent = '';
  msgEl.className = 'success-msg';

  const newFullname = els.profFullname.value.trim();
  const newUsername = els.profUsername.value.trim();
  const newPassword = els.profPassword.value;
  const avatarInput = els.avatarInput;

  if (!newFullname || !newUsername) {
    msgEl.className = 'error-msg';
    msgEl.textContent = 'Nombre y usuario son obligatorios.';
    return;
  }

  const changes = { fullname: newFullname, username: newUsername };

  if (newPassword) {
    if (newPassword.length < 6) {
      msgEl.className = 'error-msg';
      msgEl.textContent = 'La contraseña debe tener mínimo 6 caracteres.';
      return;
    }
    changes.password = newPassword;
  }

  if (avatarInput.files[0]) {
    changes.avatar = els.profileAvatarPreview.src;
  }

  const updated = Auth.updateUser(currentUser.id, changes);
  if (!updated) {
    msgEl.className = 'error-msg';
    msgEl.textContent = 'Error al guardar cambios.';
    return;
  }

  currentUser = updated;
  updateUserUI();
  msgEl.textContent = '✔ Cambios guardados correctamente.';
}

// Delete account modal
function openDeleteModal() {
  els.deletePassword.value = '';
  els.deleteError.textContent = '';
  els.deleteModal.classList.add('open');
}

function closeDeleteModal() {
  els.deleteModal.classList.remove('open');
}

function confirmDeleteAccount() {
  const password = els.deletePassword.value;
  els.deleteError.textContent = '';

  if (!password) {
    els.deleteError.textContent = 'Ingresa tu contraseña para confirmar.';
    return;
  }

  if (!Auth.verifyPassword(currentUser.id, password)) {
    els.deleteError.textContent = 'Contraseña incorrecta. No se eliminó la cuenta.';
    return;
  }

  Auth.deleteAccount(currentUser.id);
  currentUser = null;
  closeDeleteModal();
  handleLogout();
  alert('Tu cuenta ha sido eliminada permanentemente.');
}

// Dropdown
function toggleDropdown() {
  els.dropdownMenu.classList.toggle('open');
}

function closeDropdown() {
  els.dropdownMenu.classList.remove('open');
}

// Initialization + event wiring
document.addEventListener('DOMContentLoaded', () => {
  // Nav links
  document.querySelectorAll('[data-section]').forEach(a => {
    a.addEventListener('click', () => navigateTo(a.dataset.section));
  });

  // Auth switch
  document.getElementById('link-to-register')?.addEventListener('click', (e) => {
    e.preventDefault();
    showRegister();
  });
  document.getElementById('link-to-login')?.addEventListener('click', (e) => {
    e.preventDefault();
    showLogin();
  });

  els.btnLogin?.addEventListener('click', handleLogin);
  els.btnRegister?.addEventListener('click', handleRegister);

  // Global dropdown close on outside click
  document.addEventListener('click', (e) => {
    const area = document.getElementById('user-area');
    if (area && !area.contains(e.target)) closeDropdown();
  });

  els.userAvatar?.addEventListener('click', toggleDropdown);
  els.usernameDisplay?.addEventListener('click', toggleDropdown);

  // Dropdown actions
  els.dropdownMenu?.querySelectorAll('[data-dd-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.ddAction;
      closeDropdown();
      if (action === 'perfil') navigateTo('perfil');
      if (action === 'delete') openDeleteModal();
      if (action === 'logout') handleLogout();
    });
  });

  // Back button
  els.backBtn?.addEventListener('click', goBack);

  // Search/filter
  els.searchInput?.addEventListener('input', applyFilters);
  els.sortSelect?.addEventListener('change', applyFilters);

  // Modals
  els.btnCloseStores?.addEventListener('click', closeStoresModal);

  els.btnCancelDelete?.addEventListener('click', closeDeleteModal);
  els.btnConfirmDelete?.addEventListener('click', confirmDeleteAccount);

  els.btnOpenDelete?.addEventListener('click', openDeleteModal);

  // Profile
  els.avatarInput?.addEventListener('change', previewAvatar);
  els.btnSaveProfile?.addEventListener('click', saveProfile);

  // Restore session
  const session = Auth.getCurrentSession();
  if (session) {
    currentUser = session;
    initApp();
  }
});

