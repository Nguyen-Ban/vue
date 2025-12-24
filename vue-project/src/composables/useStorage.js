const STORAGE_KEY = 'MISA_CANDIDATES';
const SIDEBAR_KEY = 'MISA_SIDEBAR_STATE';
const SIDEBAR_ACTIVE_KEY = 'MISA_SIDEBAR_ACTIVE_INDEX';

export function useStorage() {
  const initCandidates = (seed, force = false) => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data || force) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed ?? []));
    }
  };

  const getCandidates = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  };

  const saveCandidates = (candidates) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
  };

  const getSidebarState = () => localStorage.getItem(SIDEBAR_KEY) === 'true';
  const saveSidebarState = (isCollapsed) => localStorage.setItem(SIDEBAR_KEY, String(isCollapsed));

  const getActiveSidebarIndex = () => {
    const raw = localStorage.getItem(SIDEBAR_ACTIVE_KEY);
    const idx = Number.parseInt(raw ?? '-1', 10);
    return Number.isNaN(idx) ? -1 : idx;
  };
  const saveActiveSidebarIndex = (index) => localStorage.setItem(SIDEBAR_ACTIVE_KEY, String(index));

  return {
    initCandidates,
    getCandidates,
    saveCandidates,
    getSidebarState,
    saveSidebarState,
    getActiveSidebarIndex,
    saveActiveSidebarIndex,
  };
}
