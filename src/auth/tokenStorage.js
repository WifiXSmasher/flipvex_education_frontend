const ACCESS = 'access'
const REFRESH = 'refresh'

export const getAccess = () =>
  localStorage.getItem(ACCESS) ?? sessionStorage.getItem(ACCESS)

export const getRefresh = () =>
  localStorage.getItem(REFRESH) ?? sessionStorage.getItem(REFRESH)

// remember: true -> localStorage, false -> sessionStorage,
// undefined -> keep using whichever store is already in use (token refresh)
export function saveTokens({ access, refresh }, remember) {
  const inLocal = localStorage.getItem(ACCESS) || localStorage.getItem(REFRESH)
  const useLocal = remember === undefined ? !!inLocal : remember
  const target = useLocal ? localStorage : sessionStorage
  const other = useLocal ? sessionStorage : localStorage

  other.removeItem(ACCESS)
  other.removeItem(REFRESH)
  if (access) target.setItem(ACCESS, access)
  if (refresh) target.setItem(REFRESH, refresh)
}

export function clearTokens() {
  for (const store of [localStorage, sessionStorage]) {
    store.removeItem(ACCESS)
    store.removeItem(REFRESH)
  }
}