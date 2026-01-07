/**
 * Enum: Gender
 * Giới tính của ứng viên
 * Created By Ban - 01/07/2026
 */
export const Gender = {
  MALE: 'Nam',
  FEMALE: 'Nữ',
};

export const GenderOptions = [
  { label: 'Nam', value: Gender.MALE },
  { label: 'Nữ', value: Gender.FEMALE },
];

/**
 * Enum: CandidateStatus
 * Trạng thái của ứng viên
 * Created By Ban - 01/07/2026
 */
export const CandidateStatus = {
  NEW: 'Mới',
  APPLYING: 'Ứng tuyển',
  EMPLOYEE: 'Nhân viên',
};

export const CandidateStatusOptions = [
  { label: 'Mới', value: CandidateStatus.NEW },
  { label: 'Ứng tuyển', value: CandidateStatus.APPLYING },
  { label: 'Nhân viên', value: CandidateStatus.EMPLOYEE },
];
