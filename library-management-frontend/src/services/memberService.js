import api from "./api";

const memberService = {
  // Get all members
  getAllMembers: async () => {
    const { data } = await api.get("/members");
    return data;
  },

  // Add a new member
  addMember: async (member) => {
    const { data } = await api.post("/members", member);
    return data;
  },

  // Update member
  updateMember: async (id, member) => {
    const { data } = await api.put(`/members/${id}`, member);
    return data;
  },

  // Delete member
  deleteMember: async (id) => {
    const { data } = await api.delete(`/members/${id}`);
    return data;
  },
};

export default memberService;