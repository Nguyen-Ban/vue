export function safe(v) {
  return (v === null || v === undefined || v === '') ? '--' : v;
}

export function fmtDate(iso) {
  if (!iso) return '--';
  const d = new Date(iso);
  return isNaN(d) ? '--' : d.toLocaleDateString('vi-VN');
}

export function displayStatus(item) {
  return item.RecruitmentRoundName ?? item.CandidateStatusName ?? item.DisplayStatus ?? (item.IsNew ? 'Mới' : 'Ứng tuyển');
}
