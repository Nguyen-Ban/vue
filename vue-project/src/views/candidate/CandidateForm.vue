<template>
  <div class="modal-overlay" :class="{ open: show }" @click="onOverlay">
    <div class="modal-box" @click.stop>
      <div class="modal-header">
        <div class="modal-title">{{ isEdit ? 'Chỉnh sửa thông tin ứng viên' : 'Thêm ứng viên' }}</div>
        <div class="icon-close" @click="close"></div>
      </div>
      <div class="modal-body">
        <div class="upload-cv-box">
          <div class="upload-cv-text">Kéo thả hoặc bấm vào đây để tải CV lên</div>
          <div class="upload-cv-note">Chấp nhận file .doc, .docx, .pdf, .jpg, .jpeg, .png (Dung lượng &lt; 15 Mb)</div>
        </div>

        <div class="form-section">
          <div class="form-col-left">
            <div class="avatar-upload"><div>Ảnh</div></div>
          </div>
          <div class="form-col-right">
            <div class="form-group">
              <label class="required">Họ và tên</label>
              <BaseInput v-model="form.CandidateName" placeholder="Nhập họ và tên" />
            </div>
            <!-- Ngày sinh & Giới tính -->
            <div class="form-row">
              <div class="form-group flex1">
                <label>Ngày sinh</label>
                <div class="input-group">
                  <input type="text" v-model="form.DateOfBirth" placeholder="dd/MM/yyyy" class="form-control">
                  <span class="icon input-icon-inside"></span>
                </div>
              </div>
              <div class="form-group flex1">
                <label>Giới tính</label>
                <select v-model="form.Gender" class="form-control">
                  <option value="">Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>
            </div>

            <!-- Khu vực -->
            <div class="form-group">
              <label>Khu vực</label>
              <div class="input-group has-btn">
                <select v-model="form.AreaName" class="form-control">
                  <option value="">Chọn giá trị</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                </select>
                <div class="input-group-append" style="color:#666; font-size:12px">•••</div>
              </div>
            </div>

            <!-- Số điện thoại & Email -->
            <div class="form-row">
              <div class="form-group flex1">
                <label>Số điện thoại</label>
                <BaseInput v-model="form.Mobile" placeholder="Nhập số điện thoại" />
              </div>
              <div class="form-group flex1">
                <label class="required">Email</label>
                <BaseInput v-model="form.Email" type="email" placeholder="Nhập Email" />
              </div>
            </div>
            <div class="form-group">
              <label>Địa chỉ</label>
              <BaseInput v-model="form.Address" placeholder="Nhập địa chỉ" />
            </div>

            <!-- HỌC VẤN -->
            <div class="section-header-text">HỌC VẤN</div>

            <div class="form-group display-flex align-items-center gap-16">
              <div style="width: 130px;"><label class="required" style="margin:0">Trình độ đào tạo</label></div>
              <div class="input-group has-btn flex1">
                <input v-model="form.EducationDegreeName" type="text" placeholder="Nhập trình độ đào tạo" class="form-control">
                <div class="input-group-append">+</div>
              </div>
            </div>

            <div class="form-group display-flex align-items-center gap-16">
              <div style="width: 130px;"><label class="required" style="margin:0">Nơi đào tạo</label></div>
              <div class="input-group has-btn flex1">
                <input v-model="form.EducationPlaceName" type="text" placeholder="Nhập nơi đào tạo" class="form-control">
                <div class="input-group-append">+</div>
              </div>
            </div>

            <div class="form-group display-flex align-items-center gap-16">
              <div style="width: 130px;"><label class="required" style="margin:0">Chuyên ngành</label></div>
              <div class="input-group has-btn flex1">
                <input v-model="form.EducationMajorName" type="text" placeholder="Nhập chuyên ngành" class="form-control">
                <div class="input-group-append">+</div>
              </div>
            </div>

            <div class="link-action">+ Thêm học vấn</div>

            <!-- Ngày ứng tuyển & Nguồn ứng viên -->
            <div class="form-row" style="margin-top: 16px;">
              <div class="form-group flex1">
                <label class="required">Ngày ứng tuyển</label>
                <div class="input-group">
                  <input v-model="form.ApplyDate" type="text" class="form-control">
                  <span class="icon input-icon-inside"></span>
                </div>
              </div>
              <div class="form-group flex1">
                <label>Nguồn ứng viên</label>
                <select v-model="form.ChannelName" class="form-control">
                  <option value="">Chọn nguồn ứng viên</option>
                </select>
              </div>
            </div>

            <!-- Nhân sự khai thác & Cộng tác viên -->
            <div class="form-row">
              <div class="form-group flex1">
                <label>Nhân sự khai thác</label>
                <select v-model="form.AttractivePersonnel" class="form-control">
                  <option value="">Chọn nhân sự</option>
                  <option value="Đinh Nga QTHT">Đinh Nga QTHT</option>
                </select>
              </div>
              <div class="form-group flex1">
                <label>Cộng tác viên</label>
                <select v-model="form.Collaborator" class="form-control">
                  <option value="">Chọn cộng tác viên</option>
                </select>
              </div>
            </div>

            <!-- Checkbox người tham chiếu -->
            <div class="form-group display-flex align-items-center" style="gap: 8px;">
              <input type="checkbox" id="chk_ref" v-model="form.IsReferrer">
              <label for="chk_ref" style="margin:0; font-weight: 400;">Thêm nhanh người tham chiếu vào kho ứng viên</label>
            </div>

            <div class="link-action" style="font-weight: 600; color: #1E88E5;">+ Thêm người giới thiệu</div>

            <!-- Nơi làm việc gần đây -->
            <div class="form-group">
              <label>Nơi làm việc gần đây</label>
              <BaseInput v-model="form.WorkPlaceRecent" placeholder="Nhập nơi làm việc gần đây" />
            </div>

            <div class="link-action" style="font-weight: 600; color: #1E88E5; margin-bottom: 12px;">+ Thêm kinh nghiệm làm việc</div>

            <!-- Kinh nghiệm làm việc -->
            <div class="experience-block" style="padding-left: 0;">
              <div class="form-group">
                <label>Nơi làm việc</label>
                <BaseInput v-model="form.ExperiencePlace" placeholder="Nhập nơi làm việc" />
              </div>

              <div class="form-group">
                <label>Thời gian</label>
                <div class="date-range-group">
                  <div class="input-group">
                    <input type="text" v-model="form.ExperienceStart" placeholder="MM/yyyy" class="form-control">
                    <span class="icon input-icon-inside"></span>
                  </div>
                  <span class="date-separator">-</span>
                  <div class="input-group">
                    <input type="text" v-model="form.ExperienceEnd" placeholder="MM/yyyy" class="form-control">
                    <span class="icon input-icon-inside"></span>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label>Vị trí công việc</label>
                <BaseInput v-model="form.ExperiencePosition" placeholder="Nhập vị trí công việc" />
              </div>

              <div class="form-group">
                <label>Mô tả công việc</label>
                <textarea class="form-control" v-model="form.ExperienceDescription" placeholder="Nhập mô tả công việc"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="popup-btn popup-btn-secondary" @click="close">Hủy</button>
        <button class="popup-btn popup-btn-primary" @click="save">Lưu</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue';
import BaseInput from '../../components/control/BaseInput.vue';
import { useCandidates } from '../../composables/useCandidates';
import { useToast } from '../../composables/useToast';

/**
 * Component CandidateForm
 * Form modal thêm/chỉnh sửa thông tin ứng viên
 * Created By Ban - 01/06/2026
 */

// Props: nhận trạng thái modal (v-model) và dữ liệu ứng viên
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  candidate: { type: Object, default: null },
});
// Emit: cập nhật trạng thái modal và khi lưu thành công
const emit = defineEmits(['update:modelValue', 'saved']);

const { saveCandidate } = useCandidates();
const toast = useToast();

// Đồng bộ hóa trạng thái modal với prop
const show = computed({ get: () => props.modelValue, set: (v) => emit('update:modelValue', v) });
// Kiểm tra xem đây có phải là chỉnh sửa không (có CandidateID)
const isEdit = computed(() => !!(props.candidate && props.candidate.CandidateID));

/**
 * State quản lý dữ liệu form
 */
const form = reactive({
  CandidateID: null,
  CandidateName: '',
  DateOfBirth: '',
  Gender: '',
  AreaName: '',
  Mobile: '',
  Email: '',
  Address: '',
  EducationDegreeName: '',
  EducationPlaceName: '',
  EducationMajorName: '',
  ApplyDate: '',
  ChannelName: '',
  AttractivePersonnel: '',
  Collaborator: '',
  WorkPlaceRecent: '',
  IsReferrer: false,
  ExperiencePlace: '',
  ExperienceStart: '',
  ExperienceEnd: '',
  ExperiencePosition: '',
  ExperienceDescription: '',
  CandidateStatusName: 'Ứng tuyển'
});

/**
 * Theo dõi thay đổi của props.candidate
 * Cập nhật form khi ứng viên được chọn hoặc reset khi không có ứng viên
 * Created By Ban - 01/06/2026
 */
watch(() => props.candidate, (c) => {
  if (c) {
    // Cập nhật từng trường từ dữ liệu ứng viên
    form.CandidateID = c.CandidateID ?? null;
    form.CandidateName = c.CandidateName ?? '';
    form.DateOfBirth = c.DateOfBirth ?? '';
    form.Gender = c.Gender ?? '';
    form.AreaName = c.AreaName ?? '';
    form.Mobile = c.Mobile ?? '';
    form.Email = c.Email ?? '';
    form.Address = c.Address ?? '';
    form.EducationDegreeName = c.EducationDegreeName ?? '';
    form.EducationPlaceName = c.EducationPlaceName ?? '';
    form.EducationMajorName = c.EducationMajorName ?? '';
    form.ApplyDate = c.ApplyDate ?? '';
    form.ChannelName = c.ChannelName ?? '';
    form.AttractivePersonnel = c.AttractivePersonnel ?? '';
    form.Collaborator = c.Collaborator ?? '';
    form.WorkPlaceRecent = c.WorkPlaceRecent ?? '';
    form.IsReferrer = c.IsReferrer ?? false;
    form.ExperiencePlace = c.ExperiencePlace ?? '';
    form.ExperienceStart = c.ExperienceStart ?? '';
    form.ExperienceEnd = c.ExperienceEnd ?? '';
    form.ExperiencePosition = c.ExperiencePosition ?? '';
    form.ExperienceDescription = c.ExperienceDescription ?? '';
  } else {
    // Reset form khi không có ứng viên
    form.CandidateID = null;
    form.CandidateName = '';
    form.DateOfBirth = '';
    form.Gender = '';
    form.AreaName = '';
    form.Mobile = '';
    form.Email = '';
    form.Address = '';
    form.EducationDegreeName = '';
    form.EducationPlaceName = '';
    form.EducationMajorName = '';
    form.ApplyDate = '';
    form.ChannelName = '';
    form.AttractivePersonnel = '';
    form.Collaborator = '';
    form.WorkPlaceRecent = '';
    form.IsReferrer = false;
    form.ExperiencePlace = '';
    form.ExperienceStart = '';
    form.ExperienceEnd = '';
    form.ExperiencePosition = '';
    form.ExperienceDescription = '';
  }
}, { immediate: true });

// Đóng modal
function close() { show.value = false; }

/**
 * Xử lý sự kiện click overlay
 * Đóng modal khi click ngoài vùng form
 * @param {Event} e - Sự kiện click
 * Created By Ban - 01/06/2026
 */
function onOverlay(e) { if (e.target === e.currentTarget) close(); }

/**
 * Lưu ứng viên
 * Kiểm tra dữ liệu hợp lệ, lưu vào storage, hiển thị thông báo
 * Created By Ban - 01/06/2026
 */
function save() {
  // Kiểm tra bắt buộc: họ tên
  if (!form.CandidateName.trim()) {
    toast.error('Vui lòng nhập họ tên!');
    return;
  }
  // Kiểm tra bắt buộc: email
  if (!form.Email.trim()) {
    toast.error('Vui lòng nhập Email!');
    return;
  }
  // Lưu dữ liệu
  saveCandidate({ ...form });
  // Thông báo thành công
  toast.success(isEdit.value ? 'Cập nhật ứng viên thành công!' : 'Thêm mới ứng viên thành công!');
  // Phát sự kiện và đóng modal
  emit('saved');
  close();
}
</script>
<style scoped>
@import './CandidateForm.css';
</style>
