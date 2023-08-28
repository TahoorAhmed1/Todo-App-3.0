const { create } = require("zustand");

export const updateModal = create((set) => ({
  deleteModal: false,
  setDeleteModal: (value) => set({deleteModal:value}),
  openUpdateModal: false,
  setUpdateModal: (value) => set({openUpdateModal:value}),
}));
